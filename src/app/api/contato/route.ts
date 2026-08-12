import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, telefone, mensagem, captcha, via } = body;

    console.log(">>> NOVO LEAD LUMINI 3 RECEBIDO:", { nome, email, telefone, via });

    const isWhatsapp = via === "whatsapp" || mensagem === "Contato via modal WhatsApp";

    // 1. Tentar validar reCAPTCHA (Apenas se NÃO for WhatsApp e tiver captcha)
    if (!isWhatsapp && captcha && process.env.RECAPTCHA_SECRET_KEY) {
      try {
        const params = new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captcha,
        });

        const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString(),
        });

        const recaptchaJson = await recaptchaRes.json();
        console.log(">>> RECAPTCHA GOOGLE:", recaptchaJson);
      } catch (captchaErr) {
        console.error(">>> ERRO CONSULTA RECAPTCHA:", captchaErr);
      }
    }

    // 2. Gravar Lead no Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error(">>> ERRO: Variaveis do Supabase nao configuradas.");
      return NextResponse.json({ error: "Configuração do banco ausente." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: dbData, error: dbError } = await supabase
      .from("leads")
      .insert([
        {
          nome: nome || "Não informado",
          email: email || "Não informado",
          telefone: telefone || "Não informado",
          mensagem: mensagem || (isWhatsapp ? "Contato via modal WhatsApp" : "Contato via site Lumini 3"),
          origem: isWhatsapp ? "WhatsApp Modal - Lumini 3" : "Formulário de Contato - Lumini 3",
        },
      ])
      .select();

    if (dbError) {
      console.error(">>> ERRO BANCO SUPABASE:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    console.log(">>> LEAD SALVO NO SUPABASE COM SUCESSO:", dbData);

    // 3. Enviar E-mail via Nodemailer em segundo plano
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      (async () => {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
            connectionTimeout: 5000,
          });

          await transporter.sendMail({
            from: `"Site Lumini 3" <${process.env.SMTP_USER}>`,
            to: "estandenovacalifornia@gmail.com",
            replyTo: email,
            subject: `Novo Lead - Lumini 3 (${isWhatsapp ? "WhatsApp" : "Formulário"}): ${nome}`,
            html: `
              <h2>Novo contato recebido pelo site Lumini 3</h2>
              <p><strong>Nome:</strong> ${nome}</p>
              <p><strong>E-mail:</strong> ${email}</p>
              <p><strong>Telefone:</strong> ${telefone}</p>
              <p><strong>Origem:</strong> ${isWhatsapp ? "Atendimento WhatsApp" : "Formulário de Contato"}</p>
              <br/>
              <p><strong>Mensagem:</strong></p>
              <p>${(mensagem || "").replace(/\n/g, "<br/>")}</p>
            `,
          });
          console.log(">>> E-MAIL ENVIADO COM SUCESSO");
        } catch (emailErr) {
          console.error(">>> AVISO ENVIO DE EMAIL (SMTP):", emailErr);
        }
      })();
    }

    return NextResponse.json({ success: true, message: "Lead processado com sucesso!", data: dbData }, { status: 200 });
  } catch (error: any) {
    console.error(">>> ERRO GERAL API:", error);
    return NextResponse.json({ error: error?.message || "Erro interno." }, { status: 500 });
  }
}
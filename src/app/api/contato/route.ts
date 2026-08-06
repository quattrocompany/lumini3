import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { nome, email, telefone, mensagem, captcha, via } = await request.json();

    // 1. Validar reCAPTCHA
    if (captcha && process.env.RECAPTCHA_SECRET_KEY) {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
      const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
      const recaptchaJson = await recaptchaRes.json();

      if (!recaptchaJson.success) {
        return NextResponse.json({ error: "Falha na verificação do reCAPTCHA." }, { status: 400 });
      }
    }

    // 2. Salvar Lead no Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error: dbError } = await supabase.from("leads").insert([
        {
          nome,
          email,
          telefone,
          mensagem: mensagem || "Contato via site",
          origem: via === "whatsapp" ? "WhatsApp Modal" : "Formulário de Contato",
        },
      ]);

      if (dbError) {
        console.error("Erro ao salvar no Supabase:", dbError);
      }
    }

    // 3. Configurar e Enviar E-mail (Nodemailer)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"Site Lumini 3" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: email,
        subject: `Novo Lead - Lumini 3: ${nome}`,
        html: `
          <h2>Novo contato recebido pelo site Lumini 3</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${telefone}</p>
          <p><strong>Origem:</strong> ${via === "whatsapp" ? "Atendimento WhatsApp" : "Formulário de Contato"}</p>
          <br/>
          <p><strong>Mensagem:</strong></p>
          <p>${(mensagem || "").replace(/\n/g, '<br/>')}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ success: true, message: "Lead recebido com sucesso!" }, { status: 200 });

  } catch (error) {
    console.error("Erro no processamento:", error);
    return NextResponse.json({ error: "Erro interno ao processar o envio." }, { status: 500 });
  }
}
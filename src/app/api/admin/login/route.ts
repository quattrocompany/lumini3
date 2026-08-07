import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = body.username?.toString().trim();
    const password = body.password?.toString().trim();

    if (username === "vendrix" && password === "GAuys87H98*71ts") {
      const cookieStore = await cookies();
      
      // Configuração de cookie compatível com HTTP local e HTTPS de produção
      cookieStore.set("admin_session", "autenticado", {
        path: "/",
        httpOnly: true,
        secure: process.env.VERCEL_ENV === "production", // Ativa secure apenas quando publicado na Vercel
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Usuário ou senha incorretos." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Erro no endpoint de login:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno no servidor de login." },
      { status: 500 }
    );
  }
}
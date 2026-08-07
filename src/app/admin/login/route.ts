import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // .trim() remove espaços acidentais no início ou fim
    const username = body.username?.trim();
    const password = body.password?.trim();

    // Credenciais exclusivas da agência
    if (username === "vendrix" && password === "GAuys87H98*71ts") {
      const cookieStore = await cookies();
      
      cookieStore.set("admin_session", "autenticado_lumini", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 dias logado
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Usuário ou senha incorretos." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Erro no servidor ao realizar login:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao processar login no servidor." },
      { status: 500 }
    );
  }
}
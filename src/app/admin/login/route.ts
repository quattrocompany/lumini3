import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Credenciais exclusivas da agência para Lumini 3
    if (username === "vendrix" && password === "GAuys87H98*71ts") {
      cookies().set("admin_session", "autenticado_lumini", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Usuário ou senha incorretos." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
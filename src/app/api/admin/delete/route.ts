import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL necessária." }, { status: 400 });
    }

    await del(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar:", error);
    return NextResponse.json({ error: "Erro ao deletar arquivo." }, { status: 500 });
  }
}
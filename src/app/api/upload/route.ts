import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const categoria = formData.get("categoria") as string;
    const dataUpload = formData.get("dataUpload") as string;

    if (!file || !categoria || !dataUpload) {
      return NextResponse.json(
        { error: "Arquivo ou informações pendentes." },
        { status: 400 }
      );
    }

    // Salva o arquivo no Vercel Blob com a estrutura de pasta: kit/DATA/CATEGORIA/NOME
    const pathname = `kit/${dataUpload}/${categoria}/${file.name}`;
    
    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Erro no servidor de upload:", error);
    return NextResponse.json(
      { error: "Erro ao processar o upload no Vercel Blob." },
      { status: 500 }
    );
  }
}
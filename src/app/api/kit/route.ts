import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Busca todos os arquivos que começam com "kit/"
    const { blobs } = await list({ prefix: "kit/" });

    const items = blobs.map((blob) => {
      // O pathname é: kit/{dataUpload}/{categoria}/{filename}
      const parts = blob.pathname.split("/");
      const dataUpload = parts[1] || "";
      const categoria = parts[2] || "imagem_avulsa";
      const nome = parts[3] || blob.pathname;

      return {
        id: blob.url,
        url: blob.url,
        nome: nome,
        categoria: categoria,
        dataUpload: dataUpload,
        tamanho: `${(blob.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedAt: blob.uploadedAt,
      };
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Erro ao listar do Blob:", error);
    return NextResponse.json({ items: [] });
  }
}
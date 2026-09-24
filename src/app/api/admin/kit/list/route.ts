import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getAdminBucket } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const EMPREENDIMENTO_ID = "lumini-3";

interface ItemKit {
  id: string;
  nome: string;
  categoria: string;
  url: string;
  tamanho: string;
  dataUpload: string;
  fullPath: string;
}

function categoriaDoArquivo(nome: string, path: string[]): string {
  const ext = nome.split(".").pop()?.toLowerCase() || "";
  const pastaCategoria = path.length >= 3 ? path[2] : "";
  if (pastaCategoria && pastaCategoria !== "undefined") return pastaCategoria;

  if (ext === "zip" || ext === "rar") return "pacote_zip";
  if (ext === "pdf") return nome.toLowerCase().includes("tabela") ? "tabela_precos" : "lamina_pdf";
  if (["mp4", "mov"].includes(ext)) return "video";
  return "imagem_avulsa";
}

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const bucket = getAdminBucket();
    const [files] = await bucket.getFiles({ prefix: `${EMPREENDIMENTO_ID}/` });

    const itens: ItemKit[] = await Promise.all(
      files
        .filter((f) => !f.name.endsWith("/"))
        .map(async (file) => {
          const [url] = await file.getSignedUrl({
            action: "read",
            expires: Date.now() + 60 * 60 * 1000, // 1 hora
          });

          const parts = file.name.split("/");
          const dataUpload = parts.length >= 2 ? parts[1] : "Data Desconhecida";

          return {
            id: file.name,
            nome: parts[parts.length - 1],
            categoria: categoriaDoArquivo(parts[parts.length - 1], parts),
            url,
            tamanho: "Ver no Servidor",
            dataUpload,
            fullPath: file.name,
          };
        })
    );

    return NextResponse.json({ items: itens });
  } catch (error: any) {
    console.error(">>> ERRO AO LISTAR KIT (ADMIN):", error);
    return NextResponse.json({ error: error?.message || "Erro ao buscar arquivos." }, { status: 500 });
  }
}

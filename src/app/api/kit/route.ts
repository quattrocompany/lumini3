import { NextResponse } from "next/server";
import { storage } from "@/lib/firebase";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const EMPREENDIMENTO_ID = "lumini-3";

export async function GET() {
  try {
    const rootRef = ref(storage, EMPREENDIMENTO_ID);

    const listRecursive = async (folderRef: any): Promise<any[]> => {
      const res = await listAll(folderRef);

      // 1. Processa subpastas em paralelo
      const subFolderPromises = res.prefixes.map((folder) => listRecursive(folder));
      const subFolderResults = await Promise.all(subFolderPromises);
      const subFiles = subFolderResults.flat();

      // 2. Processa URL e Metadados de TODOS os arquivos da pasta em PARALELO
      const itemPromises = res.items.map(async (itemRef) => {
        const [url, meta] = await Promise.all([
          getDownloadURL(itemRef),
          getMetadata(itemRef),
        ]);

        const sizeMB = (meta.size / (1024 * 1024)).toFixed(2) + " MB";
        const nameLower = itemRef.name.toLowerCase();
        const ext = nameLower.split(".").pop() || "";
        let categoria = meta.customMetadata?.categoria;

        if (!categoria) {
          if (ext === "zip" || ext === "rar") categoria = "pacote_zip";
          else if (ext === "pdf") categoria = "lamina_pdf";
          else if (["mp4", "mov"].includes(ext)) categoria = "video";
          else if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) {
            if (nameLower.includes("story")) categoria = "imagem_story";
            else if (nameLower.includes("feed")) categoria = "imagem_feed";
            else categoria = "imagem_avulsa";
          } else {
            categoria = "imagem_avulsa";
          }
        }

        return {
          id: itemRef.fullPath,
          nome: itemRef.name,
          categoria: categoria,
          url: url,
          tamanho: sizeMB,
          dataUpload: meta.customMetadata?.dataUpload || meta.timeCreated.split("T")[0],
        };
      });

      const currentFiles = await Promise.all(itemPromises);

      return [...subFiles, ...currentFiles];
    };

    const items = await listRecursive(rootRef);

    return NextResponse.json(
      { items },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error: any) {
    console.error(">>> ERRO AO LISTAR KIT LUMINI 3:", error);
    return NextResponse.json(
      { error: error?.message || "Erro ao buscar arquivos." },
      { status: 500 }
    );
  }
}
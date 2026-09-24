import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdminAuthenticatedFromRequest } from "@/lib/adminAuth";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!isAdminAuthenticatedFromRequest(request)) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const body = (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "application/pdf",
            "application/zip",
            "application/x-zip-compressed",
            "application/x-rar-compressed",
            "video/mp4",
            "video/quicktime",
          ],
          addRandomSuffix: false,
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Upload do Vercel Blob concluído:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error("Erro na API de upload:", error);
    return NextResponse.json(
      { error: error?.message || "Erro interno no servidor de upload." },
      { status: 400 }
    );
  }
}
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import UploadInterface from "./UploadInterface";

export default async function AdminKitPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session?.value) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <div className="w-full relative z-10 pt-16 sm:pt-20 bg-[#450870] pb-8 flex items-center justify-center shadow-md">
          <div className="relative w-64 sm:w-80 md:w-96 h-24 sm:h-32">
            <Image
              src="/img/logowhite.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto px-6 py-12 w-full">
          <div className="flex justify-between items-end mb-8 border-b pb-4">
            <div>
              <h1 className="text-3xl font-black text-[#1E293B]">Gestão do Kit Corretor</h1>
              <p className="text-gray-500 text-sm">Faça upload em lote dos materiais para a página pública.</p>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
              Agência Logada
            </span>
          </div>
          
          <UploadInterface />
        </div>
      </div>

      <div className="w-full bg-[#2b1238] pt-12 md:pt-16 text-white mt-16 md:mt-24">
        <div className="w-full bg-[#353535] py-8 px-6 text-center text-white">
          <p className="text-xs sm:text-sm font-medium tracking-wide text-white/95">
            © 2026 | Termos de Uso e Política de Privacidade
          </p>
        </div>
      </div>
    </main>
  );
}
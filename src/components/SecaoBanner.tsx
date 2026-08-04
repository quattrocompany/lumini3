"use client";
import Image from "next/image";

export default function SecaoBanner() {
  return (
    <section 
      id="home"
      className="relative flex flex-col items-center justify-start pt-32 md:pt-40 pb-0 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/img/fundo01.png')" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center z-10 relative" id="produto">
        <div className="mb-2 w-full">
          <h2 className="text-[#FFBA00] font-black text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-wider mb-1 drop-shadow-md">
            EMPREENDIMENTO EM CARAPICUÍBA
          </h2>
          <h3 className="text-white font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide drop-shadow-md">
            7 MIN. DO PARQUE SHOPPING BARUERI
          </h3>
        </div>
      </div>

      <div className="w-full relative z-10 flex flex-col items-center justify-end mt-6 md:mt-10 px-0 md:px-6">
        {/* Imagem Desktop */}
        <div className="hidden md:flex w-full max-w-[1920px] justify-center items-end">
          <Image 
            src="/img/Banner_Principal_Dogs.png" 
            alt="Lumini 3 - A família cresceu! Agora com 3 Dorms." 
            width={1920} 
            height={1080} 
            quality={100}
            className="w-full h-auto object-contain block"
            priority
          />
        </div>

        {/* Imagem Mobile */}
        <div className="flex flex-col md:hidden w-full items-center justify-center">
          <Image 
            src="/img/01mobile.jpg" 
            alt="Lumini 3 - A família cresceu! Agora com 3 Dorms." 
            width={1000} 
            height={986} 
            quality={100}
            className="w-full h-auto object-contain block"
            priority
          />
        </div>
      </div>
    </section>
  );
}
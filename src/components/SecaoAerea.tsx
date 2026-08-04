"use client";
import Image from "next/image";

export default function SecaoAerea() {
  return (
    <section 
      id="mapa" 
      className="relative z-0 bg-white pt-24 sm:pt-32 md:pt-40 pb-0 -mt-16 sm:-mt-24 md:-mt-[5rem]"
    >
      <div className="max-w-[1440px] mx-auto px-0 md:px-12 flex flex-col items-center">
        
        {/* Valor Mobile - Centralizado, visível apenas no mobile (desktop já possui no banner) */}
        <div className="w-full md:hidden flex justify-center mb-6 px-4 relative z-20 pt-1 pb-4">
          <Image 
            src="/img/valor-1.png" 
            alt="Valor Especial" 
            width={600} 
            height={183} 
            quality={100}
            className="w-full max-w-[520px] h-auto object-contain block drop-shadow-md"
          />
        </div>

        <div className="w-full relative rounded-none md:rounded-[2.5rem] overflow-hidden shadow-xl z-10 bg-white">
          {/* Desktop */}
          <Image 
            src="/img/aerea-desktop.jpg" 
            alt="Vista Aérea da Região do Empreendimento Lumini 3 em Carapicuíba" 
            width={1440} 
            height={810} 
            quality={100}
            className="hidden md:block w-full h-auto object-cover"
            priority
          />
          {/* Mobile */}
          <Image 
            src="/img/aerea-mobile.jpg" 
            alt="Vista Aérea da Região Mobile" 
            width={1000} 
            height={648} 
            quality={100}
            className="block md:hidden w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
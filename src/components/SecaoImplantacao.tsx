"use client";

import Image from "next/image";

// Coluna 1: Itens 1 ao 12 divididos em blocos visuais conforme o layout
const col1Grupo1 = [
  { num: 1, text: "Embarque e desembarque de passageiros" },
  { num: 2, text: "Acesso de pedestres" },
  { num: 3, text: "Acesso de veículos" },
  { num: 4, text: "Portaria central c/ WC" },
  { num: 5, text: "Central delivery" },
  { num: 6, text: "Mini-mercado" },
  { num: 7, text: "Lobby" },
  { num: 8, text: "WCs" },
  { num: 9, text: "Salão de jogos" },
  { num: 10, text: "Brinquedoteca" },
];

const col1Grupo2 = [
  { num: 11, text: "Elevadores" },
  { num: 12, text: "Coworking" },
];

// Coluna 2: Itens 13 ao 33 divididos nos 3 blocos do layout
const col2Grupo1 = [
  { num: 13, text: "Espaço beleza" },
  { num: 14, text: "Salão de festas infantil" },
  { num: 15, text: "Praça de leitura" },
  { num: 16, text: "Praça das Boas Vindas" },
  { num: 17, text: "Quadra de beach vôlei" },
  { num: 18, text: "Crossfit" },
  { num: 19, text: "Fitness" },
  { num: 20, text: "Espaço grill (Churrasqueira e forno a lenha)" },
  { num: 21, text: "Piscina infantil" },
  { num: 22, text: "Piscina adulto com raia" },
  { num: 23, text: "Deck molhado" },
  { num: 24, text: "Solário" },
];

const col2Grupo2 = [
  { num: 25, text: "Salão de festas adulto" },
  { num: 26, text: "Playground" },
  { num: 27, text: "Quadra esportiva" },
  { num: 28, text: "Clube da bola (Churrasqueira e forno a lenha)" },
  { num: 29, text: "Play baby" },
  { num: 30, text: "Pet place e agility" },
];

const col2Grupo3 = [
  { num: 31, text: "Jardins" },
  { num: 32, text: "Área verde" },
  { num: 33, text: "Área técnica" },
];

const allItems = [
  ...col1Grupo1, ...col1Grupo2,
  ...col2Grupo1, ...col2Grupo2, ...col2Grupo3
];

const desktopCol1 = allItems.slice(0, 12);
const desktopCol2 = allItems.slice(12, 33);

export default function SecaoImplantacao() {
  return (
    <section id="implantacao" className="bg-white relative overflow-hidden py-10 lg:py-0">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          
          {/* Desktop Map */}
          <div className="lg:col-span-7 relative w-full items-center justify-center lg:justify-start lg:-mt-24 lg:-mb-24 z-10 hidden lg:flex">
            <a 
              href="/img/implantacao.jpg" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full block cursor-zoom-in"
              aria-label="Ampliar Implantação"
            >
              <Image
                src="/img/implantacao.jpg"
                alt="Planta de Implantação Geral do Empreendimento Lumini 3"
                width={1500}
                height={1300}
                quality={100}
                className="w-full lg:w-[125%] max-w-none h-auto object-contain object-left-bottom block shadow-sm lg:shadow-none rounded-2xl lg:rounded-none"
                priority
              />
            </a>
          </div>

          {/* Mobile Map */}
          <div className="lg:hidden w-full flex justify-center mt-4 mb-4 z-10">
            <a 
              href="/img/implantacao-mobile.jpg" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full block cursor-zoom-in"
              aria-label="Ampliar Implantação"
            >
              <Image
                src="/img/implantacao-mobile.jpg"
                alt="Planta de Implantação Geral do Empreendimento Lumini 3 Mobile"
                width={1000}
                height={1167}
                quality={100}
                className="w-full max-w-[500px] h-auto object-contain block shadow-none rounded-2xl border-0 border-gray-100"
                priority
              />
            </a>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center py-2 lg:py-16 z-20">
            
            {/* Title */}
            <div className="text-center mb-10 lg:mb-10 w-full px-2">
              <h2 className="text-[1.4rem] sm:text-4xl lg:text-[2.6rem] uppercase tracking-tight leading-snug lg:leading-tight">
                <span className="font-regular text-[#FFBA00] block mb-1">
                  UMA VIDA COMPLETA,<br className="lg:hidden"/> DIVERTIDA E FELIZ
                </span>
                <span className="font-bold text-[#4A137B] block mt-1 lg:mt-0">
                  ESPERA POR VOCÊ<br className="lg:hidden"/> E SUA FAMÍLIA.
                </span>
              </h2>
            </div>

            {/* Grid DESKTOP de 2 Colunas */}
            <div className="hidden sm:grid grid-cols-2 gap-x-6 text-[12px] lg:text-[13px] font-semibold text-[#4A137B]">
              <div className="flex flex-col">
                <ul className="space-y-0.5">
                  {desktopCol1.map((item) => (
                    <li key={item.num} className="flex items-start leading-snug">
                      <span className="font-bold text-[#FFBA00] mr-1.5 shrink-0">
                        {item.num} <span className="text-[#FFBA00]">&middot;</span>
                      </span>
                      <span className="text-[#4A137B]">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <ul className="space-y-0.5">
                  {desktopCol2.map((item) => (
                    <li key={item.num} className="flex items-start leading-snug">
                      <span className="font-bold text-[#FFBA00] mr-1.5 shrink-0">
                        {item.num} <span className="text-[#FFBA00]">&middot;</span>
                      </span>
                      <span className="text-[#4A137B]">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lista MOBILE de 1 Coluna */}
            <div className="flex sm:hidden flex-col text-[12px] font-semibold text-[#4A137B] px-4">
              <ul className="space-y-2">
                {allItems.map((item) => (
                  <li key={item.num} className="flex items-start leading-tight">
                    <span className="font-bold text-[#FFBA00] mr-2 shrink-0 w-4 text-right">
                      {item.num}
                    </span>
                    <span className="font-bold text-[#FFBA00] mr-2 shrink-0">&middot;</span>
                    <span className="text-[#4A137B] flex-1">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
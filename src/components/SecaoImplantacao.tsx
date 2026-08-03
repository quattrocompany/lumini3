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

export default function SecaoImplantacao() {
  return (
    <section id="implantacao" className="bg-white relative overflow-hidden py-0">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* ================= GRID PRINCIPAL ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          
          {/* COLUNA ESQUERDA: IMPLANTAÇÃO AMPLIADA (TOPO À BASE DA SEÇÃO) */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-start -mt-12 sm:-mt-16 lg:-mt-24 -mb-12 sm:-mb-16 lg:-mb-24 z-10 pointer-events-none">
            <Image
              src="/img/implantacao.jpg"
              alt="Planta de Implantação Geral do Empreendimento Lumini 3"
              width={1500}
              height={1300}
              quality={100}
              className="w-full lg:w-[125%] max-w-none h-auto object-contain object-left-bottom block"
              priority
            />
          </div>

          {/* COLUNA DIREITA: TÍTULO E LEGENDA NUMÉRICA DIAGRAMADA */}
          <div className="lg:col-span-5 flex flex-col justify-center py-12 lg:py-16 z-20">
            
            {/* Título Alinhado à Esquerda da Legenda */}
            <div className="text-left mb-8 lg:mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] uppercase tracking-tight leading-tight">
                <span className="font-regular text-[#FFBA00] block mb-1">
                  UMA VIDA COMPLETA, DIVERTIDA E FELIZ
                </span>
                <span className="font-bold text-[#4A137B] block">
                  ESPERA POR VOCÊ E SUA FAMÍLIA.
                </span>
              </h2>
            </div>

            {/* Grid de 2 Colunas de Legenda com Agrupamento e Espaçamentos Féis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 text-[12px] lg:text-[13px] font-semibold text-[#4A137B]">
              
              {/* SUB-COLUNA 1 (Itens 1 ao 12) */}
              <div className="flex flex-col">
                <ul className="space-y-1.5">
                  {col1Grupo1.map((item) => (
                    <li key={item.num} className="flex items-start leading-snug">
                      <span className="font-bold text-[#FFBA00] mr-1.5 shrink-0">
                        {item.num} <span className="text-[#FFBA00]">&middot;</span>
                      </span>
                      <span className="text-[#4A137B]">{item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Espaçamento visual para o grupo 11-12 */}
                <ul className="space-y-1.5 mt-4">
                  {col1Grupo2.map((item) => (
                    <li key={item.num} className="flex items-start leading-snug">
                      <span className="font-bold text-[#FFBA00] mr-1.5 shrink-0">
                        {item.num} <span className="text-[#FFBA00]">&middot;</span>
                      </span>
                      <span className="text-[#4A137B]">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SUB-COLUNA 2 (Itens 13 ao 33) */}
              <div className="flex flex-col mt-4 sm:mt-0">
                <ul className="space-y-1.5">
                  {col2Grupo1.map((item) => (
                    <li key={item.num} className="flex items-start leading-snug">
                      <span className="font-bold text-[#FFBA00] mr-1.5 shrink-0">
                        {item.num} <span className="text-[#FFBA00]">&middot;</span>
                      </span>
                      <span className="text-[#4A137B]">{item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Espaçamento visual para o grupo 25-30 */}
                <ul className="space-y-1.5 mt-4">
                  {col2Grupo2.map((item) => (
                    <li key={item.num} className="flex items-start leading-snug">
                      <span className="font-bold text-[#FFBA00] mr-1.5 shrink-0">
                        {item.num} <span className="text-[#FFBA00]">&middot;</span>
                      </span>
                      <span className="text-[#4A137B]">{item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Espaçamento visual para o grupo 31-33 */}
                <ul className="space-y-0 mt-01">
                  {col2Grupo3.map((item) => (
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

          </div>

        </div>
      </div>
    </section>
  );
}
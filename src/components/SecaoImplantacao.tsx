"use client";

import Image from "next/image";

// Coluna 1: Itens 1 ao 12
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

// Coluna 2: Itens 13 ao 33
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

export default function SecaoImplantacao() {
  return (
    <section 
      id="implantacao" 
      className="w-full max-w-[1440px] mx-auto bg-white overflow-hidden flex flex-row items-stretch"
      style={{ 
        // Proporção mais larga para acomodar a imagem inteira horizontalmente
        aspectRatio: '16 / 10', 
        // Fonte levemente ajustada para a nova largura da coluna da direita
        fontSize: 'min(0.72vw, 10.4px)' 
      }} 
    >
      
      {/* Container do Mapa (Esquerda) - Largura aumentada para 64% */}
      <div className="w-[64%] relative h-full flex items-center justify-start pl-[2em]">
        <a 
          href="/img/implantacao-desktop.jpg" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="relative w-full h-full block cursor-zoom-in"
          aria-label="Ampliar Implantação"
        >
          <Image
            src="/img/implantacao-desktop.jpg"
            alt="Planta de Implantação Geral do Empreendimento Lumini 3"
            fill
            quality={100}
            // Continua object-cover colando no topo e base, mas com espaço horizontal de sobra agora
            className="object-cover object-left"
            priority
          />
        </a>
      </div>

      {/* Container do Texto e Lista (Direita) - Largura ajustada para 36% */}
      <div className="w-[41%] flex flex-col justify-center py-[1.5em] pr-[10em] pl-[0.1em]">
        
        <div className="w-full max-w-[46em] ml-auto">
          
          {/* Título */}
          <div className="text-left mb-[1.0em] w-full">
            <h2 className="tracking-tight">
              <span className="font-medium text-[#FFBA00] block text-[2.3em] leading-[1.5]">
                Uma vida completa, divertida e feliz
              </span>
              <span className="font-bold text-[#4A137B] tracking-tight block text-[2.9em] leading-[1.0]">
                espera por você e sua família.
              </span>
            </h2>
          </div>
<br />
          {/* Lista Compacta */}
          <div className="text-[1.2em] font-medium text-[#4A137B] pl-[5em]">
            <ul className="flex flex-col">
              {allItems.map((item) => (
                <li key={item.num} className="flex items-start mb-[0.3em]">
                  <span className="w-[1.6em] text-right shrink-0 block">
                    {item.num}
                  </span>
                  <span className="mx-[0.4em] shrink-0 block opacity-80">
                    •
                  </span>
                  <span className="flex-1 block leading-[1.15]">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
        
      </div>
    </section>
  );
}
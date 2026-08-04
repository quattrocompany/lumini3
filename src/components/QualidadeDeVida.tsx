"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Lista de imagens do carrossel
const carouselImages = [
  "/img/01.jpg",
  "/img/02.jpg"
];

// Grade de Diferenciais
const diferenciais = [
  { icon: "/img/Portaria central.png", title: "Portaria central com WC" },
  { icon: "/img/Acesso de pedestres.png", title: "Acesso de pedestres com eclusa" },
  { icon: "/img/Sistema de monitoramento.png", title: "Sistema de monitoramento interno (CFTV)" },
  { icon: "/img/Sensores de presença.png", title: "Sensores de presença nas áreas comuns com iluminação em LED" },
  { icon: "/img/Portões automatizados.png", title: "Portões automatizados" },
  { icon: "/img/Condomínio fechado.png", title: "Condomínio fechado" }
];

export default function SecaoQualidadeDeVida() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Navegação para o próximo slide isolada via useCallback
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  // Temporizador de Auto-rotação
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Rotação a cada 4 segundos

    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section id="lazer" className="py-16 md:py-24 bg-[#4A137B] text-white relative overflow-hidden">
      
      {/* ================= ELEMENTO DECORATIVO DE FUNDO (PÉTALAS/ONDAS) ================= */}
      <div className="absolute bottom-0 left-0 z-0 pointer-events-none w-[65%] sm:w-[50%] md:w-[45%] lg:w-[40%] max-w-[650px]">
        <Image 
          src="/img/petalas.png" 
          alt="Grafismo decorativo de ondas" 
          width={800} 
          height={800} 
          className="w-full h-auto object-left-bottom opacity-100"
          priority
        />
      </div>

      {/* Container Principal com Z-Index para sobrepor o fundo decorativo */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10" id="plantas">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* ================= COLUNA DO CARROSSEL ANIMADO ================= */}
          <div 
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            aria-live="polite"
          >
            {/* Seta Esquerda */}
            <button 
              onClick={prevSlide}
              aria-label="Slide anterior"
              className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 z-30 p-2 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
            >
              <Image src="/img/seta-esquerda.png" alt="Anterior" width={24} height={40} className="w-5 sm:w-6 h-auto" />
            </button>

            {/* Container da Moldura Dourada com Cross-Fade das Imagens */}
            <div className="relative w-full max-w-[500px] aspect-[3/4] rounded-[2.3rem] border-[8px] lg:border-[4px] border-[#FFBA00] overflow-hidden shadow-2xl bg-[#370a60]">
              {carouselImages.map((src, index) => (
                <Image 
                  key={src}
                  src={src} 
                  alt={`Carrossel Qualidade de Vida - Imagem ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={index === 0}
                  className={`object-cover transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                />
              ))}

              {/* Indicador visual de Pausa quando o usuário passa o mouse */}
              {isPaused && (
                <span className="absolute top-4 right-4 bg-black/60 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm z-30 uppercase tracking-widest pointer-events-none transition-all">
                  Pausado
                </span>
              )}
            </div>

            {/* Seta Direita */}
            <button 
              onClick={nextSlide}
              aria-label="Próximo slide"
              className="absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 z-30 p-2 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
            >
              <Image src="/img/seta-direita.png" alt="Próximo" width={24} height={40} className="w-5 sm:w-6 h-auto" />
            </button>

            {/* Pontos de Navegação (Pagination Dots) */}
            <div className="flex items-center gap-2 mt-6 z-30">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Ir para a imagem ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "w-8 bg-[#FFBA00]" : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ================= COLUNA DE TEXTOS E ÍCONES ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-[#FFBA00] font-regular text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wide mb-1">
              QUALIDADE DE VIDA
            </h2>
            <h3 className="text-[#FFBA00] font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wide mb-6">
              EM UM PROJETO EXCLUSIVO.
            </h3>

            <p className="text-white text-lg sm:text-xl md:text-2xl font-normal leading-relaxed mb-10 max-w-2xl">
              Elaborado para ser único, com a certeza de proporcionar mais conforto, lazer e segurança para você e sua família.
            </p>

            {/* Grade de Diferenciais */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-6 pt-4">
              {diferenciais.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center gap-3 group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <Image 
                      src={item.icon} 
                      alt={item.title} 
                      width={72} 
                      height={72} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[#FFBA00] text-sm sm:text-base md:text-lg font-medium leading-snug max-w-[200px]">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
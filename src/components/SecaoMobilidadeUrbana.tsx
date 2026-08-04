"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface SlideItem {
  id: string;
  src: string;
  alt: string;
}

const infraImages: SlideItem[] = [
  { id: "infra-1", src: "/img/Rodovia-Castelo-Branco.jpg", alt: "Rodovia Castelo Branco" },
  { id: "infra-2", src: "/img/Estacao_CPTM-Antonio-Joao.jpg", alt: "Estação CPTM Antônio João" },
  { id: "infra-3", src: "/img/Estacao_CPTM-Antonio-Joao-2.jpg", alt: "Estação CPTM Antônio João 2" },
  { id: "infra-4", src: "/img/Assai-Atacadista.jpg", alt: "Assaí Atacadista" },
  { id: "infra-5", src: "/img/Parque-Shopping-Barueri.jpg", alt: "Parque Shopping Barueri" },
  { id: "infra-6", src: "/img/Cobal-Supermercados.jpg", alt: "Cobal Supermercados" },
  { id: "infra-7", src: "/img/Atacadao.jpg", alt: "Atacadão" },
  { id: "infra-8", src: "/img/Terminal-Rodoviario-Carapicuiba.jpg", alt: "Terminal Rodoviário Carapicuíba" },
  { id: "infra-9", src: "/img/Tenda-Atacado.jpg", alt: "Tenda Atacado" },
];

export default function SecaoMobilidadeUrbana() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 2 >= infraImages.length ? 0 : prev + 2));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleOpenWhatsappModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWhatsappModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dispara evento customizado para o GTM capturar a conversão de clique/lead
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ 
        event: "clique_whatsapp",
        lead_data: formData 
      });
    }

    // Abre a API do WhatsApp em nova aba
    window.open("https://api.whatsapp.com/send?phone=551141644000", "_blank");
    setIsWhatsappModalOpen(false);
    setFormData({ name: '', email: '', whatsapp: '' });
  };

  return (
    <section id="localizacao" className="relative w-full overflow-hidden bg-white">
      {/* Fundo que cobre até o meio do mapa */}
      <div 
        className="absolute top-0 left-0 w-full h-[80%] md:h-[85%] bg-cover bg-center bg-no-repeat z-0" 
        style={{ backgroundImage: "url('/img/fundo01.png')" }}
      />
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-12 pt-16 pb-12">
        
        {/* Título */}
        <div className="text-center mb-10">
          <h2 className="text-[#FFBA00] text-xl md:text-3xl lg:text-4xl font-normal uppercase drop-shadow-md">
            Mobilidade urbana e uma<br className="hidden md:block" />
            <span className="font-bold"> <br/>completa infraestrutura<br/>ao seu dispor.</span>
          </h2>
        </div>

        {/* Carrossel de 2 em 2 (Separado e Alinhado com o Mapa) */}
        <div className="w-full max-w-[1100px] mx-auto overflow-hidden mb-16">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${(currentIndex / 2) * 100}%)` }}
          >
            {Array.from({ length: Math.ceil(infraImages.length / 2) }).map((_, groupIndex) => (
              <div key={groupIndex} className="min-w-full flex gap-4 md:gap-6 shrink-0">
                
                {/* Imagem Esquerda */}
                {infraImages[groupIndex * 2] && (
                  <div className="w-1/2 relative aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-white">
                    <Image
                      src={infraImages[groupIndex * 2].src}
                      alt={infraImages[groupIndex * 2].alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                {/* Imagem Direita (Transparente caso seja ímpar para não desconfigurar layout) */}
                {infraImages[groupIndex * 2 + 1] ? (
                  <div className="w-1/2 relative aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-white">
                    <Image
                      src={infraImages[groupIndex * 2 + 1].src}
                      alt={infraImages[groupIndex * 2 + 1].alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-1/2 relative bg-transparent"></div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* Visite Decorados e Endereço */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
          <div className="text-center md:text-right">
            <h3 className="text-[#FFBA00] text-4xl md:text-6xl font-bold uppercase leading-none drop-shadow-md">
              VISITE OS<br />DECORADOS
            </h3>
          </div>
          <div className="text-white text-center md:text-left drop-shadow-md">
            <p className="text-sm md:text-base uppercase tracking-widest mb-1">
              CENTRAL DE VENDAS:
            </p>
            <p className="text-2xl md:text-3xl font-bold uppercase mb-1">
              AV. VICTÓRIO FORNAZZARO, 100
            </p>
            <p className="text-sm md:text-base uppercase tracking-widest">
              VILA SUL AMERICANA/ CARAPICUÍBA - SP
            </p>
          </div>
        </div>

        {/* Mapa Container */}
        <div className="relative w-full max-w-[1100px] mx-auto h-[300px] md:h-[450px] shadow-2xl rounded-xl border-4 border-white overflow-hidden bg-gray-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.218520379201!2d-46.8398492!3d-23.5246227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf001460596ba7%3A0x86fdf40c4974f820!2sAv.%20Vict%C3%B3rio%20Fornazzaro%2C%20100%20-%20Vila%20Sul%20Americana%2C%20Carapicu%C3%ADba%20-%20SP%2C%2006397-000!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização do Empreendimento"
          />
          
          {/* Botões Sobrepostos no Mapa */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-[90%] sm:w-auto">
            <a 
              href="https://waze.com/ul?ll=-23.5246227,-46.8398492&navigate=yes" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#8C9EFF] hover:bg-[#7388f7] text-white text-sm font-semibold py-2.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 w-full sm:w-auto"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 512 512">
                <path d="M504.6 288.9c-2-8.3-9.5-13.9-18.1-13.9h-42.3c-1.7-19.4-7.2-37.9-15.8-55-11.4-22.5-27.7-42-47.5-56.7l13.6-13.6c5.9-5.9 7.1-15.1 3-22.3-10.7-18.9-24.1-35.9-39.7-50.6-5.9-5.6-14.8-6.1-21.3-1.4l-14 10.3c-19.1-10.9-40.4-18.1-62.8-21.1V24.5c0-8.8-7.2-16-16-16h-42.4c-8.8 0-16 7.2-16 16v39.7C162.7 67.2 141.4 74.4 122.3 85.3l-14-10.3c-6.5-4.8-15.4-4.2-21.3 1.4-15.6 14.8-29 31.7-39.7 50.6-4.1 7.2-2.9 16.4 3 22.3l13.6 13.6C44.1 177.5 27.8 197.1 16.5 219.5c-8.6 17.1-14.1 35.6-15.8 55H-15.3C-23.9 275-31.4 280.6-33.4 288.9c-2 8.3 1.8 16.9 9.3 20.8l47 24.3C40 376.6 70.8 412.3 109 434c44 25.1 94 38 147 38 53 0 103-12.9 147-38 38.2-21.7 69-57.4 86.2-100l47-24.3c7.4-3.9 11.2-12.5 9.2-20.8z"/>
              </svg>
              Veja pelo Waze
            </a>
            <a 
              href="https://goo.gl/maps/x8Q8Q8Q8Q8Q8Q8Q8" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold py-2.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg border border-gray-200 transition-transform hover:scale-105 w-full sm:w-auto"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Ver mapa ampliado
            </a>
          </div>
        </div>

        {/* WhatsApp Footer Button */}
        <div className="mt-12 text-center flex items-center justify-center gap-3">
          <button 
            onClick={handleOpenWhatsappModal}
            className="flex items-center justify-center gap-3 hover:scale-105 transition-transform cursor-pointer focus:outline-none"
          >
            <svg className="w-10 h-10 md:w-14 md:h-14 text-[#7629BB]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.931.547 3.743 1.516 5.334L2 22l4.781-1.469a10.02 10.02 0 005.25 1.485c5.535 0 10.031-4.496 10.031-10.031S17.566 2 12.031 2zm0 18.375c-1.634 0-3.188-.415-4.571-1.2l-.328-.188-3.398 1.047 1.062-3.328-.219-.344a8.381 8.381 0 01-1.328-4.516c0-4.634 3.772-8.406 8.406-8.406 4.635 0 8.407 3.772 8.407 8.406s-3.772 8.406-8.407 8.406zm4.61-6.313c-.25-.125-1.484-.734-1.719-.812-.234-.078-.406-.125-.578.125-.172.25-.656.812-.812.984-.156.172-.312.188-.562.063-.25-.125-1.059-.39-2.019-1.246-.747-.669-1.254-1.494-1.406-1.744-.153-.25-.016-.385.109-.509.112-.112.25-.297.375-.447.125-.15.172-.25.25-.422.078-.172.039-.328-.023-.453-.063-.125-.578-1.391-.797-1.906-.211-.502-.422-.434-.578-.442l-.485-.008c-.172 0-.453.063-.688.313-.234.25-.891.875-.891 2.125s.914 2.453 1.047 2.625c.125.172 1.781 2.719 4.313 3.813.601.258 1.07.412 1.437.528.604.192 1.156.164 1.593.1.487-.072 1.484-.606 1.688-1.194.203-.588.203-1.094.14-1.194-.062-.1-.234-.156-.484-.281z"/>
            </svg>
            <span className="text-[#7629BB] text-5xl md:text-7xl font-bold tracking-tight hover:underline">
              4164.4000
            </span>
          </button>
        </div>
      </div>

      {/* Modal de Cadastro WhatsApp */}
      {isWhatsappModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 md:p-10 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setIsWhatsappModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#7629BB] transition-colors focus:outline-none"
              aria-label="Fechar Modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-[#4A137B] uppercase tracking-wide">
                Atendimento
                <br />
                WhatsApp
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Preencha seus dados para iniciarmos o atendimento.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nome *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7629BB]/50 transition-all text-gray-800 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
                <input 
                  type="email" 
                  required
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7629BB]/50 transition-all text-gray-800 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="Seu whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7629BB]/50 transition-all text-gray-800 placeholder-gray-400"
                />
              </div>

              <p className="text-[11px] text-gray-400 italic pt-2">
                * Dados obrigatórios
              </p>

              <div className="pt-4 flex flex-col gap-3">
                <button 
                  type="submit" 
                  className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-3.5 px-6 rounded-full transition-colors uppercase tracking-wider text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.931.547 3.743 1.516 5.334L2 22l4.781-1.469a10.02 10.02 0 005.25 1.485c5.535 0 10.031-4.496 10.031-10.031S17.566 2 12.031 2zm0 18.375c-1.634 0-3.188-.415-4.571-1.2l-.328-.188-3.398 1.047 1.062-3.328-.219-.344a8.381 8.381 0 01-1.328-4.516c0-4.634 3.772-8.406 8.406-8.406 4.635 0 8.407 3.772 8.407 8.406s-3.772 8.406-8.407 8.406zm4.61-6.313c-.25-.125-1.484-.734-1.719-.812-.234-.078-.406-.125-.578.125-.172.25-.656.812-.812.984-.156.172-.312.188-.562.063-.25-.125-1.059-.39-2.019-1.246-.747-.669-1.254-1.494-1.406-1.744-.153-.25-.016-.385.109-.509.112-.112.25-.297.375-.447.125-.15.172-.25.25-.422.078-.172.039-.328-.023-.453-.063-.125-.578-1.391-.797-1.906-.211-.502-.422-.434-.578-.442l-.485-.008c-.172 0-.453.063-.688.313-.234.25-.891.875-.891 2.125s.914 2.453 1.047 2.625c.125.172 1.781 2.719 4.313 3.813.601.258 1.07.412 1.437.528.604.192 1.156.164 1.593.1.487-.072 1.484-.606 1.688-1.194.203-.588.203-1.094.14-1.194-.062-.1-.234-.156-.484-.281z"/>
                  </svg>
                  Ir para WhatsApp
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsWhatsappModalOpen(false)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 px-6 rounded-full transition-colors uppercase tracking-wider text-sm shadow-md"
                >
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
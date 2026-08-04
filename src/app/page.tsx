"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

// Importação dos Componentes Modulares
import SecaoBanner from "@/components/SecaoBanner";
import SecaoAerea from "@/components/SecaoAerea";
import SecaoContato from "@/components/SecaoContato";
import SecaoQualidadeDeVida from "@/components/QualidadeDeVida"; 
import SecaoSegurancaComodidade from "@/components/SecaoSegurancaComodidade";
import SecaoLazer from "@/components/SecaoLazer";
import SecaoImplantacao from "@/components/SecaoImplantacao";
import SecaoPlantas from "@/components/SecaoPlantas";
import SecaoMobilidadeUrbana from "@/components/SecaoMobilidadeUrbana";
import CookieBanner from "@/components/CookieBanner";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap"
});

export default function Home() {
  const [activeModal, setActiveModal] = useState<"privacidade" | "lgpd" | "whatsapp" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);
  
  // Estado para o formulário do WhatsApp
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      setShowStickyBar(window.scrollY > 500);

      const sections = ["home", "produto", "mapa", "contato", "lazer", "seguranca", "implantacao", "plantas", "localizacao", "realizacao"];
      const scrollPosition = window.scrollY + 220;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (modal: "privacidade" | "lgpd" | "whatsapp") => {
    setActiveModal(modal);
    if (typeof window !== "undefined") document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModal(null);
    if (typeof window !== "undefined") document.body.style.overflow = "auto";
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ 
        event: "clique_whatsapp",
        lead_data: formData 
      });
    }

    window.open("https://api.whatsapp.com/send?phone=551141644000", "_blank");
    closeModal();
    setFormData({ name: '', email: '', whatsapp: '' });
  };

  return (
    <main className={`min-h-screen text-[#333333] bg-white overflow-x-hidden ${montserrat.className}`}>
      
      {/* ================= HEADER FLUTUANTE ================= */}
      <header 
        className={`fixed left-0 right-0 w-full z-50 transition-all duration-500 ease-in-out pointer-events-none ${
          isScrolled ? "top-4 md:top-6" : "top-8 md:top-12"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center relative pointer-events-auto">
          
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`absolute left-2 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-500 hover:scale-105 ${
              isScrolled ? "scale-90" : "scale-100"
            }`}
            aria-label="Voltar ao início"
          >
            <Image 
              src="/img/logo_lumini3_header.png" 
              alt="Logo Lumini 3" 
              width={160} 
              height={160} 
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-30 md:h-30 lg:w-32 lg:h-32 object-contain drop-shadow-xl"
              priority
            />
          </div>

          <div 
            className={`w-full rounded-full pill-header-shadow flex items-center justify-between pl-28 sm:pl-32 md:pl-40 pr-6 md:pr-10 border transition-all duration-500 ${
              isScrolled
                ? "h-11 md:h-14 bg-gradient-to-r from-white/85 via-white/95 to-white/85 backdrop-blur-md border-white/60 shadow-2xl"
                : "h-12 md:h-16 bg-white border-gray-100"
            }`}
          >
            <nav className="hidden md:flex items-center justify-end w-full gap-2 lg:gap-4 xl:gap-6 text-xs lg:text-sm">
              <a href="#home" className={`nav-menu-item transition-all ${activeSection === 'home' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>HOME</a>
              <span className="text-gray-300 select-none font-light">|</span>
              
              <a href="#produto" className={`nav-menu-item transition-all ${activeSection === 'produto' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>PRODUTO</a>
              <span className="text-gray-300 select-none font-light">|</span>
              
              <a href="#lazer" className={`nav-menu-item transition-all ${activeSection === 'lazer' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>LAZER</a>
              <span className="text-gray-300 select-none font-light">|</span>
              
              <a href="#plantas" className={`nav-menu-item transition-all ${activeSection === 'plantas' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>PLANTAS</a>
              <span className="text-gray-300 select-none font-light">|</span>
              
              <a href="#localizacao" className={`nav-menu-item transition-all ${activeSection === 'localizacao' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>LOCALIZAÇÃO</a>
              <span className="text-gray-300 select-none font-light">|</span>
              
              <a href="#realizacao" className={`nav-menu-item transition-all ${activeSection === 'realizacao' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>REALIZAÇÃO</a>
              <span className="text-gray-300 select-none font-light">|</span>
              
              <a href="#contato" className={`nav-menu-item transition-all ${activeSection === 'contato' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>CONTATO</a>
            </nav>

            <button 
              className="md:hidden ml-auto p-1 text-[#4A137B] focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir Menu de Navegação"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden max-w-[1440px] mx-auto mt-2 px-6 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-5 border border-gray-100 pointer-events-auto">
            <nav className="flex flex-col gap-2.5 text-center text-xs font-medium text-gray-800 uppercase tracking-wider">
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:font-black hover:text-[#FFBA00] border-b border-gray-100">HOME</a>
              <a href="#produto" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:font-black hover:text-[#FFBA00] border-b border-gray-100">PRODUTO</a>
              <a href="#lazer" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:font-black hover:text-[#FFBA00] border-b border-gray-100">LAZER</a>
              <a href="#plantas" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:font-black hover:text-[#FFBA00] border-b border-gray-100">PLANTAS</a>
              <a href="#localizacao" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:font-black hover:text-[#FFBA00] border-b border-gray-100">LOCALIZAÇÃO</a>
              <a href="#realizacao" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:font-black hover:text-[#FFBA00] border-b border-gray-100">REALIZAÇÃO</a>
              <a href="#contato" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:font-bold hover:text-[#FFBA00]">CONTATO</a>
            </nav>
          </div>
        )}
      </header>

      {/* ================= HERO SECTION ================= */}
      <SecaoBanner />

      {/* ================= SEÇÃO: MAPA DA REGIÃO ================= */}
      <SecaoAerea />

      {/* ================= SEÇÃO: FORMULÁRIO DE CADASTRO ================= */}
      <SecaoContato />

      {/* ================= FLUXO DAS SEÇÕES MODULARES ================= */}
      
      {/* 1. QUALIDADE DE VIDA */}
      <SecaoQualidadeDeVida />

      {/* 2. SEGURANÇA E COMODIDADE */}
      <SecaoSegurancaComodidade />

      {/* 3. LAZER E DIVERSÃO */}
      <SecaoLazer />

      {/* 4. IMPLANTAÇÃO (MAPA E LEGENDA 33 PONTOS) */}
      <SecaoImplantacao />

      {/* 5. PLANTAS INTELIGENTES */}
      <SecaoPlantas />

      {/* 6. MOBILIDADE URBANA */}
      <SecaoMobilidadeUrbana />

      {/* ============================================================= */}

      {/* ================= FOOTER ================= */}
      <footer id="realizacao" className="bg-white pt-12 pb-32 md:pb-40 relative z-10 w-full overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center">
          
          {/* Logos de Parcerias */}
          <div className="w-full border-t border-gray-200 border-b py-12 mb-8 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-stretch justify-items-center text-center min-h-[160px]">
              
              {/* 1. INCORPORAÇÃO */}
              <div className="flex flex-col items-center justify-start w-full">
                <span className="text-[7px] sm:text-[8px] text-gray-500 font-semibold uppercase tracking-widest h-6 flex items-start justify-center">
                  INCORPORAÇÃO:
                </span>
                <div className="flex-1 flex items-center justify-center w-full">
                  <div className="relative w-64 h-20 sm:w-72 sm:h-24">
                    <Image 
                      src="/img/logo-quattro-inc.png" 
                      alt="Quattro Inc" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                </div>
              </div>

              {/* 2. CONSTRUÇÃO */}
              <div className="flex flex-col items-center justify-start w-full">
                <span className="text-[7px] sm:text-[8px] text-gray-500 font-semibold uppercase tracking-widest h-6 flex items-start justify-center">
                  CONSTRUÇÃO:
                </span>
                <div className="flex-1 flex items-center justify-center w-full">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                    <Image 
                      src="/img/logo-quattro-construtora.png" 
                      alt="Quattro Construtora" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                </div>
              </div>

              {/* 3. INTERMEDIAÇÃO */}
              <div className="flex flex-col items-center justify-start w-full">
                <span className="text-[7px] sm:text-[8px] text-gray-500 font-semibold uppercase tracking-widest h-6 flex items-start justify-center">
                  INTERMEDIAÇÃO:
                </span>
                <div className="flex-1 flex items-center justify-center w-full">
                  <div className="relative w-56 h-20 sm:w-64 sm:h-24">
                    <Image 
                      src="/img/logo-direcoes.png" 
                      alt="Direções Imobiliária" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                </div>
              </div>

              {/* 4. FINANCIAMENTO */}
              <div className="flex flex-col items-center justify-start w-full">
                <span className="text-[7px] sm:text-[8px] text-gray-500 font-semibold uppercase tracking-widest h-6 flex items-start justify-center">
                  FINANCIAMENTO:
                </span>
                <div className="flex-1 flex items-center justify-center w-full">
                  <div className="relative w-56 h-16 sm:w-64 sm:h-20">
                    <Image 
                      src="/img/logo-caixa.png" 
                      alt="CAIXA" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Disclaimer Legal */}
          <div className="mb-8 w-full">
            <p className="text-[10px] sm:text-[11px] text-gray-500 text-justify leading-relaxed font-normal">
              R.I. no R.14, Matrícula N°23.286 no C.R.I. de Carapicuíba em 04/09/2025. *Valor referente a unidade N°4, pavimento térreo da Torre C, de 2 dorms., sem vaga, com 34,60m². A inclusão no Programa Minha Casa Minha vida está vinculada ao enquadramento de renda e regras do Programa, à época da assinatura do contrato de financiamento. Apesar de todo cuidado na obtenção das informações contidas neste material, elas não devem ser consideradas como parte integrante de qualquer contrato. As áreas de lazer serão entregues equipadas e decoradas de acordo com o memorial descritivo. As ilustrações, artes, fotos, mobiliário, vegetação e peças de decoração dos materiais de divulgação têm caráter exclusivamente promocional por tratar-se de bem a ser construído, sendo que as condições de comercialização projetos e especificações são aquelas dos contratos e memoriais a serem firmados com os adquirentes. A vegetação será entregue em diferentes tamanhos e portes. Fotos ilustrativas. Perspectivas artísticas. O empreendimento localiza-se na Rua Heitor de Oliveira, 80 – Vila Sul Americana/ Carapicuíba.
            </p>
          </div>

          {/* Copyright e Links */}
          <div className="border-t border-gray-200 pt-6 text-center w-full">
            <p className="text-xs sm:text-sm text-gray-400 font-medium">
              © 2026 | Lumini 3 | <button onClick={() => openModal('lgpd')} className="font-bold hover:text-[#7629BB] transition-colors focus:outline-none">Termos de Uso</button> e <button onClick={() => openModal('privacidade')} className="font-bold hover:text-[#7629BB] transition-colors focus:outline-none">Política de Privacidade</button>
            </p>
          </div>

        </div>
      </footer>

      {/* Ícone Flutuante do WhatsApp (Verde) */}
      <a 
        href="#"
        onClick={(e) => { e.preventDefault(); openModal('whatsapp'); }}
        className={`fixed right-4 sm:right-8 z-[60] transition-all duration-500 hover:scale-110 focus:outline-none ${showStickyBar ? "bottom-[90px] md:bottom-[80px] opacity-100" : "-bottom-20 opacity-0 pointer-events-none"}`}
        aria-label="Fale pelo WhatsApp"
      >
        <div className="bg-white rounded-full p-1 shadow-lg border border-gray-100">
          <svg className="w-12 h-12 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.931.547 3.743 1.516 5.334L2 22l4.781-1.469a10.02 10.02 0 005.25 1.485c5.535 0 10.031-4.496 10.031-10.031S17.566 2 12.031 2zm0 18.375c-1.634 0-3.188-.415-4.571-1.2l-.328-.188-3.398 1.047 1.062-3.328-.219-.344a8.381 8.381 0 01-1.328-4.516c0-4.634 3.772-8.406 8.406-8.406 4.635 0 8.407 3.772 8.407 8.406s-3.772 8.406-8.407 8.406zm4.61-6.313c-.25-.125-1.484-.734-1.719-.812-.234-.078-.406-.125-.578.125-.172.25-.656.812-.812.984-.156.172-.312.188-.562.063-.25-.125-1.059-.39-2.019-1.246-.747-.669-1.254-1.494-1.406-1.744-.153-.25-.016-.385.109-.509.112-.112.25-.297.375-.447.125-.15.172-.25.25-.422.078-.172.039-.328-.023-.453-.063-.125-.578-1.391-.797-1.906-.211-.502-.422-.434-.578-.442l-.485-.008c-.172 0-.453.063-.688.313-.234.25-.891.875-.891 2.125s.914 2.453 1.047 2.625c.125.172 1.781 2.719 4.313 3.813.601.258 1.07.412 1.437.528.604.192 1.156.164 1.593.1.487-.072 1.484-.606 1.688-1.194.203-.588.203-1.094.14-1.194-.062-.1-.234-.156-.484-.281z"/>
          </svg>
        </div>
      </a>

      {/* Barra Roxa Fixa de Atendimento */}
      <div 
        className={`fixed bottom-0 left-0 w-full z-50 bg-[#8B00FF] shadow-[0_-10px_30px_rgba(139,0,255,0.3)] transition-transform duration-500 ease-in-out ${
          showStickyBar ? "translate-y-0 rounded-t-2xl md:rounded-t-3xl" : "translate-y-full"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex flex-row items-stretch justify-center h-14 divide-x divide-white/20">
          
          <a 
            href="tel:+551141644000" 
            className="flex-1 flex md:hidden items-center justify-center text-white hover:bg-white/10 transition-colors group px-2"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="hidden">Atendimento Telefônico</span>
          </a>

          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); openModal('whatsapp'); }}
            className="flex-1 flex items-center justify-center gap-0 md:gap-3 text-white hover:bg-white/10 transition-colors group px-2 focus:outline-none"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.931.547 3.743 1.516 5.334L2 22l4.781-1.469a10.02 10.02 0 005.25 1.485c5.535 0 10.031-4.496 10.031-10.031S17.566 2 12.031 2zm0 18.375c-1.634 0-3.188-.415-4.571-1.2l-.328-.188-3.398 1.047 1.062-3.328-.219-.344a8.381 8.381 0 01-1.328-4.516c0-4.634 3.772-8.406 8.406-8.406 4.635 0 8.407 3.772 8.407 8.406s-3.772 8.406-8.407 8.406zm4.61-6.313c-.25-.125-1.484-.734-1.719-.812-.234-.078-.406-.125-.578.125-.172.25-.656.812-.812.984-.156.172-.312.188-.562.063-.25-.125-1.059-.39-2.019-1.246-.747-.669-1.254-1.494-1.406-1.744-.153-.25-.016-.385.109-.509.112-.112.25-.297.375-.447.125-.15.172-.25.25-.422.078-.172.039-.328-.023-.453-.063-.125-.578-1.391-.797-1.906-.211-.502-.422-.434-.578-.442l-.485-.008c-.172 0-.453.063-.688.313-.234.25-.891.875-.891 2.125s.914 2.453 1.047 2.625c.125.172 1.781 2.719 4.313 3.813.601.258 1.07.412 1.437.528.604.192 1.156.164 1.593.1.487-.072 1.484-.606 1.688-1.194.203-.588.203-1.094.14-1.194-.062-.1-.234-.156-.484-.281z"/>
            </svg>
            <span className="hidden md:block text-xs sm:text-sm font-medium tracking-wider uppercase">Fale pelo WhatsApp</span>
          </a>

          <a 
            href="#localizacao" 
            className="flex-1 flex items-center justify-center gap-0 md:gap-3 text-white hover:bg-white/10 transition-colors group px-2"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden md:block text-xs sm:text-sm font-medium tracking-wider uppercase">Visite nosso estande</span>
          </a>

        </div>
      </div>

      {/* ================= MODAIS ================= */}
      {activeModal && (
        <div 
          className="fixed inset-0 bg-[#4A137B]/90 z-[9999] flex justify-center items-center p-4 animate-in fade-in duration-300 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-white p-8 md:p-12 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-6 text-4xl text-gray-400 hover:text-[#4A137B] transition-colors focus:outline-none"
              aria-label="Fechar Modal"
            >
              &times;
            </button>
            
            {activeModal === 'privacidade' && (
              <>
                <h2 className="text-2xl font-black text-[#4A137B] uppercase mb-6">POLÍTICA DE PRIVACIDADE</h2>
                <p className="text-gray-600 leading-relaxed text-justify font-medium text-sm">
                  A sua privacidade é importante para nós. É política da Quattro Inc respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar nos sites da Quattro Inc, e outros sites que possuímos e operamos.
                </p>
              </>
            )}

            {activeModal === 'lgpd' && (
              <>
                <h2 className="text-2xl font-black text-[#4A137B] uppercase mb-6">POLÍTICA DE DADOS LGPD</h2>
                <p className="text-gray-600 leading-relaxed text-justify mb-4 font-medium text-sm">
                  Nos comprometemos a nunca compartilhar seus dados com terceiros. Os dados aqui captados (Nome, E-mail e Telefone) serão utilizados única e exclusivamente pela incorporadora responsável por esse empreendimento para que seja possível o contato com o cliente e apresentação dos produtos vinculados à marca da Incorporadora ou pertencentes ao mesmo grupo econômico da Vendedora.
                </p>
                <p className="text-gray-600 leading-relaxed text-justify mb-4 font-medium text-sm">
                  O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
                </p>
                <p className="text-gray-600 leading-relaxed text-justify font-medium text-sm">
                  Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados. O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais.
                </p>
              </>
            )}

            {activeModal === 'whatsapp' && (
              <>
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

                <form onSubmit={handleWhatsAppSubmit} className="space-y-4 max-w-md mx-auto">
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
                      onClick={closeModal}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 px-6 rounded-full transition-colors uppercase tracking-wider text-sm shadow-md"
                    >
                      Fechar
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= COOKIE BANNER LGPD ================= */}
      <CookieBanner />
    </main>
  );
}
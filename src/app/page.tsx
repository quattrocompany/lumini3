"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

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
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ModalWhatsapp from "@/components/ModalWhatsapp";

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

  // Escuta o Scroll para o Header e Navegação Ativa
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const domOrder = ["home", "contato", "produto", "lazer", "plantas", "localizacao", "realizacao"];
      let currentSection = "home";

      for (const name of domOrder) {
        const element = document.getElementById(`nav-${name}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            currentSection = name;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ouvintes globais para abrir os modais via Eventos Customizados
  useEffect(() => {
    const handleOpenWhatsapp = () => openModal("whatsapp");
    const handleOpenPrivacidade = () => openModal("privacidade");
    const handleOpenLgpd = () => openModal("lgpd");

    window.addEventListener("openWhatsAppModal", handleOpenWhatsapp);
    window.addEventListener("openPrivacidadeModal", handleOpenPrivacidade);
    window.addEventListener("openLgpdModal", handleOpenLgpd);
    
    return () => {
      window.removeEventListener("openWhatsAppModal", handleOpenWhatsapp);
      window.removeEventListener("openPrivacidadeModal", handleOpenPrivacidade);
      window.removeEventListener("openLgpdModal", handleOpenLgpd);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(`nav-${sectionId}`);
    
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    
    setIsMobileMenuOpen(false);
  };

  const openModal = (modal: "privacidade" | "lgpd" | "whatsapp") => {
    setActiveModal(modal);
    if (typeof window !== "undefined") document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModal(null);
    if (typeof window !== "undefined") document.body.style.overflow = "auto";
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
            onClick={(e) => scrollToSection(e as any, 'home')}
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
                ? "h-11 md:h-14 bg-gradient-to-r from-white/85 via-white/95 to-white/85 backdrop-blur-md border-white/60 shadow-2xl pointer-events-auto"
                : "h-12 md:h-16 bg-white border-gray-100 pointer-events-auto"
            }`}
          >
            <nav className="hidden md:flex items-center justify-end w-full gap-2 lg:gap-4 xl:gap-6 text-xs lg:text-sm pointer-events-auto">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className={`nav-menu-item transition-all cursor-pointer ${activeSection === 'home' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>HOME</a>
              <span className="text-gray-300 select-none font-light">|</span>
              
              <a href="#produto" onClick={(e) => scrollToSection(e, 'produto')} className={`nav-menu-item transition-all cursor-pointer ${activeSection === 'produto' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>PRODUTO</a>
              <span className="text-gray-300 select-none font-light">|</span>
              
              <a href="#lazer" onClick={(e) => scrollToSection(e, 'lazer')} className={`nav-menu-item transition-all cursor-pointer ${activeSection === 'lazer' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>LAZER</a>
              <span className="text-gray-300 select-none font-light">|</span>
              
              <a href="#plantas" onClick={(e) => scrollToSection(e, 'plantas')} className={`nav-menu-item transition-all cursor-pointer ${activeSection === 'plantas' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>PLANTAS</a>
              <span className="text-gray-300 select-none font-light">|</span>
              
              <a href="#localizacao" onClick={(e) => scrollToSection(e, 'localizacao')} className={`nav-menu-item transition-all cursor-pointer ${activeSection === 'localizacao' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>LOCALIZAÇÃO</a>
              <span className="text-gray-300 select-none font-light">|</span>
              
              <a href="#realizacao" onClick={(e) => scrollToSection(e, 'realizacao')} className={`nav-menu-item transition-all cursor-pointer ${activeSection === 'realizacao' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>REALIZAÇÃO</a>
              <span className="text-gray-300 select-none font-light">|</span>
              
              <a href="#contato" onClick={(e) => scrollToSection(e, 'contato')} className={`nav-menu-item transition-all cursor-pointer ${activeSection === 'contato' ? 'font-black text-[#FFBA00]' : 'font-medium text-gray-500 hover:text-[#FFBA00] hover:font-bold'}`}>CONTATO</a>
            </nav>

            <button 
              className="md:hidden ml-auto p-1 text-[#4A137B] focus:outline-none pointer-events-auto"
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
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="py-2 hover:font-black hover:text-[#FFBA00] border-b border-gray-100">HOME</a>
              <a href="#produto" onClick={(e) => scrollToSection(e, 'produto')} className="py-2 hover:font-black hover:text-[#FFBA00] border-b border-gray-100">PRODUTO</a>
              <a href="#lazer" onClick={(e) => scrollToSection(e, 'lazer')} className="py-2 hover:font-black hover:text-[#FFBA00] border-b border-gray-100">LAZER</a>
              <a href="#plantas" onClick={(e) => scrollToSection(e, 'plantas')} className="py-2 hover:font-black hover:text-[#FFBA00] border-b border-gray-100">PLANTAS</a>
              <a href="#localizacao" onClick={(e) => scrollToSection(e, 'localizacao')} className="py-2 hover:font-black hover:text-[#FFBA00] border-b border-gray-100">LOCALIZAÇÃO</a>
              <a href="#realizacao" onClick={(e) => scrollToSection(e, 'realizacao')} className="py-2 hover:font-black hover:text-[#FFBA00] border-b border-gray-100">REALIZAÇÃO</a>
              <a href="#contato" onClick={(e) => scrollToSection(e, 'contato')} className="py-2 hover:font-bold hover:text-[#FFBA00]">CONTATO</a>
            </nav>
          </div>
        )}
      </header>

      {/* ================= FLUXO DAS SEÇÕES MODULARES COM IDS ================= */}
      
      <div id="nav-home">
        <SecaoBanner />
      </div>

      <SecaoAerea />

      <div id="nav-contato">
        <SecaoContato />
      </div>
      
      <div id="nav-produto">
        <SecaoQualidadeDeVida />
      </div>

      <SecaoSegurancaComodidade />

      <div id="nav-lazer">
        <SecaoLazer />
      </div>

      <SecaoImplantacao />

      <div id="nav-plantas">
        <SecaoPlantas />
      </div>

      <div id="nav-localizacao">
        <SecaoMobilidadeUrbana />
      </div>

      <div id="nav-realizacao">
        <Footer 
          onOpenWhatsapp={() => openModal("whatsapp")} 
          onOpenPrivacidade={() => openModal("privacidade")} 
          onOpenLgpd={() => openModal("lgpd")} 
        />
      </div>

      {/* ================= MODAL WHATSAPP COMPONENTIZADO ================= */}
      <ModalWhatsapp isOpen={activeModal === "whatsapp"} onClose={closeModal} />

      {/* ================= MODAIS LEGAIS (LGPD / Privacidade) ================= */}
      {(activeModal === 'privacidade' || activeModal === 'lgpd') && (
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
                  Nos comprometemos a nunca compartilhar seus dados com terceiros. Os dados aqui captados (Nome, E-mail e Telefone) serão utilizados única e exclusivamente pela incorporadora responsável por esse empreendimento para que seja possível o contato com el cliente e apresentação dos produtos vinculados à marca da Incorporadora ou pertencentes ao mesmo grupo econômico da Vendedora.
                </p>
                <p className="text-gray-600 leading-relaxed text-justify mb-4 font-medium text-sm">
                  O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
                </p>
                <p className="text-gray-600 leading-relaxed text-justify font-medium text-sm">
                  Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados. O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais.
                </p>
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
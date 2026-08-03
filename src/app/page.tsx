"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

// Importação dos Componentes Modulares
import SecaoQualidadeDeVida from "@/components/QualidadeDeVida"; 
import SecaoSegurancaComodidade from "@/components/SecaoSegurancaComodidade";
import SecaoLazer from "@/components/SecaoLazer";
import SecaoImplantacao from "@/components/SecaoImplantacao";
import SecaoPlantas from "@/components/SecaoPlantas"; // <-- IMPORTAÇÃO DA NOVA SEÇÃO
import SecaoMobilidadeUrbana from "@/components/SecaoMobilidadeUrbana";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap"
});

export default function Home() {
  const [activeModal, setActiveModal] = useState<"privacidade" | "lgpd" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

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

  const openModal = (modal: "privacidade" | "lgpd") => {
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

        <div className="w-full relative z-10 flex items-end justify-center mt-6 md:mt-10 px-2 sm:px-6">
          <Image 
            src="/img/Banner_Principal_Dogs.png" 
            alt="Lumini 3 - A família cresceu! Agora com 3 Dorms." 
            width={1920} 
            height={1080} 
            quality={100}
            className="w-full max-w-[1920px] h-auto object-contain block"
            priority
          />
        </div>
      </section>

      {/* ================= SEÇÃO: MAPA DA REGIÃO ================= */}
      <section 
        id="mapa" 
        className="relative z-0 bg-white pt-8 sm:pt-12 md:pt-16 pb-6 md:pb-10 -mt-[5rem]"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center">
          <div className="w-full relative rounded-[2.5rem] overflow-hidden shadow-xl">
            <Image 
              src="/img/aerea-desktop.jpg" 
              alt="Vista Aérea da Região do Empreendimento Lumini 3 em Carapicuíba" 
              width={1440} 
              height={810} 
              quality={100}
              className="w-full h-auto object-cover block"
              priority
            />
          </div>
        </div>
      </section>

      {/* ================= SEÇÃO: FORMULÁRIO DE CADASTRO COM EDIFÍCIO ================= */}
      <section id="contato" className="py-8 md:py-16 bg-white relative z-10 overflow-visible">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 overflow-visible">
          
          <div className="relative bg-gradient-to-r from-[#FFBA00] via-[#FF9E00] to-[#F77A2C] rounded-[2.5rem] shadow-xl flex flex-col lg:flex-row items-stretch justify-between mt-28 md:mt-40 lg:mt-1 overflow-visible">
            
            <div className="relative w-full lg:w-5/12 flex flex-col justify-end overflow-visible min-h-[400px] lg:min-h-[320px]">
              <div className="relative lg:absolute lg:bottom-0 lg:left-0 w-full lg:w-[115%] -mt-24 sm:-mt-60 lg:-mt-80 z-20 pointer-events-none rounded-bl-[2.5rem] overflow-hidden">
                <Image 
                  src="/img/edificios.png" 
                  alt="Edifício Lumini 3 - Arquitetura Moderna" 
                  width={1200} 
                  height={1400} 
                  quality={100}
                  className="w-full h-auto object-contain block rounded-bl-[2.5rem]"
                  priority
                />
              </div>
            </div>

            <div className="w-full lg:w-6/12 flex flex-col justify-center p-6 sm:p-10 lg:p-12 xl:pr-16 xl:pl-8 z-10">
              <h3 className="font-medium text-[#4A137B] text-xl sm:text-2xl lg:text-3xl uppercase leading-tight mb-6 drop-shadow-sm">
                CADASTRE-SE E RECEBA EM 1ª MÃO TODAS AS INFORMAÇÕES:
              </h3>

              <form className="space-y-4 w-full">
                <div>
                  <label htmlFor="lead-nome" className="sr-only">Nome*</label>
                  <input 
                    id="lead-nome"
                    type="text" 
                    placeholder="Nome*" 
                    required 
                    className="w-full bg-white border-none rounded-full px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#7629BB]/30 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="lead-email" className="sr-only">E-mail*</label>
                  <input 
                    id="lead-email"
                    type="email" 
                    placeholder="E-mail*" 
                    required 
                    className="w-full bg-white border-none rounded-full px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#7629BB]/30 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="lead-tel" className="sr-only">Telefone*</label>
                  <input 
                    id="lead-tel"
                    type="tel" 
                    placeholder="Telefone*" 
                    required 
                    className="w-full bg-white border-none rounded-full px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#7629BB]/30 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="lead-msg" className="sr-only">Mensagem*</label>
                  <textarea 
                    id="lead-msg"
                    rows={4}
                    placeholder="Mensagem*" 
                    required 
                    className="w-full bg-white border-none rounded-3xl px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#7629BB]/30 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="bg-white border border-gray-200 rounded-lg p-2.5 px-4 flex items-center gap-3 shadow-sm w-full sm:w-auto">
                    <input type="checkbox" id="recaptcha" className="w-5 h-5 accent-[#7629BB] rounded cursor-pointer" />
                    <label htmlFor="recaptcha" className="text-xs font-medium text-gray-600 cursor-pointer select-none">
                      Não sou um robô
                    </label>
                    <div className="ml-auto sm:ml-4 flex flex-col items-center justify-center">
                      <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                      </svg>
                      <span className="text-[8px] text-gray-400">reCAPTCHA</span>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full sm:w-auto bg-[#7629BB] hover:bg-[#4A137B] text-[#FFFFFF] font-black text-base uppercase tracking-widest px-12 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                  >
                    ENVIAR
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

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
      <footer id="realizacao" className="bg-[#4A137B] text-white pt-16 pb-8 border-t-[10px] border-[#FFBA00]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h5 className="text-[#FFBA00] text-xl font-black uppercase tracking-widest mb-6">VISITE DECORADOS</h5>
              <p className="text-gray-300 leading-relaxed font-light mb-4 text-sm">
                AV. VICTORIO FORNAZZARO, 100<br/>VILA SUL AMERICANA / CARAPICUÍBA SP
              </p>
              <p className="text-base">
                <strong>CENTRAL DE VENDAS:</strong> <span className="text-[#FFBA00] font-black ml-1">4164.4000</span>
              </p>
              <button className="mt-4 text-[#FFBA00] font-bold tracking-wider hover:underline uppercase text-xs block">
                VER DIREÇÕES &rarr;
              </button>
            </div>
            
            <div>
              <h5 className="text-[#FFBA00] text-xl font-black uppercase tracking-widest mb-6">REALIZAÇÃO / PARCEIROS</h5>
              <p className="text-gray-300 font-light mb-2 text-base">
                <strong className="text-white font-black">CAIXA</strong> Econômica Federal
              </p>
              <p className="text-gray-300 font-light text-base">
                <strong className="text-white font-black">QUATTRO</strong> Incorporadora
              </p>
            </div>
            
            <div>
              <h5 className="text-[#FFBA00] text-xl font-black uppercase tracking-widest mb-6">ATENDIMENTO</h5>
              <p className="text-gray-300 font-medium mb-2 cursor-pointer hover:text-white transition-colors uppercase tracking-wider text-sm">
                FALE PELO WHATSAPP
              </p>
              <p className="text-gray-300 font-medium cursor-pointer hover:text-white transition-colors uppercase tracking-wider text-sm">
                VISITE NOSSO ESTANDE
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-center items-center gap-6 text-xs text-gray-400">
            <button onClick={() => openModal('privacidade')} className="hover:text-[#FFBA00] transition-colors focus:outline-none font-medium tracking-wide">
              Política de Privacidade
            </button>
            <button onClick={() => openModal('lgpd')} className="hover:text-[#FFBA00] transition-colors focus:outline-none font-medium tracking-wide">
              Termos de Uso / LGPD
            </button>
            <span className="font-light tracking-wide">&copy; 2026 Quattro Inc. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>

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
          </div>
        </div>
      )}
    </main>
  );
}
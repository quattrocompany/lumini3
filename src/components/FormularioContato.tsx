"use client";

import Image from "next/image";

export default function SecaoContato() {
  return (
    <section id="contato" className="py-8 md:py-16 bg-white relative z-10 overflow-visible">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 overflow-visible">
        
        <div className="relative bg-gradient-to-b from-[#FFBA00] via-[#FFBA00] via-40% to-[#87CEEB] to-90% lg:bg-gradient-to-r lg:from-[#87CEEB] lg:from-10% lg:via-[#FF9E00] lg:via-50% lg:to-[#FFBA00] lg:to-90% rounded-[2.5rem] shadow-xl flex flex-col lg:flex-row items-stretch justify-between lg:mt-1 overflow-visible">
          
          <div className="w-full lg:w-6/12 flex flex-col justify-center p-6 pb-2 sm:p-10 sm:pb-4 lg:p-12 xl:pr-16 xl:pl-8 z-10 order-1 lg:order-2">
            <h3 className="font-medium text-[#4A137B] text-xl sm:text-2xl lg:text-3xl uppercase leading-tight mb-6 drop-shadow-sm text-center lg:text-left">
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

          <div className="relative w-full lg:w-5/12 flex flex-col justify-end overflow-visible min-h-[300px] sm:min-h-[400px] lg:min-h-[320px] order-2 lg:order-1 mt-0">
            <div className="relative lg:absolute lg:bottom-0 lg:left-0 w-full lg:w-[115%] lg:-mt-80 z-20 pointer-events-none rounded-b-[2.5rem] lg:rounded-bl-[2.5rem] lg:rounded-br-none overflow-hidden">
              <Image 
                src="/img/edificios.png" 
                alt="Edifício Lumini 3 - Arquitetura Moderna" 
                width={1200} 
                height={1400} 
                quality={100}
                className="w-full h-auto object-contain block rounded-b-[2.5rem] lg:rounded-bl-[2.5rem] lg:rounded-br-none mix-blend-normal"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
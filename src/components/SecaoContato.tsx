"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function SecaoContato() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Evita erro de hidratação e garante que o Recaptcha só renderize no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Adicionado o fallback direto com a sua chave pública para garantir que nunca seja undefined
  const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LewTnUtAAAAAH9QVex9YkUw94NJY1hmL0e5WjSy";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!captchaToken) {
      alert("Por favor, confirme que você não é um robô.");
      return;
    }

    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      telefone: formData.get("telefone"),
      mensagem: formData.get("mensagem"),
      captcha: captchaToken,
    };

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        e.currentTarget.reset();
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="py-8 md:py-16 bg-white relative z-10 overflow-visible">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 overflow-visible">
        
        <div className="relative bg-gradient-to-b from-[#FFBA00] via-[#FFBA00] via-40% to-[#87CEEB] to-90% lg:bg-gradient-to-r lg:from-[#87CEEB] lg:from-10% lg:via-[#FF9E00] lg:via-50% lg:to-[#FFBA00] lg:to-90% rounded-[2.5rem] shadow-xl flex flex-col lg:flex-row items-stretch justify-between lg:mt-1 overflow-visible">
          
          <div className="w-full lg:w-6/12 flex flex-col justify-center p-6 pb-2 sm:p-10 sm:pb-4 lg:p-12 xl:pr-16 xl:pl-8 z-10 order-1 lg:order-2">
            <h3 className="font-medium text-[#4A137B] text-[22px] sm:text-2xl lg:text-3xl uppercase leading-[1.2] mb-6 drop-shadow-sm text-left lg:text-left text-balance break-words">
              CADASTRE-SE E RECEBA EM PRIMEIRA MÃO TODAS AS INFORMAÇÕES:
            </h3>

            {status === "success" ? (
              <div className="bg-white/90 p-8 rounded-3xl text-center shadow-md border border-green-100">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <h4 className="text-xl font-bold text-[#4A137B] mb-2">Mensagem enviada!</h4>
                <p className="text-gray-600 font-medium">Em breve entraremos em contato.</p>
                <button onClick={() => setStatus("idle")} className="mt-6 text-[#7629BB] font-bold hover:underline">
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div>
                  <label htmlFor="lead-nome" className="sr-only">Nome*</label>
                  <input 
                    id="lead-nome"
                    name="nome"
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
                    name="email"
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
                    name="telefone"
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
                    name="mensagem"
                    rows={4}
                    placeholder="Mensagem*" 
                    required 
                    className="w-full bg-white border-none rounded-3xl px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#7629BB]/30 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="w-full sm:w-auto flex justify-center min-h-[78px] min-w-[304px]">
                    {isMounted && (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                        hl="pt-BR"
                      />
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full sm:w-auto bg-[#7629BB] hover:bg-[#4A137B] disabled:bg-gray-400 disabled:cursor-not-allowed text-[#FFFFFF] font-black text-base uppercase tracking-widest px-12 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 h-[78px]"
                  >
                    {status === "loading" ? "ENVIANDO..." : "ENVIAR"}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-red-600 text-sm font-bold text-center mt-2">
                    Ocorreu um erro ao enviar. Tente novamente.
                  </p>
                )}
              </form>
            )}
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
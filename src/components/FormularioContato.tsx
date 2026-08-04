"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormularioContato() {
  const router = useRouter();
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    // Para replicar o envio de e-mail, crie uma rota em app/api/contato/route.ts
    // O backend processará as variáveis do payload: {{nome}}, {{email}}, {{telefone}}, {{campo_01}}, {{mensagem}}, {{campo_02}}[cite: 3].
    // Exemplo: await fetch('/api/contato', { method: 'POST', body: JSON.stringify(data) });

    // Exibe a interface de sucesso substituindo o form
    setEnviado(true);
    
    // Dispara evento de conversão de lead no GTM após o envio bem-sucedido
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: "formulario_enviado" });
    }

    // Temporizador de 5 segundos idêntico ao "meta http-equiv=refresh"[cite: 1]
    setTimeout(() => {
      // Redireciona para o início ou recarrega o form[cite: 1]
      router.push("/");
      setEnviado(false); // Reseta o estado para um novo envio
    }, 5000);
  };

  if (enviado) {
    // Layout traduzido do seu HTML de sucesso original[cite: 1]
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-black/80 rounded-lg text-center">
        <span className="text-sm text-white font-bold mb-2">
          SEUS DADOS FORAM ENVIADOS COM SUCESSO!
        </span>
        <span className="text-base text-[#FFA330] font-bold mb-6">
          OBRIGADO.
        </span>
        <span className="text-xs text-[#FFA330]">
          Você será redirecionado em <b>5</b> segundos... aguarde.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full">
      {/* Campos baseados no template HTML fornecido para o corpo do e-mail[cite: 3] */}
      <input type="text" name="nome" placeholder="Nome" required className="border border-gray-300 p-2 rounded" />
      <input type="email" name="email" placeholder="E-Mail" required className="border border-gray-300 p-2 rounded" />
      <input type="tel" name="telefone" placeholder="Telefone" required className="border border-gray-300 p-2 rounded" />
      <input type="text" name="campo_01" placeholder="Renda" className="border border-gray-300 p-2 rounded" />
      <textarea name="mensagem" placeholder="Mensagem" rows={4} className="border border-gray-300 p-2 rounded"></textarea>
      
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" name="campo_02" value="Sim" required />
        Aceito receber informações
      </label>

      <button type="submit" className="bg-[#FFA330] hover:bg-[#e6922a] transition-colors text-white p-3 rounded font-bold uppercase tracking-wider">
        Enviar
      </button>
    </form>
  );
}
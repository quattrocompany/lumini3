"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin/kit");
    } else {
      setError("Usuário ou senha inválidos.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <div className="w-full relative z-10 pt-16 sm:pt-20 bg-[#1E293B] pb-8 flex items-center justify-center shadow-md">
          <div className="relative w-64 sm:w-80 md:w-96 h-24 sm:h-32">
            <Image
              src="/img/Hero/logo.png"
              alt="Lumini 3"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex items-center justify-center p-6 py-16">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
            <h1 className="text-2xl font-bold text-[#1E293B] text-center mb-2">Painel da Agência</h1>
            <p className="text-gray-500 text-center mb-8 text-sm">Acesso restrito para gestão do Kit Corretor Lumini 3</p>
            
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Usuário</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1E293B] focus:ring-1 focus:ring-[#1E293B]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1E293B] focus:ring-1 focus:ring-[#1E293B]"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#DD6810] text-white font-bold py-3 rounded-lg hover:bg-[#c45a0d] transition-colors disabled:opacity-50 mt-4 cursor-pointer"
              >
                {loading ? "Autenticando..." : "Entrar no Painel"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#1E293B] pt-12 md:pt-16 text-white mt-16 md:mt-24">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center justify-center gap-6 mb-8">
          <a 
            href="https://www.lumini3.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wider hover:text-[#DD6810] transition-colors drop-shadow-sm text-center"
          >
            www.lumini3.com.br
          </a>
        </div>

        <div className="w-full bg-[#DD6810] py-8 px-6 text-center text-white">
          <p className="text-xs sm:text-sm font-medium tracking-wide text-white/95">
            © 2026 | Lumini 3 | Termos de Uso e Política de Privacidade
          </p>
        </div>
      </div>
    </main>
  );
}
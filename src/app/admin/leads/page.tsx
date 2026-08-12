"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { formatarDataBrasilia } from "@/lib/utils";

interface Lead {
  id: string;
  created_at: string;
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  origem: string;
}

export default function PaginaLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [senha, setSenha] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const buscarLeads = async () => {
    setLoading(true);
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar leads:", error);
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (autenticado) {
      buscarLeads();
    }
  }, [autenticado]);

  const exportarCSV = () => {
    if (leads.length === 0) return;

    const cabecalho = ["ID", "Data/Hora (Brasília)", "Nome", "E-mail", "Telefone", "Origem", "Mensagem"];
    
    const linhas = leads.map((lead) => {
      const dataFormatada = formatarDataBrasilia(lead.created_at);

      return [
        `"${lead.id}"`,
        `"${dataFormatada}"`,
        `"${lead.nome?.replace(/"/g, '""') || ""}"`,
        `"${lead.email?.replace(/"/g, '""') || ""}"`,
        `"${lead.telefone?.replace(/"/g, '""') || ""}"`,
        `"${lead.origem?.replace(/"/g, '""') || ""}"`,
        `"${lead.mensagem?.replace(/\n/g, " ")?.replace(/"/g, '""') || ""}"`,
      ].join(";");
    });

    const conteudoCSV = "\uFEFF" + [cabecalho.join(";"), ...linhas].join("\n");
    const blob = new Blob([conteudoCSV], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `leads_lumini3_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Trava de senha simples
  if (!autenticado) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-sm w-full text-center">
          <h2 className="text-xl font-bold text-[#4A137B] mb-4">Painel Lumini 3</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (senha === "Lumini2026!") { // Defina a senha desejada
                setAutenticado(true);
              } else {
                alert("Senha incorreta!");
              }
            }}
          >
            <input
              type="password"
              placeholder="Digite a senha de acesso"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm mb-4 outline-none focus:border-[#7629BB]"
            />
            <button
              type="submit"
              className="w-full bg-[#7629BB] hover:bg-[#4A137B] text-white font-bold py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
            >
              Acessar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Leads Lumini 3</h1>
            <p className="text-sm text-gray-500">Total de cadastros: {leads.length}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={buscarLeads}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
            >
              Atualizar
            </button>
            <button
              onClick={exportarCSV}
              disabled={leads.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-md cursor-pointer"
            >
              Exportar para Excel (CSV)
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-12 text-gray-500 font-medium">Carregando dados...</p>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3">Data/Hora (Brasília)</th>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">E-mail</th>
                  <th className="px-4 py-3">Telefone</th>
                  <th className="px-4 py-3">Origem</th>
                  <th className="px-4 py-3">Mensagem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                      {formatarDataBrasilia(lead.created_at)}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{lead.nome}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{lead.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{lead.telefone}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                        {lead.origem}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate" title={lead.mensagem}>
                      {lead.mensagem}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Força o Next.js a tratar esta rota como dinâmica no build
export const dynamic = "force-dynamic";

interface Lead {
  nome?: string;
  email?: string;
  telefone?: string;
  origem?: string;
  mensagem?: string;
  created_at?: string;
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Configuração do Supabase ausente." }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: leads, error } = await supabase.from("leads").select("*");

  if (error || !leads) {
    return NextResponse.json({ error: "Erro ao buscar leads" }, { status: 500 });
  }

  const header = "Nome,Email,Telefone,Origem,Mensagem,Data\n";
  const rows = (leads as Lead[])
    .map(
      (l: Lead) =>
        `"${l.nome || ""}","${l.email || ""}","${l.telefone || ""}","${l.origem || ""}","${l.mensagem || ""}","${l.created_at || ""}"`
    )
    .join("\n");

  const csvContent = header + rows;

  return new Response(csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads_lumini_3_${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
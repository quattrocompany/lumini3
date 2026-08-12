import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senha } = body;

    if (senha !== "Lumini2026!") {
      return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Tenta usar a Service Role primeiro. Se não existir, usa a Anon Key
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error(">>> ERRO: Variáveis do Supabase ausentes no servidor.");
      return NextResponse.json({ error: "Configuração do banco ausente no servidor." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(">>> ERRO SUPABASE AO BUSCAR LEADS:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`>>> SUCESSO: ${data?.length || 0} leads encontrados.`);

    return NextResponse.json({ success: true, leads: data || [] }, { status: 200 });
  } catch (error: any) {
    console.error(">>> ERRO API ADMIN LEADS:", error);
    return NextResponse.json({ error: error?.message || "Erro interno." }, { status: 500 });
  }
}
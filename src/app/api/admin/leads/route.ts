import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Não autorizado. Faça login novamente." }, { status: 401 });
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

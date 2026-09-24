import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import LeadsInterface from "./LeadsInterface";

export default async function PaginaLeads() {
  // Antes esta página tinha sua própria senha fixa no código ("Lumini2026!")
  // e ficava aberta para digitar até acertar. Agora usa a MESMA sessão de
  // login do painel administrativo (/admin), assinada no servidor.
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  return <LeadsInterface />;
}

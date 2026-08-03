import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Configuração centralizada da fonte Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// Metadados oficiais para SEO e redes sociais
export const metadata: Metadata = {
  title: "Lumini 3 | Empreendimento em Carapicuíba - Quattro Inc",
  description: "A família cresceu! O Lumini 3 também, agora com 3 Dorms. Lazer de Resort, Varanda Gourmet e excelente localização a 7 min. do Parque Shopping Barueri.",
  keywords: ["Lumini 3", "Apartamento Carapicuíba", "Quattro Inc", "Minha Casa Minha Vida", "3 Dormitórios Carapicuíba"],
  openGraph: {
    title: "Lumini 3 | Empreendimento em Carapicuíba",
    description: "Apartamentos de 2 e 3 Dorms com Varanda Gourmet e Lazer de Resort.",
    siteName: "Lumini 3",
    locale: "pt_BR",
    type: "website",
  },
};

// Configuração da Viewport para dispositivos móveis
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0b1f38",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-[#333333] antialiased selection:bg-[#d4af37] selection:text-[#0b1f38]">
        {children}
      </body>
    </html>
  );
}
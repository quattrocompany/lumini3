import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
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
  verification: {
    other: { 'facebook-domain-verification': ['qgwijgvv27t2gxdgibclvhfiqrkya7'] },
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
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PGPZ5ZVW');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-white text-[#333333] antialiased selection:bg-[#d4af37] selection:text-[#0b1f38]">
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PGPZ5ZVW"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        
        {children}
        <Analytics />
      </body>
    </html>
  );
}
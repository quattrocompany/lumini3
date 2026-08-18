import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foto de Apoio - Lumini 3',
  description: 'Gerar sua foto personalizada para Perfil, Feed e Stories.',
};

export default function CampanhaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#6923b3_0%,#6b1860_100%)] text-white font-sans selection:bg-purple-500 selection:text-white">
      {children}
    </div>
  );
}
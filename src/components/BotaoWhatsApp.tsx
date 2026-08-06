"use client";

export default function BotaoWhatsApp() {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Dispara o evento global para abrir o modal de cadastro no page.tsx
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openWhatsAppModal"));
    }
  };

  return (
    <button 
      onClick={handleWhatsAppClick} 
      className="bg-green-500 text-white p-3 rounded"
      aria-label="Falar no WhatsApp"
    >
      Falar no WhatsApp
    </button>
  );
}
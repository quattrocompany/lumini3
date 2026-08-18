'use client';

import { useState, useRef, ChangeEvent } from 'react';

// Formatos com tamanhos expandidos para mobile (usando % e vw)
const FORMATOS = [
  {
    id: 'perfil',
    label: 'Foto de perfil',
    url: '/img/1_Foto_Perfil_Lumini3.png',
    width: 1080,
    height: 1080,
    aspectClass: 'aspect-square w-[85vw] max-w-[340px]',
  },
  {
    id: 'feed',
    label: 'Post no feed',
    url: '/img/2_Post_Feed_Lumini.png',
    width: 1080,
    height: 1350, // Formato Retrato 4:5
    aspectClass: 'aspect-[4/5] w-[85vw] max-w-[320px]',
  },
  {
    id: 'stories',
    label: 'Stories',
    url: '/img/3_Stories_Lumini.png',
    width: 1080,
    height: 1920, // Formato Vertical 9:16
    aspectClass: 'aspect-[9/16] w-[75vw] max-w-[270px]',
  },
];

export default function CampanhaComprador() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [formatoAtivo, setFormatoAtivo] = useState(FORMATOS[0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Upload / Captura da Imagem
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Processamento e Download
  const handleDownload = () => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = formatoAtivo.width;
    canvas.height = formatoAtivo.height;

    const userImg = new Image();
    const frameImg = new Image();

    userImg.src = imageSrc;
    userImg.onload = () => {
      // Cálculo proportional "cover" para centralizar sem distorcer
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = userImg.width / userImg.height;

      let renderWidth = canvas.width;
      let renderHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgAspect > canvasAspect) {
        renderWidth = canvas.height * imgAspect;
        offsetX = (canvas.width - renderWidth) / 2;
      } else {
        renderHeight = canvas.width / imgAspect;
        offsetY = (canvas.height - renderHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 1. Desenha a foto ao fundo
      ctx.drawImage(userImg, offsetX, offsetY, renderWidth, renderHeight);

      frameImg.src = formatoAtivo.url;
      frameImg.onload = () => {
        // 2. Desenha a moldura por cima
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

        // 3. Dispara o download em PNG
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `lumini3-${formatoAtivo.id}.png`;
        link.href = dataUrl;
        link.click();
      };
    };
  };

  return (
    <main className="min-h-[100dvh] py-4 px-4 flex flex-col justify-between items-center overflow-x-hidden">
      <div className="w-full max-w-md flex flex-col items-center my-auto">
        
        {/* LOGO LUMINI 3 */}
        <div className="w-full flex items-center justify-center py-2 sm:py-4 mb-1">
          <img
            src="/img/logo_lumini3_header.png"
            alt="Lumini 3"
            className="h-20 sm:h-28 md:h-32 w-auto object-contain drop-shadow-xl transition-all"
          />
        </div>

        {/* SELETOR DE FORMATOS */}
        <div className="flex items-center justify-center gap-1 mb-4 sm:mb-6 bg-white/20 p-1.5 rounded-full backdrop-blur-md border border-white/30 shadow-lg w-full max-w-xs sm:max-w-sm">
          {FORMATOS.map((formato) => {
            const isActive = formatoAtivo.id === formato.id;
            return (
              <button
                key={formato.id}
                type="button"
                onClick={() => setFormatoAtivo(formato)}
                className={`flex-1 py-2 px-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 text-center whitespace-nowrap ${
                  isActive
                    ? 'bg-black text-white shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {formato.label}
              </button>
            );
          })}
        </div>

        {/* ÁREA DE PRÉVIA DO CARD (EXPANDIDA NO MOBILE) */}
        <div
          className={`relative ${formatoAtivo.aspectClass} bg-black/20 rounded-3xl overflow-hidden mb-5 sm:mb-6 border border-white/20 shadow-2xl transition-all duration-300 mx-auto`}
        >
          {/* CAMADA 1: FOTO DO USUÁRIO OU PLACEHOLDER DE CÂMERA */}
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Sua foto"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          ) : (
            /* Placeholder no centro da área transparente */
            <label className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer text-white z-0 group w-full px-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/25 group-hover:bg-white/40 group-hover:scale-105 flex items-center justify-center mb-2 backdrop-blur-md transition shadow-lg border border-white/40">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium text-center bg-black/60 text-white/90 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-md">
                Clique para carregar a foto
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}

          {/* CAMADA 2: MOLDURA PNG (OVERLAY FIXO) */}
          <img
            src={formatoAtivo.url}
            alt={formatoAtivo.label}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
          />
        </div>

        {/* CONTROLES E BOTÕES (ESTILO DO SITE DE REFERÊNCIA) */}
        <div className="w-full max-w-[320px] sm:max-w-[360px] flex flex-col items-center gap-3">
          
          {/* BOTÃO DE DOWNLOAD (QUANDO JÁ TEM FOTO) */}
          {imageSrc && (
            <button
              type="button"
              onClick={handleDownload}
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base sm:text-lg rounded-full transition shadow-2xl active:scale-95 flex items-center justify-center gap-2 mb-1"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Baixar Imagem Pronta
            </button>
          )}

          {/* BOTÃO PRINCIPAL: ESCOLHER MINHA FOTO (GALERIA) */}
          <label className="flex items-center justify-center gap-2.5 w-full py-4 px-6 bg-black hover:bg-gray-900 text-white font-semibold text-base sm:text-lg text-center rounded-full cursor-pointer transition shadow-xl active:scale-95 border border-white/10">
            {/* Ícone de Galeria com Mais */}
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{imageSrc ? 'Escolher outra foto' : 'Escolher minha foto'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {/* LINK SECUNDÁRIO: USAR A CÂMERA AGORA */}
          <label className="inline-flex items-center justify-center gap-2 py-1 px-3 text-white/90 hover:text-white font-medium text-sm sm:text-base cursor-pointer transition active:scale-95 my-1">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="underline underline-offset-4">Usar a câmera agora</span>
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {/* AVISO DE PRIVACIDADE */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-white/70 text-center max-w-xs mt-1 leading-tight">
            <svg
              className="w-4 h-4 text-white/60 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Sua foto é processada neste aparelho e não é enviada para nossos servidores.</span>
          </div>

        </div>

        {/* Canvas oculto para exportar a imagem final */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* RODAPÉ COPYRIGHT */}
      <footer className="mt-2 text-center text-[10px] sm:text-xs text-white/60 py-2">
        © 2026 Quattro Construtora e Incorporadora Ltda. Todos os direitos reservados.
      </footer>
    </main>
  );
}
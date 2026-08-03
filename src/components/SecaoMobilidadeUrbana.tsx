"use client";

interface ItemMobilidade {
  titulo: string;
  subtitulo?: string;
  descricao: string;
}

const itensMobilidade: ItemMobilidade[] = [
  {
    titulo: "TERMINAL RODOVIÁRIO",
    subtitulo: "CARAPICUÍBA",
    descricao: "Acesso rápido, prático e facilitado para toda a região metropolitana.",
  },
  {
    titulo: "CORAL SUPERMERCADOS",
    descricao: "Conveniência e praticidade bem pertinho de você para o dia a dia.",
  },
];

export default function SecaoMobilidadeUrbana() {
  return (
    <section id="localizacao" className="py-16 md:py-24 bg-[#F8F9FA] relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* ================= CABEÇALHO DA SEÇÃO ================= */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4A137B] uppercase tracking-wide mb-3">
            MOBILIDADE URBANA
          </h2>
          <p className="text-gray-500 font-light text-base md:text-lg max-w-2xl mx-auto">
            Uma completa infraestrutura ao seu dispor.
          </p>
        </div>

        {/* ================= GRID DE CARDS (2 COLUNAS) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto">
          {itensMobilidade.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-lg border-b-[5px] border-[#FFBA00] flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-lg md:text-xl lg:text-2xl font-black text-[#4A137B] uppercase leading-tight mb-4">
                {item.titulo}
                {item.subtitulo && (
                  <span className="block mt-0.5">{item.subtitulo}</span>
                )}
              </h3>
              <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed max-w-sm">
                {item.descricao}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
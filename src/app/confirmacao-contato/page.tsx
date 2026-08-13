import Link from "next/link";

export default function ConfirmacaoContato() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-gray-800 mb-4 uppercase tracking-tight">
          Mensagem Enviada!
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Obrigado pelo interesse. Nossa equipe recebeu seus dados e entrará em contato para tirar suas dúvidas.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-[#0C82A0] hover:bg-[#096a83] text-white font-bold py-4 px-10 rounded-full transition-all shadow-md hover:shadow-lg uppercase tracking-wider text-sm"
        >
          Voltar para o site
        </Link>
      </div>
    </div>
  );
}
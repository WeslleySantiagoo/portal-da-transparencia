import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Shield, Eye } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#063472] via-[#0162b3] to-[#aebd24]">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Portal de Transparência
          </h1>
          <div className="text-3xl md:text-4xl mb-8">
            <span className="text-[#d8ea32]">Seed</span> a Bit
          </div>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Acompanhe em tempo real a gestão financeira da nossa empresa júnior.
            Transparência total, dados acessíveis e compromisso com a prestação de contas.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-white hover:bg-white/20 transition">
            <Eye className="w-16 h-16 mb-4 text-[#d8ea32]" />
            <h3 className="text-2xl font-bold mb-3">Transparência Total</h3>
            <p className="text-lg">
              Acesso público a todas as movimentações financeiras da empresa.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-white hover:bg-white/20 transition">
            <BarChart3 className="w-16 h-16 mb-4 text-[#d8ea32]" />
            <h3 className="text-2xl font-bold mb-3">Dados Interativos</h3>
            <p className="text-lg">
              Gráficos e relatórios dinâmicos para análise detalhada dos gastos e receitas.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-white hover:bg-white/20 transition">
            <Shield className="w-16 h-16 mb-4 text-[#d8ea32]" />
            <h3 className="text-2xl font-bold mb-3">Dados Seguros</h3>
            <p className="text-lg">
              Informações armazenadas com segurança e controle de acesso rigoroso.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <Link
            to="/dashboard"
            className="bg-[#d8ea32] hover:bg-[#aebd24] text-[#063472] px-10 py-4 rounded-lg text-xl font-bold shadow-xl hover:shadow-2xl transition transform hover:scale-105 flex items-center space-x-2"
          >
            <TrendingUp size={24} />
            <span>Acessar Dashboard Público</span>
          </Link>

          <Link
            to="/login"
            className="bg-white hover:bg-gray-100 text-[#063472] px-10 py-4 rounded-lg text-xl font-bold shadow-xl hover:shadow-2xl transition transform hover:scale-105"
          >
            Login
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white/10 backdrop-blur-lg rounded-lg p-8 text-white max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Sobre o Portal</h2>
          <p className="text-lg leading-relaxed mb-4">
            Este portal foi criado para demonstrar nosso compromisso com a transparência e 
            responsabilidade na gestão dos recursos da <strong>Seed a Bit</strong>.
          </p>
          <p className="text-lg leading-relaxed">
            Aqui você pode acompanhar todas as entradas e saídas financeiras, visualizar 
            relatórios detalhados e entender como investimos cada real para o crescimento 
            sustentável da empresa júnior.
          </p>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn } from "lucide-react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simular login com qualquer credencial
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email && password) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Por favor, preencha email e senha");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#063472] via-[#0162b3] to-[#aebd24] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#063472] mb-2">
            <span className="text-[#aebd24]">Seed</span> a Bit
          </h1>
          <p className="text-gray-600">Portal de Transparência</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0162b3]"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0162b3]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0162b3] hover:bg-[#063472] text-white py-3 rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <LogIn size={20} />
            <span>{loading ? "Entrando..." : "Entrar"}</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-[#0162b3] hover:text-[#063472] transition"
          >
            ← Voltar para a página inicial
          </Link>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center mb-2">
            <strong>Modo Demo:</strong>
          </p>
          <p className="text-xs text-gray-500 text-center">
            Use qualquer email e senha para acessar o dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

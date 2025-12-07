import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      // A navegação será feita pelo useEffect acima quando o user for atualizado
    } catch (err) {
      setError('Email ou senha inválidos. Tente novamente.');
      console.error(err);
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
            <span>{loading ? 'Entrando...' : 'Entrar'}</span>
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
          <p className="text-xs text-gray-600 text-center">
            Acesso restrito a membros autorizados da Seed a Bit.
            <br />
            Para mais informações, entre em contato com a administração.
          </p>
        </div>
      </div>
    </div>
  );
};

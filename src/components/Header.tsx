import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Home, BarChart3, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-[#063472] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-[#d8ea32]">Seed</span> a Bit
            </div>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-1 hover:text-[#d8ea32] transition"
            >
              <Home size={20} />
              <span>Início</span>
            </Link>

            <Link 
              to="/dashboard" 
              className="flex items-center space-x-1 hover:text-[#d8ea32] transition"
            >
              <BarChart3 size={20} />
              <span>Dashboard Público</span>
            </Link>

            {user && user.email !== 'PUBLICO' && (
              <Link 
                to="/dashboard/privado" 
                className="flex items-center space-x-1 hover:text-[#d8ea32] transition"
              >
                <Lock size={20} />
                <span>Dashboard Privado</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  {user.email} <span className="text-[#aebd24]">({user.role})</span>
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                  <LogOut size={18} />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-[#0162b3] hover:bg-[#aebd24] px-6 py-2 rounded transition"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

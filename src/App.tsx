import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { PublicDashboard } from './pages/PublicDashboard';
import { PrivateDashboard } from './pages/PrivateDashboard';
import './App.css';

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfafc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0162b3] mx-auto mb-4"></div>
          <p className="text-[#063472] font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <>
            <Header />
            <PublicDashboard />
          </>
        }
      />
      <Route
        path="/dashboard/privado"
        element={
          <ProtectedRoute allowedRoles={['ADMIN', 'OPERACOES']}>
            <Header />
            <PrivateDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#fbfafc]">
          <AppRoutes />
          {/* <DebugUserInfo /> */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

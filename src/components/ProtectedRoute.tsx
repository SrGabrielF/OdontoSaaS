import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'dentist' | 'receptionist')[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clinical-blue"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redireciona para a home (ou login) se não estiver autenticado
    // salvando a localização atual para retornar depois
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Se o usuário não tiver permissão para esta rota específica
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

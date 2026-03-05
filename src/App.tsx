import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ClinicProvider } from './context/ClinicContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/public/Home';
import { Services } from './pages/public/Services';
import { Team } from './pages/public/Team';
import { Contact } from './pages/public/Contact';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { Reception } from './pages/dashboard/Reception';
import { Evaluation } from './pages/dashboard/Evaluation';
import { Treatment } from './pages/dashboard/Treatment';
import { Payment } from './pages/dashboard/Payment';
import { useEffect } from 'react';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Odonto<span className="text-clinical-blue">SaaS</span></h3>
            <p className="text-slate-400 text-sm">Transformando sorrisos com tecnologia e cuidado humanizado desde 2010.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/servicos" className="hover:text-white transition-colors">Serviços</a></li>
              <li><a href="/equipe" className="hover:text-white transition-colors">Equipe</a></li>
              <li><a href="/contato" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Limpeza e Prevenção</li>
              <li>Clareamento Dental</li>
              <li>Implantes</li>
              <li>Ortodontia</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>(11) 3456-7890</li>
              <li>contato@odontosaas.com.br</li>
              <li>Av. Paulista, 1000 - SP</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          © 2024 OdontoSaaS. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  </div>
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen bg-slate-50">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-500">Unidade: São Paulo - Paulista</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900">Dr. Carlos Mendes</p>
            <p className="text-xs text-slate-500">Diretor Clínico</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-clinical-blue text-white flex items-center justify-center font-bold">
            CM
          </div>
        </div>
      </header>
      <main className="p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ClinicProvider>
          <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/servicos" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/equipe" element={<PublicLayout><Team /></PublicLayout>} />
          <Route path="/contato" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
          <Route path="/dashboard/recepcao" element={<DashboardLayout><Reception /></DashboardLayout>} />
          <Route path="/dashboard/avaliacao" element={<DashboardLayout><Evaluation /></DashboardLayout>} />
          <Route path="/dashboard/tratamento" element={<DashboardLayout><Treatment /></DashboardLayout>} />
          <Route path="/dashboard/pagamento" element={<DashboardLayout><Payment /></DashboardLayout>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ClinicProvider>
  </ToastProvider>
</AuthProvider>
  );
}

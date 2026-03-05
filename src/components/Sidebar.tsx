import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardCheck, 
  Activity, 
  CreditCard, 
  LogOut,
  Stethoscope,
  User as UserIcon
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useClinic } from '../context/ClinicContext';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { selectPatient } = useClinic();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      // Limpa o paciente selecionado por segurança
      selectPatient(null);
      // Executa o logout no contexto (que pode chamar o backend)
      await logout();
      // Redireciona para a home pública
      navigate('/');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, end: true },
    { name: 'Recepção', path: '/dashboard/recepcao', icon: Users },
    { name: 'Avaliação', path: '/dashboard/avaliacao', icon: ClipboardCheck },
    { name: 'Tratamento', path: '/dashboard/tratamento', icon: Activity },
    { name: 'Pagamento', path: '/dashboard/pagamento', icon: CreditCard },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="bg-clinical-blue p-1.5 rounded-lg">
            <Stethoscope className="text-white h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-slate-900">Odonto<span className="text-clinical-blue">SaaS</span></span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group',
              isActive 
                ? 'bg-clinical-blue text-white shadow-md shadow-clinical-blue/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-clinical-blue'
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-2">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
            <UserIcon className="h-4 w-4 text-slate-500" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Usuário'}</p>
            <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-clinical-danger transition-all"
        >
          <LogOut className="h-5 w-5" />
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
};

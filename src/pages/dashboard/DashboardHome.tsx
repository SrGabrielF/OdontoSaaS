import { motion } from 'motion/react';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { Card } from '../../components/Card';
import { useClinic } from '../../context/ClinicContext';
import { formatCurrency } from '../../utils/helpers';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export const DashboardHome = () => {
  const { patients, billing } = useClinic();

  const stats = [
    { label: 'Pacientes Hoje', value: patients.length, icon: Users, trend: '+12%', trendType: 'up' },
    { label: 'Faturamento Diário', value: formatCurrency(billing), icon: DollarSign, trend: '+8%', trendType: 'up' },
    { label: 'Consultas Agendadas', value: '24', icon: Calendar, trend: '-2%', trendType: 'down' },
    { label: 'Taxa de Conversão', value: '85%', icon: TrendingUp, trend: '+5%', trendType: 'up' },
  ];

  const chartData = [
    { name: 'Seg', valor: 1200 },
    { name: 'Ter', valor: 1900 },
    { name: 'Qua', valor: 1500 },
    { name: 'Qui', valor: 2100 },
    { name: 'Sex', valor: 1800 },
    { name: 'Sáb', valor: 900 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bem-vindo, Dr. Carlos</h1>
          <p className="text-slate-500">Aqui está o resumo da sua clínica hoje.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <Activity className="text-clinical-blue h-4 w-4" />
          <span className="text-sm font-medium text-slate-600">Sistema Online</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-clinical-blue/10 p-2.5 rounded-xl">
                  <stat.icon className="text-clinical-blue h-5 w-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${
                  stat.trendType === 'up' ? 'text-clinical-success' : 'text-clinical-danger'
                }`}>
                  {stat.trend}
                  {stat.trendType === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 p-6" title="Desempenho Semanal" subtitle="Faturamento bruto por dia da semana">
          <div className="h-[300px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#1E3A8A', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="valor" stroke="#1E3A8A" strokeWidth={3} fillOpacity={1} fill="url(#colorValor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6" title="Pacientes Recentes">
          <div className="space-y-6 mt-6">
            {patients.slice(0, 5).map((p, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                  {p.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.service}</p>
                </div>
                <div className="text-xs font-medium text-slate-400">
                  14:30
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

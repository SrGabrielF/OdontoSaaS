import { cn } from '../utils/cn';

interface StatusBadgeProps {
  status: 'Aguardando' | 'Em atendimento' | 'Finalizado' | string;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const variants: Record<string, string> = {
    'Aguardando': 'bg-clinical-warning/10 text-clinical-warning border-clinical-warning/20',
    'Em atendimento': 'bg-clinical-blue/10 text-clinical-blue border-clinical-blue/20',
    'Finalizado': 'bg-clinical-success/10 text-clinical-success border-clinical-success/20',
  };

  return (
    <span className={cn(
      'px-2.5 py-0.5 rounded-full text-xs font-semibold border',
      variants[status] || 'bg-slate-100 text-slate-600 border-slate-200',
      className
    )}>
      {status}
    </span>
  );
};

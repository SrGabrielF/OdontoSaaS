import { useState } from 'react';
import { Activity, Plus, Trash2, Calculator, CheckCircle2, User } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useClinic } from '../../context/ClinicContext';
import { formatCurrency, calculateTotal } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

export const Treatment = () => {
  const { currentPatient, procedures } = useClinic();
  const [selectedProcedures, setSelectedProcedures] = useState<any[]>([]);
  const navigate = useNavigate();

  const addProcedure = (proc: any) => {
    setSelectedProcedures(prev => [...prev, { ...proc, instanceId: Date.now() }]);
  };

  const removeProcedure = (instanceId: number) => {
    setSelectedProcedures(prev => prev.filter(p => p.instanceId !== instanceId));
  };

  const total = calculateTotal(selectedProcedures);

  if (!currentPatient) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="bg-slate-100 p-6 rounded-full">
          <User className="h-12 w-12 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Nenhum paciente selecionado</h2>
        <p className="text-slate-500 max-w-xs">Selecione um paciente na recepção para iniciar o tratamento.</p>
        <Button onClick={() => navigate('/dashboard/recepcao')}>Ir para Recepção</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tratamento em Curso</h1>
          <p className="text-slate-500">Adicione os procedimentos realizados no atendimento.</p>
        </div>
        <div className="bg-clinical-success/10 px-4 py-2 rounded-xl flex items-center gap-2">
          <Activity className="text-clinical-success h-4 w-4" />
          <span className="text-sm font-bold text-clinical-success">Atendimento Ativo: {currentPatient.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Procedures List */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Procedimentos Disponíveis" subtitle="Clique para adicionar ao tratamento">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {procedures.map((proc) => (
                <button
                  key={proc.id}
                  onClick={() => addProcedure(proc)}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-clinical-blue hover:text-white transition-all group text-left"
                >
                  <div>
                    <p className="font-bold text-sm">{proc.name}</p>
                    <p className="text-xs opacity-70">{formatCurrency(proc.price)}</p>
                  </div>
                  <Plus className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </Card>

          <Card title="Plano de Tratamento Atual">
            <div className="space-y-4 mt-4">
              {selectedProcedures.map((proc) => (
                <div key={proc.instanceId} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-clinical-blue/10 p-2 rounded-lg">
                      <CheckCircle2 className="text-clinical-blue h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{proc.name}</p>
                      <p className="text-xs text-slate-500">Procedimento realizado</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-900">{formatCurrency(proc.price)}</span>
                    <button 
                      onClick={() => removeProcedure(proc.instanceId)}
                      className="text-slate-400 hover:text-clinical-danger transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              {selectedProcedures.length === 0 && (
                <div className="py-12 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
                  Nenhum procedimento adicionado ainda.
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Summary & Checkout */}
        <div className="space-y-6">
          <Card className="sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-clinical-blue p-2 rounded-xl">
                <Calculator className="text-white h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Resumo de Valores</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal:</span>
                <span className="font-bold text-slate-900">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Descontos:</span>
                <span className="font-bold text-clinical-success">- R$ 0,00</span>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 font-medium">Total Final:</span>
                  <span className="text-2xl font-black text-clinical-blue">{formatCurrency(total)}</span>
                </div>
              </div>
              <Button 
                className="w-full mt-6" 
                disabled={selectedProcedures.length === 0}
                onClick={() => navigate('/dashboard/pagamento', { state: { procedures: selectedProcedures, total } })}
              >
                Finalizar e Cobrar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

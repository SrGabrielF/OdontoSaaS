import { useState } from 'react';
import { ClipboardCheck, User, Stethoscope, AlertCircle, ArrowRight } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useClinic } from '../../context/ClinicContext';
import { useNavigate } from 'react-router-dom';

export const Evaluation = () => {
  const { currentPatient, updatePatientStatus } = useClinic();
  const [diagnosis, setDiagnosis] = useState('');
  const [observations, setObservations] = useState('');
  const navigate = useNavigate();

  const handleStartTreatment = () => {
    if (!currentPatient) return;
    updatePatientStatus(currentPatient.id, 'Em atendimento');
    navigate('/dashboard/tratamento');
  };

  if (!currentPatient) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="bg-slate-100 p-6 rounded-full">
          <User className="h-12 w-12 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Nenhum paciente selecionado</h2>
        <p className="text-slate-500 max-w-xs">Selecione um paciente na recepção para iniciar a avaliação.</p>
        <Button onClick={() => navigate('/dashboard/recepcao')}>Ir para Recepção</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Avaliação Clínica</h1>
          <p className="text-slate-500">Realize o diagnóstico e planeje o tratamento.</p>
        </div>
        <div className="bg-clinical-blue/10 px-4 py-2 rounded-xl flex items-center gap-2">
          <Stethoscope className="text-clinical-blue h-4 w-4" />
          <span className="text-sm font-bold text-clinical-blue">Paciente: {currentPatient.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Diagnóstico Principal">
            <textarea 
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-clinical-blue focus:outline-none focus:ring-2 focus:ring-clinical-blue/20 min-h-[150px]"
              placeholder="Descreva o diagnóstico clínico do paciente..."
              value={diagnosis}
              onChange={e => setDiagnosis(e.target.value)}
            />
          </Card>

          <Card title="Observações e Histórico">
            <textarea 
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-clinical-blue focus:outline-none focus:ring-2 focus:ring-clinical-blue/20 min-h-[100px]"
              placeholder="Alergias, medicamentos em uso, observações gerais..."
              value={observations}
              onChange={e => setObservations(e.target.value)}
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Resumo do Paciente">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Nome:</span>
                <span className="font-bold text-slate-900">{currentPatient.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Telefone:</span>
                <span className="font-bold text-slate-900">{currentPatient.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Motivo:</span>
                <span className="font-bold text-slate-900">{currentPatient.service}</span>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex gap-3">
                  <AlertCircle className="text-amber-500 h-5 w-5 shrink-0" />
                  <p className="text-xs text-amber-700">Certifique-se de validar todas as informações antes de iniciar o tratamento.</p>
                </div>
              </div>
              <Button 
                className="w-full gap-2 mt-4" 
                disabled={!diagnosis}
                onClick={handleStartTreatment}
              >
                Iniciar Tratamento <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

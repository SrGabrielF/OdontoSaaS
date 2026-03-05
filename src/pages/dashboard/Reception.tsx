import { useState } from 'react';
import { Search, Plus, UserPlus, Phone, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { StatusBadge } from '../../components/StatusBadge';
import { useClinic } from '../../context/ClinicContext';
import { useToast } from '../../context/ToastContext';

export const Reception = () => {
  const { patients, addPatient, selectPatient } = useClinic();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPatient, setNewPatient] = useState({ name: '', phone: '', service: '', date: new Date().toISOString().split('T')[0] });

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    addPatient(newPatient);
    setIsModalOpen(false);
    showToast('Paciente cadastrado com sucesso!', 'success');
    setNewPatient({ name: '', phone: '', service: '', date: new Date().toISOString().split('T')[0] });
  };

  const handleSelectPatient = (patient: any) => {
    selectPatient(patient);
    showToast(`Paciente ${patient.name} selecionado para atendimento.`, 'info');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Recepção</h1>
          <p className="text-slate-500">Gerencie o fluxo de entrada e cadastro de pacientes.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <UserPlus className="h-4 w-4" /> Novo Paciente
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input 
              placeholder="Buscar paciente por nome..." 
              className="pl-10" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filtros
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Paciente</th>
                <th className="px-6 py-4">Contato</th>
                <th className="px-6 py-4">Serviço</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-clinical-blue/10 text-clinical-blue flex items-center justify-center font-bold text-xs">
                        {patient.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-slate-400" /> {patient.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{patient.service}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={patient.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-clinical-blue hover:bg-clinical-blue/10"
                      onClick={() => handleSelectPatient(patient)}
                    >
                      Selecionar
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    Nenhum paciente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Cadastrar Novo Paciente"
      >
        <form onSubmit={handleAddPatient} className="space-y-6">
          <Input 
            label="Nome Completo" 
            placeholder="Ex: Maria Oliveira" 
            required 
            value={newPatient.name}
            onChange={e => setNewPatient({...newPatient, name: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Telefone" 
              placeholder="(11) 99999-9999" 
              required 
              value={newPatient.phone}
              onChange={e => setNewPatient({...newPatient, phone: e.target.value})}
            />
            <Input 
              label="Data da Consulta" 
              type="date" 
              required 
              value={newPatient.date}
              onChange={e => setNewPatient({...newPatient, date: e.target.value})}
            />
          </div>
          <Input 
            label="Serviço Inicial" 
            placeholder="Ex: Limpeza" 
            required 
            value={newPatient.service}
            onChange={e => setNewPatient({...newPatient, service: e.target.value})}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button type="submit">Cadastrar Paciente</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

/**
 * Camada de Serviço para Pacientes
 * No futuro, basta substituir os retornos fixos por chamadas fetch('/api/patients')
 */

export interface Patient {
  id: number;
  name: string;
  status: string;
  phone: string;
  service: string;
  date: string;
}

// Simulação de delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const patientService = {
  async getAll(): Promise<Patient[]> {
    await delay(500);
    return [
      { id: 1, name: 'João Silva', status: 'Aguardando', phone: '(11) 99999-9999', service: 'Limpeza', date: '2024-03-20' },
      { id: 2, name: 'Maria Santos', status: 'Em atendimento', phone: '(11) 88888-8888', service: 'Clareamento', date: '2024-03-20' },
      { id: 3, name: 'Pedro Oliveira', status: 'Finalizado', phone: '(11) 77777-7777', service: 'Ortodontia', date: '2024-03-20' },
    ];
  },

  async create(patient: Omit<Patient, 'id' | 'status'>): Promise<Patient> {
    await delay(800);
    return {
      ...patient,
      id: Date.now(),
      status: 'Aguardando'
    };
  },

  async updateStatus(id: number, status: string): Promise<void> {
    await delay(300);
    console.log(`Status do paciente ${id} atualizado para ${status} no "servidor"`);
  }
};

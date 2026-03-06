import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { patientService, Patient } from '../services/patientService';

interface Procedure {
  id: number;
  name: string;
  price: number;
}

interface ClinicContextType {
  patients: Patient[];
  currentPatient: Patient | null;
  billing: number;
  procedures: Procedure[];
  isLoading: boolean;
  addPatient: (patient: any) => Promise<void>;
  updatePatientStatus: (id: number, status: string) => Promise<void>;
  selectPatient: (patient: Patient | null) => void;
  addBilling: (amount: number) => void;
  refreshPatients: () => Promise<void>;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [billing, setBilling] = useState(1250.00);
  const [procedures] = useState<Procedure[]>([
    { id: 1, name: 'Limpeza Profunda', price: 150.00 },
    { id: 2, name: 'Clareamento a Laser', price: 800.00 },
    { id: 3, name: 'Restauração Resina', price: 250.00 },
    { id: 4, name: 'Extração Simples', price: 300.00 },
    { id: 5, name: 'Implante Dentário', price: 2500.00 },
  ]);

  const refreshPatients = async () => {
    setIsLoading(true);
    try {
      const data = await patientService.getAll();
      setPatients(data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshPatients();
  }, []);

  const addPatient = async (patientData: any) => {
    try {
      const newPatient = await patientService.create(patientData);
      setPatients(prev => [...prev, newPatient]);
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
      throw error;
    }
  };

  const updatePatientStatus = async (id: number, status: string) => {
    try {
      await patientService.updateStatus(id, status);
      setPatients(prev => prev.map(p => p.id === id ? { ...p, status } : p));
      if (currentPatient && currentPatient.id === id) {
        setCurrentPatient({ ...currentPatient, status });
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const selectPatient = (patient: Patient | null) => {
    setCurrentPatient(patient);
  };

  const addBilling = (amount: number) => {
    setBilling(prev => prev + amount);
  };

  return (
    <ClinicContext.Provider value={{
      patients,
      currentPatient,
      billing,
      procedures,
      isLoading,
      addPatient,
      updatePatientStatus,
      selectPatient,
      addBilling,
      refreshPatients
    }}>
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) throw new Error('useClinic must be used within a ClinicProvider');
  return context;
};

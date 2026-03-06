import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, User, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '../../utils/cn';

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  phone: string;
  date: Date;
}

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: '1', patientName: 'Ana Silva', time: '09:00', type: 'Avaliação', phone: '(11) 98888-7777', date: new Date() },
  { id: '2', patientName: 'Bruno Costa', time: '10:30', type: 'Limpeza', phone: '(11) 97777-6666', date: new Date() },
  { id: '3', patientName: 'Carla Souza', time: '14:00', type: 'Ortodontia', phone: '(11) 96666-5555', date: new Date() },
  { id: '4', patientName: 'Diego Oliveira', time: '16:00', type: 'Implante', phone: '(11) 95555-4444', date: addDays(new Date(), 1) },
];

export const Agenda = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = [...Array(7)].map((_, i) => addDays(weekStart, i));

  const appointmentsForSelectedDate = MOCK_APPOINTMENTS.filter(app => 
    isSameDay(app.date, selectedDate)
  ).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Agenda Clínica</h1>
          <p className="text-slate-500">Gerencie seus horários e consultas.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-5 w-5" /> Novo Agendamento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900 capitalize">
                {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
              </h2>
              <div className="flex gap-1">
                <button 
                  onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-600" />
                </button>
                <button 
                  onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <ChevronRight className="h-5 w-5 text-slate-600" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                <span key={`${d}-${i}`} className="text-[10px] font-bold text-slate-400">{d}</span>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((day, i) => {
                const isSelected = isSameDay(day, selectedDate);
                const isToday = isSameDay(day, new Date());
                
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center text-sm transition-all",
                      isSelected ? "bg-clinical-blue text-white font-bold" : "hover:bg-slate-100 text-slate-700",
                      isToday && !isSelected && "border border-clinical-blue text-clinical-blue font-bold"
                    )}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 bg-clinical-blue text-white">
            <h3 className="font-bold mb-2">Resumo do Dia</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm opacity-90">
                <span>Total de Consultas:</span>
                <span className="font-bold">{appointmentsForSelectedDate.length}</span>
              </div>
              <div className="flex justify-between text-sm opacity-90">
                <span>Horários Livres:</span>
                <span className="font-bold">5</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-2">
            <CalendarIcon className="h-5 w-5 text-clinical-blue" />
            {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </div>

          {appointmentsForSelectedDate.length > 0 ? (
            <div className="space-y-3">
              {appointmentsForSelectedDate.map((app) => (
                <Card key={app.id} className="p-4 hover:border-clinical-blue/30 transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-100 h-12 w-12 rounded-full flex items-center justify-center text-clinical-blue font-bold">
                        {app.time}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-clinical-blue transition-colors">
                          {app.patientName}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                            {app.type}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Phone className="h-3 w-3" /> {app.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Ver Prontuário</Button>
                      <Button size="sm">Iniciar Atendimento</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 flex flex-col items-center justify-center text-center border-dashed border-2">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Clock className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Nenhuma consulta agendada</h3>
              <p className="text-slate-500 max-w-xs mx-auto mt-2">
                Não há compromissos para este dia. Aproveite para organizar seus prontuários ou descansar.
              </p>
              <Button className="mt-6 gap-2">
                <Plus className="h-4 w-4" /> Agendar Agora
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

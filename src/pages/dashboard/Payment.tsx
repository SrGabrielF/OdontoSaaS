import { useState } from 'react';
import { CreditCard, Banknote, QrCode, CheckCircle2, Receipt, User, ArrowLeft, Printer } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useClinic } from '../../context/ClinicContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/helpers';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentPatient, updatePatientStatus, addBilling, selectPatient } = useClinic();
  const { showToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { procedures = [], total = 0 } = location.state || {};

  const handlePayment = () => {
    if (!paymentMethod || !currentPatient) return;
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      showToast('Pagamento processado com sucesso!', 'success');
      updatePatientStatus(currentPatient.id, 'Finalizado');
      addBilling(total);
    }, 2000);
  };

  const handleFinish = () => {
    selectPatient(null);
    navigate('/dashboard');
  };

  if (!currentPatient || !location.state) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="bg-slate-100 p-6 rounded-full">
          <User className="h-12 w-12 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Nenhum pagamento pendente</h2>
        <p className="text-slate-500 max-w-xs">Selecione um paciente e realize o tratamento para acessar esta tela.</p>
        <Button onClick={() => navigate('/dashboard/recepcao')}>Ir para Recepção</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div 
            key="payment-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Pagamento</h1>
                <p className="text-slate-500">Selecione a forma de pagamento para finalizar o atendimento.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="Resumo do Atendimento">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-clinical-blue/10 flex items-center justify-center font-bold text-clinical-blue">
                        {currentPatient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{currentPatient.name}</p>
                        <p className="text-xs text-slate-500">{currentPatient.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {procedures.map((p: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-slate-600">{p.name}</span>
                        <span className="font-medium text-slate-900">{formatCurrency(p.price)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900">Total a Pagar:</span>
                      <span className="text-2xl font-black text-clinical-blue">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900">Forma de Pagamento</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'pix', name: 'PIX', icon: QrCode },
                    { id: 'card', name: 'Cartão de Crédito/Débito', icon: CreditCard },
                    { id: 'cash', name: 'Dinheiro', icon: Banknote },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                        paymentMethod === method.id 
                          ? 'border-clinical-blue bg-clinical-blue/5' 
                          : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${
                        paymentMethod === method.id ? 'bg-clinical-blue text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <method.icon className="h-6 w-6" />
                      </div>
                      <span className={`font-bold ${paymentMethod === method.id ? 'text-clinical-blue' : 'text-slate-700'}`}>
                        {method.name}
                      </span>
                    </button>
                  ))}
                </div>

                <Button 
                  className="w-full h-14 text-lg gap-2" 
                  disabled={!paymentMethod}
                  isLoading={isProcessing}
                  onClick={handlePayment}
                >
                  Confirmar Pagamento
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="payment-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-24 h-24 bg-clinical-success rounded-full flex items-center justify-center mb-8 shadow-xl shadow-clinical-success/20">
              <CheckCircle2 className="text-white h-12 w-12" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-4">Pagamento Confirmado!</h1>
            <p className="text-lg text-slate-500 max-w-md mb-12">
              O atendimento de <strong>{currentPatient.name}</strong> foi finalizado com sucesso e o faturamento foi registrado.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
              <Button variant="outline" className="gap-2 h-12">
                <Printer className="h-4 w-4" /> Imprimir Recibo
              </Button>
              <Button variant="outline" className="gap-2 h-12">
                <Receipt className="h-4 w-4" /> Enviar por E-mail
              </Button>
              <Button className="sm:col-span-2 h-12" onClick={handleFinish}>
                Voltar ao Dashboard
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

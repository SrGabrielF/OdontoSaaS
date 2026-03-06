import { useState } from 'react';
import React from "react";
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, MessageSquare, Send, Clock } from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';

export const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Fale Conosco</h1>
              <p className="text-lg text-slate-600">
                Estamos prontos para tirar suas dúvidas e agendar sua consulta. Escolha o canal de sua preferência.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: MapPin, title: 'Endereço', content: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP' },
                { icon: Phone, title: 'Telefone', content: '(11) 3456-7890' },
                { icon: MessageSquare, title: 'WhatsApp', content: '(11) 98765-4321' },
                { icon: Mail, title: 'E-mail', content: 'contato@odontosaas.com.br' },
                { icon: Clock, title: 'Horário', content: 'Seg a Sex: 08h às 20h | Sáb: 08h às 14h' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-clinical-blue/10 p-3 rounded-xl">
                    <item.icon className="text-clinical-blue h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-600">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mock Map */}
            <div className="h-64 bg-slate-200 rounded-3xl overflow-hidden relative border border-slate-300">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                [Mapa Interativo - Google Maps API]
              </div>
              <img 
                src="https://picsum.photos/seed/map/800/400" 
                alt="Mapa" 
                className="w-full h-full object-cover opacity-50 grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8 md:p-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Envie uma mensagem</h3>
              {isSuccess ? (
                <div className="bg-clinical-success/10 border border-clinical-success/20 p-6 rounded-2xl text-center space-y-4">
                  <div className="bg-clinical-success w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                    <Send className="text-white h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-clinical-success">Mensagem Enviada!</h4>
                  <p className="text-slate-600">Obrigado pelo contato. Retornaremos o mais breve possível.</p>
                  <Button variant="outline" onClick={() => setIsSuccess(false)}>Enviar outra</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input 
                    label="Nome Completo" 
                    placeholder="Ex: João Silva" 
                    required 
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="E-mail" 
                      type="email" 
                      placeholder="joao@email.com" 
                      required 
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                    />
                    <Input 
                      label="Telefone" 
                      placeholder="(11) 99999-9999" 
                      required 
                      value={formState.phone}
                      onChange={e => setFormState({...formState, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Mensagem</label>
                    <textarea 
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 transition-all focus:border-clinical-blue focus:outline-none focus:ring-2 focus:ring-clinical-blue/20 min-h-[120px]"
                      placeholder="Como podemos ajudar?"
                      required
                      value={formState.message}
                      onChange={e => setFormState({...formState, message: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2" isLoading={isSubmitting}>
                    Enviar Mensagem <Send className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

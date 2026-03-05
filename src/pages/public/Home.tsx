import { motion } from 'motion/react';
import { ArrowRight, Shield, Clock, Heart, Star } from 'lucide-react';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clinical-blue/10 text-clinical-blue text-sm font-semibold">
                <Shield className="h-4 w-4" />
                Tecnologia de Ponta em Odontologia
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                O sorriso que você sempre <span className="text-clinical-blue">sonhou</span>, agora ao seu alcance.
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                Combinamos excelência clínica com atendimento humanizado para transformar sua experiência odontológica. Agende sua avaliação hoje mesmo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/contato">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Agendar Consulta <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/servicos">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Nossos Serviços
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://picsum.photos/seed/dentist/800/600" 
                  alt="Clínica Odontológica" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-clinical-blue/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Atendimento Rápido', desc: 'Respeitamos seu tempo com agendamentos precisos e sem esperas.' },
              { icon: Heart, title: 'Cuidado Humanizado', desc: 'Tratamos cada paciente como único, focando no seu conforto e bem-estar.' },
              { icon: Star, title: 'Equipe Especializada', desc: 'Profissionais altamente qualificados em diversas áreas da odontologia.' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="bg-clinical-blue/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="text-clinical-blue h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">O que nossos pacientes dizem</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">A satisfação de quem confia em nosso trabalho é nossa maior recompensa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Ana Souza', text: 'Excelente atendimento! Fiz um clareamento e o resultado superou minhas expectativas.', role: 'Paciente de Estética' },
              { name: 'Ricardo Lima', text: 'A equipe é muito profissional e atenciosa. Recomendo a todos que buscam qualidade.', role: 'Paciente de Implante' },
              { name: 'Juliana Costa', text: 'Minha filha adora vir ao dentista agora. O cuidado com as crianças é maravilhoso.', role: 'Mãe de Paciente' },
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-slate-700 italic mb-6">"{t.text}"</p>
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

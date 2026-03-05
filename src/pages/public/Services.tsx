import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Smile, Activity, ArrowRight } from 'lucide-react';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';

export const Services = () => {
  const services = [
    {
      title: 'Limpeza e Prevenção',
      desc: 'Remoção de tártaro e placa bacteriana para manter sua saúde bucal em dia.',
      icon: ShieldCheck,
      price: 'A partir de R$ 150',
      image: 'https://picsum.photos/seed/clean/400/300'
    },
    {
      title: 'Clareamento Dental',
      desc: 'Recupere o brilho do seu sorriso com nossas técnicas de clareamento a laser.',
      icon: Sparkles,
      price: 'A partir de R$ 800',
      image: 'https://picsum.photos/seed/white/400/300'
    },
    {
      title: 'Implantes Dentários',
      desc: 'Soluções definitivas para a perda de dentes com tecnologia de ponta.',
      icon: Activity,
      price: 'Sob consulta',
      image: 'https://picsum.photos/seed/implant/400/300'
    },
    {
      title: 'Ortodontia',
      desc: 'Aparelhos modernos e invisíveis para alinhar seu sorriso com discrição.',
      icon: Smile,
      price: 'Mensalidades fixas',
      image: 'https://picsum.photos/seed/braces/400/300'
    }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Nossos Serviços</h1>
          <p className="text-lg text-slate-600">
            Oferecemos uma gama completa de tratamentos odontológicos, desde a prevenção até procedimentos complexos de estética e reconstrução.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
            >
              <div className="sm:w-1/3 h-48 sm:h-auto overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="bg-clinical-blue/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="text-clinical-blue h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 mb-4">{service.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-bold text-clinical-blue">{service.price}</span>
                  <Link to="/contato">
                    <Button variant="ghost" size="sm" className="gap-2">
                      Saber mais <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-clinical-blue rounded-3xl p-10 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Não encontrou o que procurava?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Realizamos diversos outros procedimentos. Entre em contato para uma avaliação personalizada e descubra o melhor tratamento para você.
          </p>
          <Link to="/contato">
            <Button variant="secondary" size="lg">Falar com Especialista</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

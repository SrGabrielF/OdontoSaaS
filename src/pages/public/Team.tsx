import { motion } from 'motion/react';
import { Linkedin, Mail, Twitter } from 'lucide-react';

export const Team = () => {
  const team = [
    {
      name: 'Dr. Carlos Mendes',
      role: 'Diretor Clínico & Implantodontista',
      desc: 'Especialista em implantes dentários com mais de 15 anos de experiência clínica.',
      image: 'https://picsum.photos/seed/dentist1/400/500'
    },
    {
      name: 'Dra. Beatriz Silva',
      role: 'Ortodontista Especializada',
      desc: 'Expert em alinhadores invisíveis e ortodontia estética para adultos e crianças.',
      image: 'https://picsum.photos/seed/dentist2/400/500'
    },
    {
      name: 'Dr. Felipe Rocha',
      role: 'Especialista em Estética Dental',
      desc: 'Focado em transformações de sorriso com facetas de porcelana e clareamento.',
      image: 'https://picsum.photos/seed/dentist3/400/500'
    },
    {
      name: 'Dra. Mariana Costa',
      role: 'Odontopediatra',
      desc: 'Dedicada ao cuidado gentil e lúdico da saúde bucal infantil.',
      image: 'https://picsum.photos/seed/dentist4/400/500'
    }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Nossa Equipe</h1>
          <p className="text-lg text-slate-600">
            Contamos com um time de especialistas apaixonados por sorrisos, unindo conhecimento técnico e atendimento humanizado.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-72 overflow-hidden relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-clinical-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-4">
                  <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-clinical-blue transition-all">
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-clinical-blue transition-all">
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-clinical-blue transition-all">
                    <Mail className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-clinical-blue mb-3 uppercase tracking-wider">{member.role}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{member.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

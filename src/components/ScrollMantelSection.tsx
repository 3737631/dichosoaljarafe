import { motion } from 'motion/react';
import { BookOpen, UtensilsCrossed, Heart, Phone } from 'lucide-react';

const cards = [
  {
    label: 'Qué ofrecemos',
    title: 'Tapas, arroces y producto',
    text: 'Una carta pensada para compartir: entrantes, fritos, platos del mar, arroces en paella y postres caseros con una mirada contemporánea.',
    icon: BookOpen,
  },
  {
    label: 'Nuestra carta',
    title: 'Sabores que sorprenden',
    text: 'Desde unas croquetas cremosas hasta arroces con personalidad, Dichoso combina cocina cercana, producto cuidado y platos con carácter.',
    icon: UtensilsCrossed,
    btn: { label: 'Ver carta', href: '#carta' },
  },
  {
    label: 'Especiales Dichoso',
    title: 'Los imprescindibles',
    text: 'Navajas, berberechos, tortilla, sándwich de cecina, arroces, tarta de queso y torrija: platos pensados para volver.',
    icon: Heart,
    btn: { label: 'Ver especiales', href: '#especiales' },
  },
  {
    label: 'Reserva y ven',
    title: 'Dichoso el día que entraste por aquí',
    text: 'Reserva tu mesa en Mairena del Aljarafe y disfruta de una experiencia cálida, honesta y diferente.',
    icon: Phone,
    btn: { label: 'Reservar mesa', href: '#reservas' },
    btn2: { label: 'Cómo llegar', href: 'https://maps.google.com/?q=Av.+de+los+Descubrimientos+11,+Mairena+del+Aljarafe' },
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
};

export default function ScrollMantelSection() {
  return (
    <section id="mantel" className="mantel-section">
      <div className="mantel-inner">
        <div className="mantel-header">
          <motion.span
            className="mantel-eyebrow"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Experiencia Dichoso
          </motion.span>
          <motion.h3
            className="mantel-title"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Despliega la mesa
          </motion.h3>
          <motion.p
            className="mantel-desc"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Desliza y descubre nuestra forma de entender la cocina.
          </motion.p>
        </div>

        <div className="mantel-cards">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                className="mantel-card"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className={`mantel-card-body ${i === 3 ? 'mantel-card-dark' : ''}`}>
                  <Icon className="mantel-card-icon" strokeWidth={1.5} />
                  <div>
                    <span className={`mantel-card-label ${i === 3 ? 'text-[#B89168]' : ''}`}>
                      {c.label}
                    </span>
                    <h4 className={`mantel-card-title ${i === 3 ? 'text-[#FAF7F2]' : ''}`}>
                      {c.title}
                    </h4>
                    <p className={`mantel-card-text ${i === 3 ? 'text-[#FAF7F2]/85' : ''}`}>
                      {c.text}
                    </p>
                    {c.btn && (
                      <a href={c.btn.href} className="mantel-btn">
                        {c.btn.label}
                      </a>
                    )}
                    {c.btn2 && (
                      <div className="mantel-btn-row">
                        <a href={c.btn.href} className="mantel-btn">
                          {c.btn.label}
                        </a>
                        <a
                          href={c.btn2.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mantel-btn-outline"
                        >
                          {c.btn2.label}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

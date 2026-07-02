import { motion } from 'motion/react';
import { BookOpen, UtensilsCrossed, Heart, Phone } from 'lucide-react';

const rows = [
  {
    label: 'Qué ofrecemos',
    title: 'Tapas, arroces y producto',
    text: 'Una carta pensada para compartir: entrantes, fritos, platos del mar, arroces en paella y postres caseros con una mirada contemporánea.',
    icon: BookOpen,
    visualFirst: true,
  },
  {
    label: 'Nuestra carta',
    title: 'Sabores que sorprenden',
    text: 'Desde unas croquetas cremosas hasta arroces con personalidad, Dichoso combina cocina cercana, producto cuidado y platos con carácter.',
    icon: UtensilsCrossed,
    visualFirst: false,
    btn: { label: 'Ver carta', href: '#carta' },
  },
  {
    label: 'Especiales Dichoso',
    title: 'Los imprescindibles',
    text: 'Navajas, berberechos, tortilla, sándwich de cecina, arroces, tarta de queso y torrija: platos pensados para volver.',
    icon: Heart,
    visualFirst: true,
    btn: { label: 'Ver especiales', href: '#especiales' },
  },
  {
    label: 'Reserva y ven',
    title: 'Dichoso el día que entraste por aquí',
    text: 'Reserva tu mesa en Mairena del Aljarafe y disfruta de una experiencia cálida, honesta y diferente.',
    icon: Phone,
    visualFirst: false,
    btn: { label: 'Reservar mesa', href: '#reservas' },
    btn2: { label: 'Cómo llegar', href: 'https://maps.google.com/?q=Av.+de+los+Descubrimientos+11,+Mairena+del+Aljarafe' },
    isDark: true,
  },
];

function Placeholder({ index }: { index: number }) {
  return (
    <div className="mantel-visual">
      <div className="mantel-visual-inner">
        <span className="mantel-visual-brand">Dichoso</span>
        <div className="mantel-visual-icon">
          {index === 0 && <BookOpen size={28} strokeWidth={1} />}
          {index === 1 && <UtensilsCrossed size={28} strokeWidth={1} />}
          {index === 2 && <Heart size={28} strokeWidth={1} />}
          {index === 3 && <Phone size={28} strokeWidth={1} />}
        </div>
        <span className="mantel-visual-label">Imagen próximamente</span>
      </div>
    </div>
  );
}

function TextBlock({ row, index }: { row: typeof rows[0]; index: number }) {
  const Icon = row.icon;
  return (
    <div className={`mantel-text ${row.isDark ? 'mantel-text-dark' : ''}`}>
      <div className="mantel-text-body">
        <Icon className="mantel-text-icon" strokeWidth={1.5} />
        <span className="mantel-text-label">{row.label}</span>
        <h3 className="mantel-text-title">{row.title}</h3>
        <p className="mantel-text-desc">{row.text}</p>
        {row.btn && (
          <a href={row.btn.href} className="mantel-btn">{row.btn.label}</a>
        )}
        {row.btn2 && (
          <div className="mantel-btn-row">
            <a href={row.btn.href} className="mantel-btn">{row.btn.label}</a>
            <a href={row.btn2.href} target="_blank" rel="noreferrer" className="mantel-btn-outline">{row.btn2.label}</a>
          </div>
        )}
      </div>
    </div>
  );
}

const visualVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -60 : 60,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.12 },
  },
};

export default function ScrollMantelSection() {
  return (
    <section id="mantel" className="mantel-section">
      <div className="mantel-container">
        <div className="mantel-intro">
          <motion.span
            className="mantel-eyebrow"
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Experiencia Dichoso
          </motion.span>
          <motion.h2
            className="mantel-heading"
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Despliega la mesa
          </motion.h2>
          <motion.p
            className="mantel-sub"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            Desliza y descubre nuestra forma de entender la cocina.
          </motion.p>
        </div>

        <div className="mantel-rows">
          {rows.map((row, i) => (
            <div key={row.label} className="mantel-row">
              <div className="mantel-row-grid">
                {row.visualFirst ? (
                  <>
                    <motion.div
                      className="mantel-col-visual"
                      variants={visualVariants}
                      initial="hidden"
                      whileInView="visible"
                      custom={i}
                      viewport={{ once: false, amount: 0.3 }}
                    >
                      <Placeholder index={i} />
                    </motion.div>
                    <motion.div
                      className="mantel-col-text"
                      variants={textVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.3 }}
                    >
                      <TextBlock row={row} index={i} />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      className="mantel-col-text"
                      variants={textVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.3 }}
                    >
                      <TextBlock row={row} index={i} />
                    </motion.div>
                    <motion.div
                      className="mantel-col-visual"
                      variants={visualVariants}
                      initial="hidden"
                      whileInView="visible"
                      custom={i}
                      viewport={{ once: false, amount: 0.3 }}
                    >
                      <Placeholder index={i} />
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

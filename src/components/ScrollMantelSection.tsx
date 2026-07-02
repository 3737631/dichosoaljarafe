import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BookOpen, UtensilsCrossed, Heart, Phone } from 'lucide-react';

const desktopRows = [
  {
    label: 'Qué ofrecemos', title: 'Tapas, arroces y producto',
    text: 'Una carta pensada para compartir: entrantes, fritos, platos del mar, arroces en paella y postres caseros con una mirada contemporánea.',
    icon: BookOpen, visualFirst: true,
    btn: { label: 'Ver carta', href: '#carta' },
  },
  {
    label: 'Nuestra carta', title: 'Sabores que sorprenden',
    text: 'Desde unas croquetas cremosas hasta arroces con personalidad, Dichoso combina cocina cercana, producto cuidado y platos con carácter.',
    icon: UtensilsCrossed, visualFirst: false,
    btn: { label: 'Ver carta', href: '#carta' },
  },
  {
    label: 'Especiales Dichoso', title: 'Los imprescindibles',
    text: 'Navajas, berberechos, tortilla, sándwich de cecina, arroces, tarta de queso y torrija: platos pensados para volver.',
    icon: Heart, visualFirst: true,
    btn: { label: 'Ver especiales', href: '#especiales' },
  },
  {
    label: 'Reserva y ven', title: 'Dichoso el día que entraste por aquí',
    text: 'Reserva tu mesa en Mairena del Aljarafe y disfruta de una experiencia cálida, honesta y diferente.',
    icon: Phone, visualFirst: false, isDark: true,
    btn: { label: 'Reservar mesa', href: '#reservas' },
    btn2: { label: 'Cómo llegar', href: 'https://maps.google.com/?q=Av.+de+los+Descubrimientos+11,+Mairena+del+Aljarafe' },
  },
];

const mobileCards = [
  { label: 'Qué ofrecemos', title: 'Tapas, arroces y producto', text: 'Entrantes, fritos, platos del mar, arroces en paella y postres caseros para compartir.', icon: BookOpen, btn: { label: 'Ver carta', href: '#carta' } },
  { label: 'Nuestra carta', title: 'Sabores que sorprenden', text: 'Cocina cercana, producto cuidado y platos con carácter.', icon: UtensilsCrossed, btn: { label: 'Ver carta', href: '#carta' } },
  { label: 'Especiales Dichoso', title: 'Los imprescindibles', text: 'Navajas, berberechos, croquetas, tortilla, arroces, tarta de queso y torrija.', icon: Heart, btn: { label: 'Ver especiales', href: '#especiales' } },
  { label: 'Reserva y ven', title: 'Dichoso el día que entraste por aquí', text: 'Reserva tu mesa en Mairena del Aljarafe y disfruta de una experiencia cálida y diferente.', icon: Phone, btn: { label: 'Reservar mesa', href: '#reservas' }, isDark: true },
];

function Placeholder({ icon: Icon }: { icon: typeof BookOpen }) {
  return (
    <div className="mantel-visual">
      <div className="mantel-visual-bg">
        <span className="mantel-visual-brand">Dichoso</span>
        <div className="mantel-visual-overlay">
          <Icon size={26} strokeWidth={1} className="mantel-visual-icon" />
          <span className="mantel-visual-tag">Imagen próximamente</span>
        </div>
      </div>
    </div>
  );
}

function DesktopText({ row }: { row: typeof desktopRows[0] }) {
  const Icon = row.icon;
  return (
    <div className={`mantel-text ${row.isDark ? 'mantel-text-dark' : ''}`}>
      <div className="mantel-text-body">
        <Icon className="mantel-text-icon" strokeWidth={1.5} />
        <span className="mantel-text-label">{row.label}</span>
        <h3 className="mantel-text-title">{row.title}</h3>
        <p className="mantel-text-desc">{row.text}</p>
        <div className="mantel-text-actions">
          {row.btn && <a href={row.btn.href} className="mantel-btn">{row.btn.label}</a>}
          {row.btn2 && <a href={row.btn2.href} target="_blank" rel="noreferrer" className="mantel-btn-outline">{row.btn2.label}</a>}
        </div>
      </div>
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function ScrollMantelSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const clothScale = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section id="experiencia" ref={sectionRef} className="mantel-section">
      <motion.div
        className="mantel-bg"
        style={{ scaleY: clothScale, transformOrigin: 'top' }}
      />

      <div className="mantel-container">
        {/* Desktop alternating rows */}
        <div className="mantel-desktop">
          {desktopRows.map((row, i) => (
            <div key={row.label} className="mantel-row">
              <div className="mantel-row-grid">
                {row.visualFirst ? (
                  <>
                    <motion.div className="mantel-col"
                      initial={{ opacity: 0, x: -32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.25 }}
                      transition={{ duration: 0.65, ease }}
                    >
                      <Placeholder icon={row.icon} />
                    </motion.div>
                    <motion.div className="mantel-col"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.25 }}
                      transition={{ duration: 0.65, ease, delay: 0.08 }}
                    >
                      <DesktopText row={row} />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div className="mantel-col"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.25 }}
                      transition={{ duration: 0.65, ease, delay: 0.08 }}
                    >
                      <DesktopText row={row} />
                    </motion.div>
                    <motion.div className="mantel-col"
                      initial={{ opacity: 0, x: 32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.25 }}
                      transition={{ duration: 0.65, ease }}
                    >
                      <Placeholder icon={row.icon} />
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile compact cards */}
        <div className="mantel-mobile">
          <div className="mantel-mobile-header">
            <span className="mantel-mobile-eyebrow">Experiencia Dichoso</span>
            <p className="mantel-mobile-sub">Tapas, arroces y producto para compartir</p>
          </div>
          <div className="mantel-mobile-grid">
            {mobileCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  className={`mantel-mobile-card ${card.isDark ? 'mantel-mobile-dark' : ''}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.07 }}
                >
                  <div className="mantel-mobile-card-row">
                    <div className={`mantel-mobile-icon-wrap ${card.isDark ? 'mantel-mobile-icon-dark' : ''}`}>
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div className="mantel-mobile-card-body">
                      <span className="mantel-mobile-label">{card.label}</span>
                      <h4 className="mantel-mobile-title">{card.title}</h4>
                      <p className="mantel-mobile-text">{card.text}</p>
                      {card.btn && (
                        <a href={card.btn.href} className={`mantel-mobile-btn ${card.isDark ? 'mantel-mobile-btn-dark' : ''}`}>
                          {card.btn.label}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

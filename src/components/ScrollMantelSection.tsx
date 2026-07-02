import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BookOpen, UtensilsCrossed, Heart, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

const rows = [
  {
    label: 'Qué ofrecemos',
    title: 'Tapas, arroces y producto',
    text: 'Una carta pensada para compartir: entrantes, fritos, platos del mar, arroces en paella y postres caseros con una mirada contemporánea.',
    icon: BookOpen,
    visualFirst: true,
    btn: { label: 'Ver carta', href: '#carta' },
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
    isDark: true,
    btn: { label: 'Reservar mesa', href: '#reservas' },
    btn2: { label: 'Cómo llegar', href: 'https://maps.google.com/?q=Av.+de+los+Descubrimientos+11,+Mairena+del+Aljarafe' },
  },
];

function Placeholder({ icon: Icon }: { icon: typeof BookOpen }) {
  return (
    <div className="mantel-visual">
      <div className="mantel-visual-bg">
        <span className="mantel-visual-brand">Dichoso</span>
        <div className="mantel-visual-overlay">
          <div className="mantel-visual-icon"><Icon size={26} strokeWidth={1} /></div>
          <span className="mantel-visual-tag">Imagen próximamente</span>
        </div>
      </div>
    </div>
  );
}

function TextBlock({ row }: { row: typeof rows[0] }) {
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

  const [cardIdx, setCardIdx] = useState(0);
  const total = rows.length;

  return (
    <section id="experiencia" ref={sectionRef} className="mantel-section">
      <motion.div
        className="mantel-bg"
        style={{ scaleY: clothScale, transformOrigin: 'top' }}
      />

      <div className="mantel-container">
        {/* Desktop */}
        <div className="mantel-desktop">
          {rows.map((row, i) => (
            <div key={row.label} className="mantel-row">
              <div className="mantel-row-grid">
                {row.visualFirst ? (
                  <>
                    <motion.div className="mantel-col-visual"
                      initial={{ opacity: 0, x: -32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.25 }}
                      transition={{ duration: 0.65, ease }}
                    >
                      <Placeholder icon={row.icon} />
                    </motion.div>
                    <motion.div className="mantel-col-text"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.25 }}
                      transition={{ duration: 0.65, ease, delay: 0.08 }}
                    >
                      <TextBlock row={row} />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div className="mantel-col-text"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.25 }}
                      transition={{ duration: 0.65, ease, delay: 0.08 }}
                    >
                      <TextBlock row={row} />
                    </motion.div>
                    <motion.div className="mantel-col-visual"
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

        {/* Mobile carousel */}
        <div className="mantel-mobile">
          <div className="mantel-carousel-viewport">
            <motion.div className="mantel-carousel-track"
              animate={{ x: -(cardIdx * 100) + '%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
            >
              {rows.map((row, i) => (
                <div key={i} className="mantel-carousel-slide">
                  <Placeholder icon={row.icon} />
                  <TextBlock row={row} />
                </div>
              ))}
            </motion.div>
          </div>
          <div className="mantel-carousel-controls">
            <button className="mantel-carousel-arrow" onClick={() => setCardIdx(Math.max(0, cardIdx - 1))} disabled={cardIdx === 0}><ChevronLeft size={16} /></button>
            <div className="mantel-carousel-dots">
              {rows.map((_, i) => (
                <button key={i} className={`mantel-carousel-dot ${i === cardIdx ? 'active' : ''}`} onClick={() => setCardIdx(i)} />
              ))}
            </div>
            <button className="mantel-carousel-arrow" onClick={() => setCardIdx(Math.min(total - 1, cardIdx + 1))} disabled={cardIdx === total - 1}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

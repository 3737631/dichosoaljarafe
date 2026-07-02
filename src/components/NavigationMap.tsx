import { useState, useEffect } from 'react';
import { Compass, X } from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'nosotros', label: 'Filosofía' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'carta', label: 'Carta' },
  { id: 'especiales', label: 'Especiales' },
  { id: 'resenas', label: 'Reseñas' },
  { id: 'reservas', label: 'Reservas' },
  { id: 'contacto', label: 'Ubicación' },
];

export default function NavigationMap() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <div className={`navmap ${open ? 'navmap-open' : ''}`}>
      <button className="navmap-toggle" onClick={() => setOpen(!open)} aria-label="Mapa Dichoso">
        {open ? <X size={18} /> : <Compass size={18} />}
        <span className="navmap-toggle-label">Mapa</span>
      </button>

      {open && (
        <div className="navmap-menu">
          <div className="navmap-title">Mapa Dichoso</div>
          <nav className="navmap-list">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`navmap-item ${active === s.id ? 'active' : ''}`}
                onClick={() => scrollTo(s.id)}
              >
                <span className="navmap-dot" />
                <span className="navmap-item-label">{s.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

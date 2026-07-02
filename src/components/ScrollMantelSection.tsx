import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { UtensilsCrossed, BookOpen, Heart, Phone } from 'lucide-react';

const MANTEL = '#C9AA7A';

export default function ScrollMantelSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 32,
    restDelta: 0.003,
  });

  const clothH = useTransform(smooth, [0, 0.55], ['0%', '100%']);

  const cards = [
    { idx: 0, label: 'Qué ofrecemos', title: 'Tapas, arroces y producto', text: 'Una carta pensada para compartir: entrantes, fritos, platos del mar, arroces en paella y postres caseros con una mirada contemporánea.', icon: BookOpen, },
    { idx: 1, label: 'Nuestra carta', title: 'Sabores que sorprenden', text: 'Desde unas croquetas cremosas hasta arroces con personalidad, Dichoso combina cocina cercana, producto cuidado y platos con carácter.', icon: UtensilsCrossed, hasBtn: true, btnLabel: 'Ver carta', btnHref: '#carta', },
    { idx: 2, label: 'Especiales Dichoso', title: 'Los imprescindibles', text: 'Navajas, berberechos, tortilla, sándwich de cecina, arroces, tarta de queso y torrija: platos pensados para volver.', icon: Heart, hasBtn: true, btnLabel: 'Ver especiales', btnHref: '#especiales', },
    { idx: 3, label: 'Reserva y ven', title: 'Dichoso el día que entraste por aquí', text: 'Reserva tu mesa en Mairena del Aljarafe y disfruta de una experiencia cálida, honesta y diferente.', icon: Phone, hasBtn2: true, btnLabel: 'Reservar mesa', btnHref: '#reservas', btnLabel2: 'Cómo llegar', btnHref2: 'https://maps.google.com/?q=Av.+de+los+Descubrimientos+11,+Mairena+del+Aljarafe', },
  ];

  function useCardProgress(i: number) {
    const start = [0.12, 0.28, 0.44, 0.60][i];
    const end = start + 0.20;
    return {
      opacity: useTransform(smooth, [start, end], [0, 1]),
      y: useTransform(smooth, [start, end], [28, 0]),
    };
  }

  function useMobileProgress(i: number) {
    const start = [0.10, 0.24, 0.40, 0.56][i];
    const end = start + 0.16;
    return {
      opacity: useTransform(smooth, [start, end], [0, 1]),
      y: useTransform(smooth, [start, end], [20, 0]),
    };
  }

  const tooltipOpacity = useTransform(smooth, [0, 0.18], [1, 0]);
  const tooltipY = useTransform(smooth, [0, 0.18], [0, -20]);

  return (
    <div id="mantel" ref={containerRef} className="relative w-full" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#FAF7F2] flex flex-col justify-between select-none">

        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236B4B34' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Tooltip */}
        <motion.div
          style={{ opacity: tooltipOpacity, y: tooltipY }}
          className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-6 pointer-events-none text-center"
        >
          <div className="bg-white/90 border border-[#D9CDBE] p-5 sm:p-6 shadow-sm">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#B89168] font-sans">
              Experiencia Dichoso
            </span>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#4E3525] mt-1 uppercase tracking-wide">
              Despliega la mesa
            </h3>
            <p className="text-xs text-[#7A6553] font-sans mt-2 leading-relaxed">
              Desliza lentamente y descubre nuestra forma de entender la cocina.
            </p>
          </div>
        </motion.div>

        {/* Tablecloth */}
        <motion.div
          style={{ height: clothH }}
          className="absolute top-0 left-0 w-full z-10 flex flex-col justify-center overflow-hidden"
        >
          {/* Cloth gradient background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `linear-gradient(180deg, ${MANTEL} 0%, #D4B896 100%)`,
            }}
          />
          {/* Subtle fabric texture */}
          <div
            className="absolute inset-0 z-0 opacity-[0.06]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)`,
            }}
          />

          {/* Decorative bottom edge */}
          <div className="absolute bottom-0 left-0 w-full z-20 translate-y-[90%] pointer-events-none">
            <svg viewBox="0 0 1440 36" fill={MANTEL} className="w-full h-9" preserveAspectRatio="none">
              <path d="M0,0 Q30,14 60,0 T120,0 T180,0 T240,0 T300,0 T360,0 T420,0 T480,0 T540,0 T600,0 T660,0 T720,0 T780,0 T840,0 T900,0 T960,0 T1020,0 T1080,0 T1140,0 T1200,0 T1260,0 T1320,0 T1380,0 T1440,0 L1440,36 L0,36 Z" />
            </svg>
          </div>

          {/* Cards container */}
          <div className="relative z-10 w-full max-w-[1100px] mx-auto px-4 sm:px-6 py-12 md:py-16">
            {/* Desktop 2-col */}
            <div className="hidden md:grid grid-cols-2 gap-5 lg:gap-6">
              {cards.map((c, i) => {
                const { opacity, y } = useCardProgress(i);
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.idx}
                    style={{ opacity, y }}
                    className={`border ${i === 3 ? 'bg-[#6B4B34] text-[#FAF7F2] border-[#6B4B34]/20' : 'bg-white/92 border-[#D9CDBE]'} p-6 lg:p-7 relative overflow-hidden`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`shrink-0 mt-0.5 ${i === 3 ? 'text-[#B89168]' : 'text-[#B89168]'}`}>
                        <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <span className={`text-[9px] font-bold uppercase tracking-[0.2em] font-sans block ${i === 3 ? 'text-[#B89168]' : 'text-[#B89168]'}`}>
                          {c.label}
                        </span>
                        <h4 className={`font-serif font-bold text-lg leading-tight uppercase tracking-wide ${i === 3 ? 'text-[#FAF7F2]' : 'text-[#4E3525]'}`}>
                          {c.title}
                        </h4>
                        <p className={`text-xs leading-relaxed font-sans ${i === 3 ? 'text-[#FAF7F2]/85' : 'text-[#7A6553]'}`}>
                          {c.text}
                        </p>
                        {c.hasBtn && (
                          <a href={c.btnHref} className={`inline-block mt-3 px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest font-sans transition-colors pointer-events-auto ${i === 3 ? 'bg-[#B89168] text-[#FAF7F2]' : 'bg-[#4E3525] text-[#FAF7F2]'}`}>
                            {c.btnLabel}
                          </a>
                        )}
                        {c.hasBtn2 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            <a href={c.btnHref} className="inline-block px-4 py-1.5 bg-[#B89168] text-[#FAF7F2] text-[9px] font-bold uppercase tracking-widest font-sans transition-colors pointer-events-auto">
                              {c.btnLabel}
                            </a>
                            <a href={c.btnHref2} target="_blank" rel="noreferrer" className="inline-block px-4 py-1.5 border border-[#B89168] text-[#B89168] text-[9px] font-bold uppercase tracking-widest font-sans transition-colors pointer-events-auto">
                              {c.btnLabel2}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile stacked */}
            <div className="md:hidden relative w-full min-h-[60vh] flex items-center justify-center">
              {cards.map((c, i) => {
                const { opacity, y } = useMobileProgress(i);
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.idx}
                    style={{ opacity, y }}
                    className={`absolute inset-x-0 border p-5 ${i === 3 ? 'bg-[#6B4B34] text-[#FAF7F2] border-[#6B4B34]/20' : 'bg-white/92 border-[#D9CDBE]'}`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${i === 3 ? 'text-[#B89168]' : 'text-[#B89168]'}`} strokeWidth={1.5} />
                      <div>
                        <span className={`text-[8px] font-bold uppercase tracking-[0.18em] font-sans block ${i === 3 ? 'text-[#B89168]' : 'text-[#B89168]'}`}>
                          {c.label}
                        </span>
                        <h4 className={`font-serif font-bold text-base leading-tight uppercase tracking-wide mt-0.5 ${i === 3 ? 'text-[#FAF7F2]' : 'text-[#4E3525]'}`}>
                          {c.title}
                        </h4>
                        <p className={`text-[11px] leading-relaxed font-sans mt-1 ${i === 3 ? 'text-[#FAF7F2]/85' : 'text-[#7A6553]'}`}>
                          {c.text}
                        </p>
                        {c.hasBtn && (
                          <a href={c.btnHref} className={`inline-block mt-2.5 px-3.5 py-1 text-[8px] font-bold uppercase tracking-widest font-sans ${i === 3 ? 'bg-[#B89168] text-[#FAF7F2]' : 'bg-[#4E3525] text-[#FAF7F2]'}`}>
                            {c.btnLabel}
                          </a>
                        )}
                        {c.hasBtn2 && (
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            <a href={c.btnHref} className="inline-block px-3.5 py-1 bg-[#B89168] text-[#FAF7F2] text-[8px] font-bold uppercase tracking-widest font-sans">
                              {c.btnLabel}
                            </a>
                            <a href={c.btnHref2} target="_blank" rel="noreferrer" className="inline-block px-3.5 py-1 border border-[#B89168] text-[#B89168] text-[8px] font-bold uppercase tracking-widest font-sans">
                              {c.btnLabel2}
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
        </motion.div>

        {/* Side scroll tracker */}
        <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-3 text-[#7A6553]/30 font-mono text-[8px]">
          <span className="rotate-90 origin-center translate-y-3 uppercase tracking-[0.2em]">DESCUBRE</span>
          <div className="w-[1px] h-14 bg-[#D9CDBE]/40 relative">
            <motion.div style={{ scaleY: smooth, originY: 0 }} className="absolute inset-0 bg-[#B89168]" />
          </div>
          <span className="rotate-90 origin-center -translate-y-1 uppercase tracking-[0.2em]">VEN</span>
        </div>

      </div>
    </div>
  );
}

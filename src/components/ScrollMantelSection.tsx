import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { BookOpen, UtensilsCrossed, Heart, Phone, MapPin, Calendar } from 'lucide-react';

export default function ScrollMantelSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.002
  });

  const tableclothHeight = useTransform(smoothProgress, [0, 0.32], ['12%', '100%']);
  const tableclothWaveY = useTransform(smoothProgress, (p) => Math.sin(p * Math.PI * 4.5) * 5);

  // Desktop transforms — wider windows for smooth transitions at any speed
  const item1Opacity = useTransform(smoothProgress, [0.22, 0.44], [0, 1]);
  const item1Scale = useTransform(smoothProgress, [0.22, 0.46], [0.94, 1]);
  const item1Y = useTransform(smoothProgress, [0.22, 0.46], [30, 0]);
  const item1Rotate = useTransform(smoothProgress, [0.22, 0.46], [-3, -1]);

  const item2Opacity = useTransform(smoothProgress, [0.38, 0.60], [0, 1]);
  const item2Scale = useTransform(smoothProgress, [0.38, 0.62], [0.94, 1]);
  const item2Y = useTransform(smoothProgress, [0.38, 0.62], [30, 0]);
  const item2Rotate = useTransform(smoothProgress, [0.38, 0.62], [4, 1]);

  const item3Opacity = useTransform(smoothProgress, [0.54, 0.76], [0, 1]);
  const item3Scale = useTransform(smoothProgress, [0.54, 0.78], [0.94, 1]);
  const item3Y = useTransform(smoothProgress, [0.54, 0.78], [30, 0]);
  const item3Rotate = useTransform(smoothProgress, [0.54, 0.78], [-2, 0.5]);

  const item4Opacity = useTransform(smoothProgress, [0.70, 0.90], [0, 1]);
  const item4Scale = useTransform(smoothProgress, [0.70, 0.92], [0.94, 1]);
  const item4Y = useTransform(smoothProgress, [0.70, 0.92], [30, 0]);
  const item4Rotate = useTransform(smoothProgress, [0.70, 0.92], [3, -0.5]);

  // Mobile transforms — wide cross-fade windows so no speed skips
  const mItem1Opacity = useTransform(smoothProgress, [0.20, 0.28, 0.44, 0.52], [0, 1, 1, 0]);
  const mItem1Y = useTransform(smoothProgress, [0.20, 0.28, 0.44, 0.52], [20, 0, 0, -20]);

  const mItem2Opacity = useTransform(smoothProgress, [0.44, 0.52, 0.66, 0.74], [0, 1, 1, 0]);
  const mItem2Y = useTransform(smoothProgress, [0.44, 0.52, 0.66, 0.74], [20, 0, 0, -20]);

  const mItem3Opacity = useTransform(smoothProgress, [0.56, 0.64, 0.76, 0.82], [0, 1, 1, 0]);
  const mItem3Y = useTransform(smoothProgress, [0.56, 0.64, 0.76, 0.82], [20, 0, 0, -20]);

  const mItem4Opacity = useTransform(smoothProgress, [0.72, 0.82, 1.0, 1.0], [0, 1, 1, 1]);
  const mItem4Y = useTransform(smoothProgress, [0.72, 0.82], [20, 0]);

  return (
    <div 
      id="mantel-sensorial"
      ref={containerRef} 
      className="relative w-full"
      style={{ height: '500vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-surface flex flex-col justify-between select-none">
        
        {/* Wood lines */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <div className="w-full h-full flex justify-between px-8 sm:px-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-[1px] h-full bg-brown shadow-[0_0_8px_rgba(107,90,69,0.3)]"></div>
            ))}
          </div>
        </div>

        {/* Intro tooltip */}
        <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 text-center z-30 max-w-sm sm:max-w-md w-full px-6 pointer-events-none">
          <motion.div 
            style={{ 
              opacity: useTransform(smoothProgress, [0, 0.18], [1, 0]),
              y: useTransform(smoothProgress, [0, 0.18], [0, -25])
            }}
            className="bg-surface/95 border border-border p-5 sm:p-6 shadow-xl rounded-none backdrop-blur-sm"
          >
            <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-accent">
              Experiencia Sensorial
            </span>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-text mt-1 uppercase tracking-wide">
              Viste Nuestra Mesa
            </h3>
            <p className="text-xs text-brown font-sans mt-2 leading-relaxed">
              Desplázate hacia abajo lentamente para extender el mantel de terracota y descubrir nuestra historia y especialidades sobre él.
            </p>

          </motion.div>
        </div>

        {/* The tablecloth */}
        <motion.div 
          style={{ 
            height: tableclothHeight,
            y: tableclothWaveY,
            backgroundColor: '#B8826A'
          }}
          className="absolute top-0 left-0 w-full z-10 shadow-[0_15px_40px_rgba(63,52,40,0.18)] flex flex-col justify-between overflow-hidden"
        >
          <div 
            className="absolute inset-0 opacity-[0.14] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(0deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '10px 10px'
            }}
          />

          {/* SVG Wavy Trim */}
          <div className="absolute bottom-0 left-0 w-full z-25 translate-y-[96%] pointer-events-none select-none">
            <svg 
              viewBox="0 0 1440 48" 
              fill="#B8826A" 
              className="w-full h-12 drop-shadow-[0_8px_4px_rgba(63,52,40,0.15)]"
              preserveAspectRatio="none"
            >
              <path d="M0,0 Q30,18 60,0 T120,0 T180,0 T240,0 T300,0 T360,0 T420,0 T480,0 T540,0 T600,0 T660,0 T720,0 T780,0 T840,0 T900,0 T960,0 T1020,0 T1080,0 T1140,0 T1200,0 T1260,0 T1320,0 T1380,0 T1440,0 L1440,48 L0,48 Z" />
            </svg>
            <svg 
              viewBox="0 0 1440 24" 
              fill="none" 
              stroke="#F3EEE4" 
              strokeWidth="2" 
              strokeDasharray="4 6"
              className="w-full h-6 -mt-10 opacity-35"
              preserveAspectRatio="none"
            >
              <path d="M0,0 Q30,12 60,0 T120,0 T180,0 T240,0 T300,0 T360,0 T420,0 T480,0 T540,0 T600,0 T660,0 T720,0 T780,0 T840,0 T900,0 T960,0 T1020,0 T1080,0 T1140,0 T1200,0 T1260,0 T1320,0 T1380,0 T1440,0" />
            </svg>
          </div>
          
          <div className="w-full h-full max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20 flex flex-col justify-center relative z-20 overflow-hidden">
            
            {/* Desktop balanced layout */}
            <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8 items-center justify-center">
              
              <motion.div 
                style={{ opacity: item1Opacity, scale: item1Scale, y: item1Y, rotate: item1Rotate }}
                className="bg-surface p-7 border border-border rounded-none relative overflow-hidden"
              >
                <div className="absolute -right-6 -bottom-6 w-24 h-24 text-accent/10 pointer-events-none">
                  <BookOpen className="w-full h-full stroke-[1]" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent font-sans flex items-center gap-1.5 mb-2">
                  <BookOpen className="w-3 h-3" /> Desde 1994
                </span>
                <h4 className="font-serif font-bold text-xl text-text leading-none mb-3 uppercase tracking-wide">
                  Nuestra Historia
                </h4>
                <p className="text-xs sm:text-sm text-text/90 leading-relaxed font-sans">
                  Venta El Capricho nació del sueño de reunir a las familias del Aljarafe sevillano en torno a una mesa generosa y honesta. Cada rincón evoca la calidez de antaño, donde la hospitalidad andaluza se sirve con el cariño de quien recibe a sus propios hermanos en casa.
                </p>
                <div className="mt-4 pt-3.5 border-t border-border/50 flex items-center justify-between text-[10px] text-brown font-mono">
                  <span>SABOR AUTÉNTICO</span>
                  <span>ALJARAFE DE SEVILLA</span>
                </div>
              </motion.div>

              <motion.div 
                style={{ opacity: item2Opacity, scale: item2Scale, y: item2Y, rotate: item2Rotate }}
                className="bg-background p-6 rounded-full aspect-square max-w-[320px] lg:max-w-[340px] mx-auto border-4 border-surface flex flex-col justify-center items-center text-center relative overflow-hidden"
              >
                <div className="absolute inset-2.5 rounded-full border border-dashed border-border/30 pointer-events-none" />
                <div className="absolute inset-4 rounded-full border border-border/50 pointer-events-none" />
                <div className="p-2.5 bg-accent/10 rounded-full mb-2.5 relative z-10">
                  <UtensilsCrossed className="w-4 h-4 text-accent" />
                </div>
                <h4 className="font-serif font-bold text-lg text-text mb-1 relative z-10 uppercase tracking-wide">
                  Especialidades
                </h4>
                <p className="text-xs text-text/95 leading-relaxed font-sans max-w-[210px] relative z-10 mb-3">
                  Las célebres croquetas cremosas de jamón ibérico, nuestras carnes nobles a la brasa y el tradicional arroz hecho a fuego lento.
                </p>
                <a href="#carta" className="px-3.5 py-1.5 bg-text hover:bg-brown text-[8px] font-bold text-white uppercase tracking-widest transition-colors duration-200 pointer-events-auto rounded-none relative z-10">
                  Ver la Carta Completa
                </a>
              </motion.div>

              <motion.div 
                style={{ opacity: item3Opacity, scale: item3Scale, y: item3Y, rotate: item3Rotate }}
                className="bg-surface p-7 border-4 border-double border-border rounded-none relative overflow-hidden"
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent font-sans flex items-center gap-1.5 mb-2">
                  <Heart className="w-3 h-3 text-accent" /> Celebraciones
                </span>
                <h4 className="font-serif font-bold text-xl text-text leading-none mb-3 uppercase tracking-wide">
                  Comuniones, Bautizos y Bodas
                </h4>
                <p className="text-xs sm:text-sm text-text/90 leading-relaxed font-sans mb-3">
                  Ofrecemos salones de gran aforo y preciosos patios andaluces al aire libre. Diseñamos menús de celebración a medida para garantizar que vuestro acontecimiento familiar sea insuperable.
                </p>
                <a href="#eventos" className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-text transition-colors pointer-events-auto">
                  <Calendar className="w-4 h-4" /> Personalizar mi Evento →
                </a>
              </motion.div>

              <motion.div 
                style={{ opacity: item4Opacity, scale: item4Scale, y: item4Y, rotate: item4Rotate }}
                className="bg-brown text-[#F3EEE4] p-7 border border-[#CFC2AE]/25 rounded-none relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-3 h-full bg-black/15 pointer-events-none" />
                <div className="pl-3.5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#B8826A] font-sans flex items-center gap-1.5 mb-2">
                    <Phone className="w-3 h-3" /> Datos de Contacto
                  </span>
                  <h4 className="font-serif font-bold text-xl text-white leading-none mb-4 uppercase tracking-wide">
                    Reservas y Dirección
                  </h4>
                  <div className="space-y-3 text-xs font-sans text-[#F3EEE4]/85">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B8826A] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white">Venta El Capricho</p>
                        <p className="text-[#F3EEE4]/70">Calle Mandarina 2, Mairena del Aljarafe</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Phone className="w-3.5 h-3.5 text-[#B8826A] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white">Llámanos</p>
                        <p className="text-[#F3EEE4]/70">664 424 736 (Atención rápida)</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/10 flex">
                    <a href="#reservas" className="px-3.5 py-1.5 bg-[#B8826A] hover:bg-white text-xs font-bold text-text uppercase tracking-wider transition-colors duration-200 pointer-events-auto rounded-none">
                      Reservar Mesa
                    </a>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Mobile layout */}
            <div className="md:hidden relative w-full h-[60vh] flex items-center justify-center">
              
              <motion.div style={{ opacity: mItem1Opacity, y: mItem1Y }} className="absolute inset-x-2 bg-surface p-5 border border-border rounded-none">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-accent font-sans flex items-center gap-1 mb-1.5">
                  <BookOpen className="w-3 h-3" /> Nuestra Historia
                </span>
                <h4 className="font-serif font-bold text-lg text-text uppercase tracking-wide mb-2">Tradición Familiar</h4>
                <p className="text-xs text-text/90 leading-relaxed font-sans">
                  Venta El Capricho nació en 1994 del sueño de reunir a las familias del Aljarafe sevillano en torno a platos generosos y honestos. Conservamos la calidez de la hospitalidad andaluza tradicional.
                </p>
              </motion.div>

              <motion.div style={{ opacity: mItem2Opacity, y: mItem2Y }} className="absolute w-[270px] h-[270px] bg-background rounded-full border-4 border-surface flex flex-col justify-center items-center text-center p-5 relative overflow-hidden">
                <div className="absolute inset-2.5 bg-dashed border border-dashed border-border/30 pointer-events-none rounded-full" />
                <div className="p-2 bg-accent/10 rounded-full mb-1.5 relative z-10">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-accent" />
                </div>
                <h4 className="font-serif font-bold text-base text-text uppercase tracking-wide mb-1">Especialidades</h4>
                <p className="text-[10px] text-text/95 leading-relaxed font-sans max-w-[190px] mb-3">
                  Deliciosas croquetas ibéricas de bellota, carnes tiernas al sarmiento y nuestro arroz artesanal dominical.
                </p>
                <a href="#carta" className="px-3 py-1 bg-text text-[8px] font-bold text-white uppercase tracking-widest rounded-none relative z-10">Ver Carta</a>
              </motion.div>

              <motion.div style={{ opacity: mItem3Opacity, y: mItem3Y }} className="absolute inset-x-2 bg-surface p-5 border-4 border-double border-border rounded-none">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-accent font-sans flex items-center gap-1 mb-1.5">
                  <Heart className="w-3 h-3 text-accent" /> Celebraciones
                </span>
                <h4 className="font-serif font-bold text-lg text-text uppercase tracking-wide mb-2">Comuniones e Hitos</h4>
                <p className="text-xs text-text/90 leading-relaxed font-sans mb-3.5">
                  Disponemos de salones climatizados de gran aforo y amplios patios exteriores. Ofrecemos menús de banquete totalmente configurables para momentos memorables.
                </p>
              </motion.div>

              <motion.div style={{ opacity: mItem4Opacity, y: mItem4Y }} className="absolute inset-x-2 bg-brown text-[#F3EEE4] p-5 border border-[#CFC2AE]/25 rounded-none">
                <div className="absolute top-0 left-0 w-2.5 h-full bg-black/15 pointer-events-none" />
                <div className="pl-3">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B8826A] font-sans flex items-center gap-1 mb-1">
                    <Phone className="w-2.5 h-2.5" /> Datos Útiles
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white uppercase tracking-wide mb-2.5">Contacto</h4>
                  <div className="space-y-2 text-[11px] font-sans text-[#F3EEE4]/85 mb-3.5">
                    <p className="leading-tight">Calle Mandarina 2, Mairena del Aljarafe</p>
                    <p className="leading-tight">664 424 736</p>
                  </div>
                  <a href="#reservas" className="inline-block px-3.5 py-1.5 bg-[#B8826A] text-xs font-bold text-text uppercase tracking-wider rounded-none">Reservar Mesa</a>
                </div>
              </motion.div>

            </div>

          </div>
        </motion.div>

        {/* Side Scroll tracker dots */}
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden xs:flex flex-col items-center gap-4 text-[#3F3428]/40 font-mono text-[9px]">
          <span className="rotate-90 origin-center translate-y-3.5 uppercase tracking-wider">HISTORIA</span>
          <div className="w-[1.5px] h-16 bg-[#3F3428]/10 relative">
            <motion.div style={{ scaleY: smoothProgress, originY: 0 }} className="absolute inset-0 bg-accent" />
          </div>
          <span className="rotate-90 origin-center -translate-y-1 uppercase tracking-wider">CONTACTO</span>
        </div>

      </div>
    </div>
  );
}

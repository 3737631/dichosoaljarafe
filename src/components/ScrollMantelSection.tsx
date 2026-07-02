import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import {
  BookOpen,
  UtensilsCrossed,
  Heart,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function ScrollMantelSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.002,
  });

  const tableclothHeight = useTransform(
    smoothProgress,
    [0, 0.32],
    ["12%", "100%"]
  );

  const tableclothWaveY = useTransform(
    smoothProgress,
    (p) => Math.sin(p * Math.PI * 4.5) * 4
  );

  // Desktop cards
  const item1Opacity = useTransform(smoothProgress, [0.20, 0.42], [0, 1]);
  const item1Scale = useTransform(smoothProgress, [0.20, 0.44], [0.94, 1]);
  const item1Y = useTransform(smoothProgress, [0.20, 0.44], [30, 0]);
  const item1Rotate = useTransform(smoothProgress, [0.20, 0.44], [-2.2, -0.8]);

  const item2Opacity = useTransform(smoothProgress, [0.36, 0.58], [0, 1]);
  const item2Scale = useTransform(smoothProgress, [0.36, 0.60], [0.94, 1]);
  const item2Y = useTransform(smoothProgress, [0.36, 0.60], [30, 0]);
  const item2Rotate = useTransform(smoothProgress, [0.36, 0.60], [2.4, 0.8]);

  const item3Opacity = useTransform(smoothProgress, [0.52, 0.74], [0, 1]);
  const item3Scale = useTransform(smoothProgress, [0.52, 0.76], [0.94, 1]);
  const item3Y = useTransform(smoothProgress, [0.52, 0.76], [30, 0]);
  const item3Rotate = useTransform(smoothProgress, [0.52, 0.76], [-1.8, 0.4]);

  const item4Opacity = useTransform(smoothProgress, [0.68, 0.90], [0, 1]);
  const item4Scale = useTransform(smoothProgress, [0.68, 0.92], [0.94, 1]);
  const item4Y = useTransform(smoothProgress, [0.68, 0.92], [30, 0]);
  const item4Rotate = useTransform(smoothProgress, [0.68, 0.92], [2, -0.4]);

  // Mobile cards, igual que el original: aparecen dentro de la pantalla, no una debajo de otra infinita
  const mItem1Opacity = useTransform(
    smoothProgress,
    [0.18, 0.28, 0.44, 0.52],
    [0, 1, 1, 0]
  );
  const mItem1Y = useTransform(
    smoothProgress,
    [0.18, 0.28, 0.44, 0.52],
    [20, 0, 0, -20]
  );

  const mItem2Opacity = useTransform(
    smoothProgress,
    [0.40, 0.50, 0.64, 0.72],
    [0, 1, 1, 0]
  );
  const mItem2Y = useTransform(
    smoothProgress,
    [0.40, 0.50, 0.64, 0.72],
    [20, 0, 0, -20]
  );

  const mItem3Opacity = useTransform(
    smoothProgress,
    [0.56, 0.66, 0.78, 0.86],
    [0, 1, 1, 0]
  );
  const mItem3Y = useTransform(
    smoothProgress,
    [0.56, 0.66, 0.78, 0.86],
    [20, 0, 0, -20]
  );

  const mItem4Opacity = useTransform(
    smoothProgress,
    [0.72, 0.84, 1.0],
    [0, 1, 1]
  );
  const mItem4Y = useTransform(smoothProgress, [0.72, 0.84], [20, 0]);

  return (
    <section
      id="experiencia"
      ref={containerRef}
      className="relative w-full"
      style={{ height: "420vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F1E9DD] flex flex-col justify-between select-none">
        {/* Fondo madera / carta */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.16]">
          <div className="w-full h-full flex justify-between px-8 sm:px-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-px h-full bg-[#6B4B34]" />
            ))}
          </div>
        </div>

        {/* Marca de agua */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
          <span className="font-['Pinyon_Script'] text-[24vw] md:text-[16vw] text-[#6B4B34]/[0.045] leading-none">
            Dichoso
          </span>
        </div>

        {/* Mantel */}
        <motion.div
          style={{
            height: tableclothHeight,
            y: tableclothWaveY,
            backgroundColor: "#B89168",
          }}
          className="absolute top-0 left-0 w-full z-10 shadow-[0_16px_38px_rgba(78,53,37,0.14)] flex flex-col justify-between overflow-hidden"
        >
          {/* Textura del mantel */}
          <div
            className="absolute inset-0 opacity-[0.26] pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 18% 22%, rgba(255,255,255,0.20), transparent 26%),
                radial-gradient(circle at 82% 70%, rgba(78,53,37,0.12), transparent 32%),
                linear-gradient(105deg, rgba(255,255,255,0.12) 0%, transparent 20%, rgba(78,53,37,0.08) 38%, transparent 58%, rgba(255,255,255,0.08) 78%, transparent 100%),
                repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 12px),
                repeating-linear-gradient(0deg, rgba(78,53,37,0.10) 0px, rgba(78,53,37,0.10) 1px, transparent 1px, transparent 14px)
              `,
            }}
          />

          {/* Dobladuras suaves */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.34]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.13) 18%, transparent 31%, rgba(78,53,37,0.10) 49%, transparent 63%, rgba(255,255,255,0.10) 80%, transparent 100%)",
            }}
          />

          {/* Remate ondulado inferior, como el original */}
          <div className="absolute bottom-0 left-0 w-full z-25 translate-y-[96%] pointer-events-none select-none">
            <svg
              viewBox="0 0 1440 48"
              fill="#B89168"
              className="w-full h-12 drop-shadow-[0_8px_4px_rgba(78,53,37,0.12)]"
              preserveAspectRatio="none"
            >
              <path d="M0,0 Q30,18 60,0 T120,0 T180,0 T240,0 T300,0 T360,0 T420,0 T480,0 T540,0 T600,0 T660,0 T720,0 T780,0 T840,0 T900,0 T960,0 T1020,0 T1080,0 T1140,0 T1200,0 T1260,0 T1320,0 T1380,0 T1440,0 L1440,48 L0,48 Z" />
            </svg>
            <svg
              viewBox="0 0 1440 24"
              fill="none"
              stroke="#FAF7F2"
              strokeWidth="2"
              strokeDasharray="4 6"
              className="w-full h-6 -mt-10 opacity-35"
              preserveAspectRatio="none"
            >
              <path d="M0,0 Q30,12 60,0 T120,0 T180,0 T240,0 T300,0 T360,0 T420,0 T480,0 T540,0 T600,0 T660,0 T720,0 T780,0 T840,0 T900,0 T960,0 T1020,0 T1080,0 T1140,0 T1200,0 T1260,0 T1320,0 T1380,0 T1440,0" />
            </svg>
          </div>

          <div className="w-full h-full max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20 flex flex-col justify-center relative z-20 overflow-hidden">
            {/* Desktop */}
            <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8 items-center justify-center">
              {/* Card 1 */}
              <motion.div
                style={{
                  opacity: item1Opacity,
                  scale: item1Scale,
                  y: item1Y,
                  rotate: item1Rotate,
                }}
                className="bg-[#FAF7F2]/95 p-7 border border-[#D9CDBE] relative overflow-hidden shadow-[0_14px_34px_rgba(78,53,37,0.08)]"
              >
                <div className="absolute -right-6 -bottom-6 w-24 h-24 text-[#B89168]/15 pointer-events-none">
                  <BookOpen className="w-full h-full stroke-[1]" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1.5 mb-2">
                  <BookOpen className="w-3 h-3" /> Qué ofrecemos
                </span>
                <h4 className="font-['Cormorant_Garamond'] text-2xl text-[#4E3525] leading-none mb-3 uppercase tracking-wide">
                  Tapas, arroces y producto
                </h4>
                <p className="text-sm text-[#7A6553] leading-relaxed font-['Roboto_Condensed'] tracking-[0.03em]">
                  Una carta pensada para compartir: entrantes, fritos, platos del mar, arroces en paella y postres caseros con una mirada contemporánea.
                </p>
                <div className="mt-4 pt-3.5 border-t border-[#D9CDBE]/70 flex items-center justify-between text-[10px] text-[#6B4B34] font-['Roboto_Condensed'] uppercase tracking-[0.14em]">
                  <span>Tapas</span>
                  <span>Arroces</span>
                  <span>Postres</span>
                </div>
              </motion.div>

              {/* Card 2 circular */}
              <motion.div
                style={{
                  opacity: item2Opacity,
                  scale: item2Scale,
                  y: item2Y,
                  rotate: item2Rotate,
                }}
                className="bg-[#FAF7F2] p-6 rounded-full aspect-square max-w-[320px] lg:max-w-[340px] mx-auto border-4 border-[#F1E9DD] flex flex-col justify-center items-center text-center relative overflow-hidden shadow-[0_18px_42px_rgba(78,53,37,0.10)]"
              >
                <div className="absolute inset-2.5 rounded-full border border-dashed border-[#D9CDBE]/60 pointer-events-none" />
                <div className="absolute inset-4 rounded-full border border-[#D9CDBE]/65 pointer-events-none" />
                <div className="p-2.5 bg-[#B89168]/10 rounded-full mb-2.5 relative z-10">
                  <UtensilsCrossed className="w-4 h-4 text-[#B89168]" />
                </div>
                <span className="text-[8px] uppercase tracking-[0.18em] text-[#B89168] font-['Roboto_Condensed'] mb-1 relative z-10">
                  Nuestra carta
                </span>
                <h4 className="font-['Cormorant_Garamond'] text-xl text-[#4E3525] mb-2 relative z-10 uppercase tracking-wide">
                  Sabores que sorprenden
                </h4>
                <p className="text-xs text-[#7A6553] leading-relaxed font-['Roboto_Condensed'] max-w-[220px] relative z-10 mb-4">
                  Cocina cercana, producto cuidado y platos con carácter: de las croquetas a los arroces con personalidad.
                </p>
                <a
                  href="#carta"
                  className="px-4 py-2 bg-[#6B4B34] hover:bg-[#4E3525] text-[9px] font-bold text-[#FAF7F2] uppercase tracking-widest transition-colors duration-200 pointer-events-auto relative z-10"
                >
                  Ver carta
                </a>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                style={{
                  opacity: item3Opacity,
                  scale: item3Scale,
                  y: item3Y,
                  rotate: item3Rotate,
                }}
                className="bg-[#FAF7F2]/95 p-7 border-4 border-double border-[#D9CDBE] relative overflow-hidden shadow-[0_14px_34px_rgba(78,53,37,0.08)]"
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1.5 mb-2">
                  <Heart className="w-3 h-3" /> Especiales Dichoso
                </span>
                <h4 className="font-['Cormorant_Garamond'] text-2xl text-[#4E3525] leading-none mb-3 uppercase tracking-wide">
                  Los imprescindibles
                </h4>
                <p className="text-sm text-[#7A6553] leading-relaxed font-['Roboto_Condensed'] tracking-[0.03em] mb-4">
                  Navajas, berberechos, croquetas, tortilla, sándwich de cecina, arroces, tarta de queso y torrija: platos pensados para volver.
                </p>
                <a
                  href="#especiales"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B4B34] hover:text-[#4E3525] transition-colors pointer-events-auto uppercase tracking-[0.14em] font-['Roboto_Condensed']"
                >
                  <Sparkles className="w-4 h-4" /> Ver especiales →
                </a>
              </motion.div>

              {/* Card 4 oscura */}
              <motion.div
                style={{
                  opacity: item4Opacity,
                  scale: item4Scale,
                  y: item4Y,
                  rotate: item4Rotate,
                }}
                className="bg-[#6B4B34] text-[#FAF7F2] p-7 border border-[#B89168]/35 relative overflow-hidden shadow-[0_18px_42px_rgba(78,53,37,0.16)]"
              >
                <div className="absolute top-0 left-0 w-3 h-full bg-black/10 pointer-events-none" />
                <div className="pl-3.5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1.5 mb-2">
                    <Phone className="w-3 h-3" /> Reserva y ven
                  </span>
                  <h4 className="font-['Cormorant_Garamond'] text-2xl text-white leading-none mb-4 uppercase tracking-wide">
                    Dichoso el día que entraste por aquí
                  </h4>
                  <div className="space-y-3 text-xs font-['Roboto_Condensed'] text-[#FAF7F2]/85 tracking-[0.03em]">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B89168] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white uppercase tracking-[0.12em]">
                          Mairena del Aljarafe
                        </p>
                        <p className="text-[#FAF7F2]/75">
                          Av. de los Descubrimientos, 11
                        </p>
                      </div>
                    </div>
                    <p className="text-[#FAF7F2]/80 leading-relaxed">
                      Reserva tu mesa y disfruta de una experiencia cálida, honesta y diferente.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/10 flex gap-2">
                    <a
                      href="#reservas"
                      className="px-3.5 py-2 bg-[#B89168] hover:bg-[#FAF7F2] text-[10px] font-bold text-[#4E3525] uppercase tracking-wider transition-colors duration-200 pointer-events-auto"
                    >
                      Reservar
                    </a>
                    <a
                      href="#ubicacion"
                      className="px-3.5 py-2 border border-[#B89168]/60 hover:bg-[#B89168] text-[10px] font-bold text-[#FAF7F2] hover:text-[#4E3525] uppercase tracking-wider transition-colors duration-200 pointer-events-auto"
                    >
                      Cómo llegar
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile: como el original, cards superpuestas que aparecen */}
            <div className="md:hidden relative w-full h-[60vh] flex items-center justify-center">
              <motion.div
                style={{ opacity: mItem1Opacity, y: mItem1Y }}
                className="absolute inset-x-2 bg-[#FAF7F2]/95 p-5 border border-[#D9CDBE] shadow-[0_12px_28px_rgba(78,53,37,0.08)]"
              >
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1 mb-1.5">
                  <BookOpen className="w-3 h-3" /> Qué ofrecemos
                </span>
                <h4 className="font-['Cormorant_Garamond'] text-xl text-[#4E3525] uppercase tracking-wide mb-2">
                  Tapas, arroces y producto
                </h4>
                <p className="text-xs text-[#7A6553] leading-relaxed font-['Roboto_Condensed']">
                  Entrantes, fritos, platos del mar, arroces en paella y postres caseros para compartir.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: mItem2Opacity, y: mItem2Y }}
                className="absolute w-[270px] h-[270px] bg-[#FAF7F2] rounded-full border-4 border-[#F1E9DD] flex flex-col justify-center items-center text-center p-5 overflow-hidden shadow-[0_16px_34px_rgba(78,53,37,0.10)]"
              >
                <div className="absolute inset-2.5 border border-dashed border-[#D9CDBE]/60 pointer-events-none rounded-full" />
                <div className="p-2 bg-[#B89168]/10 rounded-full mb-1.5 relative z-10">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#B89168]" />
                </div>
                <span className="text-[8px] uppercase tracking-[0.18em] text-[#B89168] font-['Roboto_Condensed'] relative z-10">
                  Nuestra carta
                </span>
                <h4 className="font-['Cormorant_Garamond'] text-lg text-[#4E3525] uppercase tracking-wide mb-1 relative z-10">
                  Sabores que sorprenden
                </h4>
                <p className="text-[10px] text-[#7A6553] leading-relaxed font-['Roboto_Condensed'] max-w-[190px] mb-3 relative z-10">
                  Cocina cercana, producto cuidado y platos con carácter.
                </p>
                <a
                  href="#carta"
                  className="px-3 py-1.5 bg-[#6B4B34] text-[8px] font-bold text-[#FAF7F2] uppercase tracking-widest relative z-10"
                >
                  Ver carta
                </a>
              </motion.div>

              <motion.div
                style={{ opacity: mItem3Opacity, y: mItem3Y }}
                className="absolute inset-x-2 bg-[#FAF7F2]/95 p-5 border-4 border-double border-[#D9CDBE] shadow-[0_12px_28px_rgba(78,53,37,0.08)]"
              >
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1 mb-1.5">
                  <Heart className="w-3 h-3" /> Especiales Dichoso
                </span>
                <h4 className="font-['Cormorant_Garamond'] text-xl text-[#4E3525] uppercase tracking-wide mb-2">
                  Los imprescindibles
                </h4>
                <p className="text-xs text-[#7A6553] leading-relaxed font-['Roboto_Condensed'] mb-3">
                  Navajas, berberechos, croquetas, tortilla, arroces, tarta de queso y torrija.
                </p>
                <a
                  href="#especiales"
                  className="text-[10px] uppercase tracking-[0.16em] text-[#6B4B34] font-bold font-['Roboto_Condensed']"
                >
                  Ver especiales →
                </a>
              </motion.div>

              <motion.div
                style={{ opacity: mItem4Opacity, y: mItem4Y }}
                className="absolute inset-x-2 bg-[#6B4B34] text-[#FAF7F2] p-5 border border-[#B89168]/35 shadow-[0_14px_32px_rgba(78,53,37,0.16)]"
              >
                <div className="absolute top-0 left-0 w-2.5 h-full bg-black/10 pointer-events-none" />
                <div className="pl-3">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1 mb-1">
                    <Phone className="w-2.5 h-2.5" /> Reserva y ven
                  </span>
                  <h4 className="font-['Cormorant_Garamond'] text-xl text-white uppercase tracking-wide mb-2.5">
                    Dichoso el día que entraste por aquí
                  </h4>
                  <div className="space-y-2 text-[11px] font-['Roboto_Condensed'] text-[#FAF7F2]/85 mb-3.5">
                    <p className="leading-tight">
                      Av. de los Descubrimientos, 11, Mairena del Aljarafe
                    </p>
                    <p className="leading-tight">
                      Reserva tu mesa y ven a disfrutar sin prisa.
                    </p>
                  </div>
                  <a
                    href="#reservas"
                    className="inline-block px-3.5 py-1.5 bg-[#B89168] text-xs font-bold text-[#4E3525] uppercase tracking-wider"
                  >
                    Reservar
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

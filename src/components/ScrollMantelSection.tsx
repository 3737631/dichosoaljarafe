import { useRef } from "react";
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

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 32,
    restDelta: 0.003,
  });

  const clothH = useTransform(smooth, [0, 0.35], ["0%", "100%"]);

  const c1 = useTransform(smooth, [0.18, 0.38], [0, 1]);
  const c1Y = useTransform(smooth, [0.18, 0.38], [28, 0]);
  const c2 = useTransform(smooth, [0.32, 0.52], [0, 1]);
  const c2Y = useTransform(smooth, [0.32, 0.52], [28, 0]);
  const c3 = useTransform(smooth, [0.46, 0.66], [0, 1]);
  const c3Y = useTransform(smooth, [0.46, 0.66], [28, 0]);
  const c4 = useTransform(smooth, [0.60, 0.82], [0, 1]);
  const c4Y = useTransform(smooth, [0.60, 0.82], [28, 0]);

  const m1 = useTransform(smooth, [0.18, 0.28, 0.44, 0.52], [0, 1, 1, 0]);
  const m1Y = useTransform(smooth, [0.18, 0.28, 0.44, 0.52], [20, 0, 0, -20]);
  const m2 = useTransform(smooth, [0.40, 0.50, 0.64, 0.72], [0, 1, 1, 0]);
  const m2Y = useTransform(smooth, [0.40, 0.50, 0.64, 0.72], [20, 0, 0, -20]);
  const m3 = useTransform(smooth, [0.56, 0.66, 0.78, 0.86], [0, 1, 1, 0]);
  const m3Y = useTransform(smooth, [0.56, 0.66, 0.78, 0.86], [20, 0, 0, -20]);
  const m4 = useTransform(smooth, [0.72, 0.84], [0, 1]);
  const m4Y = useTransform(smooth, [0.72, 0.84], [20, 0]);

  return (
    <section
      id="experiencia"
      ref={containerRef}
      className="relative w-full"
      style={{ height: "420vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F1E9DD] select-none">
        {/* Marca de agua de fondo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-['Pinyon_Script'] text-[24vw] md:text-[16vw] text-[#6B4B34]/[0.04] leading-none select-none">
            Dichoso
          </span>
        </div>

        {/* Mantel desplegable */}
        <motion.div
          style={{ height: clothH, backgroundColor: "#B89168" }}
          className="absolute top-0 left-0 w-full z-10 shadow-[0_20px_44px_rgba(78,53,37,0.16)] overflow-hidden"
        >
          {/* Retícula de mantel */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.08) 40px, rgba(255,255,255,0.08) 41px),
                repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.08) 40px, rgba(255,255,255,0.08) 41px)
              `,
            }}
          />
          {/* Iluminación suave */}
          <div
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at 18% 25%, rgba(255,255,255,0.22), transparent 50%),
                radial-gradient(ellipse at 80% 75%, rgba(78,53,37,0.08), transparent 40%)
              `,
            }}
          />
          {/* Pliegue sutil */}
          <div
            className="absolute left-[12%] right-[12%] top-[38%] h-px opacity-[0.10] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(78,53,37,0.3), transparent)",
            }}
          />
          {/* Borde inferior limpio */}
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#B89168]/40 to-transparent pointer-events-none" />

          {/* Contenido */}
          <div className="relative z-20 w-full h-full max-w-6xl mx-auto px-6 py-20 md:py-28 flex flex-col justify-center">
            {/* Desktop: grid 2x2 */}
            <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8">
              {/* Card 1 — arriba izquierda */}
              <motion.div
                style={{ opacity: c1, y: c1Y }}
                className="bg-[#FAF7F2] p-8 border border-[#D9CDBE] shadow-[0_8px_28px_rgba(78,53,37,0.06)] flex flex-col"
              >
                <div className="flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1.5 mb-3">
                    <BookOpen className="w-3.5 h-3.5" /> Qué ofrecemos
                  </span>
                  <h4 className="font-['Cormorant_Garamond'] text-[1.6rem] text-[#4E3525] leading-[1.1] mb-3 uppercase tracking-wide">
                    Tapas, arroces y producto
                  </h4>
                  <p className="text-sm text-[#7A6553] leading-relaxed font-['Roboto_Condensed']">
                    Una carta pensada para compartir: entrantes, fritos, platos del mar, arroces en paella y postres caseros con una mirada contemporánea.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#D9CDBE]/70 flex items-center justify-between text-[11px] text-[#6B4B34] font-['Roboto_Condensed'] uppercase tracking-[0.12em]">
                  <span>Tapas</span>
                  <span>Arroces</span>
                  <span>Postres</span>
                </div>
              </motion.div>

              {/* Card 2 — arriba derecha (circular) */}
              <motion.div
                style={{ opacity: c2, y: c2Y }}
                className="flex items-center justify-center"
              >
                <div className="w-[280px] lg:w-[300px] aspect-square bg-[#FAF7F2] rounded-full border-4 border-[#F1E9DD] flex flex-col justify-center items-center text-center relative shadow-[0_12px_32px_rgba(78,53,37,0.08)]">
                  <div className="absolute inset-3 rounded-full border border-dashed border-[#D9CDBE]/50 pointer-events-none" />
                  <div className="p-3 bg-[#B89168]/10 rounded-full mb-3 relative z-10">
                    <UtensilsCrossed className="w-5 h-5 text-[#B89168]" />
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B89168] font-['Roboto_Condensed'] relative z-10 mb-1">
                    Nuestra carta
                  </span>
                  <h4 className="font-['Cormorant_Garamond'] text-xl text-[#4E3525] relative z-10 mb-2 px-6 leading-[1.2]">
                    Sabores que sorprenden
                  </h4>
                  <p className="text-[11px] text-[#7A6553] leading-relaxed font-['Roboto_Condensed'] max-w-[200px] relative z-10 mb-4">
                    Cocina cercana, producto cuidado y platos con carácter.
                  </p>
                  <a
                    href="#carta"
                    className="px-5 py-2 bg-[#6B4B34] hover:bg-[#4E3525] text-[10px] font-bold text-[#FAF7F2] uppercase tracking-[0.15em] transition-colors duration-200 relative z-10"
                  >
                    Ver carta
                  </a>
                </div>
              </motion.div>

              {/* Card 3 — abajo izquierda */}
              <motion.div
                style={{ opacity: c3, y: c3Y }}
                className="bg-[#FAF7F2] p-8 border-2 border-[#D9CDBE]/60 shadow-[0_8px_28px_rgba(78,53,37,0.06)] flex flex-col"
              >
                <div className="flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1.5 mb-3">
                    <Heart className="w-3.5 h-3.5" /> Especiales Dichoso
                  </span>
                  <h4 className="font-['Cormorant_Garamond'] text-[1.6rem] text-[#4E3525] leading-[1.1] mb-3 uppercase tracking-wide">
                    Los imprescindibles
                  </h4>
                  <p className="text-sm text-[#7A6553] leading-relaxed font-['Roboto_Condensed']">
                    Navajas, berberechos, croquetas, tortilla, sándwich de cecina, arroces, tarta de queso y torrija: platos pensados para volver.
                  </p>
                </div>
                <a
                  href="#especiales"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B4B34] hover:text-[#4E3525] transition-colors uppercase tracking-[0.15em] font-['Roboto_Condensed'] mt-5"
                >
                  <Sparkles className="w-4 h-4" /> Ver especiales →
                </a>
              </motion.div>

              {/* Card 4 — abajo derecha (oscura) */}
              <motion.div
                style={{ opacity: c4, y: c4Y }}
                className="bg-[#6B4B34] text-[#FAF7F2] p-8 border border-[#B89168]/30 shadow-[0_14px_36px_rgba(78,53,37,0.16)] flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-[#B89168]/30 pointer-events-none" />
                <div className="pl-4 flex-1 flex flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1.5 mb-3">
                    <Phone className="w-3.5 h-3.5" /> Reserva y ven
                  </span>
                  <h4 className="font-['Cormorant_Garamond'] text-[1.4rem] text-white leading-[1.1] mb-4 uppercase tracking-wide">
                    Dichoso el día que entraste por aquí
                  </h4>
                  <p className="text-sm text-[#FAF7F2]/80 leading-relaxed font-['Roboto_Condensed'] mb-4">
                    Reserva tu mesa y disfruta de una experiencia cálida, honesta y diferente.
                  </p>
                  <div className="flex items-start gap-2.5 mb-4">
                    <MapPin className="w-4 h-4 text-[#B89168] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-[0.12em] font-['Roboto_Condensed']">
                        Mairena del Aljarafe
                      </p>
                      <p className="text-xs text-[#FAF7F2]/70 font-['Roboto_Condensed']">
                        Av. de los Descubrimientos, 11
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 mt-auto">
                    <a
                      href="#reservas"
                      className="px-4 py-2.5 bg-[#B89168] hover:bg-[#FAF7F2] text-[11px] font-bold text-[#4E3525] uppercase tracking-[0.12em] transition-colors duration-200"
                    >
                      Reservar
                    </a>
                    <a
                      href="#ubicacion"
                      className="px-4 py-2.5 border border-[#B89168]/50 hover:bg-[#B89168] text-[11px] font-bold text-[#FAF7F2] hover:text-[#4E3525] uppercase tracking-[0.12em] transition-colors duration-200"
                    >
                      Cómo llegar
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile: cards superpuestas */}
            <div className="md:hidden relative w-full h-[55vh] flex items-center justify-center px-2">
              <motion.div
                style={{ opacity: m1, y: m1Y }}
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
                style={{ opacity: m2, y: m2Y }}
                className="absolute w-[250px] h-[250px] bg-[#FAF7F2] rounded-full border-4 border-[#F1E9DD] flex flex-col justify-center items-center text-center p-5 overflow-hidden shadow-[0_16px_34px_rgba(78,53,37,0.10)]"
              >
                <div className="absolute inset-2.5 border border-dashed border-[#D9CDBE]/60 pointer-events-none rounded-full" />
                <div className="p-2 bg-[#B89168]/10 rounded-full mb-1.5 relative z-10">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#B89168]" />
                </div>
                <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#B89168] font-['Roboto_Condensed'] relative z-10">
                  Nuestra carta
                </span>
                <h4 className="font-['Cormorant_Garamond'] text-lg text-[#4E3525] uppercase tracking-wide mb-1 relative z-10">
                  Sabores que sorprenden
                </h4>
                <p className="text-[10px] text-[#7A6553] leading-relaxed font-['Roboto_Condensed'] max-w-[170px] mb-3 relative z-10">
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
                style={{ opacity: m3, y: m3Y }}
                className="absolute inset-x-2 bg-[#FAF7F2]/95 p-5 border-2 border-[#D9CDBE]/60 shadow-[0_12px_28px_rgba(78,53,37,0.08)]"
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
                style={{ opacity: m4, y: m4Y }}
                className="absolute inset-x-2 bg-[#6B4B34] text-[#FAF7F2] p-5 border border-[#B89168]/35 shadow-[0_14px_32px_rgba(78,53,37,0.16)]"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-[#B89168]/30 pointer-events-none" />
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

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
  const c1Y = useTransform(smooth, [0.18, 0.38], [24, 0]);
  const c1S = useTransform(smooth, [0.18, 0.38], [0.97, 1]);

  const c2 = useTransform(smooth, [0.32, 0.52], [0, 1]);
  const c2Y = useTransform(smooth, [0.32, 0.52], [24, 0]);
  const c2S = useTransform(smooth, [0.32, 0.52], [0.97, 1]);

  const c3 = useTransform(smooth, [0.46, 0.66], [0, 1]);
  const c3Y = useTransform(smooth, [0.46, 0.66], [24, 0]);
  const c3S = useTransform(smooth, [0.46, 0.66], [0.97, 1]);

  const c4 = useTransform(smooth, [0.60, 0.82], [0, 1]);
  const c4Y = useTransform(smooth, [0.60, 0.82], [24, 0]);
  const c4S = useTransform(smooth, [0.60, 0.82], [0.97, 1]);

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
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-['Pinyon_Script'] text-[24vw] md:text-[16vw] text-[#6B4B34]/[0.04] leading-none select-none">
            Dichoso
          </span>
        </div>

        <motion.div
          style={{ height: clothH, backgroundColor: "#B89168" }}
          className="absolute top-0 left-0 w-full z-10 shadow-[0_20px_44px_rgba(78,53,37,0.16)] overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 44px, rgba(255,255,255,0.07) 44px, rgba(255,255,255,0.07) 45px),
                repeating-linear-gradient(90deg, transparent, transparent 44px, rgba(255,255,255,0.07) 44px, rgba(255,255,255,0.07) 45px)
              `,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.14] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 22% 28%, rgba(255,255,255,0.18), transparent 50%), radial-gradient(ellipse at 78% 72%, rgba(78,53,37,0.06), transparent 40%)",
            }}
          />
          <div
            className="absolute left-[15%] right-[15%] top-[40%] h-px opacity-[0.08] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(78,53,37,0.25), transparent)",
            }}
          />
          <div className="absolute bottom-0 left-0 w-full h-5 bg-gradient-to-t from-[#B89168]/30 to-transparent pointer-events-none" />

          <div className="relative z-20 w-full h-full flex items-center justify-center">
            <div
              className="hidden md:grid"
              style={{
                width: "calc(100% - 96px)",
                maxWidth: "1120px",
                margin: "0 auto",
                gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 0.92fr)",
                gap: "42px 48px",
                alignItems: "center",
              }}
            >
              {/* Card 1 */}
              <motion.div style={{ opacity: c1, y: c1Y, scale: c1S }}>
                <div
                  className="bg-[#FAF7F2] border border-[#D9CDBE] shadow-[0_18px_38px_rgba(78,53,37,0.10)] overflow-hidden"
                  style={{ transform: "rotate(-0.4deg)", padding: "34px 38px", minHeight: "190px" }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1.5 mb-3">
                    <BookOpen className="w-3.5 h-3.5" /> Qué ofrecemos
                  </span>
                  <h4 className="font-['Cormorant_Garamond'] text-[1.5rem] text-[#4E3525] leading-[1.15] mb-2.5 uppercase tracking-wide">
                    Tapas, arroces y producto
                  </h4>
                  <p className="text-sm text-[#7A6553] leading-relaxed font-['Roboto_Condensed'] max-w-[420px]">
                    Una carta pensada para compartir: entrantes, fritos, platos del mar, arroces en paella y postres caseros.
                  </p>
                  <div className="mt-4 pt-3.5 border-t border-[#D9CDBE]/60 flex items-center justify-between text-[11px] text-[#6B4B34] font-['Roboto_Condensed'] uppercase tracking-[0.12em]">
                    <span>Tapas</span>
                    <span>Arroces</span>
                    <span>Postres</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div style={{ opacity: c2, y: c2Y, scale: c2S }} className="flex items-center justify-center">
                <div
                  className="bg-[#FAF7F2] rounded-full border-4 border-[#F1E9DD] flex flex-col justify-center items-center text-center relative shadow-[0_18px_38px_rgba(78,53,37,0.10)]"
                  style={{ width: "310px", height: "310px", padding: "34px", transform: "rotate(0.2deg)" }}
                >
                  <div className="absolute inset-3 rounded-full border border-dashed border-[#D9CDBE]/50 pointer-events-none" />
                  <div className="p-2.5 bg-[#B89168]/10 rounded-full mb-2.5 relative z-10">
                    <UtensilsCrossed className="w-5 h-5 text-[#B89168]" />
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B89168] font-['Roboto_Condensed'] relative z-10 mb-1">
                    Nuestra carta
                  </span>
                  <h4 className="font-['Cormorant_Garamond'] text-xl text-[#4E3525] relative z-10 mb-2 leading-[1.2]">
                    Sabores que sorprenden
                  </h4>
                  <p className="text-[11px] text-[#7A6553] leading-relaxed font-['Roboto_Condensed'] max-w-[190px] relative z-10 mb-3.5">
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

              {/* Card 3 */}
              <motion.div style={{ opacity: c3, y: c3Y, scale: c3S }}>
                <div
                  className="bg-[#FAF7F2] border-2 border-[#D9CDBE]/60 shadow-[0_18px_38px_rgba(78,53,37,0.10)] overflow-hidden flex flex-col"
                  style={{ transform: "rotate(0.3deg)", padding: "34px 38px", minHeight: "190px" }}
                >
                  <div className="flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1.5 mb-3">
                      <Heart className="w-3.5 h-3.5" /> Especiales Dichoso
                    </span>
                    <h4 className="font-['Cormorant_Garamond'] text-[1.5rem] text-[#4E3525] leading-[1.15] mb-2.5 uppercase tracking-wide">
                      Los imprescindibles
                    </h4>
                    <p className="text-sm text-[#7A6553] leading-relaxed font-['Roboto_Condensed'] max-w-[420px]">
                      Navajas, berberechos, croquetas, tortilla, arroces, tarta de queso y torrija.
                    </p>
                  </div>
                  <a
                    href="#especiales"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B4B34] hover:text-[#4E3525] transition-colors uppercase tracking-[0.15em] font-['Roboto_Condensed'] mt-auto pt-3"
                  >
                    <Sparkles className="w-4 h-4" /> Ver especiales →
                  </a>
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div style={{ opacity: c4, y: c4Y, scale: c4S }}>
                <div
                  className="bg-[#6B4B34] text-[#FAF7F2] border border-[#B89168]/30 shadow-[0_18px_38px_rgba(78,53,37,0.16)] overflow-hidden flex flex-col relative"
                  style={{ transform: "rotate(0.2deg)", padding: "34px 38px", minHeight: "190px" }}
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#B89168]/25 pointer-events-none" />
                  <div className="flex-1 flex flex-col" style={{ paddingLeft: "14px" }}>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1.5 mb-3">
                      <Phone className="w-3.5 h-3.5" /> Reserva y ven
                    </span>
                    <h4 className="font-['Cormorant_Garamond'] text-[1.3rem] text-white leading-[1.15] mb-3 uppercase tracking-wide">
                      Dichoso el día que entraste por aquí
                    </h4>
                    <p className="text-sm text-[#FAF7F2]/80 leading-relaxed font-['Roboto_Condensed'] mb-3.5">
                      Reserva tu mesa y disfruta de una experiencia cálida, honesta y diferente.
                    </p>
                    <div className="flex items-start gap-2 mb-3.5">
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
                    <div className="flex gap-2.5 mt-auto pt-2">
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
                </div>
              </motion.div>
            </div>

            {/* Mobile */}
            <div className="md:hidden relative w-full h-[55vh] flex items-center justify-center px-4">
              <motion.div
                style={{ opacity: m1, y: m1Y }}
                className="absolute inset-x-[18px] bg-[#FAF7F2]/95 p-5 border border-[#D9CDBE] shadow-[0_12px_28px_rgba(78,53,37,0.08)]"
              >
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1 mb-1.5">
                  <BookOpen className="w-3 h-3" /> Qué ofrecemos
                </span>
                <h4 className="font-['Cormorant_Garamond'] text-lg text-[#4E3525] uppercase tracking-wide mb-2">
                  Tapas, arroces y producto
                </h4>
                <p className="text-xs text-[#7A6553] leading-relaxed font-['Roboto_Condensed']">
                  Entrantes, fritos, platos del mar, arroces en paella y postres caseros para compartir.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: m2, y: m2Y }}
                className="absolute w-[260px] h-[260px] bg-[#FAF7F2] rounded-full border-4 border-[#F1E9DD] flex flex-col justify-center items-center text-center p-5 overflow-hidden shadow-[0_16px_34px_rgba(78,53,37,0.10)]"
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
                className="absolute inset-x-[18px] bg-[#FAF7F2]/95 p-5 border-2 border-[#D9CDBE]/60 shadow-[0_12px_28px_rgba(78,53,37,0.08)]"
              >
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1 mb-1.5">
                  <Heart className="w-3 h-3" /> Especiales Dichoso
                </span>
                <h4 className="font-['Cormorant_Garamond'] text-lg text-[#4E3525] uppercase tracking-wide mb-2">
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
                className="absolute inset-x-[18px] bg-[#6B4B34] text-[#FAF7F2] p-5 border border-[#B89168]/35 shadow-[0_14px_32px_rgba(78,53,37,0.16)]"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-[#B89168]/30 pointer-events-none" />
                <div className="pl-3">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B89168] font-['Roboto_Condensed'] flex items-center gap-1 mb-1">
                    <Phone className="w-2.5 h-2.5" /> Reserva y ven
                  </span>
                  <h4 className="font-['Cormorant_Garamond'] text-lg text-white uppercase tracking-wide mb-2">
                    Dichoso el día que entraste por aquí
                  </h4>
                  <p className="text-[11px] font-['Roboto_Condensed'] text-[#FAF7F2]/85 mb-3 leading-relaxed">
                    Av. de los Descubrimientos, 11, Mairena del Aljarafe
                  </p>
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

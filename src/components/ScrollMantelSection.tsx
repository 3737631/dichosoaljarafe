import React, { useRef, useEffect } from 'react';

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t;
}

export default function ScrollMantelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableclothRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const scrollFillRef = useRef<HTMLDivElement>(null);

  const dCard1Ref = useRef<HTMLDivElement>(null);
  const dCard2Ref = useRef<HTMLDivElement>(null);
  const dCard3Ref = useRef<HTMLDivElement>(null);
  const dCard4Ref = useRef<HTMLDivElement>(null);

  const mCard1Ref = useRef<HTMLDivElement>(null);
  const mCard2Ref = useRef<HTMLDivElement>(null);
  const mCard3Ref = useRef<HTMLDivElement>(null);
  const mCard4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mantel = containerRef.current!;
    const tablecloth = tableclothRef.current!;
    const tooltip = tooltipRef.current!;
    const scrollFill = scrollFillRef.current!;

    function applyTransform(el: HTMLElement | null, opacity: number, scale: number, y: number, rotate: number) {
      if (!el) return;
      el.style.opacity = String(opacity);
      el.style.transform = `scale(${scale}) translateY(${y}px) rotate(${rotate}deg)`;
    }

    function update() {
      const rect = mantel.getBoundingClientRect();
      const totalHeight = mantel.clientHeight;
      const viewHeight = window.innerHeight;

      const progress = clamp(1 - (rect.bottom - viewHeight) / (totalHeight - viewHeight), 0, 1);
      const p = progress;

      // Tablecloth height
      const h = smoothstep(0, 0.32, p);
      tablecloth.style.height = lerp(12, 100, h) + '%';

      const waveY = Math.sin(p * Math.PI * 4.5) * 5;
      tablecloth.style.transform = `translateY(${waveY}px)`;

      scrollFill.style.transform = `scaleY(${p})`;

      // Tooltip
      const tipOpacity = 1 - smoothstep(0, 0.18, p);
      if (tipOpacity <= 0) {
        tooltip.style.opacity = '0';
        tooltip.style.pointerEvents = 'none';
      } else {
        tooltip.style.opacity = String(tipOpacity);
        tooltip.style.transform = `translateY(${smoothstep(0, 0.18, p) * -25}px)`;
        tooltip.style.pointerEvents = 'none';
      }

      const isDesktop = window.innerWidth >= 768;

      if (isDesktop) {
        const p1 = smoothstep(0.22, 0.44, p);
        applyTransform(dCard1Ref.current, p1, lerp(0.94, 1, p1), lerp(30, 0, p1), lerp(-3, -1, p1));

        const p2 = smoothstep(0.38, 0.60, p);
        applyTransform(dCard2Ref.current, p2, lerp(0.94, 1, p2), lerp(30, 0, p2), lerp(4, 1, p2));

        const p3 = smoothstep(0.54, 0.76, p);
        applyTransform(dCard3Ref.current, p3, lerp(0.94, 1, p3), lerp(30, 0, p3), lerp(-2, 0.5, p3));

        const p4 = smoothstep(0.70, 0.90, p);
        applyTransform(dCard4Ref.current, p4, lerp(0.94, 1, p4), lerp(30, 0, p4), lerp(3, -0.5, p4));
      } else {
        const mp1 = smoothstep(0.20, 0.28, p);
        const mp1out = smoothstep(0.44, 0.52, p);
        if (mCard1Ref.current) {
          if (p < 0.44) {
            mCard1Ref.current.style.opacity = String(mp1);
            mCard1Ref.current.style.transform = `translateY(${lerp(20, 0, mp1)}px)`;
          } else {
            mCard1Ref.current.style.opacity = String(1 - mp1out);
            mCard1Ref.current.style.transform = `translateY(${lerp(0, -20, mp1out)}px)`;
          }
        }

        const mp2 = smoothstep(0.44, 0.52, p);
        const mp2out = smoothstep(0.66, 0.74, p);
        if (mCard2Ref.current) {
          if (p < 0.66) {
            mCard2Ref.current.style.opacity = String(mp2);
            mCard2Ref.current.style.transform = `translateY(${lerp(20, 0, mp2)}px)`;
          } else {
            mCard2Ref.current.style.opacity = String(1 - mp2out);
            mCard2Ref.current.style.transform = `translateY(${lerp(0, -20, mp2out)}px)`;
          }
        }

        const mp3 = smoothstep(0.56, 0.64, p);
        const mp3out = smoothstep(0.76, 0.82, p);
        if (mCard3Ref.current) {
          if (p < 0.76) {
            mCard3Ref.current.style.opacity = String(mp3);
            mCard3Ref.current.style.transform = `translateY(${lerp(20, 0, mp3)}px)`;
          } else {
            mCard3Ref.current.style.opacity = String(1 - mp3out);
            mCard3Ref.current.style.transform = `translateY(${lerp(0, -20, mp3out)}px)`;
          }
        }

        const mp4 = smoothstep(0.72, 0.82, p);
        if (mCard4Ref.current) {
          mCard4Ref.current.style.opacity = String(mp4);
          mCard4Ref.current.style.transform = `translateY(${lerp(20, 0, mp4)}px)`;
        }
      }

      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, []);

  return (
    <div
      id="mantel-sensorial"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '500vh',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: '#FAF7F0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          userSelect: 'none',
        }}
      >
        {/* Wood lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.15,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 2rem',
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '1px',
                  height: '100%',
                  background: '#6B5A45',
                  boxShadow: '0 0 8px rgba(107,90,69,0.3)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Intro tooltip */}
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            top: '4rem',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 30,
            maxWidth: '28rem',
            width: '100%',
            padding: '0 1.5rem',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              background: 'rgba(250,247,240,0.95)',
              border: '1px solid #D6C3A5',
              padding: '1.25rem',
              boxShadow: '0 10px 40px rgba(63,52,40,0.12)',
            }}
          >
            <span
              style={{
                fontSize: '9px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                color: '#B8826A',
              }}
            >
              Experiencia Sensorial
            </span>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '1.125rem',
                color: '#3F3428',
                marginTop: '0.25rem',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
              }}
            >
              Viste Nuestra Mesa
            </h3>
            <p
              style={{
                fontSize: '0.75rem',
                color: '#6B5A45',
                marginTop: '0.5rem',
                lineHeight: 1.625,
              }}
            >
              Desplázate hacia abajo lentamente para extender el mantel de terracota y descubrir nuestra historia y especialidades sobre él.
            </p>
          </div>
        </div>

        {/* Tablecloth */}
        <div
          ref={tableclothRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 10,
            height: '12%',
            backgroundColor: '#B8826A',
            boxShadow: '0 15px 40px rgba(63,52,40,0.18)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.14,
              pointerEvents: 'none',
              backgroundImage:
                'linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '10px 10px',
            }}
          />

          {/* SVG Wavy Trim */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              zIndex: 25,
              transform: 'translateY(96%)',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <svg viewBox="0 0 1440 48" fill="#B8826A" style={{ width: '100%', height: 48, filter: 'drop-shadow(0 8px 4px rgba(63,52,40,0.15))' }} preserveAspectRatio="none">
              <path d="M0,0 Q30,18 60,0 T120,0 T180,0 T240,0 T300,0 T360,0 T420,0 T480,0 T540,0 T600,0 T660,0 T720,0 T780,0 T840,0 T900,0 T960,0 T1020,0 T1080,0 T1140,0 T1200,0 T1260,0 T1320,0 T1380,0 T1440,0 L1440,48 L0,48 Z" />
            </svg>
            <svg viewBox="0 0 1440 24" fill="none" stroke="#F3EEE4" strokeWidth="2" strokeDasharray="4 6" style={{ width: '100%', height: 24, marginTop: -40, opacity: 0.35 }} preserveAspectRatio="none">
              <path d="M0,0 Q30,12 60,0 T120,0 T180,0 T240,0 T300,0 T360,0 T420,0 T480,0 T540,0 T600,0 T660,0 T720,0 T780,0 T840,0 T900,0 T960,0 T1020,0 T1080,0 T1140,0 T1200,0 T1260,0 T1320,0 T1380,0 T1440,0" />
            </svg>
          </div>

          <div
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '72rem',
              margin: '0 auto',
              padding: '3.5rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 20,
              overflow: 'hidden',
            }}
          >
            {/* Desktop grid */}
            <div
              style={{
                display: 'none',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                alignItems: 'center',
              }}
              className="md:grid lg:gap-8"
            >
              {/* Card 1 */}
              <div
                ref={dCard1Ref}
                style={{
                  background: '#FAF7F0',
                  border: '1px solid #D6C3A5',
                  padding: '1.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', right: '-1.5rem', bottom: '-1.5rem', width: '6rem', height: '6rem', color: 'rgba(184,130,106,0.1)', pointerEvents: 'none' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '100%', height: '100%', strokeWidth: 1 }}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                </div>
                <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B8826A', display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.5rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                  Desde 1994
                </span>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.25rem', color: '#3F3428', lineHeight: 1, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                  Nuestra Historia
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'rgba(63,52,40,0.9)', lineHeight: 1.625 }}>
                  Venta El Capricho nació del sueño de reunir a las familias del Aljarafe sevillano en torno a una mesa generosa y honesta. Cada rincón evoca la calidez de antaño, donde la hospitalidad andaluza se sirve con el cariño de quien recibe a sus propios hermanos en casa.
                </p>
                <div style={{ marginTop: '1rem', paddingTop: '0.875rem', borderTop: '1px solid rgba(214,195,165,0.5)', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6B5A45', fontFamily: 'monospace' }}>
                  <span>SABOR AUTÉNTICO</span>
                  <span>ALJARAFE DE SEVILLA</span>
                </div>
              </div>

              {/* Card 2 circle */}
              <div
                ref={dCard2Ref}
                style={{
                  background: '#F3EEE4',
                  border: '4px solid #FAF7F0',
                  width: '100%',
                  maxWidth: '320px',
                  aspectRatio: '1/1',
                  borderRadius: '50%',
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', inset: '10px', borderRadius: '50%', border: '1px dashed rgba(214,195,165,0.3)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: '16px', borderRadius: '50%', border: '1px solid rgba(214,195,165,0.5)', pointerEvents: 'none' }} />
                <div style={{ padding: '0.625rem', background: 'rgba(184,130,106,0.1)', borderRadius: '50%', marginBottom: '0.625rem', position: 'relative', zIndex: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8826A"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.125rem', color: '#3F3428', marginBottom: '0.25rem', position: 'relative', zIndex: 10, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                  Especialidades
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'rgba(63,52,40,0.95)', lineHeight: 1.625, maxWidth: '210px', position: 'relative', zIndex: 10, marginBottom: '0.75rem' }}>
                  Las célebres croquetas cremosas de jamón ibérico, nuestras carnes nobles a la brasa y el tradicional arroz hecho a fuego lento.
                </p>
                <a href="#carta" style={{ padding: '0.375rem 0.875rem', background: '#3F3428', color: '#fff', fontSize: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none', position: 'relative', zIndex: 10 }}>
                  Ver la Carta Completa
                </a>
              </div>

              {/* Card 3 */}
              <div
                ref={dCard3Ref}
                style={{
                  background: '#FAF7F0',
                  border: '4px double #D6C3A5',
                  padding: '1.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B8826A', display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.5rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  Celebraciones
                </span>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.25rem', color: '#3F3428', lineHeight: 1, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                  Comuniones, Bautizos y Bodas
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'rgba(63,52,40,0.9)', lineHeight: 1.625, marginBottom: '0.75rem' }}>
                  Ofrecemos salones de gran aforo y preciosos patios andaluces al aire libre. Diseñamos menús de celebración a medida para garantizar que vuestro acontecimiento familiar sea insuperable.
                </p>
                <a href="#eventos" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 700, color: '#B8826A', textDecoration: 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Personalizar mi Evento →
                </a>
              </div>

              {/* Card 4 brown */}
              <div
                ref={dCard4Ref}
                style={{
                  background: '#6B5A45',
                  color: '#F3EEE4',
                  padding: '1.75rem',
                  border: '1px solid rgba(207,194,174,0.25)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '100%', background: 'rgba(0,0,0,0.15)', pointerEvents: 'none' }} />
                <div style={{ paddingLeft: '0.875rem' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B8826A', display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.5rem' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Datos de Contacto
                  </span>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.25rem', color: '#fff', lineHeight: 1, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Reservas y Dirección
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', marginBottom: '0.75rem', fontSize: '0.75rem', color: 'rgba(243,238,228,0.85)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8826A" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <div>
                      <p style={{ fontWeight: 700, color: '#fff' }}>Venta El Capricho</p>
                      <p style={{ color: 'rgba(243,238,228,0.7)' }}>Calle Mandarina 2, Mairena del Aljarafe</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', marginBottom: '0.75rem', fontSize: '0.75rem', color: 'rgba(243,238,228,0.85)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8826A" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <div>
                      <p style={{ fontWeight: 700, color: '#fff' }}>Llámanos</p>
                      <p style={{ color: 'rgba(243,238,228,0.7)' }}>664 424 736 (Atención rápida)</p>
                    </div>
                  </div>
                  <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <a href="#reservas" style={{ padding: '0.375rem 0.875rem', background: '#B8826A', color: '#3F3428', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', display: 'inline-block' }}>
                      Reservar Mesa
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile layout */}
            <div
              style={{
                display: 'flex',
                position: 'relative',
                width: '100%',
                height: '60vh',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="md:hidden"
            >
              {/* Mobile card 1 */}
              <div
                ref={mCard1Ref}
                style={{
                  position: 'absolute',
                  left: '0.5rem',
                  right: '0.5rem',
                  background: '#FAF7F0',
                  border: '1px solid #D6C3A5',
                  padding: '1.25rem',
                }}
              >
                <span style={{ fontSize: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B8826A', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.375rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                  Nuestra Historia
                </span>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.125rem', color: '#3F3428', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '0.5rem' }}>
                  Tradición Familiar
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'rgba(63,52,40,0.9)', lineHeight: 1.625 }}>
                  Venta El Capricho nació en 1994 del sueño de reunir a las familias del Aljarafe sevillano en torno a platos generosos y honestos. Conservamos la calidez de la hospitalidad andaluza tradicional.
                </p>
              </div>

              {/* Mobile card 2 */}
              <div
                ref={mCard2Ref}
                style={{
                  position: 'absolute',
                  width: '270px',
                  height: '270px',
                  background: '#F3EEE4',
                  borderRadius: '50%',
                  border: '4px solid #FAF7F0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '1.25rem',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', inset: '10px', borderRadius: '50%', border: '1px dashed rgba(214,195,165,0.3)', pointerEvents: 'none' }} />
                <div style={{ padding: '0.5rem', background: 'rgba(184,130,106,0.1)', borderRadius: '50%', marginBottom: '0.375rem', position: 'relative', zIndex: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8826A"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1rem', color: '#3F3428', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '0.25rem', position: 'relative', zIndex: 10 }}>
                  Especialidades
                </h4>
                <p style={{ fontSize: '10px', color: 'rgba(63,52,40,0.95)', lineHeight: 1.625, maxWidth: '190px', marginBottom: '0.75rem', position: 'relative', zIndex: 10 }}>
                  Deliciosas croquetas ibéricas de bellota, carnes tiernas al sarmiento y nuestro arroz artesanal dominical.
                </p>
                <a href="#carta" style={{ padding: '0.375rem 0.75rem', background: '#3F3428', color: '#fff', fontSize: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none', position: 'relative', zIndex: 10 }}>
                  Ver Carta
                </a>
              </div>

              {/* Mobile card 3 */}
              <div
                ref={mCard3Ref}
                style={{
                  position: 'absolute',
                  left: '0.5rem',
                  right: '0.5rem',
                  background: '#FAF7F0',
                  border: '4px double #D6C3A5',
                  padding: '1.25rem',
                }}
              >
                <span style={{ fontSize: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B8826A', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.375rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  Celebraciones
                </span>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.125rem', color: '#3F3428', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '0.5rem' }}>
                  Comuniones e Hitos
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'rgba(63,52,40,0.9)', lineHeight: 1.625 }}>
                  Disponemos de salones climatizados de gran aforo y amplios patios exteriores. Ofrecemos menús de banquete totalmente configurables para momentos memorables.
                </p>
              </div>

              {/* Mobile card 4 */}
              <div
                ref={mCard4Ref}
                style={{
                  position: 'absolute',
                  left: '0.5rem',
                  right: '0.5rem',
                  background: '#6B5A45',
                  color: '#F3EEE4',
                  padding: '1.25rem',
                  border: '1px solid rgba(207,194,174,0.25)',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '100%', background: 'rgba(0,0,0,0.15)', pointerEvents: 'none' }} />
                <div style={{ paddingLeft: '0.75rem' }}>
                  <span style={{ fontSize: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#B8826A', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Datos Útiles
                  </span>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.125rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '0.625rem' }}>
                    Contacto
                  </h4>
                  <div style={{ fontSize: '11px', color: 'rgba(243,238,228,0.85)', marginBottom: '0.875rem' }}>
                    <p style={{ lineHeight: 1.3 }}>Calle Mandarina 2, Mairena del Aljarafe</p>
                    <p style={{ lineHeight: 1.3 }}>664 424 736</p>
                  </div>
                  <a href="#reservas" style={{ display: 'inline-block', padding: '0.375rem 0.875rem', background: '#B8826A', fontSize: '0.75rem', fontWeight: 700, color: '#3F3428', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>
                    Reservar Mesa
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Scroll tracker */}
        <div
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 30,
            display: 'none',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            color: 'rgba(63,52,40,0.4)',
            fontFamily: 'monospace',
            fontSize: '9px',
          }}
          className="xs:flex sm:right-6"
        >
          <span style={{ transform: 'rotate(90deg)', translate: '0 14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>HISTORIA</span>
          <div style={{ width: '1.5px', height: '64px', background: 'rgba(63,52,40,0.1)', position: 'relative' }}>
            <div
              ref={scrollFillRef}
              style={{
                position: 'absolute',
                inset: 0,
                background: '#B8826A',
                transformOrigin: 'top center',
                transform: 'scaleY(0)',
              }}
            />
          </div>
          <span style={{ transform: 'rotate(90deg)', translate: '0 -4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CONTACTO</span>
        </div>
      </div>
    </div>
  );
}

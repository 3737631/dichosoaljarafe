import React, { useEffect, useRef } from 'react';

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mantel Desplegable - Venta El Capricho</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Sora:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Alex+Brush&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #F3EEE4;
  --surface: #E7DDCC;
  --primary: #D6C3A5;
  --secondary: #B8826A;
  --accent: #B8826A;
  --brown: #8A755D;
  --text: #3F3428;
  --border: #CFC2AE;
}
* { margin:0; padding:0; box-sizing:border-box; }
body {
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
.font-serif { font-family: 'Playfair Display', Georgia, serif; }
.font-sans { font-family: 'Sora', sans-serif; }
.font-mono { font-family: monospace; }

/* Bg utility classes */
.bg-surface { background: var(--surface); }
.bg-background { background: var(--bg); }
.bg-brown { background: var(--brown); }
.bg-text { background: var(--text); }
.border-border { border-color: var(--border); }
.text-text { color: var(--text); }
.text-accent { color: var(--accent); }
.text-brown { color: var(--brown); }

/* MANTEL SECTION */
#mantel-sensorial {
  position: relative;
  width: 100%;
  height: 500vh;
}
.sticky-wrap {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
}

/* Wood lines */
.wood-lines {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.15;
}
.wood-lines-inner {
  width: 100%; height: 100%; display: flex; justify-content: space-between;
  padding: 0 2rem;
}
@media (min-width: 640px) { .wood-lines-inner { padding: 0 3rem; } }
.wood-line {
  width: 1px; height: 100%; background: #6B5A45;
  box-shadow: 0 0 8px rgba(107,90,69,0.3);
}

/* Intro tooltip */
.intro-tooltip {
  position: absolute; top: 4rem; left: 50%; transform: translateX(-50%);
  text-align: center; z-index: 30; max-width: 28rem; width: 100%;
  padding: 0 1.5rem; pointer-events: none;
}
@media (min-width: 640px) { .intro-tooltip { top: 5rem; max-width: 32rem; } }
.intro-box {
  background: rgba(231,221,204,0.95); border: 1px solid var(--border);
  padding: 1.25rem; box-shadow: 0 10px 40px rgba(63,52,40,0.12);
}
@media (min-width: 640px) { .intro-box { padding: 1.5rem; } }
.intro-box .label {
  font-size: 9px; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.25em; color: var(--accent);
}
.intro-box h3 {
  font-family: 'Playfair Display', serif; font-weight: 700;
  font-size: 1.125rem; color: var(--text); margin-top: 0.25rem;
  text-transform: uppercase; letter-spacing: 0.02em;
}
@media (min-width: 640px) { .intro-box h3 { font-size: 1.25rem; } }
.intro-box p {
  font-size: 0.75rem; color: var(--brown); margin-top: 0.5rem; line-height: 1.625;
}

/* Tablecloth */
.tablecloth {
  position: absolute; top: 0; left: 0; width: 100%; z-index: 10;
  height: 12%; background-color: #B8826A;
  box-shadow: 0 15px 40px rgba(63,52,40,0.18);
  display: flex; flex-direction: column; justify-content: space-between;
  overflow: hidden;
}
.tablecloth-pattern {
  position: absolute; inset: 0; opacity: 0.14; pointer-events: none;
  background-image:
    linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255,255,255,0.5) 1px, transparent 1px);
  background-size: 10px 10px;
}
.tablecloth-linen {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(180deg, transparent 49.3%, rgba(0,0,0,0.1) 49.8%, rgba(255,255,255,0.12) 50.1%, transparent 50.6%),
    linear-gradient(90deg, transparent 49.3%, rgba(0,0,0,0.1) 49.8%, rgba(255,255,255,0.12) 50.1%, transparent 50.6%);
  box-shadow: inset 0 0 80px rgba(0,0,0,0.14);
}

/* Wavy Trim */
.wavy-trim {
  position: absolute; bottom: 0; left: 0; width: 100%; z-index: 25;
  transform: translateY(96%); pointer-events: none; user-select: none;
}

/* Content */
.mantel-content {
  width: 100%; height: 100%; max-width: 72rem; margin: 0 auto;
  padding: 3.5rem 1rem; display: flex; flex-direction: column;
  justify-content: center; position: relative; z-index: 20; overflow: hidden;
}
@media (min-width: 768px) { .mantel-content { padding: 5rem 1.5rem; } }

/* Desktop grid */
.desktop-grid {
  display: none;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: center;
}
@media (min-width: 768px) { .desktop-grid { display: grid; } }
@media (min-width: 1024px) { .desktop-grid { gap: 2rem; } }

/* === CARD STYLES === */
.card { will-change: opacity, transform; }

/* Card 1 - Surface card with icon */
.card-surface {
  background: var(--surface); border: 1px solid var(--border);
  padding: 1.75rem; position: relative; overflow: hidden;
}
.card-surface .bg-icon {
  position: absolute; right: -1.5rem; bottom: -1.5rem;
  width: 6rem; height: 6rem;
  color: rgba(184,130,106,0.1); pointer-events: none;
}
.card-surface .bg-icon svg { width: 100%; height: 100%; stroke-width: 1; }
.card-label {
  font-size: 9px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.2em; color: var(--accent);
  display: flex; align-items: center; gap: 0.375rem; margin-bottom: 0.5rem;
}
.card-label svg { width: 12px; height: 12px; }
.card-title {
  font-family: 'Playfair Display', serif; font-weight: 700;
  font-size: 1.25rem; color: var(--text); line-height: 1;
  margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.02em;
}
.card-text {
  font-size: 0.75rem; color: rgba(63,52,40,0.9); line-height: 1.625;
}
@media (min-width: 640px) { .card-text { font-size: 0.8125rem; } }
.card-footer {
  margin-top: 1rem; padding-top: 0.875rem;
  border-top: 1px solid rgba(207,194,174,0.5);
  display: flex; justify-content: space-between;
  font-size: 10px; color: var(--brown); font-family: monospace;
}

/* Card 2 - Circle */
.card-circle {
  background: var(--bg); border: 4px solid var(--surface);
  width: 100%; max-width: 320px; aspect-ratio: 1;
  border-radius: 50%; margin: 0 auto;
  display: flex; flex-direction: column; justify-content: center;
  align-items: center; text-align: center; position: relative; overflow: hidden;
}
@media (min-width: 1024px) { .card-circle { max-width: 340px; } }
.card-circle .ring1 {
  position: absolute; inset: 10px; border-radius: 50%;
  border: 1px dashed rgba(207,194,174,0.3); pointer-events: none;
}
.card-circle .ring2 {
  position: absolute; inset: 16px; border-radius: 50%;
  border: 1px solid rgba(207,194,174,0.5); pointer-events: none;
}
.card-circle .icon-wrap {
  padding: 0.625rem; background: rgba(184,130,106,0.1);
  border-radius: 50%; margin-bottom: 0.625rem; position: relative; z-index: 10;
}
.card-circle .icon-wrap svg { width: 16px; height: 16px; color: var(--accent); }
.card-circle h4 {
  font-family: 'Playfair Display', serif; font-weight: 700;
  font-size: 1.125rem; color: var(--text); margin-bottom: 0.25rem;
  position: relative; z-index: 10; text-transform: uppercase; letter-spacing: 0.02em;
}
.card-circle p {
  font-size: 0.75rem; color: rgba(63,52,40,0.95); line-height: 1.625;
  max-width: 210px; position: relative; z-index: 10; margin-bottom: 0.75rem;
}
.circle-btn {
  padding: 0.375rem 0.875rem; background: var(--text); color: #fff;
  font-size: 8px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.15em; text-decoration: none; position: relative;
  z-index: 10; transition: background 0.2s;
}
.circle-btn:hover { background: var(--brown); }

/* Card 3 - Double border */
.card-double {
  background: var(--surface); border: 4px double var(--border);
  padding: 1.75rem; position: relative; overflow: hidden;
}
.card-double .link {
  display: inline-flex; align-items: center; gap: 0.375rem;
  font-size: 0.75rem; font-weight: 700; color: var(--accent);
  text-decoration: none; transition: color 0.2s;
}
.card-double .link:hover { color: var(--text); }

/* Card 4 - Brown contact */
.card-brown {
  background: var(--brown); color: #F3EEE4;
  padding: 1.75rem; border: 1px solid rgba(207,194,174,0.25);
  position: relative; overflow: hidden;
}
.card-brown .left-bar {
  position: absolute; top: 0; left: 0; width: 12px; height: 100%;
  background: rgba(0,0,0,0.15); pointer-events: none;
}
.card-brown .inner { padding-left: 0.875rem; }
.card-brown .label {
  font-size: 9px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.2em; color: #B8826A;
  display: flex; align-items: center; gap: 0.375rem; margin-bottom: 0.5rem;
}
.card-brown .label svg { width: 12px; height: 12px; }
.card-brown h4 {
  font-family: 'Playfair Display', serif; font-weight: 700;
  font-size: 1.25rem; color: #fff; line-height: 1;
  margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.02em;
}
.card-brown .c-item {
  display: flex; align-items: flex-start; gap: 0.625rem;
  margin-bottom: 0.75rem; font-size: 0.75rem;
  color: rgba(243,238,228,0.85);
}
.card-brown .c-item svg {
  width: 14px; height: 14px; color: #B8826A;
  flex-shrink: 0; margin-top: 2px;
}
.card-brown .c-item .bold { font-weight: 700; color: #fff; }
.card-brown .c-item .sub { color: rgba(243,238,228,0.7); }
.card-brown .c-foot {
  margin-top: 1.25rem; padding-top: 0.75rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.contact-btn {
  padding: 0.375rem 0.875rem; background: #B8826A; color: var(--text);
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.1em; text-decoration: none; display: inline-block;
  transition: background 0.2s;
}
.contact-btn:hover { background: #fff; }

/* === MOBILE LAYOUT === */
.mobile-layout {
  display: flex; position: relative; width: 100%;
  height: 60vh; align-items: center; justify-content: center;
}
@media (min-width: 768px) { .mobile-layout { display: none; } }

.m-card {
  position: absolute; left: 0.5rem; right: 0.5rem;
  will-change: opacity, transform;
}
.mc-surface {
  background: var(--surface); border: 1px solid var(--border);
  padding: 1.25rem;
}
.mc-circle {
  width: 270px; height: 270px; background: var(--bg);
  border-radius: 50%; border: 4px solid var(--surface);
  display: flex; flex-direction: column; justify-content: center;
  align-items: center; text-align: center; padding: 1.25rem;
  margin: 0 auto; position: relative; overflow: hidden;
}
.mc-circle .ring {
  position: absolute; inset: 10px; border-radius: 50%;
  border: 1px dashed rgba(207,194,174,0.3); pointer-events: none;
}
.mc-double {
  background: var(--surface); border: 4px double var(--border);
  padding: 1.25rem;
}
.mc-brown {
  background: var(--brown); color: #F3EEE4;
  padding: 1.25rem; border: 1px solid rgba(207,194,174,0.25);
  position: relative;
}
.mc-brown .left-bar {
  position: absolute; top: 0; left: 0; width: 10px; height: 100%;
  background: rgba(0,0,0,0.15); pointer-events: none;
}
.mc-brown .inner { padding-left: 0.75rem; }

/* Scroll tracker */
.scroll-tracker {
  position: absolute; right: 1rem; top: 50%; transform: translateY(-50%);
  z-index: 30; display: none; flex-direction: column; align-items: center;
  gap: 1rem; color: rgba(63,52,40,0.4); font-family: monospace; font-size: 9px;
}
@media (min-width:420px) { .scroll-tracker { display:flex; } }
@media (min-width:640px) { .scroll-tracker { right:1.5rem; } }
.scroll-tracker .lbl-historia {
  transform: rotate(90deg); transform-origin: center;
  translate: 0 14px; text-transform: uppercase; letter-spacing: 0.05em;
}
.scroll-tracker .lbl-contacto {
  transform: rotate(90deg); transform-origin: center;
  translate: 0 -4px; text-transform: uppercase; letter-spacing: 0.05em;
}
.scroll-bar {
  width: 1.5px; height: 64px; background: rgba(63,52,40,0.1); position: relative;
}
.scroll-fill {
  position: absolute; inset: 0; background: var(--accent);
  transform-origin: top center; transform: scaleY(0);
}

/* Utility */
.hidden-el { opacity: 0; pointer-events: none; }
</style>
</head>
<body>

<div id="mantel-sensorial">
  <div class="sticky-wrap">

    <!-- Wood lines -->
    <div class="wood-lines">
      <div class="wood-lines-inner">
        <div class="wood-line"></div><div class="wood-line"></div>
        <div class="wood-line"></div><div class="wood-line"></div>
        <div class="wood-line"></div>
      </div>
    </div>

    <!-- Intro tooltip -->
    <div class="intro-tooltip" id="introTooltip">
      <div class="intro-box">
        <span class="label">Experiencia Sensorial</span>
        <h3>Viste Nuestra Mesa</h3>
        <p>Desplázate hacia abajo lentamente para extender el mantel de terracota y descubrir nuestra historia y especialidades sobre él.</p>
      </div>
    </div>

    <!-- Tablecloth -->
    <div class="tablecloth" id="tablecloth">
      <div class="tablecloth-pattern"></div>
      <div class="tablecloth-linen"></div>

      <!-- SVG Wavy Trim -->
      <div class="wavy-trim">
        <svg viewBox="0 0 1440 48" fill="#B8826A" style="display:block;width:100%;height:48px;filter:drop-shadow(0 8px 4px rgba(63,52,40,0.15))" preserveAspectRatio="none">
          <path d="M0,0 Q30,18 60,0 T120,0 T180,0 T240,0 T300,0 T360,0 T420,0 T480,0 T540,0 T600,0 T660,0 T720,0 T780,0 T840,0 T900,0 T960,0 T1020,0 T1080,0 T1140,0 T1200,0 T1260,0 T1320,0 T1380,0 T1440,0 L1440,48 L0,48 Z"/>
        </svg>
        <svg viewBox="0 0 1440 24" fill="none" stroke="#F3EEE4" stroke-width="2" stroke-dasharray="4 6" style="display:block;width:100%;height:24px;margin-top:-40px;opacity:0.35" preserveAspectRatio="none">
          <path d="M0,0 Q30,12 60,0 T120,0 T180,0 T240,0 T300,0 T360,0 T420,0 T480,0 T540,0 T600,0 T660,0 T720,0 T780,0 T840,0 T900,0 T960,0 T1020,0 T1080,0 T1140,0 T1200,0 T1260,0 T1320,0 T1380,0 T1440,0"/>
        </svg>
      </div>

      <div class="mantel-content">

        <!-- DESKTOP GRID -->
        <div class="desktop-grid">

          <!-- CARD 1: Historia -->
          <div class="card card-surface" id="d1">
            <div class="bg-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            </div>
            <span class="card-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              Desde 1994
            </span>
            <h4 class="card-title">Nuestra Historia</h4>
            <p class="card-text">Venta El Capricho nació del sueño de reunir a las familias del Aljarafe sevillano en torno a una mesa generosa y honesta. Cada rincón evoca la calidez de antaño, donde la hospitalidad andaluza se sirve con el cariño de quien recibe a sus propios hermanos en casa.</p>
            <div class="card-footer">
              <span>SABOR AUTÉNTICO</span>
              <span>ALJARAFE DE SEVILLA</span>
            </div>
          </div>

          <!-- CARD 2: Especialidades (circle) -->
          <div class="card card-circle" id="d2">
            <div class="ring1"></div>
            <div class="ring2"></div>
            <div class="icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
            </div>
            <h4>Especialidades</h4>
            <p>Las célebres croquetas cremosas de jamón ibérico, nuestras carnes nobles a la brasa y el tradicional arroz hecho a fuego lento.</p>
            <a href="#carta" class="circle-btn">Ver la Carta Completa</a>
          </div>

          <!-- CARD 3: Celebraciones (double border) -->
          <div class="card card-double" id="d3">
            <span class="card-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              Celebraciones
            </span>
            <h4 class="card-title">Comuniones, Bautizos y Bodas</h4>
            <p class="card-text">Ofrecemos salones de gran aforo y preciosos patios andaluces al aire libre. Diseñamos menús de celebración a medida para garantizar que vuestro acontecimiento familiar sea insuperable.</p>
            <div style="margin-top:0.75rem">
              <a href="#eventos" class="link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Personalizar mi Evento →
              </a>
            </div>
          </div>

          <!-- CARD 4: Contacto (brown) -->
          <div class="card card-brown" id="d4">
            <div class="left-bar"></div>
            <div class="inner">
              <span class="label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Datos de Contacto
              </span>
              <h4>Reservas y Dirección</h4>
              <div class="c-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div>
                  <p class="bold">Venta El Capricho</p>
                  <p class="sub">Calle Mandarina 2, Mairena del Aljarafe</p>
                </div>
              </div>
              <div class="c-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <div>
                  <p class="bold">Llámanos</p>
                  <p class="sub">664 424 736 (Atención rápida)</p>
                </div>
              </div>
              <div class="c-foot">
                <a href="#reservas" class="contact-btn">Reservar Mesa</a>
              </div>
            </div>
          </div>
        </div>

        <!-- MOBILE LAYOUT -->
        <div class="mobile-layout">

          <div class="m-card mc-surface" id="m1">
            <span class="card-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              Nuestra Historia
            </span>
            <h4 style="font-family:'Playfair Display',serif;font-weight:700;font-size:1.125rem;color:var(--text);text-transform:uppercase;letter-spacing:0.02em;margin-bottom:0.5rem">Tradición Familiar</h4>
            <p class="card-text">Venta El Capricho nació en 1994 del sueño de reunir a las familias del Aljarafe sevillano en torno a platos generosos y honestos. Conservamos la calidez de la hospitalidad andaluza tradicional.</p>
          </div>

          <div class="m-card" id="m2">
            <div class="mc-circle">
              <div class="ring"></div>
              <div class="card-circle .icon-wrap" style="padding:0.5rem;background:rgba(184,130,106,0.1);border-radius:50%;margin-bottom:0.375rem;position:relative;z-index:10">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width:14px;height:14px;color:var(--accent)"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
              </div>
              <h4 style="font-family:'Playfair Display',serif;font-weight:700;font-size:1rem;color:var(--text);margin-bottom:0.25rem;text-transform:uppercase;letter-spacing:0.02em;z-index:10;position:relative">Especialidades</h4>
              <p style="font-size:10px;color:rgba(63,52,40,0.95);line-height:1.625;max-width:190px;margin-bottom:0.75rem;z-index:10;position:relative">Deliciosas croquetas ibéricas de bellota, carnes tiernas al sarmiento y nuestro arroz artesanal dominical.</p>
              <a href="#carta" class="circle-btn" style="z-index:10;position:relative">Ver Carta</a>
            </div>
          </div>

          <div class="m-card mc-double" id="m3">
            <span class="card-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              Celebraciones
            </span>
            <h4 style="font-family:'Playfair Display',serif;font-weight:700;font-size:1.125rem;color:var(--text);text-transform:uppercase;letter-spacing:0.02em;margin-bottom:0.5rem">Comuniones e Hitos</h4>
            <p class="card-text">Disponemos de salones climatizados de gran aforo y amplios patios exteriores. Ofrecemos menús de banquete totalmente configurables para momentos memorables.</p>
          </div>

          <div class="m-card mc-brown" id="m4">
            <div class="left-bar"></div>
            <div class="inner">
              <span class="card-label" style="font-size:8px">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Datos Útiles
              </span>
              <h4 style="font-family:'Playfair Display',serif;font-weight:700;font-size:1.125rem;color:#fff;text-transform:uppercase;letter-spacing:0.02em;margin-bottom:0.625rem">Contacto</h4>
              <div style="font-size:11px;color:rgba(243,238,228,0.85);margin-bottom:0.875rem">
                <p style="line-height:1.3">Calle Mandarina 2, Mairena del Aljarafe</p>
                <p style="line-height:1.3">664 424 736</p>
              </div>
              <a href="#reservas" style="display:inline-block;padding:0.375rem 0.875rem;background:#B8826A;font-size:0.75rem;font-weight:700;color:var(--text);text-transform:uppercase;letter-spacing:0.1em;text-decoration:none">Reservar Mesa</a>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Scroll tracker -->
    <div class="scroll-tracker">
      <span class="lbl-historia">HISTORIA</span>
      <div class="scroll-bar">
        <div class="scroll-fill" id="scrollFill"></div>
      </div>
      <span class="lbl-contacto">CONTACTO</span>
    </div>

  </div>
</div>

<script>
(function(){
  var mantel = document.getElementById('mantel-sensorial');
  var tablecloth = document.getElementById('tablecloth');
  var intro = document.getElementById('introTooltip');
  var fill = document.getElementById('scrollFill');

  var d1 = document.getElementById('d1');
  var d2 = document.getElementById('d2');
  var d3 = document.getElementById('d3');
  var d4 = document.getElementById('d4');
  var m1 = document.getElementById('m1');
  var m2 = document.getElementById('m2');
  var m3 = document.getElementById('m3');
  var m4 = document.getElementById('m4');

  function lerp(a,b,t){ return a+(b-a)*t }
  function clamp(v,m,M){ return Math.max(m,Math.min(M,v)) }
  function step(e0,e1,x){ return clamp((x-e0)/(e1-e0),0,1) }

  function transform(el,op,sc,ty,rot){
    if(!el)return;
    el.style.opacity=op;
    el.style.transform='scale('+sc+') translateY('+ty+'px) rotate('+rot+'deg)';
  }

  function update(){
    var rect=mantel.getBoundingClientRect();
    var total=mantel.clientHeight;
    var vh=window.innerHeight;
    var p=clamp(1-(rect.bottom-vh)/(total-vh),0,1);
    var s=p;

    // Tablecloth height
    tablecloth.style.height=lerp(12,100,step(0,0.32,s))+'%';
    // Wave
    tablecloth.style.transform='translateY('+(Math.sin(s*Math.PI*4.5)*5)+'px)';
    // Scroll fill
    fill.style.transform='scaleY('+s+')';

    // Intro
    var ti=1-step(0,0.18,s);
    var ty2=step(0,0.18,s)*-25;
    if(ti<=0){ intro.style.opacity='0'; intro.style.transform='translateX(-50%) translateY(-25px)'; }
    else { intro.style.opacity=ti; intro.style.transform='translateX(-50%) translateY('+ty2+'px)'; }

    var isD=window.innerWidth>=768;

    if(isD){
      var p1=step(0.22,0.44,s); transform(d1,p1,lerp(0.94,1,p1),lerp(30,0,p1),lerp(-3,-1,p1));
      var p2=step(0.38,0.60,s); transform(d2,p2,lerp(0.94,1,p2),lerp(30,0,p2),lerp(4,1,p2));
      var p3=step(0.54,0.76,s); transform(d3,p3,lerp(0.94,1,p3),lerp(30,0,p3),lerp(-2,0.5,p3));
      var p4=step(0.70,0.90,s); transform(d4,p4,lerp(0.94,1,p4),lerp(30,0,p4),lerp(3,-0.5,p4));
    } else {
      // m1
      var mp1=step(0.20,0.28,s); var mp1o=step(0.44,0.52,s);
      if(s<0.44){ m1.style.opacity=mp1; m1.style.transform='translateY('+lerp(20,0,mp1)+'px)'; }
      else { m1.style.opacity=1-mp1o; m1.style.transform='translateY('+lerp(0,-20,mp1o)+'px)'; }
      // m2
      var mp2=step(0.44,0.52,s); var mp2o=step(0.66,0.74,s);
      if(s<0.66){ m2.style.opacity=mp2; m2.style.transform='translateY('+lerp(20,0,mp2)+'px)'; }
      else { m2.style.opacity=1-mp2o; m2.style.transform='translateY('+lerp(0,-20,mp2o)+'px)'; }
      // m3
      var mp3=step(0.56,0.64,s); var mp3o=step(0.76,0.82,s);
      if(s<0.76){ m3.style.opacity=mp3; m3.style.transform='translateY('+lerp(20,0,mp3)+'px)'; }
      else { m3.style.opacity=1-mp3o; m3.style.transform='translateY('+lerp(0,-20,mp3o)+'px)'; }
      // m4
      var mp4=step(0.72,0.82,s);
      m4.style.opacity=mp4; m4.style.transform='translateY('+lerp(20,0,mp4)+'px)';
    }
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
})();
</script>
</body>
</html>`;

export default function ScrollMantelSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const fragment = document.createRange().createContextualFragment(html);
    ref.current.innerHTML = '';
    ref.current.appendChild(fragment);

    const scripts = ref.current.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, []);

  return <div ref={ref} />;
}

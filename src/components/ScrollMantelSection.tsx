import React, { useEffect, useRef } from 'react';

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Venta El Capricho - Mantel</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Sora:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Alex+Brush&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:inherit;color:#6B4423;overflow-x:hidden;-webkit-font-smoothing:antialiased}html{color-scheme:light}
.font-serif{font-family:'Playfair Display',Georgia,serif}
.font-sans{font-family:'Sora',sans-serif}
.font-mono{font-family:monospace}
#mantel-sensorial{position:relative;width:100%;height:500vh}
.sticky-wrap{position:sticky;top:0;height:100vh;width:100%;overflow:hidden;background:#E8DCC8;display:flex;flex-direction:column;justify-content:space-between;user-select:none}
.sticky-wrap::before{content:'';position:absolute;inset:0;opacity:.1;pointer-events:none;background-image:linear-gradient(90deg,rgba(107,68,35,.35) 1px,transparent 1px),linear-gradient(0deg,rgba(107,68,35,.35) 1px,transparent 1px);background-size:32px 32px}
.tt{position:absolute;top:4rem;left:50%;transform:translateX(-50%);text-align:center;z-index:30;max-width:24rem;width:100%;padding:0 1.5rem;pointer-events:none}
@media(min-width:640px){.tt{top:5rem;max-width:28rem}}
.tt-b{border:1px solid #C8A97E;padding:1.25rem;box-shadow:0 10px 40px rgba(107,68,35,.12);background:rgba(232,220,200,.95)}
@media(min-width:640px){.tt-b{padding:1.5rem}}
.tt-l{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.25em;color:#6B4423}
.tt-h{font-family:'Playfair Display',serif;font-weight:700;font-size:1.125rem;color:#6B4423;margin-top:.25rem;text-transform:uppercase;letter-spacing:.02em}
@media(min-width:640px){.tt-h{font-size:1.25rem}}
.tt-p{font-size:.75rem;color:#8B7D6B;margin-top:.5rem;line-height:1.625}
.tc{position:absolute;top:0;left:0;width:100%;z-index:10;height:12%;background:#C8A97E;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}
.tc-p{position:absolute;inset:0;opacity:.07;pointer-events:none;background-image:linear-gradient(90deg,rgba(107,68,35,.15) 1px,transparent 1px),linear-gradient(0deg,rgba(107,68,35,.15) 1px,transparent 1px);background-size:24px 24px}
.wav{position:absolute;bottom:0;left:0;width:100%;z-index:25;transform:translateY(96%);pointer-events:none;user-select:none}
.mc{width:100%;height:100%;max-width:72rem;margin:0 auto;padding:3.5rem 1rem;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:20;overflow:hidden}
@media(min-width:768px){.mc{padding:5rem 1.5rem}}
.dg{display:none;grid-template-columns:1fr 1fr;gap:1.5rem;align-items:center}
@media(min-width:768px){.dg{display:grid}}
@media(min-width:1024px){.dg{gap:2rem}}
.card{will-change:opacity,transform;backface-visibility:hidden}
.cs{background:#FAF7F2;border:1px solid #C8A97E;padding:1.75rem;position:relative;overflow:hidden;backface-visibility:hidden}
.cs-ico{position:absolute;right:-1.5rem;bottom:-1.5rem;width:6rem;height:6rem;color:rgba(200,169,126,.1);pointer-events:none}
.cs-ico svg{width:100%;height:100%;stroke-width:1}
.cs-img{position:absolute;top:-8px;right:20px;width:48px;height:48px;opacity:.25;transform:rotate(12deg);pointer-events:none}
.cs-img svg{width:100%;height:100%}
.cl{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:#6B4423;display:flex;align-items:center;gap:.375rem;margin-bottom:.5rem;font-family:'Sora',sans-serif}
.cl svg{width:12px;height:12px}
.ct{font-family:'Playfair Display',serif;font-weight:700;font-size:1.25rem;color:#6B4423;line-height:1;margin-bottom:.75rem;text-transform:uppercase;letter-spacing:.02em}
.cp{font-size:.75rem;color:rgba(107,68,35,.8);line-height:1.625;font-family:'Sora',sans-serif}
@media(min-width:640px){.cp{font-size:.8125rem}}
.cf{margin-top:1rem;padding-top:.875rem;border-top:1px solid rgba(200,169,126,.5);display:flex;justify-content:space-between;font-size:10px;color:#8B7D6B;font-family:monospace}
.cc{background:#FAF7F2;border:4px solid #E8DCC8;width:100%;max-width:320px;aspect-ratio:1;border-radius:50%;margin:0 auto;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:relative;overflow:hidden}
@media(min-width:1024px){.cc{max-width:340px}}
.cc-r1{position:absolute;inset:10px;border-radius:50%;border:1px dashed rgba(200,169,126,.3);pointer-events:none}
.cc-r2{position:absolute;inset:16px;border-radius:50%;border:1px solid rgba(200,169,126,.5);pointer-events:none}
.cc-iw{padding:.625rem;background:rgba(200,169,126,.1);border-radius:50%;margin-bottom:.625rem;position:relative;z-index:10}
.cc-iw svg{width:16px;height:16px;color:#6B4423}
.cc-img{position:absolute;bottom:12px;left:18px;width:40px;height:40px;opacity:.2;transform:rotate(-8deg);pointer-events:none;z-index:5}
.cc-img svg{width:100%;height:100%}
.cc-h{font-family:'Playfair Display',serif;font-weight:700;font-size:1.125rem;color:#6B4423;margin-bottom:.25rem;position:relative;z-index:10;text-transform:uppercase;letter-spacing:.02em}
.cc-p{font-size:.75rem;color:rgba(107,68,35,.85);line-height:1.625;max-width:210px;position:relative;z-index:10;margin-bottom:.75rem;font-family:'Sora',sans-serif}
.cb{padding:.375rem .875rem;background:#6B4423;color:#FAF7F2;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;text-decoration:none;position:relative;z-index:10;transition:background .2s;backface-visibility:hidden}
.cb:hover{background:#8B7D6B}
.cd{background:#FAF7F2;border:4px double #C8A97E;padding:1.75rem;position:relative;overflow:hidden}
.cd-lk{display:inline-flex;align-items:center;gap:.375rem;font-size:.75rem;font-weight:700;color:#6B4423;text-decoration:none;transition:color .2s}
.cd-lk:hover{color:#8B7D6B}
.cd-img{position:absolute;bottom:-6px;right:16px;width:44px;height:44px;opacity:.22;transform:rotate(20deg);pointer-events:none}
.cd-img svg{width:100%;height:100%}
.cbr{background:#6B4423;color:#FAF7F2;padding:1.75rem;border:1px solid rgba(232,220,200,.2);position:relative;overflow:hidden}
.cbr-lb{position:absolute;top:0;left:0;width:12px;height:100%;background:rgba(0,0,0,.15);pointer-events:none}
.cbr-in{padding-left:.875rem}
.cbr-l{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:#C8A97E;display:flex;align-items:center;gap:.375rem;margin-bottom:.5rem;font-family:'Sora',sans-serif}
.cbr-l svg{width:12px;height:12px}
.cbr-h{font-family:'Playfair Display',serif;font-weight:700;font-size:1.25rem;color:#FAF7F2;line-height:1;margin-bottom:1rem;text-transform:uppercase;letter-spacing:.02em}
.cbr-ci{display:flex;align-items:flex-start;gap:.625rem;margin-bottom:.75rem;font-size:.75rem;color:rgba(250,247,242,.85);font-family:'Sora',sans-serif}
.cbr-ci svg{width:14px;height:14px;color:#C8A97E;flex-shrink:0;margin-top:2px}
.cbr-b{font-weight:700;color:#FAF7F2}
.cbr-s{color:rgba(250,247,242,.7)}
.cbr-ft{margin-top:1.25rem;padding-top:.75rem;border-top:1px solid rgba(250,247,242,.15);display:flex}
.cbr-btn{padding:.375rem .875rem;background:#C8A97E;color:#6B4423;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;text-decoration:none;display:inline-block;transition:background .2s}
.cbr-btn:hover{background:#FAF7F2}
.cbr-img{position:absolute;top:-4px;left:40%;width:52px;height:52px;opacity:.15;transform:rotate(-15deg);pointer-events:none}
.cbr-img svg{width:100%;height:100%}
.ml{display:flex;position:relative;width:100%;height:60vh;align-items:center;justify-content:center}
@media(min-width:768px){.ml{display:none}}
.mcrd{position:absolute;left:.5rem;right:.5rem;will-change:opacity,transform;backface-visibility:hidden}
.mcs{background:#FAF7F2;border:1px solid #C8A97E;padding:1.25rem;backface-visibility:hidden}
.mcc{width:270px;height:270px;background:#FAF7F2;border-radius:50%;border:4px solid #E8DCC8;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:1.25rem;margin:0 auto;position:relative;overflow:hidden}
.mcc-r{position:absolute;inset:10px;border-radius:50%;border:1px dashed rgba(200,169,126,.3);pointer-events:none}
.mccd{background:#FAF7F2;border:4px double #C8A97E;padding:1.25rem}
.mccb{background:#6B4423;color:#FAF7F2;padding:1.25rem;border:1px solid rgba(232,220,200,.2);position:relative}
.mccb-lb{position:absolute;top:0;left:0;width:10px;height:100%;background:rgba(0,0,0,.15);pointer-events:none}
.mccb-in{padding-left:.75rem}
.str{position:absolute;right:1rem;top:50%;transform:translateY(-50%);z-index:30;display:none;flex-direction:column;align-items:center;gap:1rem;color:rgba(107,68,35,.35);font-family:monospace;font-size:9px}
@media(min-width:420px){.str{display:flex}}
@media(min-width:640px){.str{right:1.5rem}}
.str-l1{transform:rotate(90deg);transform-origin:center;translate:0 14px;text-transform:uppercase;letter-spacing:.05em}
.str-l2{transform:rotate(90deg);transform-origin:center;translate:0 -4px;text-transform:uppercase;letter-spacing:.05em}
.str-b{width:1.5px;height:64px;background:rgba(107,68,35,.1);position:relative}
.str-f{position:absolute;inset:0;background:#C8A97E;transform-origin:top center;transform:scaleY(0)}
</style>
</head>
<body>
<div id="mantel-sensorial">
  <div class="sticky-wrap">
    <div class="tt" id="tt"><div class="tt-b"><div class="tt-l">Experiencia Sensorial</div><div class="tt-h">Viste Nuestra Mesa</div><div class="tt-p">Desplázate para descubrir nuestra cocina, nuestros arroces y todo lo que hace de Dichoso un lugar especial.</div></div></div>
    <div class="tc" id="tc">
      <div class="tc-p"></div>
      <div class="wav">
        <svg viewBox="0 0 1440 48" fill="#C8A97E" style="display:block;width:100%;height:48px;filter:drop-shadow(0 8px 4px rgba(107,68,35,.15))" preserveAspectRatio="none"><path d="M0,0 Q30,18 60,0 T120,0 T180,0 T240,0 T300,0 T360,0 T420,0 T480,0 T540,0 T600,0 T660,0 T720,0 T780,0 T840,0 T900,0 T960,0 T1020,0 T1080,0 T1140,0 T1200,0 T1260,0 T1320,0 T1380,0 T1440,0 L1440,48 L0,48 Z"/></svg>
        <svg viewBox="0 0 1440 24" fill="none" stroke="#FAF7F2" stroke-width="2" stroke-dasharray="4 6" style="display:block;width:100%;height:24px;margin-top:-40px;opacity:.35" preserveAspectRatio="none"><path d="M0,0 Q30,12 60,0 T120,0 T180,0 T240,0 T300,0 T360,0 T420,0 T480,0 T540,0 T600,0 T660,0 T720,0 T780,0 T840,0 T900,0 T960,0 T1020,0 T1080,0 T1140,0 T1200,0 T1260,0 T1320,0 T1380,0 T1440,0"/></svg>
      </div>
      <div class="mc">
        <div class="dg">
          <div class="card cs" id="d1">
            <div class="cs-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></div>
            <div class="cs-img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
            <span class="cl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Desde 1994</span>
            <div class="ct">Cocina con Alma</div>
            <div class="cp">En Dichoso creemos que la buena mesa se comparte. Producto de temporada, arroces con alma y una cocina que abraza la tradición sin miedo a innovar. Una taberna elegante, honesta y pensada para compartir.</div>
            <div class="cf"><span>COCINA CONTEMPORÁNEA</span><span>MAIRENA DEL ALJARAFE</span></div>
          </div>
          <div class="card cc" id="d2">
            <div class="cc-r1"></div><div class="cc-r2"></div>
            <div class="cc-iw"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg></div>
            <div class="cc-img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="5"/><path d="M3 21h18"/><path d="M7 13l-2 8"/><path d="M17 13l2 8"/></svg></div>
            <div class="cc-h">Lo Más Dichoso</div>
            <div class="cc-p">Nuestras croquetas de jamón ibérico de bellota, el steak tartar aliñado con tuétano asado y el arroz sabroso de carabinero con huevo frito son los imprescindibles de nuestra casa.</div>
            <a href="#carta" class="cb">Ver la Carta Completa</a>
          </div>
          <div class="card cd" id="d3">
            <span class="cl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> Celebraciones</span>
            <div class="ct">Arroces con Identidad</div>
            <div class="cp" style="margin-bottom:.75rem">Nuestra especialidad, elaborados al momento. Arroz de carrillada y queso de cabra, arroz sabroso de carabinero y huevo frito, y el clásico arroz negro con alioli. Cada bocado es una experiencia única.</div>
            <div style="margin-top:.75rem"><a href="#carta" class="cd-lk"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Ver Nuestra Carta →</a></div>
            <div class="cd-img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
          </div>
          <div class="card cbr" id="d4">
            <div class="cbr-lb"></div>
            <div class="cbr-img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
            <div class="cbr-in">
              <span class="cbr-l"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Contacto y Reservas</span>
              <div class="cbr-h">Ven a Conocernos</div>
              <div style="display:flex;flex-direction:column;gap:.75rem;font-size:.75rem;font-family:'Sora',sans-serif;color:rgba(250,247,242,.85)">
                <div class="cbr-ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><div><div class="cbr-b">Av. de los Descubrimientos, 11</div><div class="cbr-s">41927 Mairena del Aljarafe · Sevilla</div></div></div>
                <div class="cbr-ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><div><div class="cbr-b">664 24 32 80</div><div class="cbr-s">Almuerzo 13:00–16:30 · Cena 20:00–00:00</div></div></div>
              </div>
              <div class="cbr-ft"><a href="#reservas" class="cbr-btn">Reservar Mesa</a></div>
            </div>
          </div>
        </div>
        <div class="ml">
          <div class="mcrd mcs" id="m1">
            <span class="cl" style="font-size:8px;gap:.25rem;margin-bottom:.375rem"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Sobre Nosotros</span>
            <div style="font-family:'Playfair Display',serif;font-weight:700;font-size:1.125rem;color:#6B4423;text-transform:uppercase;letter-spacing:.02em;margin-bottom:.5rem">Cocina con Alma</div>
            <div class="cp">En Dichoso creemos que la buena mesa se comparte. Producto de temporada, arroces con alma y una cocina que abraza la tradición sin miedo a innovar.</div>
          </div>
          <div class="mcrd" id="m2">
            <div class="mcc">
              <div class="mcc-r"></div>
              <div style="padding:.5rem;background:rgba(200,169,126,.1);border-radius:50%;margin-bottom:.375rem;position:relative;z-index:10"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width:14px;height:14px;color:#6B4423"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg></div>
              <div style="font-family:'Playfair Display',serif;font-weight:700;font-size:1rem;color:#6B4423;margin-bottom:.25rem;text-transform:uppercase;letter-spacing:.02em;z-index:10;position:relative">Lo M&aacute;s Dichoso</div>
              <div style="font-size:10px;color:rgba(107,68,35,.85);line-height:1.625;max-width:190px;margin-bottom:.75rem;z-index:10;position:relative;font-family:'Sora',sans-serif">Croquetas de jam&oacute;n ib&eacute;rico, steak tartar en tu&eacute;tano y arroz de carabinero: nuestros imprescindibles.</div>
              <a href="#carta" style="padding:.3rem .65rem;background:#6B4423;color:#FAF7F2;font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;text-decoration:none;z-index:10;position:relative;display:inline-block">Ver Carta</a>
            </div>
          </div>
          <div class="mcrd mccd" id="m3">
            <span class="cl" style="font-size:8px;gap:.25rem;margin-bottom:.375rem"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> Celebraciones</span>
            <div style="font-family:'Playfair Display',serif;font-weight:700;font-size:1.125rem;color:#6B4423;text-transform:uppercase;letter-spacing:.02em;margin-bottom:.5rem">Arroces con Identidad</div>
            <div class="cp">Arroz de carrillada y queso de cabra, arroz sabroso de carabinero y arroz negro con alioli. Elaborados al momento, con producto de temporada.</div>
          </div>
          <div class="mcrd mccb" id="m4">
            <div class="mccb-lb"></div>
            <div class="mccb-in">
              <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:#C8A97E;display:flex;align-items:center;gap:.25rem;margin-bottom:.25rem;font-family:'Sora',sans-serif"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width:10px;height:10px"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Contacto y Reservas</span>
              <div style="font-family:'Playfair Display',serif;font-weight:700;font-size:1.125rem;color:#FAF7F2;text-transform:uppercase;letter-spacing:.02em;margin-bottom:.625rem">Ven a Conocernos</div>
              <div style="font-size:11px;font-family:'Sora',sans-serif;color:rgba(250,247,242,.85);margin-bottom:.875rem"><div style="line-height:1.3">Av. Descubrimientos 11, Mairena</div><div style="line-height:1.3">664 24 32 80</div></div>
              <a href="#reservas" style="display:inline-block;padding:.3rem .65rem;background:#C8A97E;font-size:.65rem;font-weight:700;color:#6B4423;text-transform:uppercase;letter-spacing:.08em;text-decoration:none">Reservar Mesa</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="str"><span class="str-l1">HISTORIA</span><div class="str-b"><div class="str-f" id="strF"></div></div><span class="str-l2">CONTACTO</span></div>
  </div>
</div>
<script>
(function(){
  var M=document.getElementById('mantel-sensorial'),T=document.getElementById('tc'),TT=document.getElementById('tt'),SF=document.getElementById('strF');
  var d1=document.getElementById('d1'),d2=document.getElementById('d2'),d3=document.getElementById('d3'),d4=document.getElementById('d4');
  var m1=document.getElementById('m1'),m2=document.getElementById('m2'),m3=document.getElementById('m3'),m4=document.getElementById('m4');
  var lastY=-1,lastW=-1,cur=0;
  function lerp(a,b,t){return a+(b-a)*t}
  function clamp(v,m,M2){return Math.max(m,Math.min(M2,v))}
  function step(e0,e1,x){return clamp((x-e0)/(e1-e0),0,1)}
  function ap(el,op,sc,ty,rot){if(!el)return;el.style.opacity=op;el.style.transform='scale('+sc+') translateY('+ty+'px) rotate('+rot+'deg)'}
  function upd(){
    var sy=window.scrollY||window.pageYOffset;
    if(sy!==lastY||window.innerWidth!==lastW){
      lastY=sy;lastW=window.innerWidth;
      var r=M.getBoundingClientRect(),h=M.clientHeight,vh=window.innerHeight;
      cur=clamp(1-(r.bottom-vh)/(h-vh),0,1);
    }
    var s=cur;
    T.style.height=lerp(12,100,step(0,.32,s))+'%';
    T.style.transform='translateY('+(Math.sin(s*Math.PI*4.5)*5)+'px) translateZ(0)';
    SF.style.transform='scaleY('+s+')';
    var ti=1-step(0,.18,s);
    if(ti<=0){TT.style.opacity='0';TT.style.transform='translateX(-50%) translateY(-25px)'}
    else{TT.style.opacity=ti;TT.style.transform='translateX(-50%) translateY('+(step(0,.18,s)*-25)+'px)'}
    if(window.innerWidth>=768){
      var p1=step(.22,.44,s);ap(d1,p1,lerp(.94,1,p1),lerp(30,0,p1),lerp(-3,-1,p1));
      var p2=step(.38,.60,s);ap(d2,p2,lerp(.94,1,p2),lerp(30,0,p2),lerp(4,1,p2));
      var p3=step(.54,.76,s);ap(d3,p3,lerp(.94,1,p3),lerp(30,0,p3),lerp(-2,.5,p3));
      var p4=step(.70,.90,s);ap(d4,p4,lerp(.94,1,p4),lerp(30,0,p4),lerp(3,-.5,p4));
    } else {
      var q1=step(.20,.28,s),q1o=step(.44,.52,s);
      if(s<.44){m1.style.opacity=q1;m1.style.transform='translateY('+lerp(20,0,q1)+'px)'}
      else{m1.style.opacity=1-q1o;m1.style.transform='translateY('+lerp(0,-20,q1o)+'px)'}
      var q2=step(.44,.52,s),q2o=step(.66,.74,s);
      if(s<.66){m2.style.opacity=q2;m2.style.transform='translateY('+lerp(20,0,q2)+'px)'}
      else{m2.style.opacity=1-q2o;m2.style.transform='translateY('+lerp(0,-20,q2o)+'px)'}
      var q3=step(.56,.64,s),q3o=step(.76,.82,s);
      if(s<.76){m3.style.opacity=q3;m3.style.transform='translateY('+lerp(20,0,q3)+'px)'}
      else{m3.style.opacity=1-q3o;m3.style.transform='translateY('+lerp(0,-20,q3o)+'px)'}
      var q4=step(.72,.82,s);m4.style.opacity=q4;m4.style.transform='translateY('+lerp(20,0,q4)+'px)'
    }
    requestAnimationFrame(upd)
  }
  requestAnimationFrame(upd)
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

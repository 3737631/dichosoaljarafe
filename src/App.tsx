import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import "./App.css";
import { supabase } from "./supabase";
import ScrollMantelSection from "./components/ScrollMantelSection";

/* ── Data ──────────────────────────────────────── */
const PHONE = "664243280";
const ADDRESS = "Av. de los Descubrimientos, 11, 41927 Mairena del Aljarafe";
const MAPS_URL =
  "https://maps.google.com/?q=Av.+de+los+Descubrimientos+11,+Mairena+del+Aljarafe";

const FEATURES = [
  { label: "Cocina contemporánea", desc: "Tradición reinventada con técnicas modernas." },
  { label: "Producto de temporada", desc: "Ingredientes seleccionados con mimo." },
  { label: "Arroces con identidad", desc: "Nuestra especialidad, elaborados al momento." },
  { label: "Tapas creativas", desc: "Bocados llenos de sabor y originalidad." },
];

const MENU_DATA = [
  {
    title: "ENTRANTES",
    items: [
      { name: "Gilda cecina y queso", price: "2,5€ ud." },
      { name: "Gilda anchoa, boquerón, tomate seco, queso viejo", price: "3€" },
      { name: "Salmorejo con huevo y jamón ibérico", price: "5,5€" },
      { name: "Ensaladilla de gambas", price: "4,2€ / 9,7€" },
      { name: "Ensaladilla de pulpo", price: "4,5€ / 10€" },
      { name: "Papas aliñás", price: "4€ / 9€" },
      { name: "Papas bravas", price: "5,5€" },
      { name: "Tosta de salmorejo con matrimonio de anchoa y boquerón", price: "4,5€" },
    ],
  },
  {
    title: "FRITOS",
    items: [
      { name: "Croquetas de jamón ibérico de bellota", price: "5€ / 9,5€" },
      { name: "Croquetas de setas salteadas en mantequilla y soja", price: "5€ / 9,5€" },
      { name: "Croquetas de gambas al ajillo", price: "5€ / 9,5€" },
      { name: "Berenjena frita con mayonesa de soja y miel", price: "5,5€" },
      { name: "Chocos fritos", price: "7,5€ / 15€" },
    ],
  },
  {
    title: "LO MÁS DICHOSO",
    items: [
      { name: "Patatas arriera", price: "12€" },
      { name: "Langostinos al ajillo estilo Dichoso", price: "7,5€" },
      { name: "Sándwich de cecina de vaca, queso viejo y trufa, planchado en mantequilla", price: "7,5€" },
      { name: "Tortilla de patatas con panceta ibérica y parmesano", price: "9€" },
      { name: "Tartar de cigala marinado en su esencia", price: "9,5€" },
      { name: "Steak tartar aliñado con tuétano asado y presentado en su hueso", price: "16,9€" },
      { name: "Carrillada de cerdo ibérico", price: "5,5€" },
      { name: "Presa de cerdo ibérico de bellota", price: "9€ / 17€" },
      { name: "Lomo bajo de vaca", price: "7€ / 100gr" },
    ],
  },
  {
    title: "DEL MAR",
    items: [
      { name: "Sardinas estilo espeto", price: "9€" },
      { name: "Mejillones a la marinera", price: "7,5€" },
      { name: "Gambón a la plancha", price: "2,5€ ud." },
      { name: "Carabinero a la plancha", price: "15€ ud." },
      { name: "Navajas", price: "12€" },
      { name: "Berberechos", price: "10€" },
      { name: "Calamar de potera a la plancha", price: "6€ / 100gr" },
    ],
  },
  {
    title: "ARROCES EN PAELLA",
    items: [
      { name: "Arroz de carrillada y queso de cabra", price: "16€ por persona" },
      { name: "Arroz sabroso de carabinero y huevo frito", price: "21€ por persona" },
      { name: "Arroz negro con alioli", price: "18€ por persona" },
    ],
  },
  {
    title: "POSTRES",
    items: [
      { name: "Tarta de queso", price: "6€" },
      { name: "Tarta de la abuela con natilla y caramelo salado", price: "6€" },
      { name: "Torrija casera con helado de turrón", price: "6,5€" },
    ],
  },
];

const ESPECIALES = [
  {
    name: "Sándwich de cecina, queso viejo y trufa",
    desc: "Planchado en mantequilla",
    price: "7,5€",
    images: [
      "/dichosoaljarafe/images/especiales/sandwich-cecina-trufa/6R8A8966.jpg",
      "/dichosoaljarafe/images/especiales/sandwich-cecina-trufa/6R8A8968.jpg",
    ],
  },
  {
name: "Tortilla de patatas con panceta ibérica y parmesano",
     desc: "Lo más Dichoso",
     price: "9€",
     images: [
       "/dichosoaljarafe/images/especiales/tortilla-patatas-panceta/6R8A1099.jpg",
     ],
   },
  {
    name: "Mejillones a la marinera",
    desc: "Del mar",
    price: "7,5€",
    images: [
      "/dichosoaljarafe/images/especiales/mejillones-marinera/2025_10_30_8051.jpg",
      "/dichosoaljarafe/images/especiales/mejillones-marinera/2025_10_30_8055.jpg",
      "/dichosoaljarafe/images/especiales/mejillones-marinera/2025_10_30_8066.jpg",
      "/dichosoaljarafe/images/especiales/mejillones-marinera/2025_10_30_8083.jpg",
      "/dichosoaljarafe/images/especiales/mejillones-marinera/2025_10_30_8091.jpg",
    ],
  },
    {
    name: "Torrija casera con helado de turrón",
    desc: "Postre emblemático",
    price: "6,5€",
    images: ["/dichosoaljarafe/images/especiales/torrija/6R8A1054.jpg"],
  },
  {
    name: "Tarta de queso",
    desc: "Postre casero",
    price: "6€",
    images: [
      "/dichosoaljarafe/images/especiales/tarta-queso/6R8A9433.jpg",
      "/dichosoaljarafe/images/especiales/tarta-queso/6R8A9437-2.jpg",
      "/dichosoaljarafe/images/especiales/tarta-queso/6R8A9437.jpg",
      "/dichosoaljarafe/images/especiales/tarta-queso/6R8A9438.jpg",
    ],
  },
  {
    name: "Arroz sabroso de carabinero y huevo frito",
    desc: "Nuestro arroz estrella",
    price: "21€",
    images: [
      "/dichosoaljarafe/images/especiales/arroz-carabinero-huevo/6R8A6587.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carabinero-huevo/6R8A6596.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carabinero-huevo/6R8A6604.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carabinero-huevo/6R8A9011.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carabinero-huevo/6R8A9025.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carabinero-huevo/6R8A9041.jpg",
    ],
  },
  {
    name: "Arroz de carrillada y queso de cabra",
    desc: "Arroz cremoso",
    price: "16€",
    images: [
      "/dichosoaljarafe/images/especiales/arroz-carrillada-queso/2025_10_30_8131.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carrillada-queso/2025_10_30_8135.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carrillada-queso/2025_10_30_8141.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carrillada-queso/2025_10_30_8144.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carrillada-queso/2025_10_30_8151.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carrillada-queso/2025_10_30_8154.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carrillada-queso/6R8A8974.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carrillada-queso/6R8A8978.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carrillada-queso/6R8A8979.jpg",
      "/dichosoaljarafe/images/especiales/arroz-carrillada-queso/6R8A9029.jpg",
    ],
  },
  {
    name: "Croquetas",
    desc: "Elige tu variedad favorita",
    price: "5€",
    images: [
      "/dichosoaljarafe/images/especiales/croquetas/6R8A6549.jpg",
      "/dichosoaljarafe/images/especiales/croquetas/6R8A1083.jpg",
      "/dichosoaljarafe/images/especiales/croquetas/6R8A1087.jpg",
      "/dichosoaljarafe/images/especiales/croquetas/6R8A6460.jpg",
    ],
  },
];

const FILOSOFIA_IMAGES: string[] = [
  "/dichosoaljarafe/images/filosofia/2025_10_30_7907.jpg",
  "/dichosoaljarafe/images/filosofia/2025_10_30_7926.jpg",
  "/dichosoaljarafe/images/filosofia/2025_10_30_7945.jpg",
  "/dichosoaljarafe/images/filosofia/2025_10_30_7953.jpg",
  "/dichosoaljarafe/images/filosofia/2025_10_30_7967.jpg",
  "/dichosoaljarafe/images/filosofia/2025_10_30_8020.jpg",
  "/dichosoaljarafe/images/filosofia/2025_10_30_8178.jpg",
  "/dichosoaljarafe/images/filosofia/2025_10_30_8181.jpg",
  "/dichosoaljarafe/images/filosofia/2025_10_30_8184.jpg",
  "/dichosoaljarafe/images/filosofia/2025_10_30_8191.jpg",
  "/dichosoaljarafe/images/filosofia/2025_10_30_8195.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_05_8380.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_05_8381.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_05_8385.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8207.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8211.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8232.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8235.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8238.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8257.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8262.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8277.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8278.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8298.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8303.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8322.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8329.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8341.jpg",
  "/dichosoaljarafe/images/filosofia/2025_11_07_8376.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A0211.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A0217.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A0218.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A0222.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A0228.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A0268.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A0275.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A4905.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A4907.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A4913.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A4920.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A4921.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A4922.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A4925.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A4945.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A4961.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A4972.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5343.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5366.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5376.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5392.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5395.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5397.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5408.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5421.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5428.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5433.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5438.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5443.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5446.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5461.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5478.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A5479.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A6463.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A6468.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A8958.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A9066.jpg",
  "/dichosoaljarafe/images/filosofia/6R8A9073.jpg",
];

const REVIEWS = [
  { text: "Tapas muy ricas, cerveza helada y camareros muy amables.", author: "Cliente Google" },
  { text: "Lo que más me ha gustado han sido los arroces y las croquetas de setas.", author: "Cliente Google" },
  { text: "La comida está increíble, el steak tartar en tuétano está delicioso.", author: "Cliente Google" },
];

/* ── Components ────────────────────────────────── */
function Navbar() {
  const links = ["Carta", "Nosotros", "Reservas", "Contacto"];
  const ids   = ["carta", "nosotros", "reservas", "contacto"];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="navbar">
      <span className="navbar-logo">Dichoso</span>
      <div className="navbar-links">
        {links.map((l, i) => (
          <button key={l} onClick={() => scrollTo(ids[i])} className="nav-link">
            {l}
          </button>
        ))}
        <span style={{display:"flex",gap:"1.25rem",alignItems:"center"}}>
          <button onClick={() => scrollTo("carta")} className="btn btn-gold btn-carta-nav" style={{background:"none",border:"1px solid var(--accent)",color:"var(--accent)",fontSize:"0.75rem",padding:"0.65rem 1.2rem",letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'Roboto Condensed',sans-serif",borderRadius:0}}>
            Carta
          </button>
          <button onClick={() => scrollTo("reservas")} className="btn btn-gold" style={{padding:"0.65rem 1.2rem",fontSize:"0.75rem",letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",border:"none",fontFamily:"'Roboto Condensed',sans-serif",borderRadius:0}}>
            Reservar
          </button>
        </span>
      </div>
    </nav>
  );
}

function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  const { scrollY } = useScroll();
  const mantelY = useTransform(scrollY, [0, 1000], [0, 240]);
  const mantelHeight = useTransform(scrollY, [0, 1000], [20, 120]);

  return (
    <section className="hero" id="hero">
      {/* Dynamic Hanging Tablecloth Decor */}
      <motion.div
        style={{ y: mantelY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        className="absolute top-[68px] left-0 w-full z-10 pointer-events-none select-none"
      >
        <motion.div style={{ height: mantelHeight }} className="bg-mantel w-full shadow-inner"></motion.div>
      </motion.div>
      <div className="hero-watermark">Dichoso</div>
      <div className="hero-content">
        <p className={`hero-eyebrow fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>Mairena del Aljarafe - Sevilla</p>
        <h1 className={`hero-title fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
          Sabores que<br />
          <em>sorprenden</em>
        </h1>
        <p className={`hero-subtitle fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.6s" }}>
          Cocina contemporánea, producto cuidado y una experiencia gastronómica diferente.
        </p>
        <p className={`hero-slogan fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.7s" }}>
          Dichoso el día que entraste por aquí
        </p>
        <div className={`hero-actions fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.8s" }}>
          <button
            className="btn btn-gold"
            onClick={() => document.getElementById("carta")?.scrollIntoView({ behavior: "smooth" })}
          >
            Ver carta
          </button>
          <button
            className="btn btn-outline"
            onClick={() => document.getElementById("reservas")?.scrollIntoView({ behavior: "smooth" })}
          >
            Reservar mesa
          </button>
        </div>
      </div>
    </section>
  );
}

function About() {
  const [showFilosofia, setShowFilosofia] = useState(false);
  return (
    <section className="section about-compact" id="nosotros">
      <div className="container">
        <div className="about-compact-grid">
          <div className="about-compact-text">
            <p className="section-eyebrow">Nuestra filosofía</p>
            <h2 className="section-title">Elevando lo cotidiano</h2>
            <p>
              En Dichoso creemos que la buena mesa se comparte. Producto de temporada,
              arroces con alma y una cocina que abraza la tradición sin miedo a innovar.
            </p>
            <blockquote className="quote">Una taberna elegante, honesta y pensada para compartir.</blockquote>
            <button className="btn btn-outline" style={{ marginTop: "1rem", alignSelf: "flex-start" }} onClick={() => setShowFilosofia(!showFilosofia)}>
              {showFilosofia ? "Ocultar fotos" : "Ver fotos del local"}
            </button>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                className="feature-card"
                initial={{ opacity: 0.4, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <h4 className="feature-title">{f.label}</h4>
                <p className="feature-desc">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {showFilosofia && (
          <div style={{ marginTop: "3rem" }}>
            <p className="section-eyebrow">Nuestro local</p>
            <h3 className="section-title" style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
              Un espacio para disfrutar
            </h3>
            {FILOSOFIA_IMAGES.length > 0 ? (
              <div className="especiales-grid">
                {FILOSOFIA_IMAGES.map((src, i) => (
                  <motion.div
                    key={src}
                    className="especial-card"
                    initial={{ opacity: 0.4, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="especial-img">
                      <img src={src} alt={`Filosofía ${i + 1}`} className="especial-carousel-img" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="especiales-grid">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="especial-card">
                    <div className="especial-img">
                      <div className="especial-img-inner">
                        <span className="especial-img-icon">⊞</span>
                        <span className="especial-img-label">Fotos próximamente</span>
                      </div>
                    </div>
                    <div className="especial-body">
                      <h3 className="especial-name">Nuestro local</h3>
                      <p className="especial-desc">Pronto añadiremos fotos del espacio</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function Menu() {
  const [catIndex, setCatIndex] = useState(0);
  const current = MENU_DATA[catIndex];

  return (
    <section className="section" id="carta">
      <div className="container container-narrow">
        <div className="carta-intro">
          <h2 className="carta-logo">Dichoso</h2>
          <p className="carta-subtitle">Tapas y arroces</p>
          <p className="carta-slogan">Dichoso el día que entraste por aquí</p>
        </div>
        <div className="carta-tabs">
          {MENU_DATA.map((cat, i) => (
            <button
              key={cat.title}
              className={`carta-tab ${i === catIndex ? "active" : ""}`}
              onClick={() => setCatIndex(i)}
            >
              {cat.title}
            </button>
          ))}
        </div>
        <div className="carta-list" key={catIndex}>
          {current.items.map((item, i) => (
            <div key={item.name} className="carta-item" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="carta-item-name">{item.name}</span>
              <span className="carta-item-dots" />
              <span className="carta-item-price">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EspecialCard({ esp, index }: { esp: (typeof ESPECIALES)[number]; index: number }) {
  const images = esp.images ?? [];
  const hasImages = images.length > 0;
  const [current, setCurrent] = useState(0);
  const startXRef = useRef<number>(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % images.length), 3500);
    return () => clearInterval(id);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - startXRef.current;
    if (Math.abs(diff) > 50 && images.length > 1) {
      if (diff > 0) setCurrent((c) => (c - 1 + images.length) % images.length);
      else setCurrent((c) => (c + 1) % images.length);
    }
  };

  return (
    <motion.div
      className="especial-card"
      initial={{ opacity: 0.4, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {hasImages ? (
        <div className="especial-img especial-img--carousel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="especial-carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {images.map((src) => (
              <img key={src} src={src} alt={esp.name} className="especial-carousel-img" loading="lazy" draggable={false} />
            ))}
          </div>
          {images.length > 1 && (
            <>
              <button
                className="especial-arrow especial-arrow--left"
                aria-label="Anterior"
                onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="especial-arrow especial-arrow--right"
                aria-label="Siguiente"
                onClick={() => setCurrent((c) => (c + 1) % images.length)}
              >
                <ChevronRight size={18} />
              </button>
              <div className="especial-dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Ir a imagen ${i + 1}`}
                    className={`especial-dot ${i === current ? "active" : ""}`}
                    onClick={() => setCurrent(i)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="especial-img">
          <div className="especial-img-inner">
            <span className="especial-img-icon">⊞</span>
            <span className="especial-img-label">Imagen próximamente</span>
          </div>
        </div>
      )}
      <div className="especial-body">
        <h3 className="especial-name">{esp.name}</h3>
        {esp.desc && <p className="especial-desc">{esp.desc}</p>}
        <span className="especial-price">{esp.price}</span>
      </div>
    </motion.div>
  );
}

function Especiales() {
  return (
    <section className="section especiales-section" id="especiales">
      <div className="container">
        <p className="section-eyebrow">Especiales</p>
        <h2 className="section-title">Especiales Dichoso</h2>
        <div className="especiales-grid">
          {ESPECIALES.map((esp, i) => (
            <EspecialCard key={esp.name} esp={esp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MantelSection() {
  return <ScrollMantelSection />;
}

function SloganSection() {
  return (
    <section className="slogan-section">
      <div className="container container-narrow">
        <p className="slogan-eyebrow">Dichoso</p>
        <p className="slogan-text">
          Dichoso el día que entraste por aquí
        </p>
        <p className="slogan-sub">Una experiencia gastronómica para recordar</p>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section reviews-section" id="resenas">
      <div className="container">
        <p className="section-eyebrow">Opiniones</p>
        <h2 className="section-title">Lo que dicen nuestros clientes</h2>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.text}
              className="review-card"
              initial={{ opacity: 0.4, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"{r.text}"</p>
              <span className="review-author">{r.author}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reservation() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [persons, setPersons] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState<{ date: string; time: string; name: string; phone: string; persons: string; note: string } | null>(null);
  const [booked, setBooked] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!date) {
      setBooked([]);
      return;
    }
    let cancelled = false;
    const load = () => {
      supabase.fetchSlots(date).then((times) => {
        if (cancelled) return;
        setBooked(times);
        localStorage.setItem("reservas_" + date, JSON.stringify(times));
      });
    };
    load();
    // Poll every 5s for cross-device sync (when another device books, this device will see it)
    const id = setInterval(load, 3000);
    // Also refetch when window regains focus (user returns to tab)
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, [date]);

  const today = new Date().toISOString().slice(0, 10);
  const now = new Date();
  const isPast = (t: string) => date === today && t < `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const isBooked = (t: string) => booked.includes(t) || isPast(t);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    const localKey = "reservas_" + date;
    const local = localStorage.getItem(localKey);
    const existing: string[] = local ? JSON.parse(local) : [];

    if (existing.includes(time)) {
      setSending(false);
      setError("Este horario acaba de ser reservado por otra persona.");
      return;
    }

    existing.push(time);
    localStorage.setItem(localKey, JSON.stringify(existing));
    setBooked(existing);

    const fmtDate = date.split("-").reverse().join("/");
    const msg = `Dichoso - Nueva reserva

Fecha: ${fmtDate}
Hora: ${time}
Personas: ${persons}
Nombre: ${name}
Telefono: ${phone}${note ? `\nNotas: ${note}` : ""}

Te esperamos en Dichoso`;
    window.open(`https://wa.me/34691233213?text=${encodeURIComponent(msg)}`, "_blank");

    supabase.insertSlot({ date, time, name, phone, persons, note });

    setSending(false);
    setDone({ date, time, name, phone, persons, note });
  };

  const times = [
    { group: "Almuerzo", slots: ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30"] },
    { group: "Cena", slots: ["20:00", "20:30", "21:00", "21:30", "22:00"] },
  ];

  if (done) {
    return (
      <section className="section" id="reservas">
        <div className="container container-narrow">
          <p className="section-eyebrow">Reservas</p>
          <h2 className="section-title">Reserve su mesa</h2>
          <div className="reservation-done">
            <span className="reservation-done-icon">✓</span>
            <p className="reservation-done-text">Hemos guardado tu reserva</p>
            <p className="reservation-done-sub">Te esperamos en Dichoso</p>
            <div className="reservation-detail">
              <p>
                <strong>Fecha:</strong> {done.date}
              </p>
              <p>
                <strong>Hora:</strong> {done.time}
              </p>
              <p>
                <strong>Personas:</strong> {done.persons}
              </p>
              <p>
                <strong>Nombre:</strong> {done.name}
              </p>
              <p>
                <strong>Teléfono:</strong> {done.phone}
              </p>
              {done.note && (
                <p>
                  <strong>Comentarios:</strong> {done.note}
                </p>
              )}
            </div>
            <a href={`tel:+34${PHONE}`} className="btn btn-gold" style={{ fontSize: "0.8rem" }}>
              Reservado - 664 24 32 80
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="reservas">
      <div className="container container-narrow">
        <p className="section-eyebrow">Reservas</p>
        <h2 className="section-title">Reserve su mesa</h2>

        {error && <div className="form-msg err">{error}</div>}

        <motion.form
          className="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0.4, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                className="form-input"
                required
                value={date}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v < today) return;
                  setDate(v);
                  setTime("");
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Hora</label>
              <select className="form-input" required value={time} onChange={(e) => setTime(e.target.value)}>
                <option value="" disabled>
                  Seleccionar
                </option>
                {times.map((g) => (
                  <optgroup key={g.group} label={g.group}>
                    {g.slots.map((t) => {
                      const taken = isBooked(t);
                      return (
                        <option key={t} value={t} disabled={taken}>
                          {t}
                          {taken ? " - reservado" : ""}
                        </option>
                      );
                    })}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Personas</label>
              <select className="form-input" required value={persons} onChange={(e) => setPersons(e.target.value)}>
                <option value="" disabled>N.º</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-input"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Su nombre"
              />
            </div>
            <div className="form-group">
              <label className="form-label">TelÃ©fono</label>
              <input
                type="tel"
                className="form-input"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 15))}
                placeholder="600000000"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Comentarios</label>
            <textarea
              className="form-input form-textarea"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Alergias, celebraciones, preferencias..."
            />
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className={`btn btn-lg ${time && isBooked(time) ? "btn-disabled" : "btn-gold"}`}
              disabled={!date || !time || !name || !phone || !persons || isBooked(time) || sending}
            >
              {sending ? "Reservando..." : time && isBooked(time) ? "No disponible" : "Confirmar reserva"}
            </button>
            <a href={`tel:+34${PHONE}`} className="btn btn-outline btn-lg">
              Llamar - 664 24 32 80
            </a>
          </div>
          <p
            style={{
              fontSize: "0.65rem",
              color: "var(--muted)",
              textAlign: "center",
              marginTop: "1rem",
              letterSpacing: "0.04em",
              opacity: 0.6,
            }}
          >
            Al reservar se abrirÃ¡ WhatsApp. Pulsa enviar para confirmar.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="section bg-card" id="contacto">
      <div className="container">
        <p className="section-eyebrow">Cómo llegar</p>
        <h2 className="section-title">Ubicación</h2>
        <motion.div
          className="location-grid"
          initial={{ opacity: 0.4, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="location-info">
            <div className="location-info-inner">
              <p className="location-address">{ADDRESS}</p>
              <div className="location-actions">
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className="btn btn-outline">
                  Abrir en Maps
                </a>
                <a href={`tel:+34${PHONE}`} className="btn btn-gold">
                  Llamar
                </a>
              </div>
              <div className="schedule">
                <h4 className="schedule-title">Horario</h4>
                <p>Almuerzo: 13:00 - 16:30</p>
                <p>Cena: 20:00 - 00:00</p>
              </div>
            </div>
          </div>
          <div className="map-wrapper">
            <iframe src="https://www.google.com/maps?q=Av.+de+los+Descubrimientos+11,+Mairena+del+Aljarafe&output=embed" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ubicación de Dichoso"></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="footer-logo">Dichoso</span>
            <p className="footer-tagline">Cocina contemporánea en Mairena del Aljarafe.</p>
          </div>
          <div>
            <p className="footer-heading">Dirección</p>
            <p className="footer-text">{ADDRESS}</p>
          </div>
          <div>
            <p className="footer-heading">Contacto</p>
            <a href={`tel:+34${PHONE}`} className="footer-link">664 24 32 80</a>
          </div>
        </div>
        <div className="footer-slogan-line">
          <span className="footer-slogan">Dichoso el día que entraste por aquí</span>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Dichoso. Todos los derechos reservados.</p>
          <p className="footer-credit">Realizado por <a href="https://franciscoortuno.duckdns.org/" target="_blank" rel="noreferrer">Francisco Ortuño</a></p>
        </div>
      </div>
    </motion.footer>
  );
}

/* ── App ───────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MantelSection />
        <Menu />
        <Especiales />
        <SloganSection />
        <Reviews />
        <Reservation />
        <Location />
      </main>
      <Footer />
    </>
  );
}

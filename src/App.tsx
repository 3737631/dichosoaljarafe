import { useState, useEffect } from "react";
import "./App.css";
import { supabase } from "./supabase";
import ScrollMantelSection from "./components/ScrollMantelSection";

/* ── Data ──────────────────────────────────────── */
const PHONE = "664243280";
const ADDRESS = "Av. de los Descubrimientos, 11, 41927 Mairena del Aljarafe";
const MAPS_URL =
  "https://maps.google.com/?q=Av.+de+los+Descubrimientos+11,+Mairena+del+Aljarafe";
const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3173.5!2d-6.06!3d37.34!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDIwJzI0LjAiTiA2wrAwMyczNi4wIlc!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses";

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
  { name: "Navajas", desc: "Del mar", price: "12€" },
  { name: "Berberechos", desc: "Del mar", price: "10€" },
  { name: "Sándwich de cecina, queso viejo y trufa", desc: "Planchado en mantequilla", price: "7,5€" },
  { name: "Tortilla de patatas con panceta ibérica y parmesano", desc: "Lo más Dichoso", price: "9€" },
  { name: "Mejillones a la marinera", desc: "Del mar", price: "7,5€" },
  { name: "Torrija casera con helado de turrón", desc: "Postre emblemático", price: "6,5€" },
  { name: "Tarta de queso", desc: "Postre casero", price: "6€" },
  { name: "Arroz sabroso de carabinero y huevo frito", desc: "Nuestro arroz estrella", price: "21€" },
  { name: "Arroz de carrillada y queso de cabra", desc: "Arroz cremoso", price: "16€" },
  { name: "Croquetas", desc: "Elige tu variedad favorita", price: "5€" },
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
        <a href={`tel:+34${PHONE}`} className="btn btn-gold">
          Reservar
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-watermark">Dichoso</div>
      <div className="hero-content">
        <p className={`hero-eyebrow fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>Mairena del Aljarafe · Sevilla</p>
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
      <div className="hero-scroll-line">
        <span className="hero-scroll-text">Desliza</span>
        <span className="hero-scroll-bar" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section bg-card" id="nosotros">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <p className="section-eyebrow">Nuestra filosofía</p>
            <h2 className="section-title">Elevando lo cotidiano</h2>
            <p>
              En Dichoso creemos que la buena mesa se comparte. Producto de temporada,
              arroces con alma y una cocina que abraza la tradición sin miedo a innovar.
            </p>
            <blockquote className="quote">
              Una taberna elegante, honesta y pensada para compartir.
            </blockquote>
          </div>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div key={f.label} className="feature-card">
                <h4 className="feature-title">{f.label}</h4>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
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

function Especiales() {
  return (
    <section className="section especiales-section" id="especiales">
      <div className="container">
        <p className="section-eyebrow">Especiales</p>
        <h2 className="section-title">Especiales Dichoso</h2>
        <div className="especiales-grid">
          {ESPECIALES.map((esp) => (
            <div key={esp.name} className="especial-card">
              <div className="especial-img">
                <span>Imagen próximamente</span>
              </div>
              <div className="especial-body">
                <h3 className="especial-name">{esp.name}</h3>
                {esp.desc && <p className="especial-desc">{esp.desc}</p>}
                <span className="especial-price">{esp.price}</span>
              </div>
            </div>
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
        <p className="slogan-text" style={{ fontFamily: "'Pinyon Script', serif" }}>
          Dichoso el día que entraste por aquí
        </p>
        <p className="slogan-sub">Una experiencia gastronómica para recordar</p>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section reviews-section">
      <div className="container">
        <p className="section-eyebrow">Opiniones</p>
        <h2 className="section-title">Lo que dicen nuestros clientes</h2>
        <div className="reviews-grid">
          {REVIEWS.map((r) => (
            <div key={r.text} className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"{r.text}"</p>
              <span className="review-author">{r.author}</span>
            </div>
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
    if (!date) { setBooked([]); return; }
    const channel = supabase
      .channel("slots-" + date)
      .on("postgres_changes", { event: "*", schema: "public", table: "slots", filter: `date=eq.${date}` }, () => {
        supabase.from("slots").select("time").eq("date", date).then(({ data }) => {
          setBooked((data || []).map((r) => r.time));
        });
      })
      .subscribe();
    supabase.from("slots").select("time").eq("date", date).then(({ data }) => {
      setBooked((data || []).map((r) => r.time));
    });
    return () => { channel.unsubscribe(); };
  }, [date]);

  const today = new Date().toISOString().slice(0, 10);
  const now = new Date();
  const isPast = (t: string) => date === today && t < `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
  const isBooked = (t: string) => booked.includes(t) || isPast(t);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    const { error: insertErr } = await supabase.from("slots").insert([
      { date, time, name, phone, persons, note, created_at: new Date().toISOString() },
    ]);

    if (insertErr) {
      setSending(false);
      if (insertErr.code === "23505") {
        setError("Este horario acaba de ser reservado por otra persona.");
      } else {
        setError(insertErr.message);
      }
      return;
    }

    setSending(false);
    setDone({ date, time, name, phone, persons, note });
  };

  const times = [
    { group: "Almuerzo", slots: ["13:00","13:30","14:00","14:30","15:00","15:30"] },
    { group: "Cena",     slots: ["20:00","20:30","21:00","21:30","22:00"] },
  ];

  if (done) {
    return (
      <section className="section" id="reservas">
        <div className="container container-narrow">
          <p className="section-eyebrow">Reservas</p>
          <h2 className="section-title">Reserve su mesa</h2>
          <div className="reservation-done">
            <span className="reservation-done-icon">✓</span>
            <p className="reservation-done-text">Reserva confirmada</p>
            <div className="reservation-detail">
              <p><strong>Fecha:</strong> {done.date}</p>
              <p><strong>Hora:</strong> {done.time}</p>
              <p><strong>Personas:</strong> {done.persons}</p>
              <p><strong>Nombre:</strong> {done.name}</p>
              <p><strong>Teléfono:</strong> {done.phone}</p>
              {done.note && <p><strong>Comentarios:</strong> {done.note}</p>}
            </div>
            <a href={`tel:+34${PHONE}`} className="btn btn-gold">Llamar · 664 24 32 80</a>
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

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Fecha</label>
              <input type="date" className="form-input" required value={date} onChange={(e) => { const v = e.target.value; if (v < today) return; setDate(v); setTime(""); }} />
            </div>
            <div className="form-group">
              <label className="form-label">Hora</label>
              <select className="form-input" required value={time} onChange={(e) => setTime(e.target.value)}>
                <option value="" disabled>Seleccionar</option>
                {times.map((g) => (
                  <optgroup key={g.group} label={g.group}>
                    {g.slots.map((t) => {
                      const taken = isBooked(t);
                      return <option key={t} value={t} disabled={taken}>{t}{taken ? " — reservado" : ""}</option>;
                    })}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Personas</label>
              <select className="form-input" required value={persons} onChange={(e) => setPersons(e.target.value)}>
                <option value="" disabled>N.º</option>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-input" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Su nombre" />
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input type="tel" className="form-input" required value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 15))} placeholder="600000000" inputMode="numeric" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Comentarios</label>
            <textarea className="form-input form-textarea" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Alergias, celebraciones, preferencias..." />
          </div>
          <div className="form-actions">
            <button type="submit" className={`btn btn-lg ${time && isBooked(time) ? "btn-disabled" : "btn-gold"}`} disabled={!date || !time || !name || !phone || !persons || isBooked(time) || sending}>
              {sending ? "Reservando..." : (time && isBooked(time) ? "No disponible" : "Confirmar reserva")}
            </button>
            <a href={`tel:+34${PHONE}`} className="btn btn-outline btn-lg">
              Llamar · 664 24 32 80
            </a>
          </div>
        </form>
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
        <div className="location-grid">
          <div className="location-info">
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
              <p>Almuerzo: 13:00 – 16:30</p>
              <p>Cena: 20:00 – 00:00</p>
            </div>
          </div>
          <div className="map-wrapper">
            <iframe
              title="Dichoso — Ubicación"
              src={MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
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
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Dichoso. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
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
        <Menu />
        <Especiales />
        <MantelSection />
        <SloganSection />
        <Reviews />
        <Reservation />
        <Location />
      </main>
      <Footer />
    </>
  );
}

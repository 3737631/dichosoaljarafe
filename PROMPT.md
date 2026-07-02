# GENERADOR DE WEB PROFESIONAL PARA RESTAURANTES / BARES

## STACK TÉCNICO (no negociable)
- React 18 + TypeScript + Vite
- Sin Tailwind, sin Bootstrap, sin librerías de UI
- Sin Framer Motion, sin animaciones externas
- Sin React Router (one-page, scroll suave nativo)
- Sin dependencias extra: solo `react`, `react-dom`, `@supabase/supabase-js`, `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`
- TypeScript strict mode
- Todo el CSS en `src/App.css`
- Todos los componentes en `src/App.tsx`
- Archivo `src/index.css` con reset y variables CSS globales
- Cliente Supabase en `src/supabase.ts`

## ESTÉTICA (exacta)
- Fondo oscuro principal: #1C1C1C
- Fondo tarjetas/secciones: #242424
- Dorado principal: #D4AF37
- Dorado oscuro (hover): #A88A20
- Texto crema: #F5F0EB
- Texto gris mutado: #9CA3AF
- Verde oliva (detalles): #708238
- Bordes: #2E2E2E
- Fuente títulos: "Playfair Display", serif (pesos 400, 700, cursiva 400)
- Fuente cuerpo: "Inter", sans-serif (pesos 300, 400, 500)
- Esquinas redondeadas: 8px para tarjetas, 6px para inputs, 50% para círculos
- Sombras y transiciones suaves en hover

## ANIMACIONES (exactas)
**Hero** — fade-up escalonado al cargar la página:
- Cada elemento usa clase `fade-up` con `animation: fadeUp 0.8s ease both`
- Retardos: eyebrow 0.2s, título 0.4s, subtítulo 0.6s, botones 0.8s
- Keyframe fadeUp: desde opacity 0 + translateY(24px) hasta opacity 1 + translateY(0)
- Controlado por estado `visible` que se pone true en useEffect al montar

**Carta (menú)** — fadeIn al cambiar de categoría:
- El contenedor `.menu-list` tiene `key={category}` para que React lo remonte
- Cada `.menu-item` tiene `animation-delay: ${i * 0.1}s` para escalonar
- Keyframe: desde opacity 0 + translateY(12px) hasta opacity 1 + translateY(0)

**Galería** — slide en cada scroll (no solo la primera vez):
- Cada imagen tiene clase `slide-left` (pares) o `slide-right` (impares)
- Controlado por IntersectionObserver con `threshold: 0.1` y SIN opción `once`
- Clase `visible` se añade/quita según `isIntersecting`
- Transición: `transform: translateX(±60px)` → `translateX(0)` + opacity 0→1

**Navegación suave**: `scroll-behavior: smooth` en HTML

## SECCIONES (orden y detalles)

### 1. NAVBAR
- Logo con el nombre del restaurante (font-family Playfair Display, color dorado)
- Enlaces: Carta, Nosotros, Reservas, Contacto (scroll suave con scrollIntoView)
- Botón destacado "Reservar" con clase btn-gold que enlaza `tel:+34[TELÉFONO]`
- Fondo oscuro semitransparente, posición fixed arriba
- Los enlaces cambian de color ligeramente al hover

### 2. HERO
- Imagen de fondo: Unsplash restaurant interior (URL directa)
- Overlay oscuro degradado (de transparente a #1C1C1C al 85%)
- Contenido centrado vertical y horizontalmente
- Línea superior: localidad (ej: "Mairena del Aljarafe · Sevilla")
- Título principal: frase impactante con `<em>` para palabra destacada
- Subtítulo: descripción del concepto culinario
- Botones: Ver carta (btn-outline), Reservar mesa (btn-gold), Llamar (btn-ghost), Cómo llegar (btn-ghost)
- Botón scroll indicator abajo con flecha y texto "Descubrir"

### 3. NOSOTROS (sección con fondo bg-card #242424)
- Eyebrow: "Nuestra filosofía" (texto pequeño en dorado)
- Título sección: frase aspiracional
- Grid de 2 columnas: texto + features
- Texto: 2 párrafos de presentación + blockquote con la frase emblemática del local
- Features: grid de tarjetas, cada una con título y descripción (5 tarjetas)

### 4. CARTA / MENÚ
- Eyebrow + título de sección
- Pestañas horizontales para cada categoría (entrantes, principales, arroces, postres, etc.)
- Pestaña activa: color dorado + subrayado (border-bottom)
- Pestaña inactiva: color gris mutado
- Lista de platos con key={category} para animación al cambiar
- Cada plato: nombre (crema, bold), puntos suspensivos (color dorado), precio (dorado, bold)
- Descripción del plato debajo (gris mutado, tamaño pequeño)

### 5. GALERÍA
- Eyebrow + título
- Grid de 3 columnas responsive (2 columnas en tablet, 1 en móvil)
- Imágenes de Unsplash restaurant/cocina/platos
- Cada imagen: relación aspecto 4:3 con object-fit cover
- Degradado oscuro en la parte inferior (pseudo-elemento ::after con gradient de transparent a negro)
- Hover: overlay semitransparente con texto "Ampliar"
- Al hacer clic: lightbox overlay a pantalla completa
- Lightbox: imagen centrada, fondo negro 90%, botón cerrar (×), flechas anterior/siguiente (‹ ›)
- Navegación por teclado: Escape cierra, ArrowLeft anterior, ArrowRight siguiente
- Animación slide en cada scroll (IntersectionObserver, sin once)

### 6. OPINIONES (sección con fondo bg-card)
- Eyebrow + título
- Badge de calificación: 5 estrellas + "5,0 · X reseñas"
- Grid de tarjetas de reseñas
- Cada tarjeta: 5 estrellas, texto entrecomillado, nombre del autor
- Efecto hover sutil en cada tarjeta

### 7. RESERVAS (SISTEMA CRÍTICO — COPIAR EXACTAMENTE)

#### Estado del componente
```typescript
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
const today = new Date().toISOString().slice(0, 10);
const now = new Date();
const isPast = (t: string) => date === today && t < `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
const isBooked = (t: string) => booked.includes(t) || isPast(t);
```

#### Formulario
- Todos los inputs con 48px de altura y `appearance: none` (imprescindible para date y select)
- **Fecha**: `<input type="date">` required. onChange: si value < today, ignorar (return sin setDate). Si es válida, setDate(value) y setTime("").
- **Hora**: `<select>` required con `<optgroup>` por turnos (ej: Almuerzo: 13:00,13:30,14:00,14:30,15:00,15:30 — Cena: 20:00,20:30,21:00,21:30,22:00). Primer option disabled "Seleccionar". Cada slot: si isBooked(t) → option `disabled` con texto "HH:MM — reservado". Si no → option normal "HH:MM". Al cambiar fecha, se resetea la hora seleccionada.
- **Personas**: `<select>` required del 1 al 10, primer option "N.º"
- **Nombre**: `<input type="text">` required, placeholder "Su nombre"
- **Teléfono**: `<input type="tel">` required, inputMode="numeric", placeholder "600000000". onChange: e.target.value.replace(/[^0-9]/g, "").slice(0, 15)
- **Comentarios**: `<textarea>` opcional, placeholder "Alergias, celebraciones, preferencias..."
- **Botón principal**: disabled si falta date/time/name/phone/persons, o isBooked(time), o sending. Texto: sending ? "Reservando..." : (time && isBooked(time) ? "No disponible" : "Confirmar reserva"). Clase: btn-lg btn-gold, o btn-lg btn-disabled si no disponible.
- **Botón secundario**: "Llamar · 664 24 32 80" (btn-outline btn-lg, enlace tel)

#### Tiempo real con Supabase
```typescript
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
```

#### Reserva (onSubmit)
```typescript
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
```

#### Pantalla de confirmación (cuando done no es null)
- En lugar del formulario, mostrar:
  - Check "✓" dentro de círculo dorado de 56px (border-radius 50%, background gold, color #1C1C1C, flex centrado)
  - Texto "Reserva confirmada" en crema
  - Recuadro (background rgba(255,255,255,0.04), border 1px rgba(255,255,255,0.08), border-radius 8px, padding 1.25rem 1.5rem, max-width 340px, text-align left)
  - Dentro del recuadro: cada línea con `<strong>` en dorado (#D4AF37) y valor en crema (#F5F0EB):
    - Fecha: {done.date}
    - Hora: {done.time}
    - Personas: {done.persons}
    - Nombre: {done.name}
    - Teléfono: {done.phone}
    - Comentarios: {done.note} (solo si existe)
  - Botón "Llamar · [TELÉFONO]" (btn-gold)

#### Tabla SQL (ejecutar en Supabase SQL Editor)
```sql
CREATE TABLE slots (
  id BIGSERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  persons TEXT NOT NULL,
  note TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (date, time)
);
ALTER TABLE slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all" ON slots FOR ALL USING (true) WITH CHECK (true);
```

### 8. UBICACIÓN (sección con fondo bg-card)
- Eyebrow + título
- Grid 2 columnas: info + mapa (1 columna en móvil)
- Info: dirección, botones "Abrir en Maps" (btn-outline, target _blank) y "Llamar" (btn-gold, tel)
- Horario: título "Horario", líneas con Almuerzo y Cena
- Mapa: Google Maps iframe embed con width 100% height 100%, border 0, loading lazy

### 9. FOOTER
- Grid 3 columnas: logo+tagline, dirección, contacto
- Logo en Playfair Display
- Enlaces telefónicos con clase footer-link
- Barra inferior: copyright con año dinámico

## RESPONSIVE
- Las secciones tienen max-width 1100px con .container, centrado con margin auto
- .container-narrow para formularios: max-width 640px
- Los grids pasan a 1 columna en móvil (media query <768px)
- Inputs apilados verticalmente en móvil
- Navbar: los enlaces se ocultan en móvil si es necesario
- touch-action: manipulation para evitar zoom

## ARCHIVOS DEL PROYECTO
```
package.json          — dependencias y scripts
vite.config.ts        — base: "/[NOMBRE_REPO]/", plugin react
tsconfig.json         — strict: true
index.html            — Google Fonts, SEO meta, Open Graph (og:title, og:description, og:image, og:url, og:type)
src/main.tsx          — createRoot + StrictMode + App
src/App.tsx           — todos los componentes (Navbar, Hero, About, Menu, Gallery, Reviews, Reservation, Location, Footer)
src/App.css           — todos los estilos
src/index.css         — reset, variables CSS, keyframes, clases de animación base
src/supabase.ts       — createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
src/vite-env.d.ts     — referencia Vite client types
.github/workflows/deploy.yml — CI/CD a GitHub Pages
```

## DEPLOYMENT (GitHub Actions)
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: write
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
      - name: Enable GitHub Pages via API
        run: |
          echo '{"source":{"branch":"gh-pages","path":"/"}}' | \
          gh api --method POST /repos/${{ github.repository }}/pages \
            --input - --jq '.html_url' && echo "OK" || \
          echo '{"source":{"branch":"gh-pages","path":"/"}}' | \
          gh api --method PUT /repos/${{ github.repository }}/pages \
            --input - --jq '.html_url'
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## LO QUE YO (EL USUARIO) TENGO QUE HACER

1. **Darte la información del bar**: nombre, dirección, teléfono, horarios, categorías del menú con sus platos (nombre + descripción + precio), reseñas, frase de filosofía, features, email si aplica.

2. **Darte el enlace del repo de GitHub**: https://github.com/MI_USUARIO/NOMBRE_REPO

3. **Crear proyecto en Supabase** y pasarte:
   - Project URL
   - Anon public key
   - (Opcional) la password del proyecto

4. **Ejecutar el SQL en Supabase**: pegar el CREATE TABLE en SQL Editor y ejecutar.

5. **Push a GitHub**: hacer git add, commit y push de los archivos generados. GitHub Actions despliega automáticamente.

6. **Configurar GitHub Pages**: ir a Settings → Pages → seleccionar "Deploy from branch: gh-pages" (solo la primera vez).

## NOTAS FINALES
- TypeScript strict, el build debe pasar sin errores
- No incluir WhatsApp en ninguna parte
- La galería se anima en CADA scroll (no usar opción "once" en IntersectionObserver)
- Fechas pasadas se ignoran silenciosamente en el onChange (sin usar atributo min, sin mensajes de error del navegador)
- Horas pasadas del día actual se muestran como "reservado" y no se pueden seleccionar (misma lógica que isBooked)
- El sistema de reservas es la parte más importante — debe ser funcionalmente idéntico al descrito
- No generar archivos de documentación ni README

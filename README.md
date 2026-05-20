# Dichoso — Web

Página web de presentación para **Dichoso**, restaurante gastronómico en Mairena del Aljarafe (Sevilla).

## Instalación y uso

```bash
npm install
npm run dev       # desarrollo → http://localhost:5173
npm run build     # producción → carpeta dist/
npm run preview   # previsualizar el build
```

## Despliegue

### Vercel (recomendado)
1. Sube el proyecto a GitHub
2. Importa en [vercel.com](https://vercel.com)
3. Vercel detecta Vite automáticamente — pulsa Deploy

### Netlify
- Arrastra la carpeta `dist/` a [app.netlify.com/drop](https://app.netlify.com/drop)
- O conecta el repo y usa el comando `npm run build` con directorio `dist`

## Personalizar contenido

Todos los datos del restaurante están en `src/App.tsx` al principio del archivo:

| Constante | Descripción |
|---|---|
| `PHONE` | Teléfono del restaurante |
| `ADDRESS` | Dirección |
| `MAPS_URL` | Enlace a Google Maps |
| `MAPS_EMBED` | URL del iframe de Google Maps |
| `FEATURES` | Puntos destacados (sección Nosotros) |
| `DISHES` | Platos estrella |
| `REVIEWS` | Reseñas de clientes |

## Stack

- **React 18** + **TypeScript**
- **Vite 5** (build tool)
- CSS propio (sin frameworks externos)
- Google Fonts (Playfair Display + Inter)

Sin dependencias innecesarias. El proyecto pesa ~200 KB en producción.

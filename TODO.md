# TODO — merch.mrprinteto.com

Pending tasks before going live.

---

## 🔑 Configuración obligatoria

- [ ] Copiar `.env.example` → `.env` y rellenar los valores
  - `RESEND_API_KEY` — obtener en https://resend.com (plan gratuito disponible)
  - `TO_EMAIL` — bandeja de entrada que recibirá los formularios (ej. `merch@mrprinteto.com`)
- [ ] Verificar el dominio `mrprinteto.com` en Resend para que el campo `from: merch@mrprinteto.com` funcione
  - Panel Resend → Domains → Add domain → seguir los pasos DNS
- [ ] Probar el formulario de contacto end-to-end en local (`pnpm dev`) antes de desplegar

---

## 🖼️ Imágenes y contenido real

- [ ] **Hero** — reemplazar el placeholder decorativo (`Hero.astro`) por una foto real del producto
  - Buscar `// foto del producto aquí` en `src/components/Hero.astro`
  - Sustituir el `<div>` placeholder por `<img src="..." alt="..." />`
- [ ] **Portfolio** — añadir imágenes reales a los proyectos de ejemplo
  - `src/content/projects/llaveros-techconf.md` → añadir campo `imagen: https://assets.mrprinteto.com/...`
  - `src/content/projects/sets-escritorio-bufete.md` → ídem
  - `src/content/projects/tarjeteros-startup.md` → ídem
- [ ] Añadir más proyectos reales en `src/content/projects/` con sus fotos
- [ ] Revisar y personalizar los testimonios en `src/content/testimonials/` con clientes reales

---

## 🚀 Despliegue en Vercel

- [ ] Conectar el repositorio a Vercel (vercel.com → Import project)
- [ ] Añadir las variables de entorno en el panel de Vercel:
  - `RESEND_API_KEY`
  - `TO_EMAIL`
- [ ] Configurar el dominio personalizado `merch.mrprinteto.com` en Vercel
  - Vercel → Project Settings → Domains → Add domain
  - Añadir registro CNAME en el DNS apuntando a `cname.vercel-dns.com`
- [ ] Verificar que el sitemap se genera correctamente en `https://merch.mrprinteto.com/sitemap-index.xml`
- [ ] Comprobar `robots.txt` accesible en `https://merch.mrprinteto.com/robots.txt`

---

## 🔧 Node.js (opcional)

- [ ] Cambiar la versión local de Node.js a la **22.x** para paridad con Vercel Serverless
  - Vercel usa Node 22; la versión local actual (v24) genera un aviso en el build, pero no afecta al resultado

---

## ✨ Ideas para siguientes versiones

- [ ] **Configurador interactivo** — estimador de presupuesto orientativo (material × cantidad × tamaño)
- [ ] **Visor 3D** — integrar `<model-viewer>` o three.js para previsualizar piezas en el navegador
- [ ] **WhatsApp float** — botón de contacto rápido via WhatsApp Business + integración con Calendly para reuniones
- [ ] **Case studies** — páginas individuales por proyecto con galería de fotos y resultados
- [ ] **Filtro en portfolio** — filtrar la galería por categoría (evento / regalo / corporativo) + lightbox
- [ ] **Blog maker** — notas de proceso, materiales y fabricación para SEO
- [ ] **Brief PDF** — plantilla descargable para clientes corporativos con sus requisitos
- [ ] **Analytics** — valorar Vercel Web Analytics o Plausible cuando el tráfico crezca

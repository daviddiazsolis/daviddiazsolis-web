# CLAUDE.md — daviddiazsolis.com

Contexto completo para continuar el desarrollo del sitio personal de David Díaz Solís desde Claude Code.

---

## Descripción del proyecto

Sitio personal académico para **David Díaz Solís**, Profesor Asociado de Business Analytics e IA en la Facultad de Economía y Negocios (FEN) de la Universidad de Chile.

- **Dominio objetivo:** `daviddiazsolis.com` (actualmente en GoDaddy, migrar a Vercel)
- **Stack:** HTML estático puro (un solo archivo `index.html`) — sin framework, sin build step
- **Hosting destino:** Vercel (conectar repo GitHub → Vercel, luego apuntar dominio)
- **Repo GitHub:** `github.com/daviddiazsolis` (crear repo nuevo p.ej. `daviddiazsolis-web`)

---

## Estado actual del sitio

El sitio está completamente funcional en `index.html`. Incluye:

### Funcionalidades implementadas
- ✅ Dark/light mode toggle (☀/☾)
- ✅ Switch bilingüe ES/EN (todos los textos con `data-es` / `data-en`)
- ✅ Navegación fija con scroll spy
- ✅ Menú hamburger para móvil
- ✅ Filtro de publicaciones por tipo (WoS / Scopus / Capítulos / Working Papers)
- ✅ Animaciones fade-in al hacer scroll (IntersectionObserver)
- ✅ Diseño responsive (mobile-first)

### Secciones
1. **Hero** — nombre, tagline, stats (20+ papers, 1.7k+ citas, 20+ años), card de afiliaciones
2. **About (// 01)** — bio, credenciales académicas, tags de expertise
3. **Research (// 02)** — 22 publicaciones curadas de Google Scholar (2006–2026), filtrable
4. **Tools (// 03)** — Hub portal + 10 playgrounds educativos + c50py + ayudantías MIT-UChile
5. **Teaching (// 04)** — 6 cursos/programas
6. **Distinctions (// 05)** — 8 distinciones y afiliaciones
7. **Media (// 06)** — apariciones en medios (Radio Infinita, FEN Alumni, Revista E&A)
8. **Contact (// 07)** — email, LinkedIn, Scholar, GitHub, ORCID

### Diseño / tipografía
- **Fonts:** Syne (headings, 800w), DM Mono (code/labels), DM Sans (body)
- **Colores dark:** `--accent: #6ee7f7` (cyan), `--accent2: #a78bfa` (purple), `--accent3: #34d399` (green)
- **Colores light:** `--accent: #0891b2`, `--accent2: #7c3aed`, `--accent3: #059669`
- **Background dark:** `#0a0a0f` / `#111118` / `#1a1a25`

---

## Pendientes prioritarios

### 🔴 Alta prioridad

**1. Foto de perfil**
- La foto actual referencia `https://alumni.fen.uchile.cl/uploads/noticia/medium_5ea9c504ce7177df1923971323277640bf3909d6.jpg` pero esa URL tiene restricciones de acceso y no carga
- **Solución A (recomendada):** agregar `foto.jpg` al repo y cambiar el src a `./foto.jpg`
- **Solución B:** convertir a base64 e incrustar en el HTML
- El fallback actual muestra "DDS" si la imagen falla (está implementado con `onerror`)
- La foto aparece en el `.profile-avatar` dentro del hero card (escritorio) y en el About

**2. Subir a Vercel**
- Crear repo `daviddiazsolis-web` en GitHub
- Subir `index.html` (y `foto.jpg` cuando esté)
- Importar en vercel.com → New Project → conectar repo
- Agregar dominio `daviddiazsolis.com` en Vercel Settings
- En GoDaddy: cambiar nameservers a los de Vercel (o agregar registro CNAME/A)

**3. URLs de Vercel para los playgrounds nuevos**
- Los repos `kernel_neural_playground`, `tree_ensemble_playground`, `linear_models_playground`, `evaluation_playground`, `pca_playground` y `ml_ai_portal` están en GitHub pero aún sin URL de Vercel
- Cuando se desplieguen, actualizar los `href` en la sección Tools (actualmente apuntan al repo de GitHub)
- El autoencoder ya tiene URL: `https://autoencoder-embedding-playground.vercel.app`

### 🟡 Media prioridad

**4. Sección Media — agregar apariciones pendientes**
- Radio Infinita (sept 2025): ✅ ya incluida → `https://www.youtube.com/watch?v=tbAyjjO0b34`
- Faltan: ~2 entrevistas en radio + 1 podcast (links por confirmar)
- Agregar cards en la sección `#media` siguiendo el patrón existente

**5. Material curso EVIC**
- David dictó un curso en la EVIC (material estaba en GoDaddy/WordPress)
- Recuperar archivos desde GoDaddy y crear sección o subsección en Teaching

**6. Botón "Descargar CV"**
- Agregar PDF del CV en el repo y un botón en el hero o en Contact
- Sugerencia: `<a class="btn-outline" href="./cv-david-diaz-solis.pdf" download>`

**7. Hero en móvil**
- El card de afiliaciones (`.hero-visual`) está oculto en móvil (`display:none` en <900px)
- Considerar mostrar versión compacta de las afiliaciones más importantes en móvil

### 🟢 Nice to have

**8. Meta tags / SEO**
- Agregar `<meta name="description">`, Open Graph tags, Twitter card
- Agregar `<link rel="icon">` (favicon)

**9. Google Analytics / Plausible**
- Agregar tracking básico de visitas

**10. Sección de conferencias**
- David tiene presentaciones en Cambridge (2024), IFORS 2023, EURO 2025, etc.
- Podría ser una subsección dentro de Research o una sección separada

---

## Estructura del archivo

```
index.html          — sitio completo (todo en un solo archivo, ~1600 líneas)
foto.jpg            — (PENDIENTE: agregar foto de perfil)
cv-david-diaz-solis.pdf  — (PENDIENTE: agregar CV)
CLAUDE.md           — este archivo
```

---

## Datos de David (para contenido)

### Contacto / perfiles
- **Email:** ddiaz@fen.uchile.cl
- **LinkedIn:** linkedin.com/in/david-diaz-s-phd-71430622/
- **Google Scholar:** scholar.google.com/citations?user=6m3sR_oAAAAJ (1,731+ citas)
- **ORCID:** 0000-0001-7149-0535
- **GitHub:** github.com/daviddiazsolis
- **Cambridge:** cambridgeservicealliance.eng.cam.ac.uk/staff/dr-david-diaz
- **FEN UChile:** negocios.uchile.cl/academico/management/david-diaz-solis/

### Repos GitHub (playgrounds educativos)
| Repo | URL Vercel | Estado |
|------|-----------|--------|
| `ml_ai_portal` | pendiente | hub central |
| `kernel_neural_playground` | pendiente | nuevo |
| `tree_ensemble_playground` | pendiente | nuevo |
| `linear_models_playground` | pendiente | nuevo |
| `evaluation_playground` | pendiente | nuevo |
| `pca_playground` | pendiente | nuevo |
| `autoencoder_embedding_playground` | autoencoder-embedding-playground.vercel.app | ✅ live |
| `clustering_playground` | pendiente | |
| `association_rules_playground` | pendiente | |
| `ml_landscape_crispdm` | pendiente | |
| `c50py` | Python/PyPI | librería |
| `Ayudantias-MIT-UCHILE` | — | material docente |

### Publicaciones destacadas (las más citadas)
- Tourism Management 2017 (518 citas) — CSR & financial performance
- Journal of Services Marketing 2017 (405 citas) — Customer engagement big data
- Int. Journal of Entrepreneurial Behavior & Research 2019 (70 citas)
- Scientific Reports 2020 (41 citas) — Male warrior hypothesis
- Expert Systems with Applications 2011 (132 citas) — Stock manipulation
- Cuadernos de Economía 2006 (36 citas) — Algoritmos genéticos y redes neuronales

---

## Cómo modificar contenido

### Agregar una publicación
Dentro de `<div class="pub-list">`, agregar un bloque:
```html
<div class="pub-item" data-type="wos">  <!-- wos | scopus | chapter | wp -->
  <div class="pub-meta">
    <span class="pub-type wos">WoS</span>
    <span class="pub-year">2026</span>
  </div>
  <div class="pub-title">Título del paper</div>
  <div class="pub-authors">Autor, A., & Díaz, D.</div>
  <div class="pub-journal">Nombre Revista, Vol(Num), pp, año</div>
</div>
```

### Agregar un tool/playground
Dentro de `.tools-grid`, agregar:
```html
<a class="tool-card" href="URL_VERCEL" target="_blank" style="text-decoration:none;color:inherit;">
  <span class="tool-icon">🔢</span>
  <div class="tool-name">Nombre del Playground</div>
  <div class="tool-desc" data-es="Descripción ES" data-en="Description EN">Descripción ES</div>
  <div class="tool-stack">
    <span class="stack-tag">TypeScript</span>
    <span class="stack-tag">Vercel</span>
  </div>
</a>
```

### Agregar texto bilingüe
Cualquier elemento puede ser bilingüe con:
```html
<span data-es="Texto en español" data-en="Text in English">Texto en español</span>
```
El JS en `setLang()` al final del archivo se encarga del switch.

### Cambiar colores del tema
Editar las variables CSS en `:root` (dark) y `[data-theme="light"]` al inicio del `<style>`.

---

## Comandos útiles (cuando esté en repo)

```bash
# Servir localmente para previsualizar
npx serve .
# o simplemente abrir index.html en el browser

# Deploy a Vercel (una vez configurado)
vercel --prod
```

---

## Notas de conversación original

- El sitio reemplaza un WordPress antiguo en GoDaddy
- Objetivo: migrar dominio a Vercel (no transferir el registrar, solo apuntar nameservers)
- Estética elegida: moderna/tech oscura, consistente con los playgrounds TypeScript del usuario
- El `ml_ai_portal` es un hub que linkea todos los playgrounds — cuando esté en Vercel, actualizar el href del card "HUB" en la sección Tools
- El usuario trabaja principalmente desde móvil en esta sesión; las ediciones mayores se harán desde PC con Claude Code

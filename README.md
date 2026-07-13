# Praveenraja S — AI Operating System Portfolio

A React + Vite portfolio built as an "AI operating system" experience: a neural-network
boot sequence, a live particle/synapse background, a skills graph, an AI model
"checkpoint" explorer for projects, a fine-tuning timeline, and a terminal-style
contact panel. Built with plain CSS (no Tailwind) and Framer Motion for animation,
fully responsive from mobile to desktop.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

The static output lands in `dist/` — deploy it to Vercel, Netlify, GitHub Pages,
or any static host.

## Project structure

```
src/
  App.jsx                  # wires the boot sequence + sections together
  index.css                # design tokens (colors, type, spacing) + base styles
  components/
    BootSequence.jsx/.css  # full-screen AI boot + neural name reveal
    NeuralBackground.jsx/.css  # canvas-based ambient neural net (mouse-reactive)
    Navbar.jsx/.css        # module-style navigation (CORE / MODEL / DATASET / ...)
    Hero.jsx/.css          # CORE section
    About.jsx/.css         # MODEL section — spec card + typed terminal bio
    SkillsNetwork.jsx/.css # DATASET section — interactive skills graph
    Projects.jsx/.css      # PROJECTS section — checkpoint explorer
    Experience.jsx/.css    # RESEARCH section — fine-tuning timeline, badges, certs
    Contact.jsx/.css       # CONTACT section — interactive terminal
    DevMode.jsx/.css       # hidden "Developer Mode" easter egg overlay
    Footer.jsx/.css
  hooks/
    useDevMode.js          # Konami code + Ctrl+Shift+A detector
```

## Easter egg

Press **Ctrl+Shift+A**, or enter the Konami code
(↑ ↑ ↓ ↓ ← → ← → b a) anywhere on the site, to open **Developer Mode**:
a live GPU/memory/log panel overlay. Press Esc or the close button to exit.

## Adding your resume

The contact terminal links to `/Praveenraja_S_Resume.pdf` for the resume
download. Drop your resume PDF into the `public/` folder using that exact
filename (or update the `href` in `src/components/Contact.jsx`) so the
download button works.

## Notes

- Respects `prefers-reduced-motion` (background particle motion and CSS
  animations are disabled for users who request reduced motion).
- No external UI framework — layout and effects are hand-written CSS driven
  by the tokens in `src/index.css`, so the whole palette/type system can be
  restyled from one file.
- Fonts (Space Grotesk + IBM Plex Mono) load from Google Fonts in `index.html`.
# portfolio

# Project memory

## Product intent & audience

- Animated slider website showcasing travel destinations (mountains, beach, northern lights, desert dunes, jungle waterfall)
- Likely portfolio/demo-style showcase site; audience is end-users viewing a premium visual experience
- Gallery section below slider provides secondary content (destination cards with stats)

## Brand personality & voice

- User communicates in Hinglish (Hindi + English mix); responses should match this style
- Premium, cinematic, editorial tone — not generic or cookie-cutter

## Visual design & UX direction

- **Theme:** Premium dark theme, emerald accent color
- **Typography:** Playfair Display (display/headings) + Inter (body)
- **Effects:** Ken Burns slow zoom on slide images, shimmer text effect, staggered fade-up text animations (tag → subtitle → title → description → buttons)
- **Slider UX:** Full-screen hero, auto-play every 6s with thumbnail progress bar, pause/resume button, slide counter "01 / 05" style
- **Navigation:** Left/right arrows, clickable thumbnails, keyboard arrow keys, spacebar to pause, swipe/drag on mobile
- **Gallery section:** Elegant grid with hover effects (image zoom, description reveal, glow border), stats cards, scroll-triggered fade-in
- **Responsive:** Touch/swipe support for mobile; layout adapts to viewport

## Decisions, constraints & rationale

- Stack: Vite + React + Tailwind CSS + Lucide React icons
- Path alias `@/` → `src/` used for all project module imports
- No extra UI/icon packages installed; staying within template defaults
- CSS `@import` statements placed at top of CSS file to avoid build warnings
- Real stock photography used for slide imagery (fetched from Picsum/Unsplash-style sources)
- Build verified clean with no warnings before delivery

## Open questions & assumptions

- Whether more slides or destinations will be added beyond the initial 5
- Whether dynamic data source / CMS integration is needed vs. hardcoded slide data
- Whether additional page sections (about, contact, booking, etc.) are planned beyond slider + gallery
- Whether the dark/emerald aesthetic should remain the brand baseline for future requests
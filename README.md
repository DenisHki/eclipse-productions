# Eclipse Productions — Studio Booking Website

A responsive booking and showcase website built for **Eclipse Productions Oy**, a music production studio in Helsinki, Finland. The site includes an online booking system, an audio player, a bilingual (EN/FI) interface, and SEO-optimized architecture.

🔗 **Live site:** [eclipseproductions.fi](https://eclipseproductions.fi)

![Eclipse Productions screenshot](./docs/screenshot-home.png)

## About this project

This was a **freelance client project** — I designed, built, and deployed the site end-to-end for Eclipse Productions Oy. It also formed the basis of my **Bachelor's thesis project at Haaga-Helia University of Applied Sciences** (Business IT), where I documented the design and development process in detail.

Shared publicly with the client's permission as a portfolio case study.

## Features

**Core functionality**
- Online studio booking system with real-time availability (React Big Calendar + Firebase Firestore)
- Integrated audio player and equipment gallery
- Contact form with automated email confirmations (EmailJS)
- Google Maps integration for studio location
- Bilingual interface (English / Finnish) with persistent language preference

**Services showcased on the site**
- Studio rental, composition, track production, recording, mixing, and mastering — each with clear pricing tiers

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion |
| Data / backend services | Firebase Firestore, EmailJS |
| Routing & i18n | React Router DOM, React Context API, localized routes (`/` EN, `/fi/` FI) |
| Maps & media | Google Maps API, React Modern Audio Player |
| SEO | React Helmet Async, JSON-LD structured data (LocalBusiness schema), per-language meta tags, XML sitemap |
| Tooling | ESLint, TypeScript ESLint, PostCSS, Autoprefixer |

## SEO & performance

- Structured data (JSON-LD) for rich search snippets
- OpenGraph and Twitter Card meta tags
- Language-specific canonical URLs and `html lang` attribute
- XML sitemap for search engine indexing

## Running locally

This project was built and deployed for a specific client environment, so a full local setup requires API keys that are not included in this repository (Firebase config, EmailJS keys, Google Maps API key).

```bash
git clone https://github.com/DenisHki/eclipse-productions.git
cd eclipse-productions
npm install
# add your own .env with Firebase / EmailJS / Google Maps keys
npm run dev
```

## Thesis documentation

The full design and development process — requirements gathering, architecture decisions, and implementation — is documented in my Bachelor's thesis (Haaga-Helia, Business IT). [https://www.theseus.fi/handle/10024/919283]

## License & credits

Built by **Denis Chuvakov** as a freelance developer for Eclipse Productions Oy. Code shared publicly for portfolio purposes with the client's permission. Please don't reuse the branding, copy, or design assets — they belong to Eclipse Productions Oy.

## Contact

- 🌐 [eclipseproductions.fi](https://eclipseproductions.fi)
- 📧 info@eclipseproductions.fi
- 📸 Instagram: [@eclipse_productions_oy](https://instagram.com/eclipse_productions_oy)

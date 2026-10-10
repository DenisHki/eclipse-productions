# 🎧 Eclipse Productions Oy Website

A modern, responsive website for **Eclipse Productions Oy** — a professional music studio and production company located in Helsinki, Finland. The site features an integrated booking system, user authentication, audio player, and comprehensive service showcase.

## 🎵 Features

### Core Functionality
- Online Studio Booking System with real-time availability
- User Authentication (register, log in, password reset)
- Role-based Access (user / admin)
- Integrated Audio Player
- Interactive Equipment Gallery
- Contact Form
- Google Maps Integration
- Bilingual Interface (English & Finnish)

### Booking System
- Calendar view with real-time booked slots
- Authenticated users can create and cancel own bookings
- 48-hour cancellation policy enforced in UI
- Admins can view and delete any booking
- Own bookings highlighted in gold on the calendar
- Automated booking confirmation emails (EmailJS)

### Services Offered
- **Studio Rental** – 1h €30/h | 3h €25/h | 6h €20/h
- **Track Production** – €500/track (full production)
- **Recording Mixing & Mastering** – €300/track
- **Recording** – €30/hour (min. 2 hours)
- **Mixing** – €250/track
- **Mastering** – €100/track

### Technical Features
- **Multilingual Support** (i18n) - English & Finnish
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Real-time Booking** - Firebase Firestore integration
- **User Authentication** - Firebase Auth with email/password
- **Role Management** - User roles stored in Firestore (`user` / `admin`)
- **Email Notifications** - Automated booking confirmations (EmailJS)
- **SEO Optimized** - Language-specific meta tags & sitemaps
- **Performance Focused** - Fast loading, optimized assets
- **Persistent Preferences** - Language choice saved locally

## 🛠 Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- Framer Motion

### Authentication & Database
- **Firebase Auth** - Email/password authentication, password reset
- **Firebase Firestore** - Real-time booking data
  - `bookings_public` - Calendar availability (readable by all)
  - `bookings_private` - Full booking details (owner/admin only)
  - `users` - User profiles and roles

### Internationalization (i18n)
- **React Context API** - Language state management
- **LocalStorage** - Persistent language preference
- **Dynamic SEO** - Language-specific meta tags
- **Localized URLs** - `/` (EN) and `/fi/` (FI)

### Libraries & Integrations
- React Big Calendar
- EmailJS
- Firebase (Auth + Firestore)
- Google Maps API
- React Modern Audio Player
- React Helmet Async
- React Router DOM
- React Icons

### Development Tools
- ESLint
- TypeScript ESLint
- Autoprefixer
- PostCSS

## 🌍 Languages

- **English** - Full website experience
- **Finnish (Suomi)** - Complete Finnish translation including auth and booking UI

## 👤 User Roles

| Feature | Guest | User | Admin |
|---|---|---|---|
| View calendar | ✅ | ✅ | ✅ |
| Create booking | ❌ | ✅ | ✅ |
| Cancel own booking (48h+) | ❌ | ✅ | ✅ |
| Cancel any booking | ❌ | ❌ | ✅ |
| Bypass 48h rule | ❌ | ❌ | ✅ |

## 📈 SEO & Performance
- **Structured Data (JSON-LD)** - Rich snippets for search engines
- **Meta Tags** - OpenGraph & Twitter Cards
- **Canonical URLs** - Language-specific canonical tags
- **Sitemap** - XML sitemap for search engines
- **Schema Markup** - LocalBusiness schema
- **HTML Lang Attribute** - Dynamic language declaration
- **Localized Meta** - Separate titles/descriptions per language

## 📝 License
This project is **proprietary and confidential**. All rights reserved by Eclipse Productions Oy.
**© 2025 Eclipse Productions Oy** - All Rights Reserved

## 📞 Support
- 🌐 [eclipseproductions.fi](https://eclipseproductions.fi)
- 📧 info@eclipseproductions.fi
- 📸 Instagram: [@eclipse_productions_oy](https://instagram.com/eclipse_productions_oy)
- 📍 Sörnäisten rantatie 25, 00520 Helsinki, Finland

*Professional music production services in the heart of Helsinki*

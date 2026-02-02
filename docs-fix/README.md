# Aurora Forge - Next.js Portfolio

Portfolio website migrasi dari React + Vite ke Next.js 15 dengan App Router, featuring Aurora Glass Design System dan MDX-based content management.

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Tech Stack](#-tech-stack)
- [Instalasi](#-instalasi)
- [Cara Menjalankan](#-cara-menjalankan)
- [Struktur Folder](#-struktur-folder)
- [Menambah Konten](#-menambah-konten)
- [Perubahan dari React ke Next.js](#-perubahan-dari-react-ke-nextjs)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

## ✨ Fitur

### Fitur Utama
- 🎨 **Aurora Glass Design System** - Glassmorphism dengan aurora gradient effects
- 🎭 **Smooth Animations** - Framer Motion untuk transisi halus
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Next.js 15** - App Router dengan Server Components
- 📝 **MDX Content** - Blog dan projects berbasis MDX files
- 🔍 **Command Palette** - Quick navigation dengan Cmd/Ctrl+K
- 🎯 **Floating Dock** - macOS-style navigation
- 🤖 **AI Chat Widget** - Floating chat interface (UI only)
- 🌊 **Animated Background** - Aurora background dengan mouse tracking

### Halaman
- **Home** - Hero dengan Bento Grid + Project Gallery
- **Projects** - Grid showcase dengan MDX-based content
- **Project Detail** - Dynamic routing untuk setiap project
- **Blog** - Blog listing dengan MDX posts
- **Blog Detail** - Dynamic routing untuk setiap post
- **About** - Profile, skills, dan experience
- **Contact** - Contact form dan social links
- **404** - Custom not found page

## 🛠 Tech Stack

### Core
- **Next.js 15** - React framework dengan App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS

### UI & Animations
- **Framer Motion** - Animation library
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library
- **Shadcn UI** - Component collection

### Content Management
- **MDX** - Markdown dengan JSX support
- **Gray Matter** - Frontmatter parsing
- **next-mdx-remote** - MDX rendering

### State & Data
- **TanStack React Query** - Data fetching
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 📦 Instalasi

### Prerequisites
- Node.js 18+ 
- npm (sudah termasuk dengan Node.js)

### Steps

1. **Clone atau navigate ke folder project**
```bash
cd aurora-forge-nextjs
```

2. **Install dependencies**
```bash
npm install
```

3. **Copy environment variables (opsional)**
```bash
copy .env.example .env.local
```

4. **Selesai!** Project siap dijalankan

## 🚀 Cara Menjalankan

### Development Mode
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build untuk Production
```bash
npm run build
```

### Menjalankan Production Build
```bash
npm start
```

### Lint Code
```bash
npm run lint
```

## 📁 Struktur Folder

```
aurora-forge-nextjs/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── providers.tsx        # Client providers (React Query, Theme)
│   ├── globals.css          # Global styles + Aurora theme
│   ├── about/               # About page
│   ├── blog/                # Blog pages
│   │   ├── page.tsx         # Blog listing
│   │   └── [slug]/          # Dynamic blog post
│   ├── projects/            # Projects pages
│   │   ├── page.tsx         # Projects listing
│   │   └── [slug]/          # Dynamic project detail
│   ├── contact/             # Contact page
│   └── not-found.tsx        # 404 page
│
├── components/              # React components
│   ├── AuroraBackground.tsx # Animated background
│   ├── FloatingDock.tsx     # Navigation dock
│   ├── CommandPalette.tsx   # Search command palette
│   ├── AIChatWidget.tsx     # Chat widget
│   ├── BentoGrid.tsx        # Hero bento grid
│   ├── ProjectGallery.tsx   # Project carousel
│   ├── PageTransition.tsx   # Page transition wrapper
│   └── ClientLayout.tsx     # Client-side layout wrapper
│
├── content/                 # MDX content files
│   ├── blog/               # Blog posts (.mdx)
│   │   ├── getting-started-with-rag.mdx
│   │   └── nextjs-performance-tips.mdx
│   └── projects/           # Project case studies (.mdx)
│       ├── saas.mdx
│       ├── cv.mdx
│       └── rag.mdx
│
├── lib/                    # Utility functions
│   ├── utils.ts           # General utilities (cn, etc.)
│   └── mdx.ts             # MDX content helpers
│
├── public/                # Static assets
│   ├── favicon.ico
│   └── ...
│
├── .env.example           # Environment variables template
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## 📝 Menambah Konten

### Menambah Blog Post Baru

1. Buat file baru di `content/blog/nama-post.mdx`
2. Tambahkan frontmatter:

```mdx
---
title: "Judul Blog Post"
date: "2024-01-25"
excerpt: "Deskripsi singkat untuk preview"
author: "Muhammad Fauza"
tags: ["Tag1", "Tag2", "Tag3"]
readTime: "5 min read"
---

## Heading

Konten blog post Anda di sini...

### Subheading

Lebih banyak konten...
```

3. Save file, dan post otomatis muncul di `/blog`!

### Menambah Project Baru

1. Buat file baru di `content/projects/nama-project.mdx`
2. Tambahkan frontmatter:

```mdx
---
title: "Nama Project"
category: "Web Application"
description: "Deskripsi singkat project"
tech: ["Next.js", "TypeScript", "PostgreSQL"]
gradient: "from-purple-500/20 to-blue-500/20"
year: "2024"
github: "https://github.com/username/repo"
demo: "https://demo.example.com"
---

## Overview

Detail project Anda di sini...

## Features

- Feature 1
- Feature 2

## Tech Stack

Penjelasan tech stack...
```

3. Save file, dan project otomatis muncul di `/projects`!

### Gradient Options untuk Projects

Pilih salah satu gradient berikut untuk `gradient` field:

- `from-purple-500/20 to-blue-500/20` - Purple to Blue
- `from-cyan-500/20 to-green-500/20` - Cyan to Green
- `from-magenta-500/20 to-orange-500/20` - Magenta to Orange
- `from-pink-500/20 to-rose-500/20` - Pink to Rose
- `from-indigo-500/20 to-purple-500/20` - Indigo to Purple

## 🔄 Perubahan dari React ke Next.js

### Routing
**React (React Router)**
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
```

**Next.js (App Router)**
```
app/
├── page.tsx          → / (Home)
├── about/
│   └── page.tsx      → /about
└── blog/
    └── [slug]/
        └── page.tsx  → /blog/:slug (Dynamic)
```

### Navigation
**React**
```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/about');
```

**Next.js**
```tsx
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Programmatic
const router = useRouter();
router.push('/about');

// Declarative (preferred)
<Link href="/about">About</Link>
```

### Data Fetching
**React**
```tsx
const [data, setData] = useState(null);

useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData);
}, []);
```

**Next.js (Server Component)**
```tsx
// Runs on server, no useEffect needed
async function Page() {
  const data = await fetch('/api/data');
  return <div>{data}</div>;
}
```

### Client vs Server Components
**Server Component (default)**
- Runs on server
- Can fetch data directly
- Smaller bundle size
- No useState, useEffect, etc.

```tsx
// app/page.tsx
async function Page() {
  const data = await getData();
  return <div>{data}</div>;
}
```

**Client Component**
- Runs in browser
- Can use hooks (useState, useEffect)
- Interactive features
- Add 'use client' directive

```tsx
'use client';

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Metadata (SEO)
**React**
```tsx
import { Helmet } from 'react-helmet';

<Helmet>
  <title>My Page</title>
  <meta name="description" content="..." />
</Helmet>
```

**Next.js**
```tsx
export const metadata = {
  title: 'My Page',
  description: '...',
};
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Vercel auto-detect Next.js dan deploy
4. Done! ✨

### Manual Deployment

```bash
# Build
npm run build

# Output ada di .next folder
# Upload ke hosting yang support Node.js
```

### Environment Variables

Jangan lupa set environment variables di hosting:
- Copy dari `.env.example`
- Set di dashboard hosting (Vercel, Netlify, dll)

## 🐛 Troubleshooting

### Error: "Module not found"
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
npm install
```

### Error: "Hydration failed"
- Pastikan tidak ada mismatch antara server dan client
- Check console untuk detail error
- Biasanya karena HTML tidak valid (div dalam p, dll)

### Styling tidak muncul
```bash
# Restart dev server
npm run dev
```

### MDX content tidak muncul
- Check frontmatter format (harus valid YAML)
- Pastikan file ada di `content/blog/` atau `content/projects/`
- Check console untuk parsing errors

### Build error
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Port 3000 sudah dipakai
```bash
# Gunakan port lain
PORT=3001 npm run dev
```

## 📚 Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)

### MDX
- [MDX Documentation](https://mdxjs.com/)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)

### Styling
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)

## 🤝 Contributing

Ini adalah portfolio pribadi, tapi feel free untuk:
- Report bugs
- Suggest features
- Fork dan customize untuk portfolio Anda sendiri

## 📄 License

MIT License - Feel free to use this as template untuk portfolio Anda!

## 👤 Author

**Muhammad Fauza**
- Portfolio: [Your URL]
- GitHub: [@yourhandle]
- LinkedIn: [Your Profile]

---

Made with ❤️ using Next.js 15 and Aurora Glass Design System

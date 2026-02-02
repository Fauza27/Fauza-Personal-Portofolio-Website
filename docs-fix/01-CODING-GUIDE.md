# 🎯 Panduan Coding Step-by-Step

Panduan lengkap untuk menulis ulang portfolio Next.js dari awal hingga akhir.

---

## 📋 Prerequisites

Sebelum mulai, pastikan kamu sudah install:
- Node.js 20+
- npm atau yarn
- Code editor (VS Code recommended)
- Git (optional)

---

## 🎯 Filosofi Coding

### Prinsip Utama:
1. **Start Simple** - Mulai dari yang paling basic
2. **Build Incrementally** - Tambahkan fitur satu per satu
3. **Test Often** - Test setiap perubahan
4. **Understand First** - Pahami sebelum menulis

### Jangan:
- ❌ Copy-paste tanpa memahami
- ❌ Menulis semua sekaligus
- ❌ Skip testing
- ❌ Ignore errors

---

## 📚 Phase 1: Project Setup (Day 1)

### Step 1.1: Create Next.js Project

```bash
npx create-next-app@latest aurora-forge-nextjs
```

**Pilihan saat setup:**
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No
- App Router: Yes
- Import alias: Yes (@/*)

**Pahami:**
- Next.js 15 menggunakan App Router (bukan Pages Router)
- TypeScript untuk type safety
- Tailwind CSS untuk styling

### Step 1.2: Install Dependencies

```bash
cd aurora-forge-nextjs
npm install framer-motion
npm install lucide-react
npm install next-mdx-remote
npm install zod
```

**Pahami setiap package:**
- `framer-motion` - Animations
- `lucide-react` - Icons
- `next-mdx-remote` - MDX content
- `zod` - Validation

### Step 1.3: Setup Tailwind CSS v4

**File: `app/globals.css`**

Hapus semua isi default, tulis dari awal:

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary: oklch(0.7 0.2 270);
  --color-accent: oklch(0.75 0.18 200);
  --color-success: oklch(0.7 0.15 145);
  
  /* ... dst */
}

/* Base styles */
@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
  }
}
```

**Pahami:**
- `@import "tailwindcss"` - Import Tailwind v4
- `@theme` - Define custom colors
- `oklch` - Modern color space
- `@layer base` - Base styles

**Test:** Run `npm run dev` dan buka http://localhost:3000

---

## 📚 Phase 2: Core Layout (Day 1-2)

### Step 2.1: Root Layout

**File: `app/layout.tsx`**

Tulis dari awal, pahami setiap bagian:

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Muhammad Fauza - Portfolio',
  description: 'Fullstack & AI Engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

**Pahami:**
- `Metadata` - SEO metadata
- `Inter` font - Google font optimization
- `children` - Page content
- Root layout wrap semua pages

### Step 2.2: Home Page (Basic)

**File: `app/page.tsx`**

Mulai dengan yang simple:

```typescript
export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">
        Hello World
      </h1>
      <p className="text-muted-foreground">
        This is my portfolio
      </p>
    </main>
  )
}
```

**Test:** Lihat di browser, pastikan styling bekerja

### Step 2.3: Client Layout Component

**File: `components/ClientLayout.tsx`**

```typescript
'use client'

import { ReactNode } from 'react'

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Aurora Background akan ditambah nanti */}
      <div className="relative z-10">
        {children}
      </div>
      {/* Floating Dock akan ditambah nanti */}
    </div>
  )
}
```

**Pahami:**
- `'use client'` - Client Component
- Wrapper untuk background dan dock
- `z-10` untuk layering

---

## 📚 Phase 3: Basic Components (Day 2-3)

### Step 3.1: Aurora Background

**File: `components/AuroraBackground.tsx`**

Tulis step by step:

1. **Basic structure:**
```typescript
'use client'

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Gradient background */}
    </div>
  )
}
```

2. **Add gradients:**
```typescript
<div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
<div className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-purple rounded-full blur-3xl opacity-20" />
{/* Add more gradients */}
```

3. **Add animations:**
```typescript
import { motion } from 'framer-motion'

<motion.div
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
  }}
/>
```

**Pahami:**
- `fixed inset-0` - Full screen fixed
- `-z-10` - Behind content
- `blur-3xl` - Blur effect
- Framer Motion animations

**Test:** Lihat animasi background

### Step 3.2: Floating Dock (Basic)

**File: `components/FloatingDock.tsx`**

Mulai dengan struktur basic:

```typescript
'use client'

import { Home, FolderKanban } from 'lucide-react'

export function FloatingDock() {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex gap-2 px-4 py-3 glass-strong rounded-2xl">
        <button className="flex flex-col items-center gap-1 px-3 py-2">
          <Home size={20} />
          <span className="text-xs">Home</span>
        </button>
        {/* Add more buttons */}
      </div>
    </nav>
  )
}
```

**Pahami:**
- `fixed bottom-6` - Fixed at bottom
- `left-1/2 -translate-x-1/2` - Center horizontally
- `glass-strong` - Glass morphism effect

**Test:** Lihat dock di bottom

### Step 3.3: Add Navigation

Tambahkan routing dengan Next.js:

```typescript
import { useRouter, usePathname } from 'next/navigation'

const router = useRouter()
const pathname = usePathname()

const navItems = [
  { icon: <Home />, label: 'Home', path: '/' },
  // ... more items
]

{navItems.map(item => (
  <button
    key={item.path}
    onClick={() => router.push(item.path)}
    className={pathname === item.path ? 'text-primary' : 'text-foreground/70'}
  >
    {item.icon}
    <span>{item.label}</span>
  </button>
))}
```

**Pahami:**
- `useRouter` - Navigation
- `usePathname` - Current path
- Active state styling

---

## 📚 Phase 4: Pages Structure (Day 3-4)

### Step 4.1: Create Page Files

Buat file-file ini satu per satu:

```
app/
├── page.tsx          (Home - sudah ada)
├── about/
│   └── page.tsx      (About)
├── projects/
│   └── page.tsx      (Projects list)
├── blog/
│   └── page.tsx      (Blog list)
└── contact/
    └── page.tsx      (Contact)
```

### Step 4.2: About Page

**File: `app/about/page.tsx`**

```typescript
import { ClientLayout } from '@/components/ClientLayout'

export const metadata = {
  title: 'About - Muhammad Fauza',
}

export default function About() {
  return (
    <ClientLayout>
      <main className="pt-24 pb-32 max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-6">
          About Me
        </h1>
        <p className="text-lg text-muted-foreground">
          I'm a Fullstack & AI Engineer...
        </p>
      </main>
    </ClientLayout>
  )
}
```

**Pahami:**
- `metadata` - Page metadata
- `ClientLayout` - Wrapper dengan background
- Responsive padding dan max-width

**Test:** Navigate ke /about

### Step 4.3: Projects Page (Basic)

**File: `app/projects/page.tsx`**

```typescript
export default function Projects() {
  const projects = [
    {
      title: 'Project 1',
      description: 'Description...',
      tech: ['Next.js', 'TypeScript'],
    },
    // ... more projects
  ]

  return (
    <ClientLayout>
      <main className="pt-24 pb-32 max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-12">Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div key={project.title} className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-2">
                {project.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <span key={tech} className="px-3 py-1 glass rounded-lg text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </ClientLayout>
  )
}
```

**Pahami:**
- Grid layout untuk cards
- Glass morphism styling
- Tech stack badges

**Test:** Navigate ke /projects

---

## 📚 Phase 5: MDX Integration (Day 4-5)

### Step 5.1: Setup MDX

**File: `lib/mdx.ts`**

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export async function getProjects() {
  const projectsDir = path.join(contentDirectory, 'projects')
  const files = fs.readdirSync(projectsDir)
  
  const projects = files.map(filename => {
    const filePath = path.join(projectsDir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    return {
      slug: filename.replace('.mdx', ''),
      ...data,
      content,
    }
  })
  
  return projects
}
```

**Pahami:**
- `fs` - File system operations
- `gray-matter` - Parse frontmatter
- `content` directory structure

### Step 5.2: Create MDX Content

**File: `content/projects/saas.mdx`**

```markdown
---
title: "Enterprise SaaS Platform"
description: "A full-featured B2B SaaS application"
tech: ["Next.js", "TypeScript", "PostgreSQL"]
year: "2024"
---

## Overview

This is my project description...

## Features

- Feature 1
- Feature 2
```

**Pahami:**
- Frontmatter (metadata)
- Markdown content
- MDX = Markdown + JSX

### Step 5.3: Dynamic Routes

**File: `app/projects/[slug]/page.tsx`**

```typescript
import { getProject, getProjects } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map(project => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetail({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const project = await getProject(slug)

  return (
    <ClientLayout>
      <main className="pt-24 pb-32 max-w-4xl mx-auto px-6">
        <h1>{project.title}</h1>
        <MDXRemote source={project.content} />
      </main>
    </ClientLayout>
  )
}
```

**Pahami:**
- `[slug]` - Dynamic route
- `generateStaticParams` - Static generation
- `MDXRemote` - Render MDX
- Async params (Next.js 15)

**Test:** Navigate ke /projects/saas

---

## 📚 Phase 6: Advanced Components (Day 5-7)

### Step 6.1: BentoGrid

**File: `components/BentoGrid.tsx`**

Tulis step by step:

1. **Basic grid:**
```typescript
export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Grid items */}
    </div>
  )
}
```

2. **Add items dengan different sizes:**
```typescript
<div className="col-span-1 sm:col-span-2 row-span-2">
  {/* Hero card */}
</div>
```

3. **Add animations:**
```typescript
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
```

**Pahami:**
- CSS Grid layout
- `col-span` dan `row-span`
- Staggered animations

### Step 6.2: Command Palette

**File: `components/CommandPalette.tsx`**

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="max-w-2xl mx-auto mt-32 glass rounded-2xl p-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent border-none outline-none"
        />
        {/* Search results */}
      </div>
    </div>
  )
}
```

**Pahami:**
- Keyboard shortcuts (⌘K)
- Modal overlay
- Search functionality

### Step 6.3: Table of Contents

**File: `components/TableOfContents.tsx`**

```typescript
'use client'

import { useEffect, useState } from 'react'

export function TableOfContents() {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    // Extract headings from page
    const elements = document.querySelectorAll('h2, h3')
    const items = Array.from(elements).map(el => ({
      id: el.id,
      text: el.textContent,
      level: parseInt(el.tagName.charAt(1)),
    }))
    setHeadings(items)

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="sticky top-24">
      <h4>On This Page</h4>
      <ul>
        {headings.map(heading => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={activeId === heading.id ? 'text-primary' : ''}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

**Pahami:**
- DOM manipulation
- Intersection Observer API
- Sticky positioning
- Active state tracking

---

## 📚 Phase 7: Styling & Polish (Day 7-8)

### Step 7.1: MDX Components

**File: `components/MDXComponents.tsx`**

```typescript
export const MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mb-6 mt-12">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold mb-6 mt-12 border-b border-white/10 pb-3">
      {children}
    </h2>
  ),
  p: ({ children }) => (
    <p className="text-lg text-muted-foreground leading-[1.8] mb-6">
      {children}
    </p>
  ),
  // ... more components
}
```

**Pahami:**
- Custom MDX components
- Typography styling
- Consistent spacing

### Step 7.2: Glass Morphism

**File: `app/globals.css`**

```css
@layer utilities {
  .glass {
    @apply bg-white/5 backdrop-blur-md border border-white/10;
  }
  
  .glass-strong {
    @apply bg-white/10 backdrop-blur-xl border border-white/20;
  }
}
```

**Pahami:**
- Custom utility classes
- Backdrop blur
- Transparency layers

### Step 7.3: Animations

Add animations ke components:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300 }}
>
```

**Pahami:**
- Initial state
- Animate state
- Hover interactions
- Spring physics

---

## 📚 Phase 8: Final Touches (Day 8-9)

### Step 8.1: Floating Back Button

**File: `components/FloatingBackButton.tsx`**

```typescript
'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export function FloatingBackButton({ href, label }) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(href)}
      className="fixed top-24 left-6 z-50 glass rounded-xl px-4 py-2.5"
    >
      <ArrowLeft size={18} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
```

### Step 8.2: Reading Progress

Add to TableOfContents:

```typescript
function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(scrollPercent, 100))
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="h-2 bg-white/5 rounded-full">
      <div
        className="h-full bg-primary rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
```

### Step 8.3: Photo Integration

Add your photos:

```typescript
import Image from 'next/image'

<Image
  src="/me.jpg"
  alt="Muhammad Fauza"
  width={200}
  height={200}
  className="rounded-2xl"
  priority
/>
```

**Pahami:**
- Next.js Image optimization
- Priority loading
- Responsive images

---

## 📚 Phase 9: Testing & Optimization (Day 9-10)

### Step 9.1: Test All Pages

Checklist:
- [ ] Home page loads
- [ ] Navigation works
- [ ] All pages accessible
- [ ] MDX content renders
- [ ] Animations smooth
- [ ] Mobile responsive
- [ ] No console errors

### Step 9.2: Performance Check

```bash
npm run build
npm start
```

Check:
- Build time
- Bundle size
- Lighthouse score
- Loading speed

### Step 9.3: Accessibility

Test:
- Keyboard navigation
- Screen reader
- Color contrast
- Focus indicators

---

## 🎯 Urutan File yang Harus Ditulis

### Priority 1: Foundation (Hari 1)
1. `app/globals.css` - Styling foundation
2. `app/layout.tsx` - Root layout
3. `app/page.tsx` - Home page
4. `components/ClientLayout.tsx` - Client wrapper

### Priority 2: Core Components (Hari 2-3)
5. `components/AuroraBackground.tsx` - Background
6. `components/FloatingDock.tsx` - Navigation
7. `app/about/page.tsx` - About page
8. `app/projects/page.tsx` - Projects list
9. `app/blog/page.tsx` - Blog list
10. `app/contact/page.tsx` - Contact page

### Priority 3: MDX System (Hari 4-5)
11. `lib/mdx.ts` - MDX utilities
12. `content/projects/*.mdx` - Project content
13. `content/blog/*.mdx` - Blog content
14. `app/projects/[slug]/page.tsx` - Project detail
15. `app/blog/[slug]/page.tsx` - Blog detail
16. `components/MDXComponents.tsx` - MDX styling

### Priority 4: Advanced Features (Hari 6-7)
17. `components/BentoGrid.tsx` - Home grid
18. `components/CommandPalette.tsx` - Search
19. `components/TableOfContents.tsx` - TOC
20. `components/FloatingBackButton.tsx` - Back button
21. `components/ProjectGallery.tsx` - Project cards

### Priority 5: Polish (Hari 8-9)
22. Animations refinement
23. Responsive design fixes
24. Accessibility improvements
25. Performance optimization

---

## 💡 Tips Menulis Kode

### 1. Tulis Sedikit, Test Sering
```
Write 10 lines → Test → Write 10 more → Test
```

### 2. Pahami Sebelum Menulis
```
Read docs → Understand → Write → Test
```

### 3. Gunakan Console.log
```typescript
console.log('Current state:', state)
console.log('Props received:', props)
```

### 4. Comment Your Code
```typescript
// Extract headings from the page
const headings = document.querySelectorAll('h2, h3')

// Track active heading with Intersection Observer
const observer = new IntersectionObserver(...)
```

### 5. Break Down Complex Functions
```typescript
// Bad: One big function
function handleEverything() {
  // 100 lines of code
}

// Good: Multiple small functions
function extractHeadings() { }
function trackActiveHeading() { }
function scrollToHeading() { }
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Hydration Mismatch
**Problem:** Server HTML ≠ Client HTML

**Solution:**
```typescript
// Bad: Random values
const random = Math.random()

// Good: Pre-calculated
const positions = [
  { top: '10%', left: '20%' },
  // ...
]
```

### Issue 2: "use client" vs Server Components
**Problem:** Tidak tahu kapan pakai "use client"

**Solution:**
- Use "use client" jika:
  - Pakai useState, useEffect
  - Pakai event handlers (onClick, onChange)
  - Pakai browser APIs
- Jangan pakai "use client" jika:
  - Hanya render static content
  - Fetch data di server
  - No interactivity

### Issue 3: Async Params (Next.js 15)
**Problem:** `params` is a Promise

**Solution:**
```typescript
// Bad (Next.js 14)
export default function Page({ params }) {
  const { slug } = params
}

// Good (Next.js 15)
export default async function Page({ params }) {
  const { slug } = await params
}
```

---

## 📚 Resources

### Documentation:
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- MDX: https://mdxjs.com/

### Learning:
- Next.js Tutorial: https://nextjs.org/learn
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- React Docs: https://react.dev/

---

## 🎯 Final Checklist

Sebelum selesai, pastikan:

### Functionality
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] MDX content renders
- [ ] Search works
- [ ] Animations smooth

### Design
- [ ] Consistent styling
- [ ] Responsive on all devices
- [ ] Glass morphism effects
- [ ] Proper spacing
- [ ] Good typography

### Performance
- [ ] Fast loading
- [ ] Optimized images
- [ ] Small bundle size
- [ ] No unnecessary re-renders

### Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Good color contrast
- [ ] Focus indicators

### Code Quality
- [ ] No console errors
- [ ] Clean code
- [ ] Proper comments
- [ ] Type safety

---

## 🎉 Selamat!

Jika kamu sudah sampai sini dan menulis semua kode dengan tangan sendiri, kamu sudah:

✅ Memahami Next.js 15 App Router
✅ Menguasai TypeScript
✅ Bisa styling dengan Tailwind CSS
✅ Paham animations dengan Framer Motion
✅ Bisa implement MDX
✅ Memahami UX principles
✅ Bisa optimize performance

**Next Steps:**
1. Deploy ke Vercel
2. Tambahkan fitur sendiri
3. Customize design
4. Share dengan dunia!

---

**Happy Coding! 🚀**

*Last Updated: February 2, 2026*

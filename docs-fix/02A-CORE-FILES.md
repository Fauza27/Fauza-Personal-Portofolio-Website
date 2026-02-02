# 📖 Penjelasan Kode - Core Files

Penjelasan detail untuk file-file inti portfolio.

---

## File 1: `app/layout.tsx`

### Purpose
Root layout yang wrap semua pages. File ini adalah entry point untuk seluruh aplikasi.

### Dependencies
```typescript
import type { Metadata } from 'next'  // Type untuk SEO metadata
import { Inter } from 'next/font/google'  // Google Font optimization
import './globals.css'  // Global styles
```

### Code Explanation

```typescript
// Line 1-3: Import dependencies
import type { Metadata } from 'next'
// Metadata type dari Next.js untuk SEO (title, description, etc)

import { Inter } from 'next/font/google'
// Next.js font optimization - auto-host Google Fonts
// Menghindari external request, lebih cepat

import './globals.css'
// Import global CSS (Tailwind + custom styles)

// Line 5-6: Configure font
const inter = Inter({ 
  subsets: ['latin']  // Hanya load latin characters (lebih kecil)
})
// Create font instance dengan config
// Next.js akan optimize dan cache font ini

// Line 8-11: Export metadata untuk SEO
export const metadata: Metadata = {
  title: 'Muhammad Fauza - Portfolio',  // Browser tab title
  description: 'Fullstack & AI Engineer',  // Meta description untuk Google
}
// Metadata ini akan di-inject ke <head> tag
// Penting untuk SEO dan social media sharing

// Line 13-24: Root Layout Component
export default function RootLayout({
  children,  // Content dari pages (/, /about, /projects, etc)
}: {
  children: React.ReactNode  // Type: bisa berisi any React element
}) {
  return (
    <html lang="en">  {/* Root HTML element, lang untuk accessibility */}
      <body className={inter.className}>  {/* Apply Inter font */}
        {children}  {/* Render page content di sini */}
      </body>
    </html>
  )
}
// Layout ini wrap SEMUA pages
// Perubahan di sini affect seluruh aplikasi
```

### Key Concepts

**1. Root Layout:**
- Hanya ada 1 root layout per aplikasi
- Wrap semua pages
- Tidak re-render saat navigasi (persistent)

**2. Font Optimization:**
```typescript
const inter = Inter({ subsets: ['latin'] })
```
- Next.js auto-download dan host font
- No external request (faster)
- Font di-cache di browser

**3. Metadata:**
```typescript
export const metadata: Metadata = { ... }
```
- Static metadata (tidak berubah)
- Untuk dynamic metadata, gunakan `generateMetadata()`

### Common Mistakes

❌ **Jangan:**
```typescript
// Jangan import client-only code di root layout
import { useState } from 'react'  // Error!
```

✅ **Lakukan:**
```typescript
// Root layout harus Server Component
// Untuk client code, buat separate component dengan 'use client'
```

---

## File 2: `app/globals.css`

### Purpose
Global styles menggunakan Tailwind CSS v4 dengan custom theme.

### Code Explanation

```css
/* Line 1: Import Tailwind CSS v4 */
@import "tailwindcss";
/* Tailwind v4 menggunakan CSS-first config (bukan JS) */
/* Ini replace tailwind.config.js */

/* Line 3-20: Custom Theme */
@theme {
  /* Define custom colors menggunakan oklch color space */
  
  --color-primary: oklch(0.7 0.2 270);
  /* oklch(lightness chroma hue) */
  /* 0.7 = 70% brightness */
  /* 0.2 = saturation */
  /* 270 = purple hue */
  
  --color-accent: oklch(0.75 0.18 200);
  /* Cyan accent color */
  
  --color-success: oklch(0.7 0.15 145);
  /* Green for success states */
  
  /* Background colors */
  --color-background: oklch(0.1 0.01 270);
  /* Very dark purple-ish background */
  
  --color-foreground: oklch(0.98 0.01 270);
  /* Almost white text */
  
  --color-muted-foreground: oklch(0.6 0.01 270);
  /* Muted text (60% brightness) */
}
/* @theme directive adalah Tailwind v4 feature */
/* Colors bisa digunakan: bg-primary, text-accent, etc */

/* Line 22-30: Base Styles */
@layer base {
  /* @layer base = Tailwind base layer */
  /* Styles di sini punya lowest specificity */
  
  * {
    @apply border-border;
    /* Apply border-border color ke semua elements */
  }
  
  body {
    @apply bg-background text-foreground;
    /* Default background dan text color */
    /* bg-background = var(--color-background) */
    /* text-foreground = var(--color-foreground) */
  }
}

/* Line 32-50: Custom Utilities */
@layer utilities {
  /* @layer utilities = Tailwind utilities layer */
  /* Custom utility classes */
  
  .glass {
    @apply bg-white/5 backdrop-blur-md border border-white/10;
    /* Glass morphism effect */
    /* bg-white/5 = 5% white background */
    /* backdrop-blur-md = blur background behind */
    /* border-white/10 = 10% white border */
  }
  
  .glass-strong {
    @apply bg-white/10 backdrop-blur-xl border border-white/20;
    /* Stronger glass effect */
    /* More opaque, more blur */
  }
  
  .text-gradient {
    @apply bg-linear-to-r from-primary to-accent bg-clip-text text-transparent;
    /* Gradient text effect */
    /* bg-linear-to-r = linear gradient left to right */
    /* bg-clip-text = clip background to text */
    /* text-transparent = make text transparent to show gradient */
  }
  
  .pulse-status {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    /* Pulsing animation untuk status indicator */
  }
}

/* Line 52-60: Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
/* Simple pulse animation */
/* Fade in/out effect */

/* Line 62-70: Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
  /* Scrollbar width */
}

::-webkit-scrollbar-track {
  background: transparent;
  /* Transparent track */
}

::-webkit-scrollbar-thumb {
  background: oklch(0.4 0.01 270);
  border-radius: 4px;
  /* Rounded scrollbar thumb */
}

::-webkit-scrollbar-thumb:hover {
  background: oklch(0.5 0.01 270);
  /* Lighter on hover */
}
```

### Key Concepts

**1. Tailwind v4 CSS-First:**
```css
@import "tailwindcss";  /* Import Tailwind */
@theme { }  /* Define theme in CSS */
```
- No more `tailwind.config.js`
- All config in CSS
- More intuitive

**2. oklch Color Space:**
```css
oklch(lightness chroma hue)
```
- Modern color space
- More perceptually uniform
- Better for gradients

**3. @layer Directive:**
```css
@layer base { }      /* Lowest specificity */
@layer utilities { } /* Highest specificity */
```
- Control CSS specificity
- Organize styles

**4. Glass Morphism:**
```css
.glass {
  bg-white/5           /* Semi-transparent background */
  backdrop-blur-md     /* Blur background behind */
  border border-white/10  /* Subtle border */
}
```

### Usage Examples

```tsx
// Use custom colors
<div className="bg-primary text-foreground">

// Use glass effect
<div className="glass rounded-xl p-6">

// Use gradient text
<h1 className="text-gradient">Title</h1>

// Use pulse animation
<span className="pulse-status" />
```

---

## File 3: `components/ClientLayout.tsx`

### Purpose
Wrapper component untuk pages yang membutuhkan client-side features (background, dock, command palette).

### Dependencies
```typescript
'use client'  // Client Component directive

import { ReactNode, useState } from 'react'
import { AuroraBackground } from './AuroraBackground'
import { FloatingDock } from './FloatingDock'
import { CommandPalette } from './CommandPalette'
```

### Code Explanation

```typescript
// Line 1: Client Component Directive
'use client'
// HARUS di line pertama (sebelum imports)
// Menandakan ini adalah Client Component
// Bisa pakai useState, useEffect, event handlers

// Line 3-6: Imports
import { ReactNode, useState } from 'react'
// ReactNode = type untuk children
// useState = React hook untuk state management

import { AuroraBackground } from './AuroraBackground'
// Background animasi component

import { FloatingDock } from './FloatingDock'
// Navigation dock component

import { CommandPalette } from './CommandPalette'
// Search/command palette component

// Line 8-10: Props Interface
interface ClientLayoutProps {
  children: ReactNode  // Page content
}
// TypeScript interface untuk type safety
// Memastikan props yang diterima sesuai type

// Line 12-40: Component
export function ClientLayout({ children }: ClientLayoutProps) {
  // Destructure children dari props
  
  // Line 14: State untuk Command Palette
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  // useState(false) = initial state adalah false (closed)
  // isCommandOpen = current state value
  // setIsCommandOpen = function untuk update state
  
  return (
    <div className="min-h-screen bg-background relative">
      {/* min-h-screen = minimum height 100vh */}
      {/* bg-background = custom background color */}
      {/* relative = positioning context untuk absolute children */}
      
      {/* Aurora Background - Behind everything */}
      <AuroraBackground />
      {/* Animated gradient background */}
      {/* Fixed position, z-index -10 */}
      
      {/* Main Content - Above background */}
      <div className="relative z-10">
        {/* relative z-10 = above background (z-index -10) */}
        {/* All page content goes here */}
        {children}
      </div>
      
      {/* Floating Dock - Navigation */}
      <FloatingDock 
        onOpenSearch={() => setIsCommandOpen(true)}
        {/* Pass function to open command palette */}
        {/* When search button clicked, set state to true */}
      />
      
      {/* Command Palette - Search */}
      <CommandPalette
        isOpen={isCommandOpen}
        {/* Pass current state */}
        onClose={() => setIsCommandOpen(false)}
        {/* Pass function to close */}
      />
    </div>
  )
}
```

### Key Concepts

**1. Client Component:**
```typescript
'use client'
```
- Runs in browser
- Can use hooks (useState, useEffect)
- Can use event handlers
- Can access browser APIs

**2. State Management:**
```typescript
const [isCommandOpen, setIsCommandOpen] = useState(false)
```
- `isCommandOpen` = current value
- `setIsCommandOpen` = update function
- `false` = initial value

**3. Props Drilling:**
```typescript
<FloatingDock onOpenSearch={() => setIsCommandOpen(true)} />
```
- Pass function as prop
- Child component can call this function
- Updates parent state

**4. Z-Index Layering:**
```
z-index: -10  → AuroraBackground (behind)
z-index: 10   → Content (middle)
z-index: 50   → FloatingDock, CommandPalette (front)
```

### Usage

```typescript
// In any page
import { ClientLayout } from '@/components/ClientLayout'

export default function Page() {
  return (
    <ClientLayout>
      <div>Your page content</div>
    </ClientLayout>
  )
}
```

---

## Testing Core Files

### Test layout.tsx:
1. Run `npm run dev`
2. Check browser tab title
3. Inspect font loading in DevTools

### Test globals.css:
1. Use glass classes: `<div className="glass">`
2. Check backdrop-blur effect
3. Test gradient text: `<h1 className="text-gradient">`

### Test ClientLayout:
1. Check background animates
2. Test floating dock navigation
3. Press ⌘K to open command palette

---

Lanjut ke 02B-COMPONENTS.md untuk penjelasan components! 🚀

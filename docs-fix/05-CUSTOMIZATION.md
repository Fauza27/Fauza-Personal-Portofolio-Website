# 🎨 Customization Guide

Panduan lengkap untuk customize portfolio sesuai keinginan kamu.

---

## 🎨 Mengubah Colors & Theme

### 1. Primary & Accent Colors

**File: `app/globals.css`**

```css
@theme {
  /* Change these values */
  --color-primary: oklch(0.7 0.2 270);
  /* Format: oklch(lightness chroma hue) */
  /* lightness: 0-1 (0=black, 1=white) */
  /* chroma: 0-0.4 (saturation) */
  /* hue: 0-360 (color wheel) */
  
  /* Examples: */
  --color-primary: oklch(0.7 0.2 0);    /* Red */
  --color-primary: oklch(0.7 0.2 120);  /* Green */
  --color-primary: oklch(0.7 0.2 200);  /* Cyan */
  --color-primary: oklch(0.7 0.2 270);  /* Purple (default) */
  --color-primary: oklch(0.7 0.2 330);  /* Pink */
}
```

**Color Picker Tool:**
- https://oklch.com/
- Adjust sliders
- Copy oklch value
- Paste in globals.css

### 2. Background Color

```css
@theme {
  --color-background: oklch(0.1 0.01 270);
  /* 0.1 = very dark */
  /* Try: 0.05 (darker) or 0.15 (lighter) */
}
```

### 3. Text Colors

```css
@theme {
  --color-foreground: oklch(0.98 0.01 270);
  /* Main text color */
  
  --color-muted-foreground: oklch(0.6 0.01 270);
  /* Secondary text */
  /* Try: 0.5 (more muted) or 0.7 (less muted) */
}
```

### 4. Aurora Background Colors

**File: `app/globals.css`**

```css
@theme {
  --color-aurora-purple: oklch(0.6 0.25 270);
  --color-aurora-cyan: oklch(0.7 0.2 200);
  --color-aurora-pink: oklch(0.7 0.2 330);
  
  /* Change hue for different colors */
  /* Change lightness for brightness */
}
```

---

## 🖼️ Mengubah Layout

### 1. Container Width

**File: Any page**

```typescript
// Current: max-w-6xl (1152px)
<div className="max-w-6xl mx-auto">

// Wider: max-w-7xl (1280px)
<div className="max-w-7xl mx-auto">

// Narrower: max-w-5xl (1024px)
<div className="max-w-5xl mx-auto">

// Full width: max-w-full
<div className="max-w-full mx-auto">
```

### 2. Spacing

```typescript
// Padding
pt-24  // padding-top: 96px
pt-32  // padding-top: 128px
pt-20  // padding-top: 80px

// Margin
mb-12  // margin-bottom: 48px
mb-16  // margin-bottom: 64px
mb-8   // margin-bottom: 32px

// Gap
gap-6  // gap: 24px
gap-8  // gap: 32px
gap-4  // gap: 16px
```

### 3. Grid Columns

**File: `components/BentoGrid.tsx`**

```typescript
// Current: 3 columns on desktop
className="grid grid-cols-1 sm:grid-cols-3"

// 2 columns
className="grid grid-cols-1 sm:grid-cols-2"

// 4 columns
className="grid grid-cols-1 sm:grid-cols-4"
```

### 4. Card Sizes

```typescript
// Current
className="col-span-2 row-span-2"  // 2x2

// Larger
className="col-span-3 row-span-2"  // 3x2

// Smaller
className="col-span-1 row-span-1"  // 1x1
```

---

## ✨ Mengubah Animations

### 1. Animation Speed

**File: Any component with motion**

```typescript
// Slower
transition={{ duration: 2 }}  // 2 seconds

// Faster
transition={{ duration: 0.3 }}  // 0.3 seconds

// Default
transition={{ duration: 1 }}  // 1 second
```

### 2. Animation Type

```typescript
// Spring (bouncy)
transition={{ type: "spring", stiffness: 300, damping: 20 }}

// Tween (smooth)
transition={{ type: "tween", ease: "easeInOut" }}

// No animation
transition={{ duration: 0 }}
```

### 3. Hover Effects

```typescript
// Current
whileHover={{ scale: 1.05 }}

// More dramatic
whileHover={{ scale: 1.1, rotate: 2 }}

// Subtle
whileHover={{ scale: 1.02 }}

// No hover effect
// Remove whileHover prop
```

### 4. Stagger Delay

**File: `components/BentoGrid.tsx`**

```typescript
// Current
staggerChildren: 0.1  // 100ms between each

// Faster
staggerChildren: 0.05  // 50ms

// Slower
staggerChildren: 0.2  // 200ms

// No stagger
staggerChildren: 0
```

---

## 🎭 Mengubah Typography

### 1. Font Family

**File: `app/layout.tsx`**

```typescript
// Current: Inter
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// Change to other fonts:
import { Poppins } from 'next/font/google'
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'] 
})

// Apply in body
<body className={poppins.className}>
```

**Popular Fonts:**
- Inter (default) - Modern, clean
- Poppins - Rounded, friendly
- Roboto - Classic, readable
- Montserrat - Geometric, bold
- Open Sans - Neutral, versatile

### 2. Font Sizes

**File: `app/globals.css` or any component**

```typescript
// Headings
text-6xl  // 60px
text-5xl  // 48px
text-4xl  // 36px
text-3xl  // 30px
text-2xl  // 24px
text-xl   // 20px

// Body
text-lg   // 18px
text-base // 16px
text-sm   // 14px
text-xs   // 12px
```

### 3. Line Height

```typescript
leading-tight    // 1.25
leading-snug     // 1.375
leading-normal   // 1.5
leading-relaxed  // 1.625
leading-loose    // 2
```

### 4. Font Weight

```typescript
font-light    // 300
font-normal   // 400
font-medium   // 500
font-semibold // 600
font-bold     // 700
font-extrabold // 800
```

---

## 🖼️ Mengubah Images

### 1. Ganti Foto Profil

**Steps:**
1. Siapkan foto (format: jpg, png, webp)
2. Rename ke `me.jpg` dan `me-2.jpg`
3. Copy ke folder `public/`
4. Refresh browser

**Optimal Size:**
- me.jpg: 400x400px (untuk BentoGrid)
- me-2.jpg: 400x400px (untuk About page)

### 2. Image Styling

**File: Any component with Image**

```typescript
// Rounded corners
className="rounded-xl"   // 12px radius
className="rounded-2xl"  // 16px radius
className="rounded-full" // Perfect circle

// Border
className="border border-white/10"

// Shadow
className="shadow-lg"
className="shadow-2xl"

// Grayscale (hover to color)
className="grayscale hover:grayscale-0"
```

---

## 📝 Mengubah Content

### 1. Personal Info

**File: `components/BentoGrid.tsx`**

```typescript
// Change name
<h1>
  <span className="text-gradient">Your Name</span>
</h1>

// Change tagline
<p>Your tagline here</p>

// Change status
<span>Your current status</span>
```

**File: `app/about/page.tsx`**

```typescript
// Change bio
<p>Your bio here...</p>

// Change skills
const skills = [
  { category: 'Your Category', items: ['Skill 1', 'Skill 2'] },
]

// Change experience
const experience = [
  {
    role: 'Your Role',
    company: 'Your Company',
    period: 'Year - Year',
    description: 'What you did...',
  },
]
```

### 2. Projects

**File: `content/projects/your-project.mdx`**

Create new file:

```markdown
---
title: "Your Project Title"
category: "Category"
description: "Short description"
tech: ["Tech1", "Tech2", "Tech3"]
gradient: "from-blue-500/20 to-purple-500/20"
year: "2024"
github: "https://github.com/..."
demo: "https://demo.com"
---

## Overview

Your project description...

## Features

- Feature 1
- Feature 2

## Tech Stack

Details about technologies used...
```

### 3. Blog Posts

**File: `content/blog/your-post.mdx`**

```markdown
---
title: "Your Post Title"
excerpt: "Short excerpt"
date: "2024-01-01"
author: "Your Name"
category: "Category"
tags: ["tag1", "tag2"]
readTime: "5 min read"
---

## Introduction

Your content here...
```

---

## 🎨 Mengubah Components

### 1. Floating Dock Position

**File: `components/FloatingDock.tsx`**

```typescript
// Current: bottom center
className="fixed bottom-6 left-1/2 -translate-x-1/2"

// Top center
className="fixed top-6 left-1/2 -translate-x-1/2"

// Bottom left
className="fixed bottom-6 left-6"

// Bottom right
className="fixed bottom-6 right-6"
```

### 2. Floating Dock Items

```typescript
// Add new item
const navItems = [
  // ... existing items
  { icon: <Star size={20} />, label: 'New Page', path: '/new' },
]

// Remove item
// Just delete the line
```

### 3. Glass Effect Strength

**File: `app/globals.css`**

```css
.glass {
  /* Current */
  @apply bg-white/5 backdrop-blur-md;
  
  /* Stronger */
  @apply bg-white/10 backdrop-blur-xl;
  
  /* Weaker */
  @apply bg-white/3 backdrop-blur-sm;
  
  /* No blur */
  @apply bg-white/5;
}
```

### 4. Border Radius

```typescript
// Current
rounded-xl   // 12px
rounded-2xl  // 16px
rounded-3xl  // 24px

// More rounded
rounded-full // Perfect circle/pill

// Less rounded
rounded-lg   // 8px
rounded-md   // 6px
```

---

## 🚀 Menambah Fitur Baru

### 1. Tambah Page Baru

**Step 1:** Create file `app/new-page/page.tsx`

```typescript
import { ClientLayout } from '@/components/ClientLayout'

export const metadata = {
  title: 'New Page - Your Name',
}

export default function NewPage() {
  return (
    <ClientLayout>
      <main className="pt-24 pb-32 max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-6">
          New Page
        </h1>
        <p className="text-lg text-muted-foreground">
          Your content here...
        </p>
      </main>
    </ClientLayout>
  )
}
```

**Step 2:** Add to FloatingDock

```typescript
const navItems = [
  // ... existing items
  { icon: <Star size={20} />, label: 'New', path: '/new-page' },
]
```

### 2. Tambah Component Baru

**Step 1:** Create file `components/NewComponent.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'

export function NewComponent() {
  return (
    <motion.div
      className="glass rounded-2xl p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>New Component</h2>
      <p>Your content...</p>
    </motion.div>
  )
}
```

**Step 2:** Use in page

```typescript
import { NewComponent } from '@/components/NewComponent'

export default function Page() {
  return (
    <div>
      <NewComponent />
    </div>
  )
}
```

### 3. Tambah Animation Baru

```typescript
// Fade in from bottom
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>

// Slide in from left
<motion.div
  initial={{ x: -100 }}
  animate={{ x: 0 }}
>

// Rotate in
<motion.div
  initial={{ rotate: -180, scale: 0 }}
  animate={{ rotate: 0, scale: 1 }}
>

// Stagger children
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## 💡 Tips Customization

### 1. Start Small
- Change one thing at a time
- Test after each change
- Don't change everything at once

### 2. Keep Backups
```bash
# Create backup branch
git checkout -b backup
git add .
git commit -m "Backup before customization"

# Go back to main
git checkout main
```

### 3. Use Browser DevTools
- Inspect elements
- Try CSS changes live
- Copy working styles to code

### 4. Reference Documentation
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- Next.js: https://nextjs.org/docs

### 5. Be Consistent
- Use same colors throughout
- Use same spacing scale
- Use same animation timing
- Keep design cohesive

---

## 🎨 Design Resources

### Color Palettes
- https://coolors.co/
- https://colorhunt.co/
- https://oklch.com/

### Fonts
- https://fonts.google.com/
- https://fontpair.co/

### Icons
- https://lucide.dev/
- https://heroicons.com/
- https://react-icons.github.io/react-icons/

### Inspiration
- https://dribbble.com/
- https://behance.net/
- https://awwwards.com/

---

**Have fun customizing! Make it yours! 🎨**

# 🚀 Quick Start Guide

Panduan cepat untuk menjalankan Aurora Forge Next.js

## Prerequisites

- Node.js 18.17 atau lebih baru
- npm, yarn, atau pnpm

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# http://localhost:3000
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server (Turbopack)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Project Structure

```
aurora-forge-nextjs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── projects/          # Projects pages
│   ├── blog/              # Blog pages
│   └── contact/           # Contact page
├── components/            # React components
│   ├── AuroraBackground.tsx
│   ├── FloatingDock.tsx
│   ├── CommandPalette.tsx
│   └── ...
├── content/               # MDX content
│   ├── projects/         # Project MDX files
│   └── blog/             # Blog MDX files
├── lib/                   # Utilities
│   ├── mdx.ts            # MDX utilities
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## Adding Content

### New Project

Create `content/projects/my-project.mdx`:

```mdx
---
title: "My Project"
category: "Web Application"
description: "Project description"
tech: ["Next.js", "TypeScript"]
gradient: "from-blue-500/20 to-purple-500/20"
year: "2024"
featured: true
---

# My Project

Your content here...
```

### New Blog Post

Create `content/blog/my-post.mdx`:

```mdx
---
title: "My Blog Post"
excerpt: "Short description"
date: "2024-01-01"
author: "Your Name"
category: "Tutorial"
featured: true
---

# My Blog Post

Your content here...
```

## Customization

### Colors

Edit `app/globals.css` to change the Aurora theme colors:

```css
:root {
  --primary: 270 100% 65%;    /* Purple */
  --secondary: 180 100% 50%;  /* Cyan */
  --accent: 300 100% 60%;     /* Magenta */
}
```

### Metadata

Edit `app/layout.tsx` to update site metadata:

```tsx
export const metadata: Metadata = {
  title: 'Your Name',
  description: 'Your description',
}
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

```bash
# Build
npm run build

# The output is in .next folder
# Upload to your hosting provider
```

## Troubleshooting

### Port already in use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Build errors

```bash
# Clear cache
rm -rf .next
npm run build
```

## Need Help?

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

---

Happy coding! 🎉

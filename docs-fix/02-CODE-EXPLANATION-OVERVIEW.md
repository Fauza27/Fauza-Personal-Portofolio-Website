# 📖 Penjelasan Kode - Overview

File ini adalah index untuk penjelasan detail setiap file kode dalam portfolio.

---

## 📚 Struktur Penjelasan

Penjelasan kode dibagi menjadi beberapa file berdasarkan kategori:

### 1. **02A-CORE-FILES.md** - File Inti
- `app/layout.tsx` - Root layout
- `app/page.tsx` - Home page
- `app/globals.css` - Global styles
- `components/ClientLayout.tsx` - Client wrapper

### 2. **02B-COMPONENTS.md** - Components
- `components/AuroraBackground.tsx` - Background animasi
- `components/FloatingDock.tsx` - Navigation dock
- `components/BentoGrid.tsx` - Home grid
- `components/CommandPalette.tsx` - Search
- `components/TableOfContents.tsx` - TOC sidebar
- `components/FloatingBackButton.tsx` - Back button
- `components/MDXComponents.tsx` - MDX styling

### 3. **02C-PAGES.md** - Pages
- `app/about/page.tsx` - About page
- `app/projects/page.tsx` - Projects list
- `app/blog/page.tsx` - Blog list
- `app/contact/page.tsx` - Contact page
- `app/projects/[slug]/page.tsx` - Project detail
- `app/blog/[slug]/page.tsx` - Blog detail

### 4. **02D-UTILITIES.md** - Utilities & Lib
- `lib/mdx.ts` - MDX utilities
- `lib/utils.ts` - Helper functions

---

## 🎯 Cara Menggunakan

### Untuk Memahami Keseluruhan:
1. Baca file ini (overview)
2. Pilih kategori yang ingin dipelajari
3. Baca penjelasan detail di file tersebut

### Untuk Menulis Ulang:
1. Baca penjelasan file yang akan ditulis
2. Pahami setiap line kode
3. Tulis ulang dengan tangan sendiri
4. Test dan debug

### Untuk Debugging:
1. Cari file yang bermasalah
2. Baca penjelasan line-by-line
3. Identifikasi masalah
4. Fix dan test

---

## 📖 Format Penjelasan

Setiap file dijelaskan dengan format:

```markdown
## File: path/to/file.tsx

### Purpose
Apa fungsi file ini

### Dependencies
Package yang digunakan

### Code Explanation

```typescript
// Line 1-5: Import statements
import { useState } from 'react'  // React hook untuk state management
import { motion } from 'framer-motion'  // Library untuk animations

// Line 7-10: Component definition
export function MyComponent() {  // Export component agar bisa digunakan di file lain
  const [isOpen, setIsOpen] = useState(false)  // State untuk track open/close
  
  // Line 12-15: Return JSX
  return (
    <div>Content</div>  // Render content
  )
}
```

### Key Concepts
- Konsep penting yang digunakan
- Best practices
- Common pitfalls

### Testing
Cara test component ini
```

---

## 🎓 Tips Membaca Kode

### 1. Baca dari Atas ke Bawah
- Imports → Types → Component → Export
- Pahami dependencies dulu
- Lalu pahami logic

### 2. Fokus pada Flow
- Bagaimana data mengalir
- Bagaimana state berubah
- Bagaimana user interaction ditangani

### 3. Perhatikan Patterns
- Naming conventions
- File structure
- Code organization

### 4. Coba Modifikasi
- Ubah nilai
- Tambah console.log
- Break things and fix them

---

## 📝 Catatan Penting

### TypeScript
Semua file menggunakan TypeScript untuk type safety:
```typescript
// Type untuk props
interface Props {
  title: string
  count: number
}

// Type untuk state
const [items, setItems] = useState<Item[]>([])
```

### "use client" Directive
File dengan `'use client'` adalah Client Components:
```typescript
'use client'  // Harus di line pertama

import { useState } from 'react'  // Client-only hooks
```

### Async Components (Next.js 15)
Server Components bisa async:
```typescript
export default async function Page() {
  const data = await fetchData()  // Fetch di server
  return <div>{data}</div>
}
```

---

## 🔍 Quick Reference

### Mencari Penjelasan Spesifik:

**Animations?** → 02B-COMPONENTS.md (AuroraBackground, FloatingDock)
**Routing?** → 02C-PAGES.md (Dynamic routes)
**MDX?** → 02D-UTILITIES.md (lib/mdx.ts) + 02B-COMPONENTS.md (MDXComponents)
**Styling?** → 02A-CORE-FILES.md (globals.css)
**Layout?** → 02A-CORE-FILES.md (layout.tsx, ClientLayout)

---

Lanjut ke file berikutnya untuk penjelasan detail! 🚀

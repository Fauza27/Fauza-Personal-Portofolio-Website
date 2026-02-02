# ⚡ Quick Fixes - Implementasi Cepat

Dokumen ini berisi perbaikan-perbaikan yang bisa diimplementasikan dengan cepat (< 30 menit per fix) untuk meningkatkan kualitas kode.

---

## 🔴 CRITICAL FIXES (Do These First!)

### 1. Add Error Boundaries (5 minutes per route)

**File:** `app/projects/[slug]/error.tsx`
```typescript
'use client';

import { useEffect } from 'react';
import { ClientLayout } from '@/components/ClientLayout';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Project error:', error);
  }, [error]);

  return (
    <ClientLayout>
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="glass rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Something went wrong!
          </h2>
          <p className="text-muted-foreground mb-6">
            {error.message || 'An unexpected error occurred'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Try again
            </button>
            <a
              href="/projects"
              className="px-6 py-3 glass rounded-xl text-foreground hover:bg-white/10 transition-colors"
            >
              Back to Projects
            </a>
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}
```

**Copy to:**
- `app/projects/[slug]/error.tsx`
- `app/blog/[slug]/error.tsx`

---

### 2. Add Loading States (3 minutes per route)

**File:** `app/projects/[slug]/loading.tsx`
```typescript
import { ClientLayout } from '@/components/ClientLayout';

export default function Loading() {
  return (
    <ClientLayout>
      <main className="pt-20 sm:pt-24 pb-24 sm:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header Skeleton */}
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-8 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-32 mb-4" />
            <div className="h-12 bg-white/10 rounded mb-4" />
            <div className="h-6 bg-white/10 rounded w-3/4 mb-6" />
            <div className="flex gap-2 mb-6">
              <div className="h-8 bg-white/10 rounded w-20" />
              <div className="h-8 bg-white/10 rounded w-20" />
              <div className="h-8 bg-white/10 rounded w-20" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 animate-pulse">
            <div className="space-y-4">
              <div className="h-4 bg-white/10 rounded" />
              <div className="h-4 bg-white/10 rounded" />
              <div className="h-4 bg-white/10 rounded w-5/6" />
            </div>
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}
```

**Copy to:**
- `app/projects/[slug]/loading.tsx`
- `app/blog/[slug]/loading.tsx`

---

### 3. Optimize Aurora Background (10 minutes)

**File:** `components/AuroraBackground.tsx`

**Add this at the top:**
```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const AuroraBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause animations when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(280,82%,5%)] via-[hsl(260,70%,8%)] to-[hsl(240,60%,8%)]" />
      
      {/* Aurora blobs - only animate when visible */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-[60px] md:blur-[120px]"
        style={{
          background: 'radial-gradient(circle, hsl(270 100% 50% / 0.6) 0%, transparent 70%)',
          top: '10%',
          left: '20%',
          willChange: 'transform',
        }}
        animate={isVisible ? {
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Repeat for other blobs with isVisible check */}
      {/* ... */}
    </div>
  );
};
```

**Add to globals.css:**
```css
/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .aurora-blob,
  [class*="animate-"] {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 🟡 MEDIUM PRIORITY FIXES

### 4. Add ARIA Labels (2 minutes)

**File:** `components/FloatingDock.tsx`

**Replace:**
```typescript
<motion.button
  onClick={onClick}
  className="..."
>
```

**With:**
```typescript
<motion.button
  onClick={onClick}
  className="..."
  aria-label={label}
  aria-current={isActive ? 'page' : undefined}
  role="link"
>
```

---

### 5. Add Skip to Content Link (3 minutes)

**File:** `components/ClientLayout.tsx`

**Add at the top of return:**
```typescript
return (
  <>
    {/* Skip to content link for accessibility */}
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-primary-foreground focus:rounded-xl focus:font-medium focus:shadow-lg"
    >
      Skip to content
    </a>
    
    <AuroraBackground />
    {/* ... rest of code */}
  </>
);
```

**Update all page.tsx files to add id:**
```typescript
<main id="main-content" className="...">
```

---

### 6. Add useMemo for Filtering (2 minutes)

**File:** `components/CommandPalette.tsx`

**Replace:**
```typescript
const filteredCommands = commands.filter(cmd =>
  cmd.label.toLowerCase().includes(query.toLowerCase()) ||
  cmd.category.toLowerCase().includes(query.toLowerCase())
);
```

**With:**
```typescript
import { useMemo } from 'react';

const filteredCommands = useMemo(() => {
  const lowerQuery = query.toLowerCase();
  return commands.filter(cmd =>
    cmd.label.toLowerCase().includes(lowerQuery) ||
    cmd.category.toLowerCase().includes(lowerQuery)
  );
}, [query]);
```

---

### 7. Add Focus Trap to Modal (10 minutes)

**File:** `components/CommandPalette.tsx`

**Add this hook:**
```typescript
import { useRef, useEffect } from 'react';

export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleFocusTrap);
    return () => window.removeEventListener('keydown', handleFocusTrap);
  }, [isOpen]);

  return (
    <div 
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="command-palette-title"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        // ...
      />
    </div>
  );
};
```

---

### 8. Add Caching to MDX (5 minutes)

**File:** `lib/mdx.ts`

**Add at the top:**
```typescript
import { unstable_cache } from 'next/cache';
```

**Wrap functions:**
```typescript
export const getBlogPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    const blogDir = path.join(contentDirectory, 'blog');
    
    if (!fs.existsSync(blogDir)) {
      return [];
    }

    // ... existing code
    
    return posts;
  },
  ['blog-posts'],
  {
    revalidate: 3600, // 1 hour
    tags: ['blog'],
  }
);

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    // ... existing code
  },
  ['projects'],
  {
    revalidate: 3600,
    tags: ['projects'],
  }
);
```

---

## 🟢 NICE TO HAVE FIXES

### 9. Add Syntax Highlighting (15 minutes)

**Install:**
```bash
npm install react-syntax-highlighter
npm install -D @types/react-syntax-highlighter
```

**File:** `components/MDXComponents.tsx`

**Add:**
```typescript
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const MDXComponents = {
  // ... existing components
  
  code: ({ children, className }: { children: ReactNode; className?: string }) => {
    const match = /language-(\w+)/.exec(className || '');
    const isInline = !match;
    
    if (isInline) {
      return (
        <code className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-[0.9em] font-mono border border-primary/20">
          {children}
        </code>
      );
    }
    
    return (
      <SyntaxHighlighter
        language={match[1]}
        style={vscDarkPlus}
        customStyle={{
          borderRadius: '1rem',
          padding: '2rem',
          margin: '2rem 0',
          fontSize: '0.9rem',
        }}
        showLineNumbers
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  },
};
```

---

### 10. Centralize Configuration (10 minutes)

**Create:** `lib/config.ts`

```typescript
export const SITE_CONFIG = {
  name: 'Muhammad Fauza',
  title: 'Fullstack & AI Engineer',
  description: 'Building the future with code & AI',
  url: 'https://muhammadfauza.com',
  email: 'hello@muhammadfauza.com',
  
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
  
  techStack: [
    { name: 'Next.js', color: 'from-white to-gray-400' },
    { name: 'React', color: 'from-cyan-400 to-blue-500' },
    { name: 'TypeScript', color: 'from-blue-400 to-blue-600' },
    { name: 'Python', color: 'from-yellow-400 to-blue-500' },
    { name: 'FastAPI', color: 'from-teal-400 to-cyan-500' },
    { name: 'LangChain', color: 'from-green-400 to-emerald-500' },
    { name: 'TensorFlow', color: 'from-orange-400 to-orange-600' },
    { name: 'PostgreSQL', color: 'from-blue-400 to-indigo-500' },
  ],
} as const;
```

**Update files to use config:**
```typescript
import { SITE_CONFIG } from '@/lib/config';

// In BentoGrid.tsx
const techStack = SITE_CONFIG.techStack;

// In page.tsx
<a href={SITE_CONFIG.social.github}>
```

---

### 11. Add Copy Button to Code Blocks (15 minutes)

**Create:** `components/CodeBlock.tsx`

```typescript
'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  children: string;
  language: string;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 glass rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <Check size={16} className="text-success" />
        ) : (
          <Copy size={16} className="text-foreground/70" />
        )}
      </button>
      
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          borderRadius: '1rem',
          padding: '2rem',
          margin: 0,
        }}
        showLineNumbers
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
```

**Update MDXComponents.tsx:**
```typescript
import { CodeBlock } from './CodeBlock';

code: ({ children, className }) => {
  const match = /language-(\w+)/.exec(className || '');
  
  if (match) {
    return (
      <CodeBlock language={match[1]}>
        {String(children).replace(/\n$/, '')}
      </CodeBlock>
    );
  }
  
  // Inline code
  return <code className="...">{children}</code>;
},
```

---

## 📋 Implementation Checklist

### Critical (Do Today!)
- [ ] Add error.tsx to all dynamic routes
- [ ] Add loading.tsx to all dynamic routes
- [ ] Optimize Aurora Background performance

### Medium Priority (This Week)
- [ ] Add ARIA labels to all interactive elements
- [ ] Add skip to content link
- [ ] Add useMemo for expensive computations
- [ ] Add focus trap to modals
- [ ] Add caching to MDX functions

### Nice to Have (When You Have Time)
- [ ] Add syntax highlighting
- [ ] Centralize configuration
- [ ] Add copy button to code blocks
- [ ] Add structured data (JSON-LD)
- [ ] Add CSP headers

---

## 🎯 Quick Win Priority

If you only have 1 hour, do these in order:

1. **15 min:** Add error.tsx and loading.tsx
2. **10 min:** Optimize Aurora Background
3. **5 min:** Add ARIA labels
4. **5 min:** Add skip to content link
5. **5 min:** Add caching to MDX
6. **10 min:** Add useMemo optimizations
7. **10 min:** Test everything

Total: 60 minutes for significant improvements!

---

## 🚀 After Implementation

Run these checks:
```bash
# Build check
npm run build

# Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Accessibility check
npx @axe-core/cli http://localhost:3000
```

Expected improvements:
- Performance: +10-15 points
- Accessibility: +15-20 points
- Best Practices: +5-10 points
- SEO: +5 points

---

**Remember:** Setiap fix kecil berkontribusi pada kualitas keseluruhan. Mulai dari yang critical, lalu lanjut ke medium dan nice to have!


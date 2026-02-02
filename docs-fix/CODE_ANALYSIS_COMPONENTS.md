# 📊 Analisis Komponen - Lanjutan

## 7. `components/BentoGrid.tsx` - Hero Grid

**Status:** ✅ **BAIK**

### Kode yang Dianalisis:

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};
```

**✅ Best Practices yang Diikuti:**
1. Staggered animations untuk visual hierarchy ✅
2. Responsive grid dengan Tailwind ✅
3. Motion variants untuk reusability ✅
4. Proper image optimization dengan Next/Image ✅

**⚠️ Saran Perbaikan:**

```typescript
// ⚠️ ISSUE 1: Hardcoded tech stack
const techStack = [
  { name: 'Next.js', color: 'from-white to-gray-400' },
  // ...
];

// ✅ SOLUSI: Pindahkan ke config atau CMS
// lib/config.ts
export const TECH_STACK = [
  { name: 'Next.js', color: 'from-white to-gray-400' },
  // ...
] as const;

// ⚠️ ISSUE 2: Marquee animation tidak pause on hover
.animate-marquee {
  animation: marquee 20s linear infinite;
}

// ✅ SOLUSI:
.animate-marquee:hover {
  animation-play-state: paused;
}
```

**⚠️ Accessibility Issues:**

```typescript
// ❌ MISSING: Alt text untuk decorative elements
<div className="absolute inset-0 bg-linear-to-br from-primary/20" />

// ✅ SOLUSI: Tambahkan aria-hidden
<div 
  className="absolute inset-0 bg-linear-to-br from-primary/20" 
  aria-hidden="true"
/>

// ❌ MISSING: Semantic HTML
<div className="inline-flex items-center gap-2">
  <span className="w-2 h-2 rounded-full bg-success pulse-status" />
  Available for opportunities
</div>

// ✅ SOLUSI: Gunakan semantic HTML
<p className="inline-flex items-center gap-2">
  <span 
    className="w-2 h-2 rounded-full bg-success pulse-status" 
    role="status"
    aria-label="Available"
  />
  Available for opportunities
</p>
```

**Skor:** 8/10

---

## 8. `components/CommandPalette.tsx` - Search Command

**Status:** ✅ **SANGAT BAIK**

### Analisis Kode:

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      router.push(filteredCommands[selectedIndex].path);
      onClose();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isOpen, onClose, filteredCommands, selectedIndex, router]);
```

**✅ Best Practices yang Diikuti:**
1. Keyboard navigation yang lengkap ✅
2. Proper focus management ✅
3. Escape key untuk close ✅
4. Arrow keys untuk navigation ✅

**⚠️ Saran Perbaikan:**

```typescript
// ⚠️ ISSUE: Tidak ada focus trap

// ✅ SOLUSI: Tambahkan focus trap
import { useEffect, useRef } from 'react';

export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
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
      }
    };

    window.addEventListener('keydown', handleFocusTrap);
    return () => window.removeEventListener('keydown', handleFocusTrap);
  }, [isOpen]);

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="command-palette-title">
      {/* ... */}
    </div>
  );
};
```

**⚠️ Performance Issue:**

```typescript
// ⚠️ ISSUE: Filter berjalan di setiap render

// SEBELUM
const filteredCommands = commands.filter(cmd =>
  cmd.label.toLowerCase().includes(query.toLowerCase()) ||
  cmd.category.toLowerCase().includes(query.toLowerCase())
);

// SETELAH - Dengan useMemo
const filteredCommands = useMemo(() => {
  const lowerQuery = query.toLowerCase();
  return commands.filter(cmd =>
    cmd.label.toLowerCase().includes(lowerQuery) ||
    cmd.category.toLowerCase().includes(lowerQuery)
  );
}, [query]);
```

**Skor:** 8.5/10

---

## 9. `components/ProjectGallery.tsx` - Project Showcase

**Status:** ✅ **BAIK**

### Analisis Kode:

```typescript
const { scrollXProgress } = useScroll({
  container: containerRef,
});

// ...

<motion.div
  className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
  style={{ scaleX: scrollXProgress, transformOrigin: 'left' }}
/>
```

**✅ Best Practices yang Diikuti:**
1. Scroll progress indicator ✅
2. Horizontal scroll dengan snap ✅
3. Smooth animations ✅
4. Responsive design ✅

**⚠️ Saran Perbaikan:**

```typescript
// ⚠️ ISSUE 1: Horizontal scroll tidak accessible di keyboard

// ✅ SOLUSI: Tambahkan keyboard navigation
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      container.scrollBy({ left: -400, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      container.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  container.addEventListener('keydown', handleKeyDown);
  return () => container.removeEventListener('keydown', handleKeyDown);
}, []);

// ⚠️ ISSUE 2: Tidak ada visual indicator untuk scroll

// ✅ SOLUSI: Tambahkan scroll buttons
<div className="flex items-center gap-4 mb-4">
  <button
    onClick={() => containerRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
    aria-label="Scroll left"
    className="p-2 glass rounded-lg"
  >
    <ChevronLeft />
  </button>
  <button
    onClick={() => containerRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
    aria-label="Scroll right"
    className="p-2 glass rounded-lg"
  >
    <ChevronRight />
  </button>
</div>
```

**⚠️ Performance Issue:**

```typescript
// ⚠️ ISSUE: useScroll bisa berat di mobile

// ✅ SOLUSI: Throttle scroll events
import { useScroll, useTransform } from 'framer-motion';
import { useThrottle } from '@/hooks/useThrottle';

const { scrollXProgress } = useScroll({
  container: containerRef,
});

const throttledProgress = useThrottle(scrollXProgress, 16); // 60fps
```

**Skor:** 7.5/10

---

## 10. `components/MDXComponents.tsx` - MDX Styling

**Status:** ✅ **SANGAT BAIK**

### Analisis Kode:

```typescript
export const MDXComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 mt-12 first:mt-0 leading-[1.2] tracking-tight">
      <span className="bg-linear-to-r from-foreground to-foreground/80 bg-clip-text">
        {children}
      </span>
    </h1>
  ),
  // ...
};
```

**✅ Best Practices yang Diikuti:**
1. Consistent typography ✅
2. Responsive text sizes ✅
3. Proper spacing ✅
4. Custom styling untuk code blocks ✅

**⚠️ Saran Perbaikan:**

```typescript
// ⚠️ ISSUE 1: Tidak ada syntax highlighting untuk code

// ✅ SOLUSI: Tambahkan syntax highlighting
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

pre: ({ children, className }: { children: ReactNode; className?: string }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  
  return match ? (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        borderRadius: '1rem',
        padding: '2rem',
      }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <pre className="bg-black/60 rounded-xl p-6 sm:p-8 overflow-x-auto mb-8">
      {children}
    </pre>
  );
},

// ⚠️ ISSUE 2: Link tidak menunjukkan external indicator

// ✅ SOLUSI:
a: ({ href, children }: { href?: string; children: ReactNode }) => {
  const isExternal = href?.startsWith('http');
  
  return (
    <a
      href={href}
      className="text-primary hover:text-primary/80 underline"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
      {isExternal && (
        <ExternalLink 
          size={14} 
          className="inline ml-1" 
          aria-label="(opens in new tab)"
        />
      )}
    </a>
  );
},
```

**Skor:** 8.5/10

---


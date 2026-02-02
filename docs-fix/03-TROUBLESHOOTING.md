# 🐛 Troubleshooting Guide

Panduan lengkap untuk mengatasi masalah umum saat development.

---

## 🔍 How to Debug

### Step 1: Read the Error Message
```
Error: Hydration failed because the initial UI does not match...
```
- Baca pesan error dengan teliti
- Cari kata kunci (Hydration, Build, Type, etc)
- Lihat stack trace untuk lokasi error

### Step 2: Check Console
```typescript
console.log('Current state:', state)
console.log('Props received:', props)
console.log('Data fetched:', data)
```
- Tambahkan console.log di berbagai tempat
- Track data flow
- Identify where things go wrong

### Step 3: Isolate the Problem
- Comment out code sections
- Test one component at a time
- Narrow down the issue

### Step 4: Search Documentation
- Check Next.js docs
- Check library docs (Framer Motion, etc)
- Search error message on Google

---

## ❌ Common Errors & Solutions

### Error 1: Hydration Mismatch

**Error Message:**
```
Error: Hydration failed because the initial UI does not match 
what was rendered on the server.
```

**Cause:**
Server-rendered HTML ≠ Client-rendered HTML

**Common Causes:**

**1. Random Values:**
```typescript
// ❌ Bad: Different on server and client
const random = Math.random()
const id = Date.now()

// ✅ Good: Pre-calculated or client-only
const positions = [
  { top: '10%', left: '20%' },
  { top: '30%', left: '40%' },
]
```

**2. Browser APIs:**
```typescript
// ❌ Bad: window not available on server
const width = window.innerWidth

// ✅ Good: Check if window exists
const width = typeof window !== 'undefined' ? window.innerWidth : 0

// ✅ Better: Use useEffect
useEffect(() => {
  const width = window.innerWidth
}, [])
```

**3. Conditional Rendering:**
```typescript
// ❌ Bad: Different on server/client
{isClient && <Component />}

// ✅ Good: Use 'use client' and useEffect
'use client'
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return null
```

**Solution:**
- Use pre-calculated values
- Move client-only code to useEffect
- Use 'use client' directive when needed

---

### Error 2: "use client" Missing

**Error Message:**
```
Error: useState only works in Client Components
```

**Cause:**
Using client-only features in Server Component

**Solution:**
Add `'use client'` at the top of file:

```typescript
'use client'  // Must be first line

import { useState } from 'react'

export function MyComponent() {
  const [state, setState] = useState(0)
  // Now works!
}
```

**When to use 'use client':**
- ✅ useState, useEffect, useContext
- ✅ Event handlers (onClick, onChange)
- ✅ Browser APIs (window, document)
- ✅ Third-party libraries that use hooks

**When NOT to use:**
- ❌ Just rendering static content
- ❌ Fetching data (use async Server Component)
- ❌ No interactivity needed

---

### Error 3: Async Params (Next.js 15)

**Error Message:**
```
Type 'Promise<{ slug: string }>' is not assignable to type '{ slug: string }'
```

**Cause:**
Next.js 15 changed params to Promise

**Solution:**

```typescript
// ❌ Bad (Next.js 14 style)
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params  // Error!
}

// ✅ Good (Next.js 15 style)
export default async function Page({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params  // Works!
}
```

**Remember:**
- Page components must be async
- Await params before using
- Same for searchParams

---

### Error 4: Module Not Found

**Error Message:**
```
Module not found: Can't resolve '@/components/MyComponent'
```

**Causes & Solutions:**

**1. Wrong Import Path:**
```typescript
// ❌ Bad
import { MyComponent } from '@/component/MyComponent'  // Typo!

// ✅ Good
import { MyComponent } from '@/components/MyComponent'
```

**2. File Doesn't Exist:**
- Check file actually exists
- Check spelling (case-sensitive!)
- Check file extension (.tsx vs .ts)

**3. Missing Export:**
```typescript
// ❌ Bad: No export
function MyComponent() { }

// ✅ Good: Export
export function MyComponent() { }
```

**4. Circular Dependencies:**
```typescript
// A.tsx imports B.tsx
// B.tsx imports A.tsx
// = Circular dependency!

// Solution: Extract shared code to separate file
```

---

### Error 5: Build Errors

**Error Message:**
```
Error: Build failed
Type error: Property 'title' does not exist on type 'never'
```

**Cause:**
TypeScript type errors

**Solutions:**

**1. Add Type Annotations:**
```typescript
// ❌ Bad: No types
const project = await getProject(slug)
project.title  // Error: might be null

// ✅ Good: Check for null
const project = await getProject(slug)
if (!project) return notFound()
project.title  // Now safe
```

**2. Define Interfaces:**
```typescript
interface Project {
  title: string
  description: string
  tech: string[]
}

const project: Project = { ... }
```

**3. Use Type Guards:**
```typescript
if (typeof value === 'string') {
  // TypeScript knows value is string here
}
```

---

### Error 6: Tailwind Classes Not Working

**Problem:**
Classes not applying styles

**Causes & Solutions:**

**1. Typo in Class Name:**
```typescript
// ❌ Bad
className="bg-primry"  // Typo!

// ✅ Good
className="bg-primary"
```

**2. Custom Class Not Defined:**
```typescript
// ❌ Bad: Using undefined class
className="glass"

// ✅ Good: Define in globals.css
@layer utilities {
  .glass {
    @apply bg-white/5 backdrop-blur-md;
  }
}
```

**3. Conflicting Classes:**
```typescript
// ❌ Bad: Conflicting classes
className="text-sm text-lg"  // Which one?

// ✅ Good: One size
className="text-lg"
```

**4. Purge Issue:**
- Restart dev server
- Clear .next folder: `rm -rf .next`
- Rebuild: `npm run build`

---

### Error 7: Images Not Loading

**Problem:**
Images show broken icon

**Causes & Solutions:**

**1. Wrong Path:**
```typescript
// ❌ Bad: Wrong path
<Image src="me.jpg" />  // Missing /

// ✅ Good: Correct path
<Image src="/me.jpg" />  // In public folder
```

**2. Missing Dimensions:**
```typescript
// ❌ Bad: No dimensions
<Image src="/me.jpg" />

// ✅ Good: Specify dimensions
<Image src="/me.jpg" width={200} height={200} />

// ✅ Or use fill
<div className="relative w-48 h-48">
  <Image src="/me.jpg" fill />
</div>
```

**3. File Not in Public:**
- Images must be in `public/` folder
- Access as `/filename.jpg` (not `/public/filename.jpg`)

---

### Error 8: Framer Motion Not Animating

**Problem:**
Animations not working

**Causes & Solutions:**

**1. Missing 'use client':**
```typescript
// ❌ Bad: Server Component
import { motion } from 'framer-motion'

// ✅ Good: Client Component
'use client'
import { motion } from 'framer-motion'
```

**2. Wrong Syntax:**
```typescript
// ❌ Bad: Wrong prop names
<motion.div animate={{ x: 100 }} />

// ✅ Good: Correct syntax
<motion.div
  initial={{ x: 0 }}
  animate={{ x: 100 }}
  transition={{ duration: 1 }}
/>
```

**3. No Initial State:**
```typescript
// ❌ Bad: No initial
<motion.div animate={{ opacity: 1 }} />

// ✅ Good: With initial
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
/>
```

---

### Error 9: MDX Not Rendering

**Problem:**
MDX content shows as plain text

**Causes & Solutions:**

**1. Wrong Import:**
```typescript
// ❌ Bad: Wrong package
import { MDXRemote } from 'next-mdx-remote'

// ✅ Good: RSC version
import { MDXRemote } from 'next-mdx-remote/rsc'
```

**2. Missing Components:**
```typescript
// ❌ Bad: No components
<MDXRemote source={content} />

// ✅ Good: With components
<MDXRemote 
  source={content} 
  components={MDXComponents} 
/>
```

**3. Syntax Errors in MDX:**
```markdown
<!-- ❌ Bad: Invalid syntax -->
1. Item one
2. Item two

<!-- ✅ Good: Use bullets -->
- Item one
- Item two
```

---

## 🔧 Debugging Tools

### 1. React DevTools
- Install browser extension
- Inspect component tree
- Check props and state
- Profile performance

### 2. Next.js DevTools
- Built into dev server
- Shows routes
- Shows build info
- Shows errors

### 3. Console Methods
```typescript
console.log('Simple log')
console.error('Error message')
console.warn('Warning')
console.table(arrayOfObjects)  // Nice table view
console.time('operation')
// ... code ...
console.timeEnd('operation')  // Shows duration
```

### 4. Debugger Statement
```typescript
function myFunction() {
  debugger  // Pauses execution here
  // Inspect variables in browser DevTools
}
```

### 5. TypeScript Errors
```bash
# Check types without building
npx tsc --noEmit
```

---

## 🚨 Performance Issues

### Problem: Slow Page Load

**Solutions:**

**1. Optimize Images:**
```typescript
// Use Next.js Image
<Image src="/large.jpg" width={800} height={600} />
// Automatic optimization, lazy loading
```

**2. Code Splitting:**
```typescript
// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
})
```

**3. Reduce Bundle Size:**
```bash
# Analyze bundle
npm run build
# Check .next/analyze/
```

**4. Use Server Components:**
```typescript
// Fetch data on server (no client JS)
async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

---

## 📝 Best Practices to Avoid Issues

### 1. Type Everything
```typescript
// Always use TypeScript types
interface Props {
  title: string
  count: number
}

function Component({ title, count }: Props) { }
```

### 2. Handle Errors
```typescript
// Always handle potential errors
try {
  const data = await fetchData()
} catch (error) {
  console.error('Failed to fetch:', error)
  return <ErrorMessage />
}
```

### 3. Check for Null
```typescript
// Always check before using
if (!data) return <Loading />
return <div>{data.title}</div>
```

### 4. Use ESLint
```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### 5. Test Often
- Test after every change
- Don't write too much before testing
- Use browser DevTools

---

## 🆘 Still Stuck?

### 1. Check Documentation
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Framer Motion: https://www.framer.com/motion/

### 2. Search Error Message
- Google the exact error
- Check Stack Overflow
- Check GitHub issues

### 3. Simplify
- Remove code until it works
- Add back piece by piece
- Find what breaks it

### 4. Start Fresh
- Delete .next folder
- Delete node_modules
- Reinstall: `npm install`
- Rebuild: `npm run build`

---

**Remember:** Every error is a learning opportunity! 🚀

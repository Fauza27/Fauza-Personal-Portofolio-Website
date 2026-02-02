# 📖 Penjelasan Kode - Components

Penjelasan detail line-by-line untuk semua components.

---

## File 1: `components/FloatingDock.tsx`

### Purpose
Navigation dock yang fixed di bottom screen dengan icons dan labels.

### Dependencies
```typescript
'use client'  // Client Component
import { motion } from 'framer-motion'  // Animations
import { Home, FolderKanban, FileText, User, Mail, Search } from 'lucide-react'  // Icons
import { usePathname, useRouter } from 'next/navigation'  // Next.js routing
```

### Code Explanation

```typescript
// Line 1: Client Component
'use client'
// Butuh client karena pakai useState, useRouter, onClick

// Line 3-5: Imports
import { motion } from 'framer-motion'
// Framer Motion untuk smooth animations

import { Home, FolderKanban, ... } from 'lucide-react'
// Icon library - lightweight, customizable

import { usePathname, useRouter } from 'next/navigation'
// usePathname = get current path (/projects, /blog, etc)
// useRouter = navigate programmatically

// Line 7-13: DockItem Props Interface
interface DockItemProps {
  icon: React.ReactNode  // Icon component
  label: string  // Text label ("Home", "Projects")
  path: string  // Route path ("/", "/projects")
  isActive: boolean  // Is this the current page?
  onClick: () => void  // Click handler function
}

// Line 15-40: DockItem Component
const DockItem = ({ icon, label, isActive, onClick }: DockItemProps) => {
  return (
    <motion.button
      onClick={onClick}  // Navigate when clicked
      className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl"
      // relative = positioning context for active indicator
      // flex flex-col = vertical layout (icon on top, text below)
      // items-center = center horizontally
      // gap-1 = 4px space between icon and text
      
      whileHover={{ scale: 1.1, y: -8 }}
      // On hover: scale up 10%, move up 8px
      // Creates "lift" effect
      
      whileTap={{ scale: 0.95 }}
      // On click: scale down to 95%
      // Gives tactile feedback
      
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      // Spring physics for natural movement
      // stiffness = how bouncy
      // damping = how much resistance
    >
      <div className={isActive ? 'text-primary' : 'text-foreground/70'}>
        {/* Conditional styling based on active state */}
        {/* Active = primary color, Inactive = muted */}
        {icon}
      </div>
      
      <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-foreground/60'}`}>
        {/* Text label below icon */}
        {/* text-xs = 12px font size */}
        {/* Same color logic as icon */}
        {label}
      </span>
      
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
          // Active indicator dot
          // absolute = positioned relative to button
          // -bottom-1 = 4px below button
          // left-1/2 -translate-x-1/2 = center horizontally
          // w-1 h-1 = 4px x 4px dot
          
          layoutId="activeIndicator"
          // Shared layout animation
          // Smoothly animates between active items
          
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          // Fast, snappy animation
        />
      )}
    </motion.button>
  )
}

// Line 42-46: FloatingDock Props
interface FloatingDockProps {
  onOpenSearch: () => void  // Function to open command palette
}

// Line 48-100: FloatingDock Component
export const FloatingDock = ({ onOpenSearch }: FloatingDockProps) => {
  const pathname = usePathname()
  // Get current path: "/", "/projects", "/blog", etc
  // Used to determine which item is active
  
  const router = useRouter()
  // Router instance for navigation
  // router.push('/path') to navigate
  
  // Line 54-59: Navigation Items Data
  const navItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    { icon: <FolderKanban size={20} />, label: 'Projects', path: '/projects' },
    { icon: <FileText size={20} />, label: 'Blog', path: '/blog' },
    { icon: <User size={20} />, label: 'About', path: '/about' },
    { icon: <Mail size={20} />, label: 'Contact', path: '/contact' },
  ]
  // Array of navigation items
  // Each has icon, label, and path
  
  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      // fixed = stays in place when scrolling
      // bottom-6 = 24px from bottom
      // left-1/2 -translate-x-1/2 = center horizontally
      // z-50 = above most content
      
      initial={{ y: 100, opacity: 0 }}
      // Start position: 100px below, invisible
      
      animate={{ y: 0, opacity: 1 }}
      // End position: normal position, visible
      
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      // Animate in after 0.5s delay
      // Smooth spring animation
    >
      <div className="flex items-center gap-1 px-3 py-2 glass-strong rounded-2xl shadow-2xl border border-white/10">
        {/* Container for dock items */}
        {/* flex items-center = horizontal layout, vertically centered */}
        {/* gap-1 = 4px between items */}
        {/* glass-strong = glass morphism effect (defined in globals.css) */}
        {/* shadow-2xl = large shadow for depth */}
        
        {navItems.map((item) => (
          <DockItem
            key={item.path}  // Unique key for React
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={pathname === item.path}
            // Check if current path matches item path
            // If yes, isActive = true
            
            onClick={() => router.push(item.path)}
            // Navigate to item path when clicked
          />
        ))}
        
        <div className="w-px h-10 bg-white/10 mx-1" />
        {/* Vertical separator line */}
        {/* w-px = 1px wide */}
        {/* h-10 = 40px tall */}
        {/* bg-white/10 = 10% white */}
        {/* mx-1 = 4px margin left and right */}
        
        <motion.button
          onClick={onOpenSearch}
          // Call parent function to open command palette
          
          className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-foreground/70 hover:text-foreground"
          whileHover={{ scale: 1.1, y: -8 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search size={20} />
          <span className="text-xs font-medium">Search</span>
        </motion.button>
      </div>
      
      <div className="hidden sm:block text-center mt-2">
        {/* Keyboard shortcut hint */}
        {/* hidden sm:block = hidden on mobile, visible on desktop */}
        <span className="text-[10px] text-muted-foreground/50">
          Press ⌘K to search
        </span>
      </div>
    </motion.nav>
  )
}
```

### Key Concepts

**1. Shared Layout Animation:**
```typescript
layoutId="activeIndicator"
```
- Framer Motion tracks elements with same layoutId
- Smoothly animates between positions
- Creates "magic move" effect

**2. Conditional Rendering:**
```typescript
{isActive && <div>Active Indicator</div>}
```
- Only render if isActive is true
- Short-circuit evaluation

**3. Event Handlers:**
```typescript
onClick={() => router.push(item.path)}
```
- Arrow function to pass arguments
- Prevents immediate execution

**4. Centering Technique:**
```typescript
left-1/2 -translate-x-1/2
```
- left-1/2 = move to 50% from left
- -translate-x-1/2 = move back by 50% of own width
- Result: perfectly centered

### Testing
1. Click each nav item → should navigate
2. Check active indicator → should move smoothly
3. Hover items → should lift up
4. Click search → should open command palette

---

## File 2: `components/BentoGrid.tsx`

### Purpose
Grid layout untuk home page dengan different sized cards dan animations.

### Code Explanation

```typescript
'use client'

import { motion } from 'framer-motion'
import { Code2, Sparkles, GraduationCap, Rocket } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Line 8-20: Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  // Initial state: invisible
  
  visible: {
    opacity: 1,
    // End state: visible
    
    transition: {
      staggerChildren: 0.1,
      // Delay between each child animation
      // Child 1: 0s, Child 2: 0.1s, Child 3: 0.2s, etc
      
      delayChildren: 0.2,
      // Wait 0.2s before starting children animations
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  // Start: invisible, 20px below, slightly smaller
  
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    // End: visible, normal position, normal size
  },
}

// Line 22-200: BentoGrid Component
export const BentoGrid = () => {
  return (
    <motion.div
      className="bento-grid max-w-6xl mx-auto px-6"
      // bento-grid = custom CSS grid (defined in globals.css)
      // max-w-6xl = max width 1152px
      // mx-auto = center horizontally
      
      variants={containerVariants}
      // Use animation variants defined above
      
      initial="hidden"
      // Start with "hidden" variant
      
      animate="visible"
      // Animate to "visible" variant
    >
      {/* Hero Card - 2x2 grid */}
      <motion.div
        className="col-span-1 sm:col-span-2 row-span-1 sm:row-span-2 glass rounded-3xl p-8"
        // col-span-2 = takes 2 columns
        // row-span-2 = takes 2 rows
        // Larger card for main content
        
        variants={itemVariants}
        // Use item animation
        
        whileHover={{ scale: 1.02 }}
        // Slight scale on hover
        
        transition={{ type: "spring", stiffness: 300 }}
        // Spring animation
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-accent/10 opacity-0 group-hover:opacity-100">
          {/* Gradient overlay on hover */}
          {/* opacity-0 = invisible by default */}
          {/* group-hover:opacity-100 = visible when parent hovered */}
        </div>
        
        <div className="relative z-10">
          {/* Content above gradient */}
          
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full text-xs"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-success pulse-status" />
            {/* Green pulsing dot */}
            Available for opportunities
          </motion.div>
          
          <h1 className="text-6xl font-bold leading-tight mb-4">
            <span className="text-gradient">Architecting</span>
            {/* Gradient text (defined in globals.css) */}
            <br />
            <span className="text-foreground">Intelligence.</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-md">
            Muhammad Fauza — Fullstack & AI Engineer building the future of intelligent systems.
          </p>
        </div>
        
        <div className="relative z-10 flex items-center gap-4 mt-6">
          <Link href="/projects">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl"
              whileHover={{ scale: 1.05, x: 5 }}
              // Scale up and move right on hover
              whileTap={{ scale: 0.98 }}
            >
              View Projects
              <ArrowUpRight size={18} />
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Photo Card - 1x2 grid */}
      <motion.div
        className="hidden sm:flex col-span-1 row-span-2 glass rounded-3xl p-6"
        // hidden sm:flex = hidden on mobile, visible on tablet+
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            className="relative w-48 h-48 rounded-2xl overflow-hidden mb-4"
            whileHover={{ scale: 1.05, rotate: 2 }}
            // Scale and slight rotation on hover
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/me.jpg"
              alt="Muhammad Fauza"
              fill
              // fill = fill parent container
              className="object-cover"
              // object-cover = crop to fit
              priority
              // priority = load immediately (above fold)
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            {/* Gradient overlay from bottom */}
          </motion.div>
          
          <div className="text-center">
            <p className="text-sm font-medium">Muhammad Fauza</p>
            <p className="text-xs text-muted-foreground">Fullstack & AI Engineer</p>
          </div>
        </div>
      </motion.div>

      {/* Small Cards - 1x1 grid each */}
      <motion.div
        className="col-span-1 row-span-1 glass rounded-3xl p-6"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Code2 size={16} className="text-primary" />
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Current Focus
          </span>
        </div>
        <div>
          <p className="text-lg font-medium">Generative AI</p>
          <p className="text-sm text-muted-foreground">LLMs & RAG Systems</p>
        </div>
      </motion.div>

      {/* More cards... */}
    </motion.div>
  )
}
```

### Key Concepts

**1. CSS Grid with Tailwind:**
```typescript
col-span-2  // Takes 2 columns
row-span-2  // Takes 2 rows
```
- Create complex layouts
- Different sized cards

**2. Staggered Animations:**
```typescript
staggerChildren: 0.1
```
- Children animate one after another
- Creates wave effect

**3. Next.js Image:**
```typescript
<Image src="/me.jpg" fill priority />
```
- Automatic optimization
- Lazy loading (except priority)
- Responsive images

**4. Group Hover:**
```typescript
group-hover:opacity-100
```
- Parent has `group` class
- Child responds to parent hover

---

## File 3: `components/AuroraBackground.tsx`

### Purpose
Animated gradient background dengan multiple moving blobs.

### Code Explanation

```typescript
'use client'

import { motion } from 'framer-motion'

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* fixed inset-0 = full screen, fixed position */}
      {/* -z-10 = behind all content */}
      {/* overflow-hidden = hide anything outside */}
      
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-background" />
      {/* Base gradient background */}
      
      {/* Purple blob */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-purple rounded-full blur-3xl opacity-20"
        // absolute = positioned absolutely
        // top-0 left-1/4 = position at top, 25% from left
        // w-96 h-96 = 384px x 384px
        // bg-aurora-purple = custom color (defined in globals.css)
        // rounded-full = perfect circle
        // blur-3xl = heavy blur (48px)
        // opacity-20 = 20% opacity
        
        animate={{
          scale: [1, 1.2, 1],
          // Scale from 100% → 120% → 100%
          opacity: [0.3, 0.5, 0.3],
          // Opacity from 30% → 50% → 30%
        }}
        transition={{
          duration: 8,
          // 8 seconds per cycle
          repeat: Infinity,
          // Loop forever
          ease: "easeInOut",
          // Smooth easing
        }}
      />
      
      {/* Cyan blob */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-aurora-cyan rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [20, -20, 20],
          // Move left and right
          y: [-10, 10, -10],
          // Move up and down
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />
      
      {/* More blobs... */}
    </div>
  )
}
```

### Key Concepts

**1. Fixed Background:**
```typescript
fixed inset-0 -z-10
```
- Stays in place when scrolling
- Behind all content

**2. Blur Effect:**
```typescript
blur-3xl
```
- Creates soft, glowing effect
- backdrop-filter: blur(48px)

**3. Infinite Animation:**
```typescript
repeat: Infinity
```
- Never stops
- Continuous movement

**4. Array Animation:**
```typescript
scale: [1, 1.2, 1]
```
- Keyframes: start → middle → end
- Smooth transitions between values

---

Lanjut ke file berikutnya untuk components lainnya! 🚀

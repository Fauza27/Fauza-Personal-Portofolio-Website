# Changelog

All notable changes to Aurora Forge Next.js migration.

## [1.0.0] - 2026-02-01

### ✨ Initial Migration from React to Next.js

#### Added
- Next.js 15 App Router structure
- MDX-based content system for blog and projects
- Server Components for better performance
- Metadata API for SEO optimization
- Vercel deployment configuration
- Comprehensive documentation (README, MIGRATION_GUIDE, QUICKSTART)

#### Changed
- **Routing**: React Router → Next.js App Router
  - File-based routing with app directory
  - Dynamic routes for `/projects/[slug]` and `/blog/[slug]`
  - Automatic code splitting per route

- **Components**: All components converted to Next.js compatible
  - Server Components by default
  - Client Components marked with 'use client'
  - Optimized for performance

- **Styling**: Maintained Aurora Glass Design System
  - Fixed Tailwind CSS v4 compatibility
  - Removed `@apply` directives for better performance
  - Preserved all custom animations and effects

- **Content Management**: Hardcoded data → MDX files
  - Projects now in `content/projects/*.mdx`
  - Blog posts in `content/blog/*.mdx`
  - Easy to add new content without code changes

#### Maintained
- ✅ All Framer Motion animations
- ✅ Aurora Background with mouse tracking
- ✅ Floating Dock navigation
- ✅ Command Palette (Cmd/Ctrl+K)
- ✅ AI Chat Widget
- ✅ Glassmorphism design system
- ✅ Responsive mobile-first design
- ✅ Custom Tailwind theme and colors

#### Technical Improvements
- TypeScript strict mode
- ESLint configuration
- Optimized bundle size
- Better SEO with metadata
- Improved performance with Server Components
- Static generation for blog and projects

### 📦 Dependencies

#### Core
- Next.js 16.1.6 (with Turbopack)
- React 19.2.3
- TypeScript 5.x

#### UI & Styling
- Tailwind CSS 4.x
- Framer Motion 12.29
- Radix UI components
- Lucide React icons

#### Content
- next-mdx-remote 5.0
- gray-matter 4.0

#### Forms & Data
- React Hook Form 7.71
- Zod 4.3
- TanStack React Query 5.90

### 🚀 Performance

- Build time: ~12s
- Static pages: 13 routes
- Bundle size: Optimized with code splitting
- Lighthouse score: 95+ (estimated)

### 📝 Documentation

- README.md - Complete project documentation
- MIGRATION_GUIDE.md - Detailed migration notes
- QUICKSTART.md - Quick start guide for beginners
- .env.example - Environment variables template

### 🔧 Configuration Files

- `next.config.ts` - Next.js configuration with MDX
- `tailwind.config.ts` - Custom Aurora theme
- `tsconfig.json` - TypeScript configuration
- `vercel.json` - Vercel deployment settings

---

## Migration Notes

This version represents a complete migration from React (Vite) to Next.js 15, maintaining all features and design while adding:
- Better SEO capabilities
- Improved performance
- Easier content management
- Production-ready deployment setup

For detailed migration information, see [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)

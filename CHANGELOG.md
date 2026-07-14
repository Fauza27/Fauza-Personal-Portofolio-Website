# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-07-14

### Fixed
- **GPA consistency** — unified GPA display to 3.80 across BentoGrid and AI persona
- **Font loading** — Plus Jakarta Sans and JetBrains Mono now properly loaded via `next/font/google` for dark mode (was falling back to system fonts)
- **AI persona function** — restored `buildSystemPrompt()` that was accidentally removed
- **CSS font variables** — body font now uses CSS custom properties instead of hardcoded font names

### Changed
- **AI Persona** — fully populated profile with detailed experience, projects, skills, career goals, and personal info (replaced all TODO placeholders)
- **CORS security** — restricted `Access-Control-Allow-Origin` from wildcard (`*`) to `fauza.pages.dev` + `localhost:3000`
- **Command Palette** — upgraded to search blog posts and projects by title and description, not just navigation
- **QueryClient config** — added sensible defaults (1min stale time, no refetch-on-focus, single retry)

### Removed
- Cleaned up `tsconfig.json` — removed stale `"my-project"` and `"docs-fix"` from exclude
- Deleted committed test results file (`ReadingProgress.test-results.md`)

### Added
- `.gitignore` rule for `*.test-results.md` to prevent future commits of test artifacts

## [1.0.0] - 2026-02-11

### Added
- Initial release of Fauza Personal Portfolio Website
- Modern glassmorphism UI with Aurora background effects
- Next.js 16 with App Router
- React 19 with Server Components
- TypeScript strict mode
- Tailwind CSS v4 with custom design system
- MDX blog system with syntax highlighting
- Project showcase with horizontal scroll gallery
- Command Palette (⌘K) for quick navigation
- Floating dock navigation
- Dark mode support
- Reading progress indicator
- Table of contents for blog posts
- Global error boundary
- SEO optimization with metadata API
- Accessibility features (ARIA labels, keyboard navigation)
- Static export configuration for Cloudflare Pages
- Comprehensive documentation

### Features
- **Homepage:** Hero section with Bento Grid layout
- **Blog:** MDX-powered blog with frontmatter validation
- **Projects:** Project showcase with detailed pages
- **About:** About page (ready for customization)
- **Contact:** Contact page (ready for customization)
- **Navigation:** Floating dock with smooth animations
- **Search:** Command palette for quick navigation
- **Animations:** Framer Motion powered smooth transitions
- **Responsive:** Mobile-first design

### Technical
- Static Site Generation (SSG) for all routes
- Optimized bundle size (~150KB per page)
- Zod validation for MDX frontmatter
- React Query for server state management
- Next Themes for theme management
- Vitest for testing (configured)
- ESLint for code quality
- TypeScript for type safety

### Documentation
- Quick deployment instructions in README
- Contributing guidelines
- Changelog
- MIT License

### Deployment
- Configured for Cloudflare Pages
- Static export enabled
- Image optimization configured
- Build tested and verified
- 16 routes generated successfully

---

## Future Releases

### Planned Features
- [x] Contact form with backend integration
- [ ] Newsletter subscription
- [ ] Blog pagination
- [x] Search functionality for blog
- [ ] RSS feed
- [x] Sitemap generation
- [ ] Analytics integration
- [ ] Error monitoring (Sentry)
- [x] Unit tests
- [ ] E2E tests
- [ ] Performance monitoring
- [ ] Content Security Policy headers

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

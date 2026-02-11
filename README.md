# 🌟 Fauza Personal Website Portfolio

A modern, high-performance portfolio website built with Next.js 16, React 19, and Tailwind CSS v4.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Features

- 🎨 **Modern Design** - Glassmorphism UI with Aurora background effects
- ⚡ **Lightning Fast** - Static generation with Next.js 16
- 📱 **Fully Responsive** - Mobile-first design
- 🌙 **Dark Mode** - Built-in theme support
- 📝 **MDX Blog** - Write blog posts in MDX
- 🎯 **SEO Optimized** - Meta tags, OpenGraph, and more
- ♿ **Accessible** - WCAG compliant with ARIA labels
- 🔍 **Command Palette** - Quick navigation with ⌘K
- 🎭 **Smooth Animations** - Framer Motion powered
- 📊 **Type Safe** - Full TypeScript support

## 🚀 Quick Start

### Prerequisites

- Node.js 18.18.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 📦 Project Structure

```
├── app/                    # Next.js app directory
│   ├── blog/              # Blog pages
│   ├── projects/          # Project pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── error.tsx          # Error boundary
├── components/            # React components
│   ├── BentoGrid.tsx     # Hero section
│   ├── FloatingDock.tsx  # Navigation
│   ├── MDXComponents.tsx # MDX styling
│   └── ...
├── content/              # MDX content
│   ├── blog/            # Blog posts
│   └── projects/        # Project details
├── lib/                 # Utilities
│   ├── mdx.ts          # MDX processing
│   ├── config.ts       # Site configuration
│   └── utils.ts        # Helper functions
└── public/             # Static assets
```

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 16.1.6
- **React:** 19.2.3
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 4

### UI & Animation
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Components:** Radix UI
- **Command Palette:** cmdk

### Content
- **MDX:** next-mdx-remote
- **Frontmatter:** gray-matter
- **Validation:** Zod

### State Management
- **Server State:** TanStack Query
- **Theme:** next-themes

## 📝 Content Management

### Adding Blog Posts

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2026-02-11"
excerpt: "Brief description"
author: "Your Name"
tags: ["tag1", "tag2"]
readTime: "5 min read"
---

Your content here...
```

### Adding Projects

Create a new `.mdx` file in `content/projects/`:

```mdx
---
title: "Project Name"
category: "AI & Full-Stack"
description: "Project description"
tech: ["Next.js", "Python", "AI"]
year: "2026"
gradient: "from-purple-500/20 to-blue-500/20"
github: "https://github.com/..."
demo: "https://demo.com"
---

Project details...
```

## 🎨 Customization

### Site Configuration

Edit `lib/config.ts`:

```typescript
export const SITE_CONFIG = {
  name: 'Your Name',
  title: 'Your Title',
  description: 'Your description',
  url: 'https://your-domain.com',
  email: 'your@email.com',
  social: {
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
  },
  // ...
};
```

### Theme Colors

Edit `app/globals.css` to customize colors:

```css
:root {
  --primary: oklch(0.5098 0.2439 299.8167);
  --accent: oklch(0.9096 0.0476 331.5105);
  /* ... */
}
```

## 🚀 Deployment

### Deploy to Cloudflare Pages

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy via Cloudflare Dashboard:**
   - Login to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Workers & Pages > Create > Pages
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Build output: `out`
   - Deploy!

## 📊 Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 📈 Performance

- **Lighthouse Score:** 90+
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Bundle Size:** ~150KB per page

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Skip to content link
- Screen reader friendly
- Color contrast compliant

## 🔒 Security

- No sensitive data in client code
- Environment variables properly configured
- XSS protection via React
- HTTPS enforced
- Content Security Policy ready

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/Fauza27/fauza-portfolio/issues)
- **Email:** muhammadfauza27@gmail.com
- **LinkedIn:** [Muhammad Fauza](https://www.linkedin.com/in/muhammad-fauza)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

---

**Built with ❤️ using Next.js and Tailwind CSS**

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MDX](https://mdxjs.com/)

---

**Last Updated:** February 11, 2026

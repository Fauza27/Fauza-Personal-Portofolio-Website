# 📊 Analisis Pages & Routes

## 11. `app/page.tsx` - Home Page

**Status:** ✅ **BAIK**

### Analisis Kode:

```typescript
export default function Home() {
  return (
    <ClientLayout>
      <main className="pt-16 sm:pt-20 pb-24 sm:pb-32">
        <section className="mb-12 sm:mb-20">
          <BentoGrid />
        </section>
        <ProjectGallery />
        <ConnectSection />
      </main>
    </ClientLayout>
  );
}
```

**✅ Best Practices yang Diikuti:**
1. Server Component by default ✅
2. Semantic HTML (main, section) ✅
3. Responsive spacing ✅
4. Component composition ✅

**⚠️ Saran Perbaikan:**

```typescript
// ⚠️ ISSUE: Tidak ada metadata khusus untuk home

// ✅ SOLUSI: Tambahkan metadata
export const metadata: Metadata = {
  title: 'Muhammad Fauza - Fullstack & AI Engineer',
  description: 'Portfolio showcasing fullstack development and AI engineering projects',
  openGraph: {
    title: 'Muhammad Fauza - Fullstack & AI Engineer',
    description: 'Building the future with code & AI',
    images: ['/og-image.jpg'], // ⚠️ MISSING
    type: 'website',
  },
  twitter: { // ⚠️ MISSING
    card: 'summary_large_image',
    title: 'Muhammad Fauza - Fullstack & AI Engineer',
    description: 'Building the future with code & AI',
    images: ['/og-image.jpg'],
  },
};

// ⚠️ ISSUE: Hardcoded social links
<a href="https://github.com" target="_blank">

// ✅ SOLUSI: Pindahkan ke config
// lib/config.ts
export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
} as const;

// app/page.tsx
import { SOCIAL_LINKS } from '@/lib/config';

<a href={SOCIAL_LINKS.github} target="_blank">
```

**Skor:** 8/10

---

## 12. `app/projects/[slug]/page.tsx` - Dynamic Project Page

**Status:** ✅ **SANGAT BAIK**

### Analisis Kode:

```typescript
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Muhammad Fauza`,
    description: project.description,
  };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <ClientLayout>
      {/* ... */}
    </ClientLayout>
  );
}
```

**✅ Best Practices yang Diikuti:**
1. Static generation dengan generateStaticParams ✅
2. Dynamic metadata ✅
3. Proper error handling dengan notFound() ✅
4. Async params (Next.js 15) ✅
5. Type-safe params ✅

**⚠️ Saran Perbaikan:**

```typescript
// ⚠️ ISSUE 1: Tidak ada error boundary

// ✅ SOLUSI: Tambahkan error.tsx
// app/projects/[slug]/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass rounded-2xl p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-xl"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

// ⚠️ ISSUE 2: Tidak ada loading state

// ✅ SOLUSI: Tambahkan loading.tsx
// app/projects/[slug]/loading.tsx
export default function Loading() {
  return (
    <ClientLayout>
      <main className="pt-20 sm:pt-24 pb-24 sm:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl p-8 animate-pulse">
            <div className="h-8 bg-white/10 rounded mb-4" />
            <div className="h-4 bg-white/10 rounded mb-2" />
            <div className="h-4 bg-white/10 rounded w-3/4" />
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}

// ⚠️ ISSUE 3: Metadata bisa lebih lengkap

// ✅ SOLUSI:
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} - Muhammad Fauza`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      publishedTime: project.year,
      tags: project.tech,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
    },
  };
}
```

**Skor:** 9/10

---

## 13. `lib/mdx.ts` - MDX Utilities

**Status:** ✅ **BAIK**

### Analisis Kode:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(contentDirectory, 'blog');
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      return {
        slug: file.replace('.mdx', ''),
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        author: data.author || 'Muhammad Fauza',
        tags: data.tags || [],
        readTime: data.readTime || '5 min read',
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
```

**✅ Best Practices yang Diikuti:**
1. Type-safe dengan TypeScript ✅
2. Error handling dengan existsSync ✅
3. Sorting by date ✅
4. Default values ✅

**⚠️ Saran Perbaikan:**

```typescript
// ⚠️ ISSUE 1: Tidak ada error handling untuk file read

// ✅ SOLUSI:
export async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(contentDirectory, 'blog');
  
  if (!fs.existsSync(blogDir)) {
    console.warn('Blog directory not found');
    return [];
  }

  try {
    const files = fs.readdirSync(blogDir);
    const posts = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        try {
          const filePath = path.join(blogDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(fileContent);
          
          return {
            slug: file.replace('.mdx', ''),
            title: data.title || '',
            date: data.date || '',
            excerpt: data.excerpt || '',
            author: data.author || 'Muhammad Fauza',
            tags: data.tags || [],
            readTime: data.readTime || '5 min read',
            content,
          };
        } catch (error) {
          console.error(`Error reading file ${file}:`, error);
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

// ⚠️ ISSUE 2: Tidak ada caching

// ✅ SOLUSI: Tambahkan caching dengan unstable_cache
import { unstable_cache } from 'next/cache';

export const getBlogPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    // ... existing code
  },
  ['blog-posts'],
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['blog'],
  }
);

// ⚠️ ISSUE 3: Tidak ada validation untuk frontmatter

// ✅ SOLUSI: Tambahkan Zod validation
import { z } from 'zod';

const blogPostSchema = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  excerpt: z.string().min(1),
  author: z.string().default('Muhammad Fauza'),
  tags: z.array(z.string()).default([]),
  readTime: z.string().default('5 min read'),
});

export async function getBlogPosts(): Promise<BlogPost[]> {
  // ...
  const { data, content } = matter(fileContent);
  
  // Validate frontmatter
  const validatedData = blogPostSchema.parse(data);
  
  return {
    slug: file.replace('.mdx', ''),
    ...validatedData,
    content,
  };
}
```

**Skor:** 7.5/10

---


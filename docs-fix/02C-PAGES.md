# 📖 Penjelasan Kode - Pages

Penjelasan detail line-by-line untuk semua pages dan dynamic routes.

---

## File 1: `app/projects/[slug]/page.tsx`

### Purpose
Dynamic route untuk menampilkan detail project dari MDX files.

### Dependencies
```typescript
import { getProject, getProjects } from '@/lib/mdx'  // MDX utilities
import { notFound } from 'next/navigation'  // 404 handler
import { MDXRemote } from 'next-mdx-remote/rsc'  // MDX renderer
import { MDXComponents } from '@/components/MDXComponents'  // Custom MDX components
```

### Code Explanation

```typescript
// Line 1-5: Imports
import { ClientLayout } from '@/components/ClientLayout'
import { getProject, getProjects } from '@/lib/mdx'
// Functions to fetch MDX content from files

import { notFound } from 'next/navigation'
// Function to show 404 page

import { Github, ExternalLink, Calendar, TrendingUp } from 'lucide-react'
// Icons for UI

import Link from 'next/link'
// Next.js Link component for client-side navigation

import { MDXRemote } from 'next-mdx-remote/rsc'
// Render MDX content as React components
// /rsc = React Server Components version

import { MDXComponents } from '@/components/MDXComponents'
// Custom styled components for MDX (h1, h2, p, etc)

// Line 7-12: Generate Static Params
export async function generateStaticParams() {
  // This function runs at BUILD TIME
  // Tells Next.js which dynamic routes to pre-generate
  
  const projects = await getProjects()
  // Fetch all projects from content/projects/*.mdx
  
  return projects.map((project) => ({
    slug: project.slug,
    // Return array of { slug: 'saas' }, { slug: 'cv' }, etc
  }))
}
// Result: Next.js will generate:
// /projects/saas
// /projects/cv
// /projects/rag
// /projects/ecommerce

// Line 14-26: Generate Metadata
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
  // Next.js 15: params is a Promise
}) {
  const { slug } = await params
  // Await the promise to get slug value
  
  const project = await getProject(slug)
  // Fetch project data
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} - Muhammad Fauza`,
    // Browser tab title
    description: project.description,
    // Meta description for SEO
  }
}
// This metadata is injected into <head> tag
// Important for SEO and social media sharing

// Line 28-150: Page Component
export default async function ProjectDetail({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Async Server Component
  // Can fetch data directly without useEffect
  
  const { slug } = await params
  // Get slug from URL: /projects/saas → slug = "saas"
  
  const project = await getProject(slug)
  // Fetch project data from content/projects/saas.mdx
  
  if (!project) {
    notFound()
    // Show 404 page if project not found
    // Calls app/not-found.tsx
  }

  return (
    <ClientLayout>
      {/* Floating Back Button */}
      <FloatingBackButton href="/projects" label="Back to Projects" />
      {/* Always visible back button */}

      <main className="pt-24 pb-32">
        {/* pt-24 = padding top 96px (space for header) */}
        {/* pb-32 = padding bottom 128px */}
        
        <div className="max-w-[1600px] mx-auto px-6">
          {/* Wide container for content + sidebar */}
          
          <div className="flex gap-8 justify-center">
            {/* flex = horizontal layout */}
            {/* gap-8 = 32px between items */}
            {/* justify-center = center items */}
            
            {/* Left Sidebar - Table of Contents */}
            <aside className="hidden xl:block shrink-0">
              {/* hidden xl:block = only show on extra large screens */}
              {/* shrink-0 = don't shrink when space is tight */}
              <TableOfContents />
            </aside>

            {/* Main Content - Centered */}
            <div className="w-full max-w-4xl">
              {/* w-full = take available width */}
              {/* max-w-4xl = max 896px (optimal reading width) */}
              
              {/* Project Header */}
              <div className="mb-12">
                <div className="glass rounded-3xl p-12 relative overflow-hidden">
                  {/* Glass morphism card */}
                  {/* relative = positioning context */}
                  {/* overflow-hidden = hide gradient overflow */}
                  
                  <div className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-20`} />
                  {/* Gradient background overlay */}
                  {/* project.gradient = from MDX frontmatter */}
                  {/* Example: "from-purple-500/20 to-blue-500/20" */}
                  
                  <div className="relative z-10">
                    {/* Content above gradient */}
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="px-3 py-1.5 glass rounded-full text-primary font-medium uppercase">
                        {project.category}
                        {/* "Web Application", "Mobile App", etc */}
                      </span>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={16} />
                        {project.year}
                        {/* "2024" */}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <TrendingUp size={16} />
                        <span>Featured Project</span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h1 className="text-5xl font-bold mb-6">
                      {project.title}
                      {/* "Enterprise SaaS Platform" */}
                    </h1>
                    
                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                      {project.description}
                      {/* Short description from frontmatter */}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1.5 glass rounded-lg text-sm font-medium border border-white/10"
                          >
                            {tech}
                            {/* "Next.js", "TypeScript", etc */}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          // target="_blank" = open in new tab
                          // rel="noopener noreferrer" = security best practice
                          className="flex items-center gap-2 px-6 py-3 glass rounded-xl hover:bg-white/10"
                        >
                          <Github size={18} />
                          View Code
                        </a>
                      )}
                      
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90"
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Content - MDX */}
              <div className="glass rounded-3xl p-12 mb-8">
                <div className="prose-custom">
                  {/* prose-custom = custom class for MDX styling */}
                  
                  <MDXRemote 
                    source={project.content} 
                    // MDX content from file
                    
                    components={MDXComponents}
                    // Custom components for h1, h2, p, etc
                    // Defined in components/MDXComponents.tsx
                  />
                  {/* MDXRemote renders MDX as React components */}
                  {/* Markdown → React → HTML */}
                </div>
              </div>

              {/* CTA */}
              <div className="glass rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Interested in This Project?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let's discuss how I can help with your next project
                </p>
                <Link href="/contact">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90">
                    Get in Touch
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Spacer for Balance */}
            <div className="hidden xl:block w-64 shrink-0" />
            {/* Empty div to balance layout */}
            {/* Makes content centered */}
          </div>
        </div>
      </main>
    </ClientLayout>
  )
}
```

### Key Concepts

**1. Dynamic Routes:**
```
app/projects/[slug]/page.tsx
→ /projects/saas
→ /projects/cv
```
- `[slug]` = dynamic segment
- Can be any value

**2. Static Site Generation:**
```typescript
export async function generateStaticParams()
```
- Pre-generate pages at build time
- Fast loading (no server request)
- Good for SEO

**3. Async Server Components:**
```typescript
export default async function Page()
```
- Can fetch data directly
- No useEffect needed
- Runs on server

**4. MDX Rendering:**
```typescript
<MDXRemote source={content} components={MDXComponents} />
```
- Converts Markdown to React
- Uses custom components
- Supports JSX in Markdown

**5. Conditional Rendering:**
```typescript
{project.github && <a href={project.github}>...</a>}
```
- Only render if github URL exists
- Short-circuit evaluation

### Testing
1. Navigate to /projects/saas
2. Check metadata in browser tab
3. Verify MDX content renders
4. Test back button
5. Check TOC sidebar (desktop)
6. Test GitHub/Demo links

---

## File 2: `lib/mdx.ts`

### Purpose
Utility functions untuk fetch dan parse MDX files.

### Code Explanation

```typescript
import fs from 'fs'
// Node.js file system module
// Read files from disk

import path from 'path'
// Node.js path module
// Handle file paths

import matter from 'gray-matter'
// Parse frontmatter from MDX files
// Separates metadata from content

// Line 7-8: Content Directory
const contentDirectory = path.join(process.cwd(), 'content')
// process.cwd() = current working directory
// path.join() = join paths safely (handles / vs \)
// Result: /path/to/project/content

// Line 10-30: Get All Projects
export async function getProjects() {
  const projectsDir = path.join(contentDirectory, 'projects')
  // /path/to/project/content/projects
  
  const files = fs.readdirSync(projectsDir)
  // Read all files in directory
  // Returns: ['saas.mdx', 'cv.mdx', 'rag.mdx', ...]
  
  const projects = files
    .filter(filename => filename.endsWith('.mdx'))
    // Only process .mdx files
    // Ignore other files
    
    .map(filename => {
      const filePath = path.join(projectsDir, filename)
      // Full path: /path/to/project/content/projects/saas.mdx
      
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      // Read file content as string
      
      const { data, content } = matter(fileContent)
      // Parse frontmatter
      // data = { title: "...", description: "...", ... }
      // content = markdown content after ---
      
      return {
        slug: filename.replace('.mdx', ''),
        // saas.mdx → saas
        ...data,
        // Spread frontmatter data
        content,
        // Markdown content
      }
    })
  
  return projects
}

// Line 32-45: Get Single Project
export async function getProject(slug: string) {
  try {
    const filePath = path.join(contentDirectory, 'projects', `${slug}.mdx`)
    // /path/to/project/content/projects/saas.mdx
    
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    return {
      slug,
      ...data,
      content,
    }
  } catch (error) {
    // File not found or read error
    return null
    // Return null if project doesn't exist
  }
}

// Similar functions for blog posts...
export async function getBlogPosts() { ... }
export async function getBlogPost(slug: string) { ... }
```

### Key Concepts

**1. File System Operations:**
```typescript
fs.readdirSync(dir)  // Read directory
fs.readFileSync(file, 'utf-8')  // Read file
```
- Synchronous operations
- Blocks until complete
- OK for build time

**2. Gray Matter:**
```typescript
const { data, content } = matter(fileContent)
```
- Parses frontmatter (YAML between ---)
- Separates metadata from content

**3. Error Handling:**
```typescript
try { ... } catch (error) { return null }
```
- Gracefully handle missing files
- Return null instead of crashing

**4. Array Methods:**
```typescript
files.filter(...).map(...)
```
- filter = keep only .mdx files
- map = transform each file to object

### MDX File Structure

```markdown
---
title: "Project Title"
description: "Description"
tech: ["Next.js", "TypeScript"]
year: "2024"
---

## Content

Markdown content here...
```

- Everything between `---` = frontmatter (metadata)
- Everything after = content (markdown)

---

Lanjut ke troubleshooting guide! 🚀

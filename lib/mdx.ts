import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unstable_cache } from 'next/cache';
import { z } from 'zod';

const contentDirectory = path.join(process.cwd(), 'content');

// Validation schemas
const blogPostFrontmatterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  author: z.string().default('Muhammad Fauza'),
  tags: z.array(z.string()).default([]),
  readTime: z.string().default('5 min read'),
  category: z.string().optional(),
  featured: z.boolean().optional(),
});

const projectFrontmatterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  tech: z.array(z.string()).min(1, 'At least one tech is required'),
  year: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
  gradient: z.string().default('from-purple-500/20 to-blue-500/20'),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
});

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  readTime: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  gradient: string;
  content: string;
  github?: string;
  demo?: string;
}

export const getBlogPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    const blogDir = path.join(contentDirectory, 'blog');
    
    if (!fs.existsSync(blogDir)) {
      return [];
    }

    const files = fs.readdirSync(blogDir);
    const posts = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        try {
          const filePath = path.join(blogDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(fileContent);
          
          // Validate frontmatter
          const validatedData = blogPostFrontmatterSchema.parse(data);
          
          return {
            slug: file.replace('.mdx', ''),
            ...validatedData,
            content,
          };
        } catch (error) {
          console.error(`Error processing blog post ${file}:`, error);
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  },
  ['blog-posts'],
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['blog'],
  }
);

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const blogDir = path.join(contentDirectory, 'blog');
  const filePath = path.join(blogDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Validate frontmatter
    const validatedData = blogPostFrontmatterSchema.parse(data);

    return {
      slug,
      ...validatedData,
      content,
    };
  } catch (error) {
    console.error(`Error processing blog post ${slug}:`, error);
    return null;
  }
}

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const projectsDir = path.join(contentDirectory, 'projects');
    
    if (!fs.existsSync(projectsDir)) {
      return [];
    }

    const files = fs.readdirSync(projectsDir);
    const projects = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        try {
          const filePath = path.join(projectsDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(fileContent);
          
          // Validate frontmatter
          const validatedData = projectFrontmatterSchema.parse(data);
          
          return {
            slug: file.replace('.mdx', ''),
            ...validatedData,
            content,
          };
        } catch (error) {
          console.error(`Error processing project ${file}:`, error);
          return null;
        }
      })
      .filter((project): project is Project => project !== null);

    return projects;
  },
  ['projects'],
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['projects'],
  }
);

export async function getProject(slug: string): Promise<Project | null> {
  const projectsDir = path.join(contentDirectory, 'projects');
  const filePath = path.join(projectsDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Validate frontmatter
    const validatedData = projectFrontmatterSchema.parse(data);

    return {
      slug,
      ...validatedData,
      content,
    };
  } catch (error) {
    console.error(`Error processing project ${slug}:`, error);
    return null;
  }
}

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ComponentProps, ReactNode } from 'react';
import type { BlogSummary } from '@/lib/mdx';
import { BlogNavigation } from './BlogNavigation';

vi.mock('framer-motion', () => ({
  motion: {
    li: ({ children }: { children: ReactNode }) => <li>{children}</li>,
    div: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  },
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: ComponentProps<'a'>) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const posts: BlogSummary[] = Array.from({ length: 7 }, (_, index) => ({
  slug: `post-${index}`,
  title: `Post ${index}`,
  date: '2026-01-01',
  excerpt: 'An article',
  author: 'Muhammad Fauza',
  tags: ['AI'],
  readTime: '5 min read',
}));

describe('BlogNavigation', () => {
  it('links to other articles while excluding the current article', () => {
    render(<BlogNavigation currentSlug="post-0" posts={posts} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
    expect(links[0]).toHaveAttribute('href', '/blog/post-1');
    expect(screen.queryByRole('link', { name: 'Navigate to Post 0' })).not.toBeInTheDocument();
  });

  it('provides a named navigation landmark', () => {
    render(<BlogNavigation currentSlug="post-0" posts={posts} />);
    expect(screen.getByRole('navigation', { name: 'Recent posts' })).toBeInTheDocument();
  });

  it('omits navigation when there are no other articles', () => {
    render(<BlogNavigation currentSlug="post-0" posts={[posts[0]]} />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});

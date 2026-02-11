import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlogNavigation } from './BlogNavigation';
import type { BlogPost } from '@/lib/mdx';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('BlogNavigation Component', () => {
  const mockPosts: BlogPost[] = [
    {
      slug: 'post-1',
      title: 'First Blog Post',
      date: '2024-01-15',
      excerpt: 'This is the first post',
      author: 'John Doe',
      tags: ['React', 'TypeScript'],
      readTime: '5 min read',
      content: 'Content here',
    },
    {
      slug: 'post-2',
      title: 'Second Blog Post',
      date: '2024-01-20',
      excerpt: 'This is the second post',
      author: 'Jane Smith',
      tags: ['Next.js', 'Testing'],
      readTime: '8 min read',
      content: 'Content here',
    },
    {
      slug: 'post-3',
      title: 'Third Blog Post',
      date: '2024-01-25',
      excerpt: 'This is the third post',
      author: 'Bob Johnson',
      tags: ['JavaScript', 'Web Development', 'Performance'],
      readTime: '10 min read',
      content: 'Content here',
    },
  ];

  describe('Rendering', () => {
    it('should render navigation with other posts', () => {
      render(<BlogNavigation currentSlug="post-1" posts={mockPosts} />);
      
      // Should show "Recent Posts" heading
      expect(screen.getByText('Recent Posts')).toBeInTheDocument();
      
      // Should show other posts but not current one
      expect(screen.queryByText('First Blog Post')).not.toBeInTheDocument();
      expect(screen.getByText('Second Blog Post')).toBeInTheDocument();
      expect(screen.getByText('Third Blog Post')).toBeInTheDocument();
    });

    it('should not render when no other posts exist', () => {
      const { container } = render(
        <BlogNavigation currentSlug="post-1" posts={[mockPosts[0]]} />
      );
      
      // Component should return null
      expect(container.firstChild).toBeNull();
    });

    it('should not render when posts array is empty', () => {
      const { container } = render(
        <BlogNavigation currentSlug="post-1" posts={[]} />
      );
      
      // Component should return null
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Filtering', () => {
    it('should exclude current post from navigation', () => {
      render(<BlogNavigation currentSlug="post-2" posts={mockPosts} />);
      
      // Current post should not be shown
      expect(screen.queryByText('Second Blog Post')).not.toBeInTheDocument();
      
      // Other posts should be shown
      expect(screen.getByText('First Blog Post')).toBeInTheDocument();
      expect(screen.getByText('Third Blog Post')).toBeInTheDocument();
    });

    it('should limit to 5 posts maximum', () => {
      const manyPosts: BlogPost[] = Array.from({ length: 10 }, (_, i) => ({
        slug: `post-${i}`,
        title: `Blog Post ${i}`,
        date: '2024-01-01',
        excerpt: 'Excerpt',
        author: 'Author',
        tags: ['Tag'],
        readTime: '5 min read',
        content: 'Content',
      }));

      const { container } = render(
        <BlogNavigation currentSlug="current-post" posts={manyPosts} />
      );
      
      // Should only show 5 posts (excluding current)
      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(5);
    });
  });

  describe('Post Information Display', () => {
    it('should display post title', () => {
      render(<BlogNavigation currentSlug="post-1" posts={mockPosts} />);
      
      expect(screen.getByText('Second Blog Post')).toBeInTheDocument();
      expect(screen.getByText('Third Blog Post')).toBeInTheDocument();
    });

    it('should display formatted date', () => {
      render(<BlogNavigation currentSlug="post-1" posts={mockPosts} />);
      
      // Check for formatted dates (e.g., "Jan 20, 2024")
      expect(screen.getByText(/Jan 20, 2024/)).toBeInTheDocument();
      expect(screen.getByText(/Jan 25, 2024/)).toBeInTheDocument();
    });

    it('should display read time', () => {
      render(<BlogNavigation currentSlug="post-1" posts={mockPosts} />);
      
      expect(screen.getByText('8 min read')).toBeInTheDocument();
      expect(screen.getByText('10 min read')).toBeInTheDocument();
    });

    it('should display tags (max 2)', () => {
      render(<BlogNavigation currentSlug="post-1" posts={mockPosts} />);
      
      // Post 2 has 2 tags - both should be shown
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();
      
      // Post 3 has 3 tags - only first 2 should be shown
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Web Development')).toBeInTheDocument();
      expect(screen.queryByText('Performance')).not.toBeInTheDocument();
    });

    it('should handle posts with no tags', () => {
      const postsWithoutTags: BlogPost[] = [
        {
          ...mockPosts[0],
          tags: [],
        },
        mockPosts[1],
      ];

      render(<BlogNavigation currentSlug="post-1" posts={postsWithoutTags} />);
      
      // Should still render without errors
      expect(screen.getByText('Second Blog Post')).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('should create correct links to blog posts', () => {
      const { container } = render(
        <BlogNavigation currentSlug="post-1" posts={mockPosts} />
      );
      
      const links = container.querySelectorAll('a');
      expect(links[0]).toHaveAttribute('href', '/blog/post-2');
      expect(links[1]).toHaveAttribute('href', '/blog/post-3');
    });

    it('should have aria-label for accessibility', () => {
      const { container } = render(
        <BlogNavigation currentSlug="post-1" posts={mockPosts} />
      );
      
      const links = container.querySelectorAll('a');
      expect(links[0]).toHaveAttribute('aria-label', 'Navigate to Second Blog Post');
      expect(links[1]).toHaveAttribute('aria-label', 'Navigate to Third Blog Post');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<BlogNavigation currentSlug="post-1" posts={mockPosts} />);
      
      const nav = screen.getByRole('navigation', { name: 'Recent posts' });
      expect(nav).toBeInTheDocument();
    });

    it('should have proper heading structure', () => {
      render(<BlogNavigation currentSlug="post-1" posts={mockPosts} />);
      
      const heading = screen.getByText('Recent Posts');
      expect(heading).toHaveAttribute('id', 'recent-posts-heading');
    });

    it('should have list with aria-labelledby', () => {
      const { container } = render(
        <BlogNavigation currentSlug="post-1" posts={mockPosts} />
      );
      
      const list = container.querySelector('ul');
      expect(list).toHaveAttribute('aria-labelledby', 'recent-posts-heading');
    });
  });

  describe('Responsive Behavior', () => {
    it('should have correct responsive classes', () => {
      const { container } = render(
        <BlogNavigation currentSlug="post-1" posts={mockPosts} />
      );
      
      const aside = container.querySelector('aside');
      expect(aside).toHaveClass('hidden', 'xl:block');
    });

    it('should have sticky positioning', () => {
      const { container } = render(
        <BlogNavigation currentSlug="post-1" posts={mockPosts} />
      );
      
      const aside = container.querySelector('aside');
      expect(aside).toHaveClass('sticky', 'top-36');
    });

    it('should have correct width', () => {
      const { container } = render(
        <BlogNavigation currentSlug="post-1" posts={mockPosts} />
      );
      
      const aside = container.querySelector('aside');
      expect(aside).toHaveClass('w-[280px]');
    });
  });

  describe('Styling', () => {
    it('should have glass effect styling', () => {
      const { container } = render(
        <BlogNavigation currentSlug="post-1" posts={mockPosts} />
      );
      
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('glass', 'rounded-2xl', 'p-6');
    });

    it('should have max height and overflow', () => {
      const { container } = render(
        <BlogNavigation currentSlug="post-1" posts={mockPosts} />
      );
      
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('max-h-[calc(100vh-180px)]', 'overflow-y-auto');
    });

    it('should have proper spacing between items', () => {
      const { container } = render(
        <BlogNavigation currentSlug="post-1" posts={mockPosts} />
      );
      
      const list = container.querySelector('ul');
      expect(list).toHaveClass('space-y-3');
    });
  });
});

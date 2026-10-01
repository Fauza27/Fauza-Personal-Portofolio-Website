'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ compact = false }: { compact?: boolean }) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from the page
    const elements = Array.from(document.querySelectorAll('[data-article-content] h2, [data-article-content] h3'));
    const items: TOCItem[] = elements.map((element, index) => {
      // Generate unique ID by combining text and index
      const baseId = element.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      const uniqueId = element.id || `${baseId}-${index}`;
      
      return {
        id: uniqueId,
        text: element.textContent || '',
        level: parseInt(element.tagName.charAt(1)),
      };
    });

    // Add IDs to headings if they don't have them
    elements.forEach((element, index) => {
      if (!element.id) {
        element.id = items[index].id;
      }
    });

    const frame = requestAnimationFrame(() => setHeadings(items));

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const scrollToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (headings.length === 0) return null;

  const items = (
    <ul className="space-y-2">
      {headings.map((heading) => (
        <li key={heading.id}>
          <button
            onClick={() => scrollToHeading(heading.id)}
            className={`text-left w-full text-sm transition-colors py-1 px-2 rounded-lg ${heading.level === 3 ? 'pl-6' : ''} ${activeId === heading.id ? 'text-foreground font-semibold bg-foreground/5' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
          >
            {heading.text}
          </button>
        </li>
      ))}
    </ul>
  );

  if (compact) {
    return (
      <nav aria-label="Article sections" className="2xl:hidden mb-6">
        <details className="rounded-xl border border-foreground/15 bg-foreground/5">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-foreground">On this page · {headings.length} sections</summary>
          <div className="max-h-72 overflow-y-auto border-t border-foreground/10 p-3">{items}</div>
        </details>
      </nav>
    );
  }

  return (
    <nav aria-label="Article sections" className="w-64">
      <div className="glass rounded-2xl p-6 max-h-[calc(100vh-180px)] overflow-y-auto">
        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
          On This Page
        </h4>
        {items}
      </div>
    </nav>
  );
}

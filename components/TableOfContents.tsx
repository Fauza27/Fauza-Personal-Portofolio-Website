'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from the page
    const elements = Array.from(document.querySelectorAll('h2, h3'));
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

    setHeadings(items);

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

    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-36 hidden xl:block w-64">
      <div className="glass rounded-2xl p-6 max-h-[calc(100vh-180px)] overflow-y-auto">
        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
          On This Page
        </h4>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`
                  text-left w-full text-sm transition-all duration-200
                  ${heading.level === 3 ? 'pl-4' : ''}
                  ${
                    activeId === heading.id
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <span className="flex items-start gap-2">
                  {activeId === heading.id && (
                    <motion.span
                      layoutId="active-indicator"
                      className="w-1 h-4 bg-primary rounded-full mt-0.5 shrink-0"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="line-clamp-2">{heading.text}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

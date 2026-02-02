'use client';

import { useEffect } from 'react';
import { ClientLayout } from '@/components/ClientLayout';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Project error:', error);
  }, [error]);

  return (
    <ClientLayout>
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="glass rounded-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Something went wrong!
          </h2>
          
          <p className="text-muted-foreground mb-6">
            {error.message || 'An unexpected error occurred while loading this project.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/projects"
              className="px-6 py-3 glass rounded-xl text-foreground hover:bg-white/10 transition-colors inline-flex items-center justify-center"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}

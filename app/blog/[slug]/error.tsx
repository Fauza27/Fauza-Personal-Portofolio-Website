'use client';

import { useEffect } from 'react';
import { ClientLayout } from '@/components/ClientLayout';
import { ArrowLeft, Home } from 'lucide-react';
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
    console.error('Blog post error:', error);
  }, [error]);

  return (
    <ClientLayout>
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 max-w-md text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-transparent to-destructive/5" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/20 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Something went wrong!
            </h2>
            
            <p className="text-muted-foreground mb-2">
              {error.message || 'An unexpected error occurred while loading this blog post'}
            </p>
            
            {error.digest && (
              <p className="text-xs text-muted-foreground/70 mb-6">
                Error ID: {error.digest}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Try again
              </button>
              
              <Link href="/blog">
                <button className="flex items-center justify-center gap-2 px-6 py-3 glass rounded-xl text-foreground hover:bg-white/10 transition-colors w-full">
                  <ArrowLeft size={18} />
                  Back to Blog
                </button>
              </Link>
              
              <Link href="/">
                <button className="flex items-center justify-center gap-2 px-6 py-3 glass rounded-xl text-foreground hover:bg-white/10 transition-colors w-full">
                  <Home size={18} />
                  Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}

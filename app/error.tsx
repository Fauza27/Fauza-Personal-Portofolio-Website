'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Add error reporting service (e.g., Sentry)
      console.error('Error:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full glass rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle size={32} className="text-destructive" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Something went wrong!
        </h1>
        
        <p className="text-muted-foreground mb-6">
          We encountered an unexpected error. Don&apos;t worry, it&apos;s not your fault.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-destructive/5 rounded-lg text-left">
            <p className="text-xs font-mono text-destructive break-all">
              {error.message}
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          
          <Link href="/">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 glass rounded-xl text-foreground/80 hover:text-foreground transition-colors">
              <Home size={18} />
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

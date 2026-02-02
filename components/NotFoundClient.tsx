'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundClient() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="glass rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          
          <div className="relative z-10">
            <h1 className="text-8xl md:text-9xl font-bold text-gradient mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-muted-foreground mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
                  <Home size={18} />
                  Go Home
                </button>
              </Link>
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-6 py-3 glass rounded-xl text-foreground hover:bg-white/10 transition-colors"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

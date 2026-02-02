import { ClientLayout } from '@/components/ClientLayout';

export default function Loading() {
  return (
    <ClientLayout>
      <main className="pt-20 sm:pt-24 pb-24 sm:pb-32">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 justify-center">
            {/* Left Sidebar Skeleton */}
            <aside className="hidden xl:block w-64 shrink-0">
              <div className="sticky top-24 glass rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-white/10 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-3 bg-white/10 rounded" />
                  <div className="h-3 bg-white/10 rounded w-5/6" />
                  <div className="h-3 bg-white/10 rounded w-4/6" />
                  <div className="h-3 bg-white/10 rounded" />
                  <div className="h-3 bg-white/10 rounded w-3/4" />
                </div>
              </div>
            </aside>

            {/* Main Content Skeleton */}
            <div className="w-full max-w-4xl">
              {/* Article Header Skeleton */}
              <article className="mb-8 sm:mb-12">
                <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 animate-pulse">
                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="h-4 bg-white/10 rounded w-32" />
                    <div className="h-4 bg-white/10 rounded w-24" />
                    <div className="h-4 bg-white/10 rounded w-28" />
                  </div>

                  {/* Title */}
                  <div className="h-12 bg-white/10 rounded mb-4" />
                  <div className="h-12 bg-white/10 rounded w-4/5 mb-6" />
                  
                  {/* Excerpt */}
                  <div className="h-6 bg-white/10 rounded mb-2" />
                  <div className="h-6 bg-white/10 rounded w-5/6 mb-6" />

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-white/10">
                    <div className="h-8 bg-white/10 rounded-lg w-20" />
                    <div className="h-8 bg-white/10 rounded-lg w-24" />
                    <div className="h-8 bg-white/10 rounded-lg w-20" />
                  </div>

                  {/* Share Button */}
                  <div className="h-10 bg-white/10 rounded-lg w-32" />
                </div>
              </article>

              {/* Article Content Skeleton */}
              <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-8 animate-pulse">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-white/10 rounded" />
                    <div className="h-4 bg-white/10 rounded" />
                    <div className="h-4 bg-white/10 rounded w-5/6" />
                  </div>
                  
                  <div className="h-32 bg-white/10 rounded-xl" />
                  
                  <div className="space-y-3">
                    <div className="h-4 bg-white/10 rounded" />
                    <div className="h-4 bg-white/10 rounded w-4/6" />
                  </div>
                </div>
              </div>

              {/* Author Bio Skeleton */}
              <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 animate-pulse">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-white/10 rounded w-32" />
                    <div className="h-4 bg-white/10 rounded" />
                    <div className="h-4 bg-white/10 rounded w-5/6" />
                    <div className="h-8 bg-white/10 rounded w-24" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Spacer */}
            <div className="hidden xl:block w-64 shrink-0" />
          </div>
        </div>
      </main>
    </ClientLayout>
  );
}

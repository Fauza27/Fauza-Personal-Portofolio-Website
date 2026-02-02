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
                </div>
              </div>
            </aside>

            {/* Main Content Skeleton */}
            <div className="w-full max-w-4xl">
              {/* Header Skeleton */}
              <div className="mb-8 sm:mb-12">
                <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 animate-pulse">
                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="h-6 bg-white/10 rounded-full w-24" />
                    <div className="h-6 bg-white/10 rounded w-20" />
                  </div>

                  {/* Title */}
                  <div className="h-12 bg-white/10 rounded mb-4" />
                  <div className="h-8 bg-white/10 rounded w-3/4 mb-6" />

                  {/* Description */}
                  <div className="h-6 bg-white/10 rounded mb-2" />
                  <div className="h-6 bg-white/10 rounded w-5/6 mb-6" />

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="h-4 bg-white/10 rounded w-24 mb-3" />
                    <div className="flex flex-wrap gap-2">
                      <div className="h-8 bg-white/10 rounded w-20" />
                      <div className="h-8 bg-white/10 rounded w-24" />
                      <div className="h-8 bg-white/10 rounded w-20" />
                      <div className="h-8 bg-white/10 rounded w-28" />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <div className="h-12 bg-white/10 rounded-xl w-32" />
                    <div className="h-12 bg-white/10 rounded-xl w-32" />
                  </div>
                </div>
              </div>

              {/* Content Skeleton */}
              <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-8 animate-pulse">
                <div className="space-y-4">
                  <div className="h-4 bg-white/10 rounded" />
                  <div className="h-4 bg-white/10 rounded" />
                  <div className="h-4 bg-white/10 rounded w-5/6" />
                  <div className="h-4 bg-white/10 rounded" />
                  <div className="h-4 bg-white/10 rounded w-4/6" />
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

/**
 * Route-level loading UI (Suspense boundary).
 *
 * Next.js App Router automatically wraps the page in <Suspense fallback={<Loading />}>.
 * While the Server Component (page.tsx) fetches users, this skeleton is shown
 * instead of a blank screen, improving perceived performance.
 */
export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="h-9 w-56 bg-gray-200 rounded animate-pulse mb-8" />

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex-1 space-y-2">
                <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-56 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-28 bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="h-9 w-16 bg-gray-200 rounded-lg animate-pulse ml-4" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

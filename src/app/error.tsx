// "use client" — error boundaries must be Client Components in the App Router
"use client";

/**
 * App-level error boundary.
 *
 * Next.js App Router automatically wraps each route segment in a React error boundary.
 * If a Server Component (e.g. page.tsx fetch) or any child throws, this component
 * renders instead of the default Next.js error page, giving the user a way to retry.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-500 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

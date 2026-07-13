"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-100 to-rose-100 animate-pulse" />
            <div className="relative flex items-center justify-center w-full h-full">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Application Error</h1>
          <p className="text-gray-500 leading-relaxed mb-8">
            A critical error occurred. Please refresh the page or try again later.
          </p>
          <button
            onClick={() => unstable_retry()}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/25"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}

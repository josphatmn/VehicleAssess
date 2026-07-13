import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="relative mx-auto w-32 h-32 mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-100 to-red-100 animate-pulse" />
          <div className="relative flex items-center justify-center w-full h-full">
            <span className="text-6xl font-extrabold bg-gradient-to-br from-amber-500 to-red-500 bg-clip-text text-transparent">
              403
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Access Denied</h1>
        <p className="text-gray-500 leading-relaxed mb-8">
          You don&apos;t have permission to access this page. Contact an administrator if you believe this is a mistake.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/25"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

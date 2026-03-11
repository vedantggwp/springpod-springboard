import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="mb-2 text-6xl font-bold text-sp-teal">404</p>
      <h1 className="mb-3 font-heading text-2xl font-semibold text-sp-navy dark:text-white">
        Page not found
      </h1>
      <p className="mb-8 max-w-md text-sp-text-secondary dark:text-white/60">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-sp-teal px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sp-teal-dark"
      >
        Back to home
      </Link>
    </div>
  );
}

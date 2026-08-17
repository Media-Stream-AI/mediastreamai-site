import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-display text-gradient leading-none mb-4" style={{ fontSize: 'clamp(5rem, 20vw, 12rem)' }}>
        404
      </h1>
      <p className="text-xl text-muted mb-8">Page not found</p>
      <Link href="/" className="btn-glow">Back home</Link>
    </div>
  );
}

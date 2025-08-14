export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`py-24 border-t border-white/5 ${className}`}>{children}</section>;
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-6 ${className}`}>{children}</div>;
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-white/10 bg-white/[0.03] ${className}`}>{children}</div>;
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-semibold">{children}</h2>;
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-white/70 max-w-3xl">{children}</p>;
}

export function Grid({ children, cols = "lg:grid-cols-3" }: { children: React.ReactNode; cols?: string }) {
  return <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${cols}`}>{children}</div>;
}


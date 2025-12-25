// Lightweight clsx replacement – combines class strings safely
function clsx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function Section({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={clsx("max-w-7xl mx-auto px-6", className)}>
      {children}
    </section>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/10 bg-black/30 shadow-lg backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    "px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white",
    ghost: "border border-white/20 hover:bg-white/10 text-white",
  };
  return (
    <button className={clsx(base, styles[variant])} {...props}>
      {children}
    </button>
  );
}

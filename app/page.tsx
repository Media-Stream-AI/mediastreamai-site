export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
        <div className="absolute inset-0 w-full h-full bg-black" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(60% 40% at 50% 80%, rgba(255,255,255,0.1), transparent 60%), rgba(0,0,0,0.5)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6 text-center py-24">
          <h1 className="text-4xl md:text-6xl">Smart TV, Made Personal.</h1>
          <p className="mt-5 text-white/70 max-w-2xl mx-auto">
            Hyper-personalized, emotionally aware television across all platforms.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/technology" className="bg-white text-black px-5 py-3 rounded-2xl inline-flex items-center gap-2">Explore the Platform</a>
            <a href="/solutions" className="bg-white/10 px-5 py-3 rounded-2xl">See how it works</a>
          </div>
        </div>
      </section>
    </>
  );
}

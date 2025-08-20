"use client";
export default function ModelsPage() {
  const models = [
    { t: "Tagger-XL", d: "Multimodal content tagging for topics, tone and safety." },
    { t: "MoodNet", d: "Biometric + behavior fusion for moment-to-moment intent." },
    { t: "Scheduler-GEN", d: "Adaptive playout schedules generated per viewer." }
  ];
  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-horizon">Models</h1>
          <p className="mt-4 text-white/70 max-w-3xl mx-auto font-glacial">Proprietary models trained for media understanding and playout personalization.</p>
        </div>
      </section>
      <section className="section border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((m) => (
            <div key={m.t} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-lg font-horizon">{m.t}</div>
              <p className="mt-2 text-white/70 text-sm font-glacial">{m.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
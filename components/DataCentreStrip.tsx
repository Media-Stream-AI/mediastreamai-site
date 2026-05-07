"use client";

export function DataCentreStrip() {
  const sites = [
    { name: "Manchester / Salford – MediaCityUK", flag: "🇬🇧", phase: "UK Sovereign" },
    { name: "Dundee, Scotland", flag: "🇬🇧", phase: "UK Sovereign" },
    { name: "Düsseldorf", flag: "🇩🇪", phase: "Phase Two" },
    { name: "Kingston, Jamaica", flag: "🇯🇲", phase: "Phase Two" },
    { name: "Marseille", flag: "🇫🇷", phase: "Phase Two" },
  ];

  return (
    <div className="py-8 border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/70">
        {sites.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-2">
            <span>
              {s.flag} {s.name}
            </span>
            <span
              className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                s.phase === "UK Sovereign"
                  ? "border-blue-400/40 text-blue-300"
                  : "border-amber-400/40 text-amber-300"
              }`}
            >
              {s.phase}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

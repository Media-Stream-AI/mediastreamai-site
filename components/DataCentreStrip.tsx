"use client";

export function DataCentreStrip() {
  const sites = [
    { name: "Manchester / Salford – MediaCityUK", flag: "🇬🇧" },
    { name: "Sunderland", flag: "🇬🇧" },
    { name: "Düsseldorf", flag: "🇩🇪" },
    { name: "Kingston (Jamaica)", flag: "🇯🇲" },
  ];

  return (
    <div className="py-8 border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6 text-sm text-white/70">
        {sites.map((s, i) => (
          <span key={i}>
            {s.flag} {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

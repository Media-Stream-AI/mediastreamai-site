
// components/DataCentreStrip.tsx
"use client";

export function DataCentreStrip() {
  return (
    <div className="py-8 border-t border-white/10 border-b">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-4 text-sm text-white/70">
        <span>Manchester — MediaCityUK</span>
        <span>• Sunderland</span>
        <span>• Düsseldorf</span>
        <span>• Kingston (Jamaica)</span>
      </div>
    </div>
  );
}



export function DataCentreStrip() {
  const items = [
    { name: "Manchester / Salford – MediaCityUK", flag: "🇬🇧" },
    { name: "Sunderland", flag: "🇬🇧" },
    { name: "Düsseldorf", flag: "🇩🇪" },
    { name: "Kingston (Jamaica)", flag: "🇯🇲" },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((i) => (
        <span key={i.name} className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10">
          {i.flag} {i.name}
        </span>
      ))}
    </div>
  );
}

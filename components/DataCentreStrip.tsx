
// components/DataCentreStrip.tsx
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
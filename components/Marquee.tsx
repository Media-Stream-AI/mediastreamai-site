// Infinite horizontal marquee strip - near-black band + gradient uppercase text.
// "BUILT DIFFERENT • INTUITV •" repeating across the band.

export default function Marquee({
  text = 'BUILT DIFFERENT',
  separator = '• INTUITV •',
}: {
  text?: string;
  separator?: string;
}) {
  // One repeated unit; render twice so the -50% keyframe loops seamlessly.
  const unit = Array.from({ length: 8 }).map((_, i) => (
    <span key={i} className="mx-6 inline-block">
      {text} <span className="text-cyan">{separator}</span>
    </span>
  ));

  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden border-y border-hair bg-night-800/60 py-4 select-none"
    >
      <div className="marquee-track font-display text-2xl md:text-4xl text-gradient tracking-tight">
        <span className="inline-flex">{unit}</span>
        <span className="inline-flex">{unit}</span>
      </div>
    </div>
  );
}

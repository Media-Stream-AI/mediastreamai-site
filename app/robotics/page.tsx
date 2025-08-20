import Image from "next/image";

export const metadata = {
  title: "Robotics — Media Stream AI",
  description: "Autonomous canal-cleaning robotics integrated with our water-cooled AI data centre."
};

export default function RoboticsPage() {
  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-horizon">Robotics</h1>
          <p className="mt-4 text-white/70 max-w-3xl mx-auto font-glacial">
            Vision models detect debris, classify waste streams and trigger maintenance—safely and sustainably.
          </p>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <Image src="/media/svg/robotics-overview.svg" alt="Robotics Overview" width={1200} height={800} className="w-full h-auto object-contain rounded-xl"/>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-horizon">Canal-side operations</h2>
            <p className="mt-4 text-white/70 font-glacial">Robotics work hand-in-hand with canal-side AI data centres to improve water clarity and cooling efficiency.</p>
            <ul className="mt-6 space-y-2 text-white/80 font-glacial">
              <li>• Live camera ingest and annotation</li>
              <li>• Secure uplink to sovereign clusters</li>
              <li>• Real-time alerts and incident logs</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

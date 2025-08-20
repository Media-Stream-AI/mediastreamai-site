import Image from "next/image";

export const metadata = {
  title: "Models — Media Stream AI",
  description: "Foundation, broadcast and personalization models for adaptive TV."
};

export default function ModelsPage() {
  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-horizon">Models</h1>
          <p className="mt-4 text-white/70 max-w-3xl mx-auto font-glacial">Media understanding, schedule optimization and one-to-one personalization—deployed on sovereign clusters.</p>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-horizon">Model families</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {title:"Foundation Models", img:"/media/svg/models-architecture.svg"},
              {title:"Broadcast Models", img:"/media/svg/models-architecture.svg"},
              {title:"Personalization Models", img:"/media/svg/models-architecture.svg"},
            ].map((c)=>(
              <div key={c.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-white/5 border border-white/10">
                  <Image src={c.img} alt={c.title} width={800} height={450} className="w-full h-full object-contain"/>
                </div>
                <h3 className="mt-4 text-xl font-horizon">{c.title}</h3>
                <p className="mt-2 text-white/70 text-sm font-glacial">Replace with your model visuals or keep this SVG.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

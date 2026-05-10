import Link from 'next/link';
import { listPosts } from '../../lib/blog';

export const revalidate = 60;
export const metadata = {
  title: 'Media Stream AI — Blog',
  description: 'Sovereign AI infrastructure, MOTHER AI, robotics, GPUaaS, data centres and ESG. AI-generated, human-reviewed.',
};

export default async function BlogIndex() {
  const { posts } = await listPosts(48);
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Media Stream AI · Blog</p>
          <h1 className="text-4xl md:text-5xl font-semibold mt-2">Where compute, climate and reasoning meet.</h1>
          <p className="text-slate-400 mt-3 max-w-2xl">MOTHER AI, MOTHER EXO Robotics, GPU-as-a-Service across H100/H200/B200, data centre design, and our ESG commitments — water cooling, tidal partnerships, solar.</p>
          <p className="text-xs text-slate-500 mt-4">AI-generated and human-reviewed before publication.</p>
        </header>

        {posts.length === 0 ? (
          <p className="text-slate-500">No posts published yet. The hub's first approval cycle hasn't completed.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`}
                className="group block bg-slate-900/60 border border-slate-800 hover:border-cyan-500 rounded-xl overflow-hidden transition">
                {p.image_url && (
                  <img src={p.image_url} alt={p.image_alt || p.title} className="w-full h-44 object-cover" />
                )}
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-wider text-cyan-400">{p.topic}</p>
                  <h2 className="text-lg font-medium mt-2 group-hover:text-cyan-300">{p.title}</h2>
                  <p className="text-sm text-slate-400 mt-2 line-clamp-3">{p.excerpt}</p>
                  {p.published_at && (
                    <p className="text-xs text-slate-500 mt-3">{new Date(p.published_at).toLocaleDateString()}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

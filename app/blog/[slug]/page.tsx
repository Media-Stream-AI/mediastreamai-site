import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, listPosts, renderMarkdown } from '../../../lib/blog';

export const revalidate = 60;

export async function generateStaticParams() {
  const { posts } = await listPosts(48);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Not found' };
  return { title: `${post.title} | Media Stream AI`, description: post.excerpt ?? undefined, openGraph: { title: post.title, description: post.excerpt ?? undefined, images: post.image_url ? [post.image_url] : [] } };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <article className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/blog" className="text-xs text-cyan-400 hover:underline">← Back to blog</Link>
        <p className="text-[11px] uppercase tracking-widest text-cyan-400 mt-6">{post.topic}</p>
        <h1 className="text-3xl md:text-4xl font-semibold mt-2">{post.title}</h1>
        {post.published_at && (<p className="text-xs text-slate-500 mt-2">{new Date(post.published_at).toLocaleDateString()} · AI-generated, human-reviewed</p>)}
        {post.image_url && (<img src={post.image_url} alt={post.image_alt || post.title} className="w-full rounded-xl mt-8 border border-slate-800" />)}
        <div className="prose prose-invert prose-cyan max-w-none mt-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body || '') }} />
        {post.links?.length > 0 && (
          <aside className="mt-12 border-t border-slate-800 pt-6">
            <h2 className="text-sm font-medium text-slate-400 mb-3">Linked from this post</h2>
            <ul className="space-y-1 text-sm">
              {post.links.map((l, i) => (<li key={i}><a className="text-cyan-300 hover:underline" href={l.url}>{l.label}</a></li>))}
            </ul>
          </aside>
        )}
      </article>
    </main>
  );
}

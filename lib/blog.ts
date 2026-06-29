import { FALLBACK_POSTS, fallbackPost } from './blog-fallback';

const HUB = process.env.NEXT_PUBLIC_BLOG_API || 'https://sales.mediastreamai.com';
export const BRAND = 'msai';

export interface BlogLink { label: string; url: string }
export interface BlogPost {
  id: string;
  brand: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body?: string | null;
  image_url: string | null;
  image_alt?: string | null;
  primary_link: string;
  topic: string;
  published_at: string | null;
  links: BlogLink[];
}

// Merge in any local fallback posts the hub didn't already return (dedupe by
// slug; the hub copy always wins). Keeps critical posts on their URL even if
// the hub DB row is missing.
function mergeFallback(posts: BlogPost[]): BlogPost[] {
  const seen = new Set(posts.map((p) => p.slug));
  const extra = FALLBACK_POSTS.filter((p) => !seen.has(p.slug));
  return [...posts, ...extra].sort((a, b) =>
    (b.published_at || '').localeCompare(a.published_at || ''));
}

export async function listPosts(limit = 24, offset = 0): Promise<{ posts: BlogPost[]; total: number }> {
  try {
    const res = await fetch(`${HUB}/api/blog/${BRAND}?limit=${limit}&offset=${offset}`, { next: { revalidate: 60 } });
    if (!res.ok) return { posts: mergeFallback([]), total: FALLBACK_POSTS.length };
    const data = await res.json();
    const posts = mergeFallback(data.posts || []);
    return { posts, total: Math.max(data.total || 0, posts.length) };
  } catch {
    return { posts: mergeFallback([]), total: FALLBACK_POSTS.length };
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${HUB}/api/blog/${BRAND}/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const post = (await res.json()).post;
      if (post) return post;
    }
  } catch { /* fall through to local fallback */ }
  // Hub had nothing — serve the bundled copy so the URL never 404s.
  return fallbackPost(slug);
}

export function renderMarkdown(md: string): string {
  // Inline styles (not Tailwind classes) so spacing is guaranteed on every
  // article: this HTML is injected at runtime, `lib/` isn't in the Tailwind
  // content globs, the typography plugin isn't installed, and preflight zeroes
  // default <p>/<h*> margins. Inline styles sidestep all of that — a clear
  // blank line sits between every paragraph regardless of CSS config.
  const P = 'style="margin:0 0 1.25rem;line-height:1.75"';
  const H1 = 'style="margin:2rem 0 1rem;font-size:1.875rem;font-weight:600;line-height:1.2"';
  const H2 = 'style="margin:2rem 0 .85rem;font-size:1.5rem;font-weight:600;line-height:1.25"';
  const H3 = 'style="margin:1.6rem 0 .6rem;font-size:1.2rem;font-weight:600"';
  return md
    .replace(/^### (.*$)/gim, `<h3 ${H3}>$1</h3>`)
    .replace(/^## (.*$)/gim, `<h2 ${H2}>$1</h2>`)
    .replace(/^# (.*$)/gim, `<h1 ${H1}>$1</h1>`)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="text-decoration:underline">$1</a>')
    .split(/\n{2,}/)
    .map((p) => (p.startsWith('<h') ? p : `<p ${P}>${p.replace(/\n/g, '<br/>')}</p>`))
    .join('\n');
}

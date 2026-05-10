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

export async function listPosts(limit = 24, offset = 0): Promise<{ posts: BlogPost[]; total: number }> {
  try {
    const res = await fetch(`${HUB}/api/blog/${BRAND}?limit=${limit}&offset=${offset}`, { next: { revalidate: 60 } });
    if (!res.ok) return { posts: [], total: 0 };
    return await res.json();
  } catch {
    return { posts: [], total: 0 };
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${HUB}/api/blog/${BRAND}/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()).post;
  } catch { return null; }
}

export function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .split(/\n{2,}/)
    .map((p) => (p.startsWith('<h') ? p : `<p>${p.replace(/\n/g, '<br/>')}</p>`))
    .join('\n');
}

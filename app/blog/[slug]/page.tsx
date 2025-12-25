"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowLeft, Share2, Check } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  sector?: string;
  tags: string[];
  imageUrl?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
      fetchRelatedPosts();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        const foundPost = data.posts?.find((p: BlogPost) => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
        } else {
          router.push('/blog');
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        const currentPost = data.posts?.find((p: BlogPost) => p.slug === slug);
        if (currentPost && data.posts) {
          const related = data.posts
            .filter((p: BlogPost) => 
              p.slug !== slug && 
              (p.sector === currentPost.sector || 
               p.tags.some((tag: string) => currentPost.tags.includes(tag)))
            )
            .slice(0, 3);
          setRelatedPosts(related);
        }
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/60 mt-4">Loading post...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="text-5xl md:text-6xl mb-4">❌</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Post Not Found</h2>
          <p className="text-white/60 mb-8 px-4">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors">
              Back to Blog
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-12 md:py-16 px-4 md:px-6">
      <article className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/blog">
          <button className="flex items-center gap-2 text-white/70 hover:text-white mb-6 md:mb-8 transition-colors text-sm md:text-base">
            <ArrowLeft size={18} className="md:w-5 md:h-5" />
            Back to Blog
          </button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          {/* Sector Badge */}
          {post.sector && (
            <div className="mb-4">
              <span className="inline-block px-3 md:px-4 py-1 md:py-2 bg-blue-500/20 border border-blue-400/40 rounded-full text-xs md:text-sm font-semibold text-blue-300">
                {post.sector}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-white/60 mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="md:w-[18px] md:h-[18px] flex-shrink-0" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="md:w-[18px] md:h-[18px] flex-shrink-0" />
              <span>{post.author}</span>
            </div>
            <button
              onClick={copyLink}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check size={16} className="md:w-[18px] md:h-[18px] text-green-400 flex-shrink-0" />
                  <span className="text-green-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={16} className="md:w-[18px] md:h-[18px] flex-shrink-0" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              {post.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="flex items-center gap-1 px-2 md:px-3 py-1 bg-black/40 border border-white/10 rounded-full text-xs md:text-sm text-white/70"
                >
                  <Tag size={12} className="md:w-[14px] md:h-[14px] flex-shrink-0" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Featured Image */}
        {post.imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 md:mb-12 rounded-2xl overflow-hidden border border-white/10"
          >
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-auto"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-sm md:prose-lg max-w-none mb-12 md:mb-16"
        >
          <div 
            className="text-white/80 leading-relaxed space-y-4 md:space-y-6 text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 pt-12 md:pt-16 border-t border-white/10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Related Posts</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <div className="bg-black/40 border border-white/10 rounded-xl p-4 md:p-6 hover:border-blue-500/50 transition-all h-full">
                    {relatedPost.sector && (
                      <span className="inline-block px-2 py-1 bg-blue-500/20 border border-blue-400/40 rounded text-xs font-semibold text-blue-300 mb-3">
                        {relatedPost.sector}
                      </span>
                    )}
                    <h3 className="text-base md:text-lg font-bold text-white mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/60 line-clamp-2 mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <Calendar size={12} className="flex-shrink-0" />
                      <span>{formatDate(relatedPost.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-400/30 p-6 md:p-8 rounded-2xl text-center"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4">Interested in Learning More?</h3>
          <p className="text-sm md:text-base text-white/70 mb-6 max-w-2xl mx-auto px-4">
            Discover how Media Stream AI delivers sovereign AI infrastructure 
            across UK and EU data centers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors">
                Contact Us
              </button>
            </Link>
            <Link href="/sectors" className="w-full sm:w-auto">
              <button className="w-full px-6 py-3 border border-white/20 hover:border-blue-400 rounded-lg font-semibold transition-colors">
                View Sectors
              </button>
            </Link>
          </div>
        </motion.div>
      </article>
    </main>
  );
}

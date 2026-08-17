"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Marquee from '@/components/Marquee';

export default function BlogPage() {
  const posts = [
    {
      slug: 'future-of-ai-television',
      title: 'The Future of AI-Powered Television',
      excerpt: 'How artificial intelligence is revolutionizing the way we create and consume TV content.',
      date: '2026-01-04',
      readTime: '5 min',
      category: 'AI Technology',
      image: '🎬'
    },
    {
      slug: 'uk-eu-sovereign-ai',
      title: 'Why UK/EU Sovereign AI Matters',
      excerpt: 'Data sovereignty and GDPR compliance in the age of AI-powered media platforms.',
      date: '2026-01-03',
      readTime: '7 min',
      category: 'Sovereignty',
      image: '🔒'
    },
    {
      slug: 'create-tv-shows-with-ai',
      title: 'Create Professional TV Shows in Minutes',
      excerpt: 'A step-by-step guide to using AI for content creation without technical expertise.',
      date: '2026-01-02',
      readTime: '6 min',
      category: 'Tutorial',
      image: '✨'
    },
    {
      slug: 'personalized-streaming',
      title: 'The Science of Personalized Streaming',
      excerpt: 'How MOTHER AI learns your preferences and creates your perfect channel.',
      date: '2026-01-01',
      readTime: '8 min',
      category: 'Technology',
      image: '🧠'
    },
    {
      slug: 'creator-economy-ai',
      title: 'AI and the Creator Economy',
      excerpt: 'How AI tools are democratizing content creation and empowering independent creators.',
      date: '2025-12-30',
      readTime: '5 min',
      category: 'Creators',
      image: '💰'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display mb-6">
              IntuiTV <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Insights on AI, television, and the future of personalized media
            </p>
          </motion.div>

          <div className="-mx-4 sm:-mx-6 lg:-mx-8 mb-16">
            <Marquee text="READ THE BLOG" separator="• INTUITV •" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="card-night card-hover rounded-2xl border border-hair overflow-hidden h-full">
                    <div className="aspect-video bg-gradient-to-br from-cyan/20 to-violet/20 flex items-center justify-center text-8xl">
                      {post.image}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted mb-3">
                        <span className="chip">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-GB', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-semibold text-mist mb-3 hover:text-cyan transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-muted mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-cyan font-semibold">
                        Read More <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

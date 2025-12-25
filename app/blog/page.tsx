"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowRight, PenTool } from "lucide-react";

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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const sectors = [
    "all",
    "Media",
    "Film & TV",
    "Creative",
    "Advertising",
    "Government",
    "Defence",
    "Research",
    "Education",
    "Company News"
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedSector === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.sector === selectedSector));
    }
  }, [selectedSector, posts]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
        setFilteredPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-400 mb-4 md:mb-6 leading-tight">
            Blog & Insights
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-6 px-4">
            The latest news, insights, and updates from Media Stream AI. Covering sovereign 
            AI, sector deployments, and infrastructure innovation.
          </p>
          
          {/* Automated Posting Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <Link 
              href="https://mother.mediastreamai.com/blog-automation" 
              target="_blank"
              className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/40 rounded-lg hover:border-purple-400 transition-all group"
            >
              <PenTool size={18} className="text-purple-400 group-hover:rotate-12 transition-transform" />
              <span className="text-sm md:text-base font-semibold text-purple-300 group-hover:text-purple-200">
                Access Automated Blog System
              </span>
              <ArrowRight size={16} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Sector Filter */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-base md:text-lg font-semibold text-white mb-4 px-2">Filter by Sector:</h3>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-semibold transition-all ${
                  selectedSector === sector
                    ? 'bg-blue-600 text-white'
                    : 'bg-black/40 border border-white/10 text-white/70 hover:border-blue-400 hover:text-white'
                }`}
              >
                {sector === "all" ? "All Posts" : sector}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white/60 mt-4">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl md:text-6xl mb-4">📝</div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">No Posts Yet</h3>
            <p className="text-sm md:text-base text-white/60 mb-8 px-4">
              {selectedSector === "all" 
                ? "Check back soon for the latest updates from Media Stream AI."
                : `No posts found in ${selectedSector}. Try selecting a different sector.`}
            </p>
            {selectedSector !== "all" && (
              <button
                onClick={() => setSelectedSector("all")}
                className="px-6 py-2 border border-blue-400 text-blue-400 hover:bg-blue-500/20 rounded-lg font-semibold transition-colors"
              >
                View All Posts
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all h-full flex flex-col group">
                    {/* Image */}
                    {post.imageUrl ? (
                      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-blue-600/20 to-blue-900/20 overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-blue-600/20 to-blue-900/20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl md:text-5xl mb-2">📰</div>
                          <p className="text-white/40 text-xs md:text-sm">Media Stream AI</p>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-4 md:p-6 flex-1 flex flex-col">
                      {/* Sector Badge */}
                      {post.sector && (
                        <div className="mb-3">
                          <span className="inline-block px-2 md:px-3 py-1 bg-blue-500/20 border border-blue-400/40 rounded-full text-xs font-semibold text-blue-300">
                            {post.sector}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm md:text-base text-white/70 mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-white/60 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="flex-shrink-0" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={14} className="flex-shrink-0" />
                          <span>{post.author}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="flex items-center gap-1 text-xs text-white/60">
                              <Tag size={12} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all text-sm md:text-base">
                        Read More <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-400/30 p-6 md:p-12 rounded-2xl text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-base md:text-xl text-white/80 mb-8 max-w-2xl mx-auto px-4">
            Follow our latest developments in sovereign AI infrastructure, 
            sector deployments, and sustainability initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full px-6 md:px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors">
                Contact Us
              </button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <button className="w-full px-6 md:px-8 py-3 border border-white/20 hover:border-blue-400 rounded-lg font-semibold transition-colors">
                About Media Stream AI
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

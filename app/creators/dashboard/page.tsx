"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, Play, BarChart3, DollarSign, Eye, Heart,
  Plus, Upload, Settings, Download
} from 'lucide-react';

export default function CreatorDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with real API calls
  const stats = {
    totalViews: 245680,
    totalEarnings: 4892.50,
    subscribers: 12453,
    avgWatchTime: '18:32',
    episodesCreated: 47,
    monthlyGrowth: 23.4,
  };

  const recentEpisodes = [
    {
      id: 1,
      title: 'AI Revolution in Gaming',
      thumbnail: '/placeholder-thumb.jpg',
      views: 15420,
      earnings: 234.50,
      duration: '24:18',
      status: 'published',
      publishedAt: '2 days ago',
    },
    {
      id: 2,
      title: 'Future of Space Exploration',
      thumbnail: '/placeholder-thumb.jpg',
      views: 8930,
      earnings: 156.20,
      duration: '18:45',
      status: 'published',
      publishedAt: '5 days ago',
    },
    {
      id: 3,
      title: 'Cooking with AI Assistants',
      thumbnail: '/placeholder-thumb.jpg',
      views: 0,
      earnings: 0,
      duration: '15:22',
      status: 'processing',
      publishedAt: 'Processing...',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'create', label: 'Create Episode', icon: Plus },
    { id: 'episodes', label: 'My Episodes', icon: Play },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen pt-20 section-padding">
      <div className="container-custom max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-mist mb-2">
              Creator <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted">Welcome back! Here's your performance overview.</p>
          </div>
          <button className="btn-glow flex items-center justify-center gap-2 w-full sm:w-auto">
            <Plus className="w-5 h-5" />
            Create Episode
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-night rounded-2xl border border-hair p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 text-cyan" />
              <span className="text-xs text-success-green">+{stats.monthlyGrowth}%</span>
            </div>
            <div className="text-3xl font-bold text-mist mb-1">
              {stats.totalViews.toLocaleString()}
            </div>
            <div className="text-sm text-muted">Total Views</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-night rounded-2xl border border-hair p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-success-green" />
              <span className="text-xs text-success-green">This month</span>
            </div>
            <div className="text-3xl font-bold text-mist mb-1">
              £{stats.totalEarnings.toLocaleString()}
            </div>
            <div className="text-sm text-muted">Earnings</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-night rounded-2xl border border-hair p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-8 h-8 text-violet" />
            </div>
            <div className="text-3xl font-bold text-mist mb-1">
              {stats.subscribers.toLocaleString()}
            </div>
            <div className="text-sm text-muted">Subscribers</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-night rounded-2xl border border-hair p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Play className="w-8 h-8 text-iris" />
            </div>
            <div className="text-3xl font-bold text-mist mb-1">{stats.episodesCreated}</div>
            <div className="text-sm text-muted">Episodes Created</div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="md:col-span-1">
            <div className="card-night rounded-2xl border border-hair p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-mist border border-hair'
                      : 'hover:bg-white/5 text-muted'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="md:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Recent Episodes */}
                <div className="card-night rounded-2xl border border-hair p-6">
                  <h2 className="text-2xl font-semibold text-mist mb-6">Recent Episodes</h2>
                  <div className="space-y-4">
                    {recentEpisodes.map((episode) => (
                      <div
                        key={episode.id}
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div className="w-24 h-16 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Play className="w-8 h-8 text-muted" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-mist mb-1">{episode.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted">
                            <span>{episode.duration}</span>
                            <span>•</span>
                            <span>{episode.views.toLocaleString()} views</span>
                            <span>•</span>
                            <span className={episode.status === 'published' ? 'text-success-green' : 'text-warning-amber'}>
                              {episode.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-success-green">
                            £{episode.earnings.toFixed(2)}
                          </div>
                          <div className="text-xs text-muted">{episode.publishedAt}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="card-night rounded-2xl border border-hair p-6 card-hover cursor-pointer">
                    <Sparkles className="w-12 h-12 mb-4 text-violet" />
                    <h3 className="text-xl font-semibold text-mist mb-2">Create with AI</h3>
                    <p className="text-muted text-sm mb-4">
                      Type a sentence, get a full episode. Our AI handles the rest.
                    </p>
                    <button className="btn-ghost text-sm">Start Creating →</button>
                  </div>

                  <div className="card-night rounded-2xl border border-hair p-6 card-hover cursor-pointer">
                    <Upload className="w-12 h-12 mb-4 text-cyan" />
                    <h3 className="text-xl font-semibold text-mist mb-2">Upload Content</h3>
                    <p className="text-muted text-sm mb-4">
                      Have existing content? Upload and publish to IntuiTV.
                    </p>
                    <button className="btn-ghost text-sm">Upload Now →</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'create' && (
              <div className="card-night rounded-2xl border border-hair p-8">
                <h2 className="text-3xl font-semibold text-mist mb-6">
                  Create AI <span className="text-gradient">Episode</span>
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Episode Title *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-hair focus:border-cyan focus:outline-none text-mist"
                      placeholder="e.g., The Future of AI in Healthcare"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Describe Your Episode *
                    </label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-hair focus:border-cyan focus:outline-none resize-none text-mist"
                      placeholder="Describe what you want this episode to be about. Be as detailed as possible. Example: 'A documentary-style episode exploring how artificial intelligence is revolutionizing medical diagnosis, with interviews from leading AI researchers and real-world case studies...'"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-hair focus:border-cyan focus:outline-none text-mist">
                        <option>5 minutes</option>
                        <option>10 minutes</option>
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>60 minutes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Style</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-hair focus:border-cyan focus:outline-none text-mist">
                        <option>Documentary</option>
                        <option>Educational</option>
                        <option>Entertainment</option>
                        <option>News/Commentary</option>
                        <option>Storytelling</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-hair rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-6 h-6 text-violet flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-mist mb-1">MOTHER AI Will Generate:</h4>
                        <ul className="text-sm text-muted space-y-1">
                          <li>• Full script and narration</li>
                          <li>• Visuals and animations</li>
                          <li>• Background music and sound effects</li>
                          <li>• Professional editing and pacing</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button className="btn-glow w-full flex items-center justify-center gap-2 text-lg py-4">
                    <Sparkles className="w-6 h-6" />
                    Generate Episode (Costs 1 AI Credit)
                  </button>

                  <p className="text-xs text-center text-muted">
                    Generation typically takes 5-15 minutes depending on duration
                  </p>
                </div>
              </div>
            )}

            {/* Other tabs would be implemented similarly */}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setSolutionsOpen(false);
    setSectorsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="text-2xl font-bold text-blue-400">
              Media Stream AI
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
                Solutions
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2">
                  <Link href="/solutions" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors">
                    <div className="font-semibold">Solutions Overview</div>
                    <div className="text-xs text-white/60">GPU vs AI Agents</div>
                  </Link>
                  <Link href="https://gpu.mediastreamai.com" target="_blank" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors">
                    <div className="font-semibold">GPU & Infrastructure</div>
                    <div className="text-xs text-white/60">H200, B200, SambaNova</div>
                  </Link>
                  <Link href="https://mother.mediastreamai.com" target="_blank" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors">
                    <div className="font-semibold">AI Agent Deployments</div>
                    <div className="text-xs text-white/60">MOTHER + Autm</div>
                  </Link>
                  <Link href="/government-defence" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors">
                    <div className="font-semibold">Government & Defence</div>
                    <div className="text-xs text-white/60">Air-gapped, MOD certified</div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sectors Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
                Sectors
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-72 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2 grid grid-cols-2 gap-1">
                  <Link href="/sectors#media" className="px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors text-sm">
                    📺 Media & Broadcasting
                  </Link>
                  <Link href="/sectors#film" className="px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors text-sm">
                    🎬 Film & TV
                  </Link>
                  <Link href="/sectors#creative" className="px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors text-sm">
                    🎨 Creative
                  </Link>
                  <Link href="/sectors#advertising" className="px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors text-sm">
                    📢 Advertising
                  </Link>
                  <Link href="/government-defence" className="px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors text-sm">
                    🛡️ Government
                  </Link>
                  <Link href="/government-defence" className="px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors text-sm">
                    🔒 Defence
                  </Link>
                  <Link href="/sectors#research" className="px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors text-sm">
                    🔬 Research
                  </Link>
                  <Link href="/sectors#education" className="px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors text-sm">
                    🎓 Education
                  </Link>
                </div>
                <div className="border-t border-white/10 p-2">
                  <Link href="/sectors" className="block px-4 py-2 text-center text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                    View All Sectors →
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/data-centre" className="text-white/80 hover:text-white transition-colors">
              Data Centers
            </Link>

            <Link href="/partnerships" className="text-white/80 hover:text-white transition-colors">
              Partnerships
            </Link>

            <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
              Blog
            </Link>

            <Link href="/about" className="text-white/80 hover:text-white transition-colors">
              About
            </Link>

            <Link href="/contact">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors">
                Contact
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4">
            <div className="space-y-1">
              <Link 
                href="/" 
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Solutions Mobile */}
              <div>
                <button
                  onClick={() => setSolutionsOpen(!solutionsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                >
                  Solutions
                  <ChevronDown size={16} className={`transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                </button>
                {solutionsOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    <Link href="/solutions" className="block px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                      Solutions Overview
                    </Link>
                    <Link href="https://gpu.mediastreamai.com" target="_blank" className="block px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                      GPU & Infrastructure
                    </Link>
                    <Link href="https://mother.mediastreamai.com" target="_blank" className="block px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                      AI Agent Deployments
                    </Link>
                    <Link href="/government-defence" className="block px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                      Government & Defence
                    </Link>
                  </div>
                )}
              </div>

              {/* Sectors Mobile */}
              <div>
                <button
                  onClick={() => setSectorsOpen(!sectorsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                >
                  Sectors
                  <ChevronDown size={16} className={`transition-transform ${sectorsOpen ? 'rotate-180' : ''}`} />
                </button>
                {sectorsOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    <Link href="/sectors#media" className="block px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                      📺 Media & Broadcasting
                    </Link>
                    <Link href="/sectors#film" className="block px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                      🎬 Film & TV
                    </Link>
                    <Link href="/sectors#creative" className="block px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                      🎨 Creative
                    </Link>
                    <Link href="/sectors#advertising" className="block px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                      📢 Advertising
                    </Link>
                    <Link href="/government-defence" className="block px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                      🛡️ Government & Defence
                    </Link>
                    <Link href="/sectors#research" className="block px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                      🔬 Research
                    </Link>
                    <Link href="/sectors#education" className="block px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                      🎓 Education
                    </Link>
                    <Link href="/sectors" className="block px-4 py-2 text-sm text-blue-400 font-semibold" onClick={() => setMobileMenuOpen(false)}>
                      View All Sectors →
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                href="/data-centre" 
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Data Centers
              </Link>

              <Link 
                href="/partnerships" 
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Partnerships
              </Link>

              <Link 
                href="/blog" 
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>

              <Link 
                href="/about" 
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

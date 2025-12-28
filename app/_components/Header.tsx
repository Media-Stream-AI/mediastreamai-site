"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-black/95 backdrop-blur-md sticky top-0 z-[100] border-b border-white/10">
      {/* Logo - Much Larger */}
      <Link href="/" className="flex items-center flex-shrink-0">
        <Image
          src="/media/msai-logo.svg"
          alt="Media Stream AI"
          width={280}
          height={70}
          className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto"
          priority
          style={{ objectFit: 'contain' }}
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4 text-sm xl:text-base">
        {/* Solutions Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5 whitespace-nowrap">
            Solutions
            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
          </button>
          <div className="absolute top-full left-0 mt-2 w-[48rem] bg-black border-2 border-white/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[200] overflow-hidden">
            <div className="p-4 space-y-2">
              <Link href="/solutions" className="block px-4 py-4 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <div className="font-semibold text-base mb-1">Solutions Overview</div>
                <div className="text-sm text-white/50">GPU vs AI Agents</div>
              </Link>
              <a href="https://gpu.mediastreamai.com" target="_blank" rel="noopener noreferrer" className="block px-4 py-4 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <div className="font-semibold text-base mb-1 flex items-center gap-2">
                  GPU-as-a-Service <ExternalLink size={14} />
                </div>
                <div className="text-sm text-white/50">H200, B200, SambaNova RDU</div>
              </a>
              <a href="https://mother.mediastreamai.com" target="_blank" rel="noopener noreferrer" className="block px-4 py-4 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <div className="font-semibold text-base mb-1 flex items-center gap-2">
                  MOTHER AI Agents <ExternalLink size={14} />
                </div>
                <div className="text-sm text-white/50">Sovereign AI Deployments</div>
              </a>
            </div>
          </div>
        </div>

        {/* Sectors Dropdown - Single Column */}
        <div className="relative group">
          <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5 whitespace-nowrap">
            Sectors
            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
          </button>
          <div className="absolute top-full left-0 mt-2 w-[40rem] bg-black border-2 border-white/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[200] overflow-hidden">
            <div className="p-4 space-y-2">
              <Link href="/sectors#media" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <div className="font-medium text-base">Media & Broadcasting</div>
              </Link>
              <Link href="/sectors#film" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <div className="font-medium text-base">Film & TV Production</div>
              </Link>
              <Link href="/sectors#creative" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <div className="font-medium text-base">Creative Industries</div>
              </Link>
              <Link href="/sectors#advertising" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <div className="font-medium text-base">Advertising</div>
              </Link>
              <Link href="/government-defence" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <div className="font-medium text-base">Government & Defence</div>
              </Link>
              <Link href="/sectors#research" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <div className="font-medium text-base">Research & Education</div>
              </Link>
            </div>
            <div className="border-t border-white/10 p-4">
              <Link href="/sectors" className="block px-4 py-3 text-center text-blue-400 hover:text-blue-300 font-semibold transition-colors rounded-lg hover:bg-white/10">
                <div className="text-base">View All Sectors →</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Direct Links */}
        <Link 
          href="/government-defence" 
          className={`text-white/80 hover:text-white transition-colors whitespace-nowrap py-2 px-3 rounded-lg hover:bg-white/5 ${pathname === '/government-defence' ? 'text-white font-semibold bg-white/5' : ''}`}
        >
          Defence
        </Link>

        <Link 
          href="/data-centre" 
          className={`text-white/80 hover:text-white transition-colors whitespace-nowrap py-2 px-3 rounded-lg hover:bg-white/5 ${pathname === '/data-centre' ? 'text-white font-semibold bg-white/5' : ''}`}
        >
          ESG
        </Link>

        <Link 
          href="/partnerships" 
          className={`text-white/80 hover:text-white transition-colors whitespace-nowrap py-2 px-3 rounded-lg hover:bg-white/5 ${pathname === '/partnerships' ? 'text-white font-semibold bg-white/5' : ''}`}
        >
          Partners
        </Link>

        <Link 
          href="/blog" 
          className={`text-white/80 hover:text-white transition-colors whitespace-nowrap py-2 px-3 rounded-lg hover:bg-white/5 ${pathname === '/blog' ? 'text-white font-semibold bg-white/5' : ''}`}
        >
          Blog
        </Link>

        <Link 
          href="/about" 
          className={`text-white/80 hover:text-white transition-colors whitespace-nowrap py-2 px-3 rounded-lg hover:bg-white/5 ${pathname === '/about' ? 'text-white font-semibold bg-white/5' : ''}`}
        >
          About
        </Link>

        <Link href="/contact">
          <button className="px-5 xl:px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors text-white whitespace-nowrap ml-2">
            Contact
          </button>
        </Link>
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="lg:hidden text-white focus:outline-none p-2 hover:bg-white/10 rounded-lg transition-colors"
        onClick={() => setIsOpen(v => !v)}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="absolute top-full left-0 right-0 bg-black border-b border-white/10 shadow-2xl lg:hidden z-[200]">
          <div className="p-4 space-y-3 max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* Home */}
            <Link
              href="/"
              className={`block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors ${pathname === '/' ? 'bg-white/10 text-white' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            {/* Solutions Dropdown Mobile */}
            <div>
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="font-medium">Solutions</span>
                <ChevronDown size={18} className={`transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {solutionsOpen && (
                <div className="mt-2 space-y-2 bg-white/5 rounded-lg p-3">
                  <Link 
                    href="/solutions" 
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-medium">Solutions Overview</div>
                    <div className="text-xs text-white/50 mt-1">GPU vs AI Agents</div>
                  </Link>
                  <a 
                    href="https://gpu.mediastreamai.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-medium flex items-center gap-2">
                      GPU-as-a-Service <ExternalLink size={14} />
                    </div>
                    <div className="text-xs text-white/50 mt-1">H200, B200, SambaNova</div>
                  </a>
                  <a 
                    href="https://mother.mediastreamai.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-medium flex items-center gap-2">
                      MOTHER AI Agents <ExternalLink size={14} />
                    </div>
                    <div className="text-xs text-white/50 mt-1">Sovereign AI Deployments</div>
                  </a>
                </div>
              )}
            </div>

            {/* Sectors Dropdown Mobile */}
            <div>
              <button
                onClick={() => setSectorsOpen(!sectorsOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="font-medium">Sectors</span>
                <ChevronDown size={18} className={`transition-transform ${sectorsOpen ? 'rotate-180' : ''}`} />
              </button>
              {sectorsOpen && (
                <div className="mt-2 space-y-2 bg-white/5 rounded-lg p-3">
                  <Link 
                    href="/sectors#media" 
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Media & Broadcasting
                  </Link>
                  <Link 
                    href="/sectors#film" 
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Film & TV Production
                  </Link>
                  <Link 
                    href="/sectors#creative" 
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Creative Industries
                  </Link>
                  <Link 
                    href="/sectors#advertising" 
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Advertising
                  </Link>
                  <Link 
                    href="/government-defence" 
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Government & Defence
                  </Link>
                  <Link 
                    href="/sectors#research" 
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Research & Education
                  </Link>
                  <Link 
                    href="/sectors" 
                    className="block px-4 py-3 text-blue-400 hover:text-blue-300 font-semibold text-center hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    View All Sectors →
                  </Link>
                </div>
              )}
            </div>

            {/* Direct Links Mobile */}
            <Link 
              href="/government-defence" 
              className={`block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors ${pathname === '/government-defence' ? 'bg-white/10 text-white' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Defence & Sovereignty
            </Link>

            <Link 
              href="/data-centre" 
              className={`block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors ${pathname === '/data-centre' ? 'bg-white/10 text-white' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              ESG & Data Centres
            </Link>

            <Link 
              href="/partnerships" 
              className={`block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors ${pathname === '/partnerships' ? 'bg-white/10 text-white' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Partnerships
            </Link>

            <Link 
              href="/blog" 
              className={`block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors ${pathname === '/blog' ? 'bg-white/10 text-white' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>

            <Link 
              href="/about" 
              className={`block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors ${pathname === '/about' ? 'bg-white/10 text-white' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>

            {/* Contact Button Mobile */}
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <button className="w-full mt-2 px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors text-white">
                Contact Us
              </button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

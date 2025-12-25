"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin, Calendar, Send } from "lucide-react";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Email Us",
      value: "contact@mediastreamai.com",
      description: "Get a response within 24 hours",
      link: "mailto:contact@mediastreamai.com"
    },
    {
      icon: <Calendar className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Book a Meeting",
      value: "Schedule a Call",
      description: "Discuss your AI infrastructure needs",
      link: "/contact#schedule"
    },
    {
      icon: <MapPin className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Visit Our Offices",
      value: "Manchester, UK",
      description: "5 data centers across UK & EU",
      link: "/data-centre"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black via-blue-950/20 to-black py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-400 mb-4 md:mb-6 leading-tight">
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-6 md:mb-8 px-4">
              Ready to deploy sovereign AI infrastructure? Let's discuss how we can help your organization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {contactMethods.map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={method.link}>
                  <div className="p-6 md:p-8 bg-black/40 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all h-full cursor-pointer group">
                    <div className="text-blue-400 mb-4">{method.icon}</div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-base md:text-lg text-blue-300 mb-2 font-semibold">
                      {method.value}
                    </p>
                    <p className="text-sm md:text-base text-white/60">
                      {method.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-400/30 p-6 md:p-12 rounded-2xl text-center"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Start Your Sovereign AI Journey
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              Whether you need GPU infrastructure or turnkey AI agents, our team is ready to help you deploy sovereign AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <a href="mailto:contact@mediastreamai.com" className="w-full sm:w-auto">
                <button className="w-full px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-base md:text-lg transition-colors flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Email Us Now
                </button>
              </a>
              <Link href="/solutions" className="w-full sm:w-auto">
                <button className="w-full px-6 md:px-8 py-3 md:py-4 border border-white/20 hover:border-blue-400 rounded-lg font-semibold text-base md:text-lg transition-colors">
                  View Solutions
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <div className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Link href="/solutions">
              <div className="p-4 md:p-6 bg-black/40 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all text-center cursor-pointer">
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">Solutions</h4>
                <p className="text-xs md:text-sm text-white/60">GPU vs AI Agents</p>
              </div>
            </Link>
            <Link href="/data-centre">
              <div className="p-4 md:p-6 bg-black/40 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all text-center cursor-pointer">
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">Data Centers</h4>
                <p className="text-xs md:text-sm text-white/60">5 UK/EU Locations</p>
              </div>
            </Link>
            <Link href="/sectors">
              <div className="p-4 md:p-6 bg-black/40 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all text-center cursor-pointer">
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">Sectors</h4>
                <p className="text-xs md:text-sm text-white/60">Industry Solutions</p>
              </div>
            </Link>
            <Link href="/about">
              <div className="p-4 md:p-6 bg-black/40 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all text-center cursor-pointer">
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">About Us</h4>
                <p className="text-xs md:text-sm text-white/60">Our Story</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

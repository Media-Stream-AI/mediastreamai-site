"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin, Building2, User, Send, CheckCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    country: "",
    interest: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // ✅ INTEGRATED WITH SALES PLATFORM
      const response = await fetch("https://sales.mediastreamai.com/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Optional: Add API key for security
          // "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SALES_API_KEY}`
        },
        body: JSON.stringify({
          // Lead contact information
          contact: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            role: formData.jobTitle
          },
          
          // Lead source tracking
          source: "Website Contact Form",
          stage: "New",
          status: "new",
          
          // Priority based on interest
          priority: getPriorityFromInterest(formData.interest),
          
          // Additional metadata
          country: formData.country,
          interest: formData.interest,
          notes: formData.message,
          
          // Tracking information
          metadata: {
            form_type: "contact_page",
            url: typeof window !== 'undefined' ? window.location.href : '',
            timestamp: new Date().toISOString(),
            user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
            referrer: typeof document !== 'undefined' ? document.referrer : ''
          },
          
          // Custom fields based on interest
          custom_fields: {
            interest_category: formData.interest,
            preferred_contact_method: "email",
            lead_temperature: formData.interest.includes("gpu-infrastructure") || 
                             formData.interest.includes("both") ? "hot" : "warm"
          }
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("API Error:", error);
        throw new Error(error.message || "Failed to submit form");
      }

      const result = await response.json();
      console.log("Lead created:", result);

      setSubmitStatus("success");
      
      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        jobTitle: "",
        phone: "",
        country: "",
        interest: "",
        message: ""
      });

      // Optional: Track conversion event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: formData.interest,
          value: 1000
        });
      }

    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to determine lead priority
  const getPriorityFromInterest = (interest: string): "high" | "medium" | "low" => {
    if (interest === "gpu-infrastructure" || 
        interest === "both" || 
        interest === "government-defence") {
      return "high";
    }
    if (interest === "ai-agents" || interest === "data-centres") {
      return "medium";
    }
    return "low";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const quickStats = [
    { icon: <Mail className="w-6 h-6" />, label: "24hr Response", value: "Guaranteed" },
    { icon: <Building2 className="w-6 h-6" />, label: "Data Centers", value: "5 UK/EU" },
    { icon: <CheckCircle className="w-6 h-6" />, label: "Enterprise Ready", value: "ISO 27001" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black via-blue-950/20 to-black py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-400 mb-4 md:mb-6 leading-tight">
              Deploy Sovereign AI Infrastructure
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Join BBC, ITV, and Channel 4 in deploying 100% UK/EU sovereign AI. Get a response within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 md:py-12 px-4 md:px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {quickStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 bg-black/40 border border-white/10 rounded-xl"
              >
                <div className="text-blue-400">{stat.icon}</div>
                <div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                  <div className="text-lg font-semibold text-white">{stat.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Start Your AI Journey</h2>
                <p className="text-white/60 mb-6 md:mb-8">Fill out the form and our team will contact you within 24 hours.</p>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-400/30 rounded-lg flex items-center gap-3">
                    <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
                    <div>
                      <div className="font-semibold text-green-300">Thank you for your interest!</div>
                      <div className="text-sm text-white/70">Our team will contact you within 24 hours.</div>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-400/30 rounded-lg">
                    <div className="font-semibold text-red-300">Something went wrong</div>
                    <div className="text-sm text-white/70">Please try again or email us directly at contact@mediastreamai.com</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  {/* Name Fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                      placeholder="john.smith@company.com"
                    />
                  </div>

                  {/* Company & Job Title */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div>
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-white/80 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        required
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                        placeholder="CTO"
                      />
                    </div>
                  </div>

                  {/* Phone & Country */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                        placeholder="+44 20 1234 5678"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-white/80 mb-2">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                      >
                        <option value="">Select Country</option>
                        <option value="UK">United Kingdom</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                        <option value="NL">Netherlands</option>
                        <option value="IE">Ireland</option>
                        <option value="ES">Spain</option>
                        <option value="IT">Italy</option>
                        <option value="other-eu">Other EU</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Interest */}
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-white/80 mb-2">
                      I'm Interested In *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                    >
                      <option value="">Select an option</option>
                      <option value="gpu-infrastructure">GPU Infrastructure (H200, B200, SambaNova)</option>
                      <option value="ai-agents">AI Agent Deployments (MOTHER AI)</option>
                      <option value="both">Both GPU & AI Agents</option>
                      <option value="government-defence">Government & Defence Solutions</option>
                      <option value="data-centres">Data Centre Services</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                      placeholder="Tell us about your AI infrastructure needs..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Submit Enquiry
                      </>
                    )}
                  </button>

                  <p className="text-xs text-white/50 text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Right Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Why Choose Us */}
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-2xl p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Why MediaStream AI?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="font-semibold text-white">100% UK/EU Sovereign</div>
                      <div className="text-sm text-white/70">Zero foreign data transfer. Complete control.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="font-semibold text-white">40-60% Cost Savings</div>
                      <div className="text-sm text-white/70">Below AWS/Azure pricing with no compromise.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="font-semibold text-white">Proven at Scale</div>
                      <div className="text-sm text-white/70">Deployed by BBC, ITV, and Channel 4.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="font-semibold text-white">Military Veteran Run</div>
                      <div className="text-sm text-white/70">Operational excellence and security-first.</div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Contact Methods */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-4">Other Ways to Reach Us</h3>
                <div className="space-y-4">
                  <a href="mailto:contact@mediastreamai.com" className="flex items-center gap-3 text-white/80 hover:text-blue-400 transition-colors">
                    <Mail className="flex-shrink-0" size={20} />
                    <span className="text-sm md:text-base">contact@mediastreamai.com</span>
                  </a>
                  <Link href="/data-centre" className="flex items-center gap-3 text-white/80 hover:text-blue-400 transition-colors">
                    <MapPin className="flex-shrink-0" size={20} />
                    <span className="text-sm md:text-base">5 Data Centers across UK & EU</span>
                  </Link>
                </div>
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-2 gap-4">
                <Link href="/solutions" className="p-4 bg-black/40 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all text-center">
                  <div className="text-sm font-semibold text-white mb-1">Solutions</div>
                  <div className="text-xs text-white/60">GPU vs AI Agents</div>
                </Link>
                <Link href="/sectors" className="p-4 bg-black/40 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all text-center">
                  <div className="text-sm font-semibold text-white mb-1">Sectors</div>
                  <div className="text-xs text-white/60">Industry Solutions</div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

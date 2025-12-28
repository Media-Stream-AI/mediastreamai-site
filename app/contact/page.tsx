// ===================================
// WEBSITE: www.mediastreamai.com
// 
// WHERE TO PLACE THIS FILE:
// /mediastreamai-site/app/contact/page.tsx
// 
// INSTRUCTIONS:
// 1. Navigate to: mediastreamai-site/app/contact/
// 2. REPLACE the existing page.tsx with this file
// 3. This integrates contact form → Sales Platform CRM
// ===================================

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    country: "United Kingdom",
    interest: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://api.mediastreamai.com/api/leads/capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer msai_sk_live_XHChtYwp3WwmPP0k_sales_platform_2025",
        },
        body: JSON.stringify({
          source: "website_contact_form",
          page: window.location.href,
          type: "contact_form",
          lead: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            role: formData.jobTitle
          },
          metadata: {
            interest_category: formData.interest,
            notes: formData.message,
            country: formData.country,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            referrer: document.referrer,
            user_agent: navigator.userAgent,
            priority: "medium"
          },
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          jobTitle: "",
          country: "United Kingdom",
          interest: "",
          message: "",
        });

        // Track conversion in Google Analytics
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "conversion", {
            send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
            value: 1.0,
            currency: "GBP",
          });
        }

        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError("Failed to submit. Please try again or email us directly.");
      }
    } catch (err) {
      setError("Network error. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-400 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discuss how Media Stream AI can deliver sovereign AI infrastructure
            for your organization
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              {success && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-400/40 rounded-lg flex items-center gap-3">
                  <Check className="text-green-400" size={20} />
                  <p className="text-green-300">
                    Thank you! We'll be in touch shortly.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-400/40 rounded-lg">
                  <p className="text-red-300">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Company & Job Title */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Country & Interest */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                    >
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Other EU">Other EU</option>
                      <option value="United States">United States</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Interest *
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                    >
                      <option value="">Select...</option>
                      <option value="GPU Infrastructure">
                        GPU Infrastructure
                      </option>
                      <option value="AI Agents & LLMs">
                        AI Agents & LLMs
                      </option>
                      <option value="Data Centres">Data Centres</option>
                      <option value="Government/Defence">
                        Government/Defence
                      </option>
                      <option value="Partnership">Partnership</option>
                      <option value="Media Inquiry">Media Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Office Locations */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MapPin className="text-blue-400" size={24} />
                Office Locations
              </h2>
              <div className="space-y-4 text-white/80">
                <div>
                  <p className="font-semibold text-white">Manchester HQ</p>
                  <p className="text-sm">United Kingdom</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Liverpool</p>
                  <p className="text-sm">United Kingdom</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Durham</p>
                  <p className="text-sm">United Kingdom</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Düsseldorf</p>
                  <p className="text-sm">Germany</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Marseille</p>
                  <p className="text-sm">France</p>
                </div>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Mail className="text-blue-400" size={24} />
                Direct Contact
              </h2>
              <div className="space-y-4 text-white/80">
                <div>
                  <p className="font-semibold text-white">General Inquiries</p>
                  <a
                    href="mailto:contact@mediastreamai.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    contact@mediastreamai.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-white">Sales</p>
                  <a
                    href="mailto:sales@mediastreamai.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    sales@mediastreamai.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-white">Support</p>
                  <a
                    href="mailto:support@mediastreamai.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    support@mediastreamai.com
                  </a>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-400/30 rounded-2xl p-8 text-center">
              <p className="text-lg font-semibold mb-2">
                Typical Response Time
              </p>
              <p className="text-3xl font-bold text-blue-400 mb-2">
                &lt; 24 hours
              </p>
              <p className="text-sm text-white/70">
                We aim to respond to all inquiries within one business day
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

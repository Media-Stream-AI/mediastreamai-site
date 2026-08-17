"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Smartphone, Tv, Monitor, Download } from 'lucide-react';
import QRCode from 'qrcode';
import Image from 'next/image';

function SuccessContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    // Generate QR code for mobile app download
    QRCode.toDataURL('https://intuitv.app/mobile')
      .then(setQrCode)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen pt-20 section-padding">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan to-iris flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display mb-4">
            Welcome to <span className="text-gradient">IntuiTV</span>!
          </h1>

          <p className="text-xl text-muted mb-12">
            Your account is ready. Start watching in under 2 minutes.
          </p>

          {/* Access Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Mobile */}
            <div className="card-night rounded-2xl border border-hair p-6">
              <Smartphone className="w-12 h-12 mx-auto mb-4 text-cyan" />
              <h3 className="font-semibold text-mist mb-4">Mobile App</h3>

              {qrCode && (
                <div className="mb-4">
                  <Image src={qrCode} alt="QR Code" width={150} height={150} className="mx-auto" />
                  <p className="text-xs text-muted mt-2">Scan to download</p>
                </div>
              )}

              <div className="space-y-2">
                <a href="https://apps.apple.com/intuitv" className="btn-ghost block text-sm">
                  <Download className="w-4 h-4 inline mr-1" />
                  App Store
                </a>
                <a href="https://play.google.com/store/apps/intuitv" className="btn-ghost block text-sm">
                  <Download className="w-4 h-4 inline mr-1" />
                  Google Play
                </a>
              </div>
            </div>

            {/* Smart TV */}
            <div className="card-night rounded-2xl border border-hair p-6">
              <Tv className="w-12 h-12 mx-auto mb-4 text-iris" />
              <h3 className="font-semibold text-mist mb-4">Smart TV</h3>
              <p className="text-sm text-muted mb-4">
                Search "IntuiTV" in your TV's app store
              </p>
              <div className="text-xs text-muted space-y-1">
                <p>✓ Samsung • LG • Sony</p>
                <p>✓ Android TV • Fire TV</p>
                <p>✓ Apple TV • Roku</p>
              </div>
            </div>

            {/* Web */}
            <div className="card-night rounded-2xl border border-hair p-6">
              <Monitor className="w-12 h-12 mx-auto mb-4 text-violet" />
              <h3 className="font-semibold text-mist mb-4">Web Browser</h3>
              <p className="text-sm text-muted mb-4">
                Watch now - no download needed
              </p>
              <a href="https://watch.intuitv.app" className="btn-glow block">
                Launch Web App →
              </a>
            </div>
          </div>

          {/* Next Steps */}
          <div className="card-night rounded-2xl border border-hair p-8 text-left">
            <h3 className="text-2xl font-semibold text-mist mb-6 text-center">What's Next?</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan/15 flex items-center justify-center flex-shrink-0 text-cyan font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-mist mb-1">Check Your Email</h4>
                  <p className="text-sm text-muted">
                    We sent you login instructions and app download links
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan/15 flex items-center justify-center flex-shrink-0 text-cyan font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-mist mb-1">Download & Login</h4>
                  <p className="text-sm text-muted">
                    Choose your preferred device and sign in with your email
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan/15 flex items-center justify-center flex-shrink-0 text-cyan font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-mist mb-1">Start Watching</h4>
                  <p className="text-sm text-muted">
                    AI begins learning your preferences from day one
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20"></div>}>
      <SuccessContent />
    </Suspense>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

          {/* Brand */}
          <div>
            <h2 className="text-white font-semibold text-lg">
              Media Stream AI
            </h2>
            <p className="mt-2">
              Sovereign AI infrastructure, platforms, and research across the UK & EU.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-2">Navigate</h3>
            <ul className="space-y-1">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="https://gpu.mediastreamai.com" className="hover:text-white">GPU Cloud</a></li>
              <li><a href="https://mother.mediastreamai.com" className="hover:text-white">Mother</a></li>
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <h3 className="text-white font-semibold mb-2">Legal</h3>
            <ul className="space-y-1">
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white">Terms</a></li>
              <li>
                <a href="mailto:contact@mediastreamai.com" className="hover:text-white">
                  contact@mediastreamai.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-4 border-t border-gray-800 text-xs text-center text-gray-500">
          © {new Date().getFullYear()} Media Stream AI Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

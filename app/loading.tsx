
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-neon-blue/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-400 font-space-mono">Loading IntuiTV...</p>
      </div>
    </div>
  );
}

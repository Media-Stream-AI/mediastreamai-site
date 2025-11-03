<section className="py-16">
  <div className="grid md:grid-cols-2 gap-8 items-center">
    <div>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
        MOTHER AI – <span className="text-blue-400">Sovereign LLM</span>
      </h1>
      <p className="text-white/80 mb-4">
        The UK’s first sovereign LLM: built, trained, and hosted within British infrastructure,
        aligned with UK GDPR and EU AI Act obligations.
      </p>
      <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
        <li>Transformer LLM + tool interface for 30+ production models.</li>
        <li>Provenance registry and dataset checkpoints; audit-ready.</li>
        <li>Runs on NVIDIA H200 (training) and RDUs (inference) in our DCs.</li>
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="https://mother.mediastreamai.com" target="_blank" rel="noreferrer">
          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white">
            Open Mother Portal
          </button>
        </a>
        <a href="/models">
          <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white">
            Explore Models
          </button>
        </a>
      </div>
    </div>

    {/* ✅ Fixed image reference */}
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg">
      <img
        src="/media/image/dc-mother-hero.jpg"
        alt="MOTHER AI inside the Data Centre"
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
</section>

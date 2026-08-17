"use client";

import { motion } from "framer-motion";

export default function TechnologyPage() {
  const motherFamily = [
    {
      name: "MOTHER CORE",
      tagline: "Sovereign UK reasoning + agentic model",
      description:
        "Our sovereign UK reasoning and agentic model. The production 7B tier (~6.9B params) uses 48 layers, 3,072 hidden dimensions, 24 attention heads / 6 KV heads (GQA), SwiGLU, RMSNorm and RoPE, with a 4,096-token context and a 50,258-token vocabulary. Trained on a 2.4M-record curriculum spanning reasoning, tool-calling, RAG, document and code generation, and safety. A 70B tier is in testing.",
      link: "https://huggingface.co/MediaStreamAI/MOTHER_CORE_V3",
      linkLabel: "View public model card →",
    },
    {
      name: "MOTHER LLM",
      tagline: "General language model",
      description:
        "Our general-purpose language model, powering scripting, dialogue, narration and intelligent personalization across the platform.",
    },
    {
      name: "MOTHER CODE",
      tagline: "Code & engineering model",
      description:
        "A dedicated model for code and engineering tasks, supporting development, automation and technical generation workflows.",
    },
    {
      name: "MOTHER DeepVision",
      tagline: "Sovereign in-house text-to-video",
      description:
        "Our sovereign, in-house ViT plus projection layer - the text-to-video generator itself, not a third-party wrapper. DeepVision turns scenes and shots into moving images for long-form output.",
    },
  ];

  return (
    <main className="min-h-screen pt-20 text-mist">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 aurora-bg bg-exo-aurora" />
        <div className="container-custom text-center relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display mb-6"
          >
            Our <span className="text-gradient">Technology</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto text-lg text-muted"
          >
            IntuiTV runs on MediaStream AI&apos;s MOTHER models - a sovereign UK
            AI stack trained in-house from scratch on MSAI-controlled UK compute.
            Weights, data and inference stay under UK control.
          </motion.p>
        </div>
      </section>

      {/* Sovereign Stack */}
      <section className="section-padding bg-night-800/60">
        <div className="container-custom grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Sovereign by Design",
              description:
                "MediaStream AI is a UK sovereign AI company that owns its full stack: data centres, power, foundational models and products. Designed, owned and operated in Britain.",
            },
            {
              title: "Trained In-House",
              description:
                "MOTHER models are trained from scratch on MSAI-controlled UK compute - not fine-tunes. Reproducible, audited checkpoints with a locked inference path.",
            },
            {
              title: "Built for Compliance",
              description:
                "Built for UK/EU data residency and GDPR, with sovereign control over where data lives and how models run.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-night card-hover p-8"
            >
              <h3 className="text-xl font-semibold text-mist mb-4">
                {item.title}
              </h3>
              <p className="text-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MOTHER Model Family */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-mist mb-4">
              The <span className="text-gradient">MOTHER</span> model family
            </h2>
            <p className="max-w-2xl mx-auto text-muted">
              A family of sovereign, in-house models built and trained in the UK.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {motherFamily.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-night card-hover p-8"
              >
                <h3 className="text-2xl font-semibold text-mist mb-1">
                  {model.name}
                </h3>
                <p className="text-sm uppercase tracking-wide text-cyan mb-4">
                  {model.tagline}
                </p>
                <p className="text-muted mb-4">{model.description}</p>
                {model.link && (
                  <a
                    href={model.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan font-semibold link-grow"
                  >
                    {model.linkLabel}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MOTHER T2V - Sovereign Text-to-Video */}
      <section className="section-padding bg-night-800/60">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="chip mb-3">Model details</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-mist mb-4 mt-4">
              MOTHER <span className="text-gradient">T2V</span> - sovereign
              text-to-video
            </h2>
            <p className="max-w-3xl mx-auto text-muted">
              A sovereign, from-scratch latent text-to-video model: MOTHER&apos;s
              own 3D video VAE and flow-matching Diffusion Transformer,
              conditioned on the frozen MOTHER CORE-7B text backbone. 100%
              MOTHER-trained - no external generator weights (Sora, Wan, LTX,
              SVD) are embedded; external models are used only as data teachers.
            </p>
          </motion.div>

          {/* Architecture cards */}
          <div className="grid gap-8 md:grid-cols-3 mb-10">
            {[
              {
                title: "3D Video VAE",
                meta: "≈118M params",
                description:
                  "KL-regularised autoencoder with 8× spatial and 4× temporal compression to a 16-channel spatiotemporal latent - the compact space the transformer generates in.",
              },
              {
                title: "Latent Diffusion Transformer",
                meta: "≈734M params",
                description:
                  "24 blocks, hidden size 1024, 16 heads, patch 2. Flow-matching velocity objective with classifier-free guidance, adaLN-zero time conditioning, and axial-sinusoidal 3D positions for resolution-agnostic generation.",
              },
              {
                title: "CORE-7B Text Conditioning",
                meta: "48 layers · 3,072-d",
                description:
                  "The DiT cross-attends to embeddings from a frozen MOTHER CORE-7B text backbone (3,072-d), grounding every generation in MOTHER's own sovereign language model.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-night card-hover p-8"
              >
                <h3 className="text-xl font-semibold text-mist mb-1">
                  {item.title}
                </h3>
                <p className="text-sm font-mono text-cyan mb-4">
                  {item.meta}
                </p>
                <p className="text-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Spec list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-night p-8"
          >
            <h3 className="text-xl font-semibold text-mist mb-6">
              Specification
            </h3>
            <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                {
                  term: "Total parameters",
                  value: "~0.85B (≈118M VAE + ≈734M DiT)",
                },
                {
                  term: "Model type",
                  value:
                    "From-scratch latent text-to-video (3D VAE + flow-matching DiT)",
                },
                {
                  term: "Text encoder",
                  value: "Frozen MOTHER CORE-7B (48 layers, 3,072-d)",
                },
                {
                  term: "Training data",
                  value: "Trained from scratch on real captioned clips",
                },
                {
                  term: "Sovereignty",
                  value:
                    "100% MOTHER-trained - no Sora / Wan / LTX / SVD weights embedded; UK-controlled",
                },
                {
                  term: "Resolution",
                  value: "720p (upgrading to higher resolutions)",
                },
                {
                  term: "Inference",
                  value: "NVIDIA GB10 (Blackwell) inference nodes",
                },
                {
                  term: "Evaluation",
                  value:
                    "Official VBench text-to-video benchmark (scores published as measured)",
                },
                {
                  term: "Delivery",
                  value: "Adaptive HLS up to 4K",
                },
              ].map((spec) => (
                <div
                  key={spec.term}
                  className="border-b border-hair pb-3 last:border-0"
                >
                  <dt className="text-sm uppercase tracking-wide text-cyan mb-1">
                    {spec.term}
                  </dt>
                  <dd className="text-muted">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* Text-to-Video & Long-Form Chain */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-mist mb-4">
              Script to <span className="text-gradient">screen</span>
            </h2>
            <p className="max-w-3xl mx-auto text-muted">
              Text-to-video runs on MOTHER DeepVision. From a single brief, MOTHER
              LLM and CORE expand it into scenes and shots, DeepVision generates
              the video, and the platform assembles long-form output of up to
              around 1.5 hours.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Brief",
                body: "Start from one brief or idea.",
              },
              {
                step: "2",
                title: "Scenes & Shots",
                body: "MOTHER LLM + CORE plan scenes and shots.",
              },
              {
                step: "3",
                title: "DeepVision T2V",
                body: "MOTHER DeepVision generates the video.",
              },
              {
                step: "4",
                title: "Assembly",
                body: "Assembled into long-form, up to ~1.5 hours.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-night card-hover p-6"
              >
                <div className="text-gradient font-display text-3xl mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-mist mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted">{item.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-muted mt-10"
          >
            The same pipeline powers the Mini-Drama System and IntuiSTUDIO, with
            support for over 60 languages and broadcaster-grade HLS playout up to
            4K.
          </motion.p>
        </div>
      </section>

      {/* Sovereign Infrastructure */}
      <section className="section-padding bg-night-800/60">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-mist mb-4">
              UK <span className="text-gradient-ember">sovereign</span> infrastructure
            </h2>
            <p className="max-w-3xl mx-auto text-muted">
              MOTHER runs on owned compute and sovereign power, hosted in the UK.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Owned GPU Compute",
                description:
                  "NVIDIA B300 and H200 GPUs hosted in the UK - Scotland (Dundee) and Manchester (2026).",
              },
              {
                title: "Sovereign Power",
                description:
                  "Owned compute and sovereign power, with low-PUE free-cooling for efficient operation.",
              },
              {
                title: "Data Residency & GDPR",
                description:
                  "Built for UK/EU data residency and GDPR, with reproducible, audited checkpoints and a locked inference path.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-night card-hover p-8"
              >
                <h3 className="text-xl font-semibold text-ember mb-4">
                  {item.title}
                </h3>
                <p className="text-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MOTHER AI CTA Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-mist mb-8"
          >
            Learn more about <span className="text-gradient">MOTHER AI</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto text-muted mb-10"
          >
            MOTHER AI is the sovereign intelligence layer behind IntuiTV -
            orchestrating discovery, personalization, generation and optimization
            in real time.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            href="https://mother.mediastreamai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center gap-2"
          >
            Visit MOTHER AI Platform →
          </motion.a>
        </div>
      </section>
    </main>
  );
}

// The six MSAI platform entry points shown as cubes in the home-page hero.
//
// These are *destinations*, not the seven-layer stack (see StackDiagram): each
// one is a product surface a visitor can open. Every surface that renders them
// - the WebGL cube scene, its accessible HTML link list, the no-WebGL fallback
// and the platforms section - reads from this list so URLs cannot drift.
//
// `status` is deliberately conservative and only restates what the product
// itself or this repository already publishes. Changes need sign-off (see
// docs/audit/homepage-route-audit.md, "Status labels").

export type PlatformStatus = 'group' | 'live' | 'rolling-out' | 'early-access' | 'by-engagement' | 'in-development';

export const PLATFORM_STATUS_LABEL: Record<PlatformStatus, string> = {
  group: 'Group',
  live: 'Live',
  // gpu.mediastreamai.com: GPU clusters "going live throughout 2026".
  'rolling-out': 'Rolling out 2026',
  'early-access': 'Walkthroughs on request',
  'by-engagement': 'By engagement',
  'in-development': 'In development',
};

export interface Platform {
  id: string;
  /** Display name, upper-case as rendered on the cube. */
  name: string;
  /** Exact destination. Do not change without approval. */
  href: string;
  /** Opens on another domain (new tab for HTML links). */
  external: boolean;
  /** One-line role. */
  kicker: string;
  /** Who it is for. */
  audience: string;
  /** The problem it solves, one sentence. */
  problem: string;
  /** Call-to-action verb phrase used on tooltips and links. */
  action: string;
  status: PlatformStatus;
  /** Stack layers (StackDiagram numbering) this platform sits on. */
  layers: number[];
  /** Face artwork base path; `-1024.webp`, `-1600.webp`, `-1024.avif` exist. */
  image: string;
  alt: string;
  /** Accent used for the cube rim light and UI highlights. */
  accent: string;
}

export const PLATFORMS: Platform[] = [
  {
    id: 'msai',
    name: 'MEDIA STREAM AI',
    href: 'https://www.mediastreamai.com',
    external: false,
    kicker: 'The sovereign stack',
    audience: 'Partners, investors, government and enterprise buyers',
    problem: 'One accountable British owner across power, compute, models and applications.',
    action: 'Discover the stack',
    status: 'group',
    layers: [1, 2, 3, 4, 5, 6, 7],
    image: '/msai-cubes/media-stream-ai-sovereign-stack',
    alt: 'Media Stream AI artwork: "We build every block of British sovereign AI" beside the seven stack layers from land, power and heat up to dual-use defence.',
    accent: '#3B5BFF',
  },
  {
    id: 'mother-ai',
    name: 'MOTHER AI',
    href: 'https://www.motherai.uk',
    external: true,
    kicker: 'Sovereign foundation intelligence',
    audience: 'Organisations that need an AI assistant and models they can host in the UK',
    problem: 'Capable AI without sending prompts, documents or weights through a foreign provider.',
    action: 'Meet MOTHER',
    status: 'live',
    layers: [4],
    image: '/msai-cubes/mother-ai-assistant',
    alt: 'MOTHER AI assistant home screen with a wireframe face, "British sovereign intelligence" and document, CV and report shortcuts.',
    accent: '#22D3EE',
  },
  {
    id: 'mother-exo',
    name: 'MOTHER EXO',
    href: 'https://robotics.mediastreamai.com',
    external: true,
    kicker: 'Physical AI and humanoid robotics',
    audience: 'Industrial, research and defence partners exploring embodied AI',
    problem: 'A sovereign world model and humanoid platform rather than an imported robot stack.',
    action: 'Explore robotics',
    status: 'in-development',
    layers: [6],
    image: '/msai-cubes/mother-exo-robotics',
    alt: 'MSAI Robotics site showing the MOTHER EXO gold and black humanoid beside the headline "MOTHER EXO".',
    accent: '#E8B44A',
  },
  {
    id: 'mother-sentinel',
    name: 'MOTHER SENTINEL',
    href: 'https://sentinel.motherai.uk',
    external: true,
    kicker: 'Operational intelligence for data centres',
    audience: 'Data-centre and critical-site operators',
    problem: 'One command view of security, power, cooling and compute across a site.',
    action: 'Open Sentinel',
    status: 'early-access',
    layers: [2, 4],
    image: '/msai-cubes/mother-sentinel-command-centre',
    alt: 'MOTHER SENTINEL command centre: operational overview of a data-centre campus with site status, an aerial site map and critical infrastructure panels.',
    accent: '#F59E0B',
  },
  {
    id: 'msai-cloud',
    name: 'MSAI CLOUD & COMPUTE',
    href: 'https://gpu.mediastreamai.com',
    external: true,
    kicker: 'Sovereign GPU cloud',
    audience: 'AI teams, model builders and enterprises that need UK/EU GPU capacity',
    problem: 'Multi-tenant, metered GPU clusters under one sovereign control plane, with no hyperscaler in the path.',
    action: 'Open the control plane',
    status: 'rolling-out',
    layers: [2, 3],
    image: '/msai-cubes/msai-cloud-compute-gpu',
    alt: 'MSAI Cloud control plane for MSAI Compute: GPU capacity counters, a rack illustration and the Compute, Models and Control service cards.',
    accent: '#5FB82A',
  },
  {
    id: 'intuistudio',
    name: 'INTUISTUDIO',
    href: 'https://studio.intuitv.app',
    external: true,
    kicker: 'AI-native video creation',
    audience: 'Creators, broadcasters and production teams',
    problem: 'Script-to-screen video production on UK-hosted models and render nodes.',
    action: 'Explore Studio',
    status: 'live',
    layers: [5],
    image: '/msai-cubes/intuistudio-video-creation',
    alt: 'IntuiStudio site with the headline "The future of video creation is here" in lime over a cinematic still.',
    accent: '#C6F833',
  },
];

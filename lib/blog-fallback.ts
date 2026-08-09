// Local fallback blog posts for mediastreamai.com.
// The site is normally hub-driven (sales.mediastreamai.com/api/blog/msai); these
// posts render when the hub API returns nothing for a slug, so a critical
// press release can never drop off its URL because of a DB edit. The hub copy
// always takes precedence when present (see lib/blog.ts).
import type { BlogPost } from './blog';

export const FALLBACK_POSTS: BlogPost[] = [
  {
    "id": "fallback-mother-exo-v5",
    "brand": "msai",
    "slug": "mother-exo-v5-one-mind-for-land-sea-and-air",
    "title": "MOTHER EXO v5: One Mind for Land, Sea, and Air",
    "excerpt": "One model for land, sea and air. MOTHER EXO v5 pairs a single shared vision-and-reasoning core with specialised heads that fly drones, drive vehicles, and control humanoids — coordinating disaster response as one coherent mind.",
    "body": "Picture the worst day. An earthquake has flattened a town in a remote valley. Roads are gone. Power is out. Communications are down. The nearest response team is hours away, and every one of those hours costs lives.\n\nNow picture a single intelligence stepping into that moment. It launches a swarm of drones that fan out across the valley, reading the terrain metre by metre, spotting the faint heat of a survivor trapped under a collapsed roof, mapping which routes are still passable and which are buried. At the same time, that same intelligence is driving heavy vehicles loaded with water and medication along the routes it just mapped, threading them past debris no human driver could navigate in the dark. It is piloting autonomous transports carrying human rescue crews to the exact coordinates where survivors were found. And on the ground, at the rubble itself, it is directing humanoid machines that lift boulders and shift fallen masonry — machines many times stronger than the people they are digging out.\n\nOne model. Land, sea, and air. Working in concert to help humanity through its hardest hours. That is MOTHER EXO.\n\n## From Perception to Action\n\nMost AI models see, or they read, or they generate. MOTHER EXO does something different. It perceives the world in three dimensions, understands what is happening within it, remembers what has happened, and acts across physical machines to change the outcome. It is not a chatbot that describes a disaster. It is an operational intelligence that responds to one.\n\nTo do that, MOTHER EXO is not a single monolithic brain. It is a shared vision and reasoning core feeding a set of specialised output pathways — what we call heads. Each head is a distinct capability trained for a specific job, but all of them draw on the same underlying understanding of the world. This is the architectural idea at the heart of the model, and it is what lets one intelligence coordinate a drone in the sky and a humanoid on the ground at the same time, with both sharing a single, coherent picture of the scene.\n\n## The Core: A Shared Understanding of the World\n\nAt the centre of MOTHER EXO v5 sits a unified vision and reasoning backbone. Everything the model does begins here. The core takes in raw sensory input — camera feeds, depth, motion, spatial data — and builds a live model of the environment: where things are, what they are, how they are moving, and what is likely to happen next.\n\nCrucially, this core carries both situational awareness and historical awareness. It does not just see the current frame. It holds context: the building was intact ten minutes ago, that beam has shifted twice, this survivor was last responsive thirty seconds back. That memory of the scene is what turns raw perception into judgement.\n\nBecause every head shares this single core, a discovery made by one part of the system is instantly available to all the others. A drone spotting a survivor does not have to hand a report to a separate ground system. The whole model already knows.\n\n## The Heads: Specialised Hands on a Single Mind\n\nAround that shared core, MOTHER EXO v5 runs multiple specialised heads. Each head is a trained output pathway — effectively a set of weights tuned for one class of task — that converts the core's understanding into concrete action or output. Here is what they mean in the disaster scenario.\n\n**The perception and detection head** is the model's eyes at scale. It runs across the drone swarm, scanning vast areas and picking out what matters: heat signatures, human forms, movement under debris, structural hazards, passable and impassable ground. This is the head that finds people. Its weights are tuned for one thing above all: not missing a survivor.\n\n**The aerial control head** flies the drones. It takes the search intent from the core and turns it into flight: coverage patterns over the valley, altitude and positioning for the best sensor angle, coordinated movement so the swarm searches efficiently without overlap. It keeps the aircraft stable, safe, and productive while the perception head reads what they see.\n\n**The ground and vehicle head** drives. This is the pathway that pilots the water and medication transports along the routes the core has mapped, and steers the autonomous vehicles carrying human rescue teams to precise locations. Its weights encode the hard problem of moving heavy machines through a broken, unpredictable environment: navigation around debris, traction on unstable surfaces, safe delivery of a payload that lives depend on.\n\n**The manipulation and humanoid head** is the model's hands and strength. This head controls the humanoid machines at the rubble, planning and executing the physical work of rescue: lifting boulders, clearing fallen masonry, bracing debris so a survivor can be reached. Because these machines are many times stronger than a person, this head carries the heaviest responsibility for precision and care. It has to be powerful and gentle in the same motion — moving a tonne of concrete without harming the person beneath it.\n\n**The situational reasoning head** is the strategist. It sits closest to the core's judgement and answers the question no single sensor can: what do we do next? It weighs where survivors are, which are most urgent, which routes are open, which machines are free, and it sequences the whole operation. It is the head that decides the drone should keep searching the north ridge while the humanoids concentrate on the school, and the transports prioritise the clinic. It turns capability into a plan.\n\n## Why It Has to Be One Model\n\nThe reason MOTHER EXO unifies all of this under a single core, rather than stitching together separate systems, is coordination.\n\nIn a real disaster, the hardest problem is not any one task. Flying a drone is solved. Driving a vehicle is solved. Moving a heavy object is solved. The unsolved problem is orchestration: getting every one of those systems to share the same understanding, react to each other in real time, and pull in the same direction under conditions that change by the second.\n\nWhen the perception head finds a survivor, the situational head can re-task the aerial head to hold position overhead as a beacon, route the ground head to send a transport, and direct the manipulation head to begin clearing — all in one continuous decision, because it is all one mind. There is no integration layer, no handoff delay, no mismatched picture of the scene. The model that sees the survivor is the same model that reaches them.\n\nThat is the leap in v5. Not a better drone pilot or a stronger robot in isolation, but a single intelligence whose heads act as one body across land, sea, and air.\n\n## What v5 Represents\n\nMOTHER EXO v5 is a step toward embodied intelligence that serves people when it matters most. The architecture — one shared core of vision, reasoning, and memory, feeding multiple specialised heads for aerial, ground, manipulation, perception, and strategy — is built for exactly the moment described above: the remote disaster where every capability has to work together, instantly, with no room for error.\n\nA model that flies, drives, lifts, searches, and decides. One mind, controlling land, sea, and air, built to help humanity through its hardest of times. That is what MOTHER EXO is.\n\nMOTHER EXO holds a **Strike 0** posture across every domain: observe-and-advise, non-kinetic, human-in-the-loop. It is built to find and reach people, never to target them.\n\n[Learn more at www.motherai.uk/exo](https://www.motherai.uk/exo)",
    "image_url": null,
    "image_alt": null,
    "primary_link": "https://www.motherai.uk/exo",
    "topic": "MOTHER EXO Robotics applications",
    "published_at": "2026-07-14T09:00:00Z",
    "links": [
      {
        "label": "MOTHER EXO",
        "url": "https://www.motherai.uk/exo"
      }
    ]
  },
  {
    "id": "fallback-epoka-50m",
    "brand": "msai",
    "slug": "press-release-msai-secures-50m-financing-deal-with-epoka-to-scale-uk-sovereign-a",
    "title": "MSAI Secures £50M Financing Deal with EPOKA to Scale UK Sovereign AI Compute Infrastructure",
    "excerpt": "Landmark B2B partnership accelerates massive multi-vendor hardware deployment at the MSAI Scotland campus to eliminate extraterritorial data compliance risks.",
    "body": "**Landmark B2B partnership accelerates massive multi-vendor hardware deployment at MSAI Scotland campus to eliminate extraterritorial data compliance risks.**\n\n*MANCHESTER, UK — June 2026*\n\nMANCHESTER, UK — Media Stream AI (MSAI), a pioneer in UK sovereign digital infrastructure, today announced it has signed a definitive £50 million financing and partnership agreement with Denmark-based enterprise hardware specialist EPOKA. The landmark cross-border collaboration establishes a blueprint for how forward-thinking UK and European technology companies can jointly finance and deploy AI infrastructure at a multi-megawatt scale.\n\nThis will directly accelerate the rapid expansion of MSAI Scotland, the company's largest deployment of sovereign hardware to date. The agreement utilizes an insured Residual Value Insurance (RVI) framework. Under the terms of the deal, EPOKA provides a guaranteed £50 million residual buyback commitment on MSAI's underlying hardware assets. This structural commitment operates as an immediate credit note, unlocking purchasing power and a diverse compute pipeline.\n\nThe incoming hardware will be deployed entirely at the secure MSAI Scotland campus, which serves as the company's primary location for localized hardware operations. To provide true multi-vendor resilience for enterprise organizations seeking to diversify their technology stacks, MSAI is installing environments that combine both market-leading NVIDIA and AMD graphics processing units (GPUs).\n\nFurthermore, MSAI is actively preparing its deployment lines to integrate advanced European and UK silicon options, including ARM's recently announced specialized processors, as they become commercially available on the market.\n\n## Bringing Regulatory Sovereignty to UK AI\n\nBecause these high-performance compute clusters are located and managed entirely within the legal boundaries of the United Kingdom they carry no exposure to foreign legal frameworks such as the US CLOUD Act. The jurisdictional boundary addresses the UK's shifting compliance landscape, mapping to the data residency mandates of the Data (Use and Access) Act and the Ministry of Defence's Secure-by-Design principles and ensuring meaningful human control remains at the hardware layer.\n\nWhile physical compute capacity scaling is concentrated at the Scotland campus, MSAI's Manchester office will remain the corporate head office and primary development site for its flagship MOTHER EXO humanoid robotics platform.\n\n## The Shift to Sovereign AI and Why it Matters\n\nThe deployment of the MOTHER model ecosystem provides a timely case study into why computing infrastructure is increasingly being seen as needing the same oversight as traditional critical national infrastructure, like energy or water utilities.\n\nWhen enterprises and public services rely entirely on foreign cloud providers, they inherit profound structural vulnerabilities. These include exposure to abrupt cross-border regulatory changes, models being blocked for non-US consumers, pricing volatility, and deep remote-system dependencies. Building and maintaining local, single-tenant data infrastructure means sensitive operational data and metadata remain entirely inside national boundaries.\n\nOwning this local foundation allows MSAI to train and run its software ecosystem with verifiable, auditable data safety. The core MSAI system includes:\n\n• **MOTHER CORE:** A 7-billion-parameter model designed for Science, Mathematics & chain-of-thought reasoning, also strong in the orchestration of multi-agent workflows.\n• **MOTHER EXO:** A multi-modal world model built to process spatial and temporal data for humanoid robotics, autonomous vehicle routing, and flight navigation.\n• **IntuiSTUDIO:** A production tool suite designed to automate workflows within media and broadcast environments.\n\n## Localised AI for Mainstream businesses\n\nFor regular commercial enterprises, this deployment provides a practical path to access single-tenant GPU capacity without inheriting the risk of vendor lock-in.\n\nTo help navigate the multi-vendor environment, MSAI has partnered with Canopy Cloud. Operating as an infrastructure broker and cloud optimization partner, Canopy Cloud coordinates configuration details and optimizes workloads to match corporate tasks directly to MSAI's underlying hardware. This collaboration allows businesses to run localised AI applications with complete cost transparency, shorter procurement timelines, and zero data exposure to foreign cloud platforms.\n\n## Commentary\n\n**Christian Stenild, CEO, EPOKA:**\n\"We're delighted to be partnering with MSAI on this agreement. With our Residual Value Solution, we help MSAI de-risk their investment and unlock the funding needed, backed by more than 35 years of experience. That kind of certainty is exactly what unlocks financing and lets ambitious infrastructure projects like this one move from plan to reality. We're excited to support MSAI's growth in sovereign UK AI compute and to help build this kind of European collaboration, and more broadly, we're proud to play a part in the continued development of the AI sector.\"\n\n**Scott Collin, Head of Government & Defence at Media Stream AI (MSAI):**\n\"For organizations operating within regulated areas like government or defence-adjacent research, data security is critical. This investment means our clients have choices in how they insulate their operations from overseas interference and allows us to support government, defence, and commercial clients as well as maintaining the continuous dataset training needed for our underlying MOTHER model ecosystem.\"\n\n**Christopher Kenna, CEO & Founder of Media Stream AI (MSAI):**\n\"When we talk about digital assets as critical infrastructure, we are really talking about where our data lives and who is accountable for it. Building sovereign AI infrastructure for the UK & Europe is our one mission. We are scaling our hardware footprint in Scotland while keeping our development head office in Manchester, because we believe the systems managing local workflows should be built and supported here. Publishing our core weights on Hugging Face is a deliberate choice; it ensures that output verification is treated as an open, auditable reality rather than a corporate marketing claim. This agreement with EPOKA is a practical financial mechanism that allows us to expand that footprint without relying on foreign cloud platforms.\"\n\n### ENDS ###\n\n**About MSAI:** Media Stream AI Limited is a UK company focused on European Sovereignty across Infrastructure & AI Compute, Foundational Models with Agentic Orchestration platforms and the ambition of producing 1000+ AI Humanoids per year by 2027.",
    "image_url": "/images/epoka-msai-50m.png",
    "image_alt": "EPOKA and Media Stream AI co-branded partnership graphic",
    "primary_link": "https://mediastreamai.com",
    "topic": "UK sovereign AI infrastructure",
    "published_at": "2026-06-10T09:00:00Z",
    "links": [
      {
        "label": "EPOKA",
        "url": "https://www.epoka.com"
      },
      {
        "label": "Canopy Cloud",
        "url": "https://canopycloud.io"
      },
      {
        "label": "MOTHER CORE V3 on Hugging Face",
        "url": "https://huggingface.co/MediaStreamAI/MOTHER_CORE_V3"
      }
    ]
  },
  {
    "id": "fallback-thirty-days-of-building",
    "brand": "msai",
    "slug": "thirty-days-of-building",
    "title": "Thirty Days of Building",
    "excerpt": "What we secured at Media Stream AI in the last month, in plain terms. Grid capacity, sovereign generation, a published UK model and new partners.",
    "body": `There is a particular kind of frustration that comes with building infrastructure. The work that matters most is the work nobody can see. Planning applications. Connection offers. Gas nominations. Switchgear ratings. Thermal efficiency curves. None of it photographs well and none of it makes a headline.

So every so often it is worth stopping and writing down what actually got done.

Here is our last thirty days.

## We secured a firm grid connection offer

We now hold a formal connection offer for 25 MVA at 33 kV into our Dundee campus, from a named grid supply point, with an engineered route.

That sentence takes two seconds to read and it took months to earn. Grid capacity in the UK is the single hardest constraint on AI infrastructure right now. Queues are long, offers are conditional, and plenty of announced projects quietly never get one. We have ours in writing.

## Our gas is live, and we tripled the roadmap

Our sovereign gas service is live at the site boundary at 25 MWth. This month we locked the staged plan that takes it to 50 MWth at month six and 75 MWth at month twelve.

Gas primary generation is a deliberate choice, not a compromise. It means we are not waiting in a queue to serve our first customers, and it means our capacity ramp is something we control rather than something we are granted.

## We finished the cooling engineering

We completed the free cooling design and a full waste heat recovery study, landing on a design PUE of 1.08.

We also studied a heat driven cooling system and decided against it, because the numbers did not justify it against the free cooling scheme we already have. Publishing the things you decided not to build is a reasonable test of whether anyone is actually doing the engineering.

## Our model is public, and the next one is training

MOTHER CORE V3 is published and openly available on Hugging Face. Anyone can download the weights and test them.

We say this plainly because it matters: MOTHER CORE is trained from scratch. It is not a fine tune of somebody else's model with a British name on the front. That is a slower, harder and more expensive road, and it is the only road that produces something genuinely sovereign.

V4 is in training now on a substantially expanded corpus.

## We released MOTHER EXO v5

MOTHER EXO is our embodied model. One shared vision, reasoning and memory core feeding specialised output heads for aerial systems, ground vehicles and humanoid units.

The scenario we designed it around is disaster response. Drones searching from the air, autonomous ground vehicles carrying supplies and crew, and humanoid units doing the physical work that people cannot safely do. One coherent intelligence coordinating across all of it, with a human in the loop at every decision that matters.

v5 went live this month. You can read the release at motherai.uk/exo.

## We added partners

We executed a new strategic partnership and signed an engagement covering a two thousand GPU deployment for the campus. We also brought in written statements from partners across flooring, generation, hardware, white space fit out and professional services, so that anyone assessing this project can hear it from them rather than from us.

That last point is deliberate. The most useful thing we can do for anyone evaluating Media Stream AI is put them in front of the people we work with.

## What comes next

The next thirty days have one objective: first tenants in the hall.

Everything above is input. The output is a customer taking delivery of powered, cooled, secured white space in Dundee and putting compute into it. That is the only measure that counts, and it is what we are pointed at.

We will keep writing these. Some months the list will be shorter. We will publish it anyway.

Built in the UK. Owned in the UK. Run in the UK.`,
    "image_url": null,
    "image_alt": null,
    "primary_link": "https://www.mediastreamai.com/blog/thirty-days-of-building",
    "topic": "UK sovereign AI infrastructure",
    "published_at": "2026-08-09T08:00:00.000Z",
    "links": [
      { "label": "MOTHER EXO", "url": "https://www.motherai.uk/exo" },
      { "label": "MOTHER CORE V3 on Hugging Face", "url": "https://huggingface.co/MediaStreamAI/MOTHER_CORE_V3" }
    ]
  }
];

/**
 * HELD — do NOT publish. `nine-million-records` has open publication blockers
 * (unconfirmed news-sample licence, a crawler-policy contradiction, placeholder
 * fields, EU-counsel sign-off, and the Article 53 filing must be live and
 * linkable first). It is intentionally NOT part of FALLBACK_POSTS, so it never
 * renders. To publish once every blocker is closed, move this entry into
 * FALLBACK_POSTS above — a one-line change.
 */
export const HELD_POSTS: BlogPost[] = [
  {
    "id": "held-nine-million-records",
    "brand": "msai",
    "slug": "nine-million-records",
    "title": "Nine Million Records",
    "excerpt": "We published what we trained MOTHER CORE on. Here is the whole corpus, and the three numbers that matter most.",
    "body": `On 2 August the EU AI Act's transparency obligations came into force and the European AI Office gained the power to demand information, inspect models and levy fines.

In June the legislators deferred the heaviest part of the regime. The high risk obligations everyone had been planning around moved to December 2027 for standalone systems and August 2028 for systems embedded in regulated products.

A lot of companies read the word deferred and stood down. That is wrong on the facts, because the transparency duties were not deferred and the general purpose model obligations have been in force since last August. It is also wrong on the strategy, because the delay extended the deadline on the one task most organisations have not finished.

We built for the original dates. We have not stood down.

## The obligation most people have missed

Publish an open weight general purpose model and you are a provider under the Act.

The open source exemption is real and it is narrower than people assume. It removes the technical documentation package and the downstream information pack. It does not remove the requirement for a written policy on complying with Union copyright law, and it does not remove the requirement to publish a sufficiently detailed summary of your training content to the AI Office template.

Both survive. Publishing weights satisfies neither. Since 2 August, the AI Office can ask.

## What is in the published models

MOTHER CORE V2 and V3 are the same architecture at successive checkpoints of one continued training run. Roughly 6.9 billion parameters, 48 layers, grouped query attention, 4096 token context, open weights.

They were trained on 1,662,215 unique records, balanced sampled into a 2,400,092 record curriculum.

**51.30 per cent, publicly available datasets.** Openly available datasets from Hugging Face and equivalent repositories: instruction and chat, question answering and knowledge, mathematics and reasoning, code, summarisation, safety and alignment, and multilingual material including Welsh, Irish and Scottish Gaelic parallel corpora.

**27.78 per cent, synthetic data generated by us.** Agentic tool use and retrieval scenarios, tool routing and orchestration, error recovery, grounding and citation, and generated arithmetic and reasoning curricula.

**20.63 per cent, internally created or curated.** Hand authored UK core facts and model identity data, Gaelic and Welsh curation, defensive security material, an assembled mathematics set, and observe and advise operator scenarios that are non kinetic and human in the loop by design.

**0.30 per cent, a small news derived question answering sample.**

## The three numbers I am proudest of

Measured across those published models:

**0.00 per cent licensed third party private data.**

**0.00 per cent first party web crawling or scraping.**

**0.00 per cent user or platform data.**

We did not crawl the open web to build them. Web origin content reached the corpus only inside published third party datasets, used under the terms on which those datasets are published. And we have never trained on our users, because we do not treat the people who use our products as a data source.

That combination is a direct consequence of training from scratch rather than fine tuning somebody else's weights. It is slower and considerably more expensive. It also means the provenance question has an answer instead of an inheritance.

## The full corpus

MOTHER CORE V4 is training now, on approximately 9.14 million records.

**71.13 per cent, publicly available datasets.**

**19.98 per cent, synthetic and MSAI generated.**

**8.10 per cent, internally created.**

**0.79 per cent, other, classification still open.**

The interesting number is the third one. Our internally authored share falls from 20.63 per cent to 8.10 per cent as a proportion of the whole, while more than doubling in absolute terms, from roughly 343,000 records to roughly 740,000. As the corpus scaled by a factor of five and a half, we kept writing our own data rather than diluting into bulk. The composition shifts because the public dataset layer grew fastest, which is exactly what you would expect and exactly what should be visible rather than smoothed over.

V4 is not released, so its filing is not yet due. The summary is drafted and waiting. We would rather hold a completed filing for a model that has not shipped than assemble one against a deadline for a model that has.

There is one honest loose end. That 0.79 per cent other category is not yet fully classified, and it will be before V4 is released. We are telling you that now rather than letting you find it later.

## Measured, not estimated

Every figure above comes from an analyser that streams the corpus, aggregates each record's source label, and classifies it against a reviewed source map of 306 labels. For the published models, 99.7 per cent of records are attributed to a named category.

We can reproduce the numbers on request and we retain the underlying manifest as an evidence record.

That distinction matters more than it sounds. A training data summary assembled from memory and rounded to comfortable figures is not a disclosure. It is a press release with percentages in it.

## The rest of the stack

The filing is one layer of seven. Sovereign infrastructure, owned and operated in the UK. Data provenance, the above. Model scope control, with separate models under separate controls and MOTHER DEFENCE forked, sandboxed and isolated. Transparency, through open weights and disclosed benchmarks. Human oversight, with an observe and advise posture and the override held by the operator. Corporate governance, through an Advisory Board with unrestricted access to our primary documents. And assurance, with security and resilience practice aligned to recognised standards including ISO 27001, Cyber Essentials Plus and the operational resilience expectations under DORA.

Aligned to is not the same as certified. We do not say certified until we are.

## Go and check

The training content summary and the copyright policy are published. The weights are downloadable. The benchmark is disclosed.

If you read the filing and something does not hold up, we would rather hear it from you than read it somewhere else.`,
    "image_url": null,
    "image_alt": null,
    "primary_link": "https://www.motherai.uk",
    "topic": "AI governance & the EU AI Act",
    "published_at": "2026-08-09T08:00:00.000Z",
    "links": []
  }
];

export function fallbackPost(slug: string): BlogPost | null {
  return FALLBACK_POSTS.find((p) => p.slug === slug) ?? null;
}

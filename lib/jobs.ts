// MSAI recruitment - two sites, one careers surface.
//
// DUNDEE roles are transcribed from the MSAI Scotland Recruitment Requirement
// (v1, 22 July 2026): titles, headcount, salary bands and specifications are
// the document's, not this file's.
//
// MANCHESTER roles are the MOTHER EXO humanoid factory role set, drafted
// against the published EXO programme (60-DOF humanoid, 1 kHz L0 control,
// sim-to-real, 1,000 units a year from 2027). They deliberately carry NO
// salary band and NO headcount - nothing is advertised here that has not been
// decided. Add `salary` and `positions` to a Manchester role and the page, the
// filters and the JobPosting schema pick it up with no other change.
//
// One source of truth for the /careers index, each role page, the structured
// data and the application form's role list, so a figure can only ever be
// wrong in one place.

export const CAREERS_EMAIL = 'contact@mediastreamai.com';

export type SiteId = 'dundee' | 'manchester';

export interface Site {
  id: SiteId;
  /** Short name used in filters and chips. */
  label: string;
  /** Full name for headings and structured data. */
  name: string;
  blurb: string;
  street: string;
  locality: string;
  region: string;
  country: string;
  /** Where interviews for this site are held. */
  interview: { name: string; street: string; locality: string; postcode?: string; map: string };
  /** Shown where a role's start depends on a programme milestone. */
  note?: string;
  accent: 'ember' | 'magenta';
}

export const SITES: Record<SiteId, Site> = {
  dundee: {
    id: 'dundee',
    label: 'MSAI Dundee',
    name: 'MSAI Scotland - Sovereign AI Data Centre Campus',
    blurb:
      'The sovereign AI data centre campus on Riverside Business Park: DC1-A, DC1-B and DC3, island-mode power, ' +
      'Horizon free cooling and the GPU fleet the MOTHER models train on.',
    street: 'Riverside Business Park, Wright Avenue',
    locality: 'Dundee',
    region: 'Scotland',
    country: 'GB',
    interview: {
      name: 'Enterprise Hub Fife',
      street: '1 Falkland Gate',
      locality: 'Glenrothes',
      postcode: 'KY7 5NS',
      map: 'https://maps.google.com/?q=Enterprise+Hub+Fife,+1+Falkland+Gate,+Glenrothes+KY7+5NS',
    },
    accent: 'ember',
  },
  manchester: {
    id: 'manchester',
    label: 'MSAI Manchester',
    name: 'MSAI Manchester - MOTHER EXO Humanoid Factory',
    blurb:
      'The UK humanoid lab and assembly line: MOTHER EXO robotics design, build and test, coming online Q1 2027 ' +
      'and targeting 1,000 robots a year on a sovereign supply chain.',
    street: 'MSAI Manchester',
    locality: 'Manchester',
    region: 'England',
    country: 'GB',
    interview: {
      name: 'MSAI Manchester',
      street: 'MSAI Manchester robotics lab',
      locality: 'Manchester',
      map: 'https://maps.google.com/?q=Manchester,+England',
    },
    note: 'The Manchester factory comes online Q1 2027. Roles are recruited ahead of that date, with start dates agreed individually.',
    accent: 'magenta',
  },
};

/** Kept for existing imports; Dundee is the campus the recruitment document covers. */
export const CAMPUS = SITES.dundee;
export const INTERVIEW_VENUE = SITES.dundee.interview;

/** Dundee roles were published 22 July 2026; used as the JobPosting datePosted. */
export const POSTED_DATE = '2026-07-22';

export type Employment = 'permanent' | 'contract';

export type Family =
  | 'Leadership'
  | 'Engineering'
  | 'Operations'
  | 'Security'
  | 'Build & commissioning'
  | 'Robotics engineering'
  | 'AI & autonomy'
  | 'Manufacturing';

export interface Job {
  slug: string;
  site: SiteId;
  title: string;
  /** Short qualifier shown after the title, e.g. "Site Lead". */
  qualifier?: string;
  employment: Employment;
  /** Contract length, contract roles only. */
  term?: string;
  /** Advertised headcount. Omitted where the number is not yet fixed. */
  positions?: number;
  /** Advertised band. Omitted where the role is "salary on application". */
  salary?: { min: number; max: number };
  /** Grouping used by the index filters. */
  family: Family;
  /** True where the role is advertised as shift work. */
  shift?: boolean;
  purpose: string;
  responsibilities: string[];
  requirements: string;
  /** Certifications a candidate should bring to interview, where relevant. */
  certifications?: string[];
}

export const JOBS: Job[] = [
  {
    slug: 'data-centre-manager',
    site: 'dundee',
    title: 'Data Centre Manager',
    qualifier: 'Site Lead',
    employment: 'permanent',
    positions: 1,
    salary: { min: 70000, max: 81000 },
    family: 'Leadership',
    purpose:
      'Hold overall accountability for the safe, compliant and continuous operation of the MSAI Scotland campus (DC1-A, DC1-B, DC3).',
    responsibilities: [
      'Own uptime, availability and SLA performance across all halls.',
      'Lead the operations team and set shift and maintenance schedules.',
      'Manage contractors, budgets and supplier relationships.',
      'Own health, safety and regulatory compliance.',
      'Report to the VP Infrastructure on performance and risk.',
    ],
    requirements:
      '10+ years in critical-environment or data-centre operations; proven leadership; HV awareness; strong compliance and budget track record.',
  },
  {
    slug: 'deputy-dc-manager',
    site: 'dundee',
    title: 'Deputy DC Manager',
    qualifier: 'Operations Manager',
    employment: 'permanent',
    positions: 1,
    salary: { min: 56500, max: 65500 },
    family: 'Leadership',
    purpose: 'Deputise for the Site Lead and run day-to-day operations across the campus.',
    responsibilities: [
      'Coordinate shifts, maintenance and change control.',
      'Own the DCIM and reporting.',
      'Manage escalations and incident response.',
      'Deputise for the Site Lead in their absence.',
    ],
    requirements: 'Data-centre operations management experience; strong organiser; M&E and IT awareness.',
  },
  {
    slug: 'critical-facilities-engineer',
    site: 'dundee',
    title: 'Critical Facilities Engineer',
    qualifier: 'Shift Lead',
    employment: 'permanent',
    positions: 4,
    salary: { min: 50500, max: 58500 },
    family: 'Engineering',
    shift: true,
    purpose:
      'Lead the engineering shift, owning inspection, operation and maintenance of all mechanical and electrical infrastructure.',
    responsibilities: [
      'Run planned preventative maintenance (PPM) schedules.',
      'Operate and maintain UPS, generators, switchgear and cooling.',
      'Respond to and resolve faults; lead first response.',
      'Supervise technicians on shift.',
      'Maintain accurate logs and update the DCIM.',
    ],
    requirements:
      'Time-served M&E engineer; data-centre or critical-environment experience; comfortable with shift work; HV/LV awareness.',
  },
  {
    slug: 'data-centre-technician',
    site: 'dundee',
    title: 'Data Centre Technician',
    qualifier: '24/7 shift',
    employment: 'permanent',
    positions: 8,
    salary: { min: 33000, max: 38000 },
    family: 'Operations',
    shift: true,
    purpose: 'Provide front-line 24/7 operation: monitoring, first response, and rack and hands support.',
    responsibilities: [
      'Monitor BMS/DCIM and alarms.',
      'Carry out first-line fault response and escalate.',
      'Provide smart-hands support for rack and stack.',
      'Support goods-in and equipment moves.',
      'Maintain shift logs.',
    ],
    requirements:
      'IT, electrical or mechanical aptitude; willingness to work shifts; data-centre experience desirable but not essential (training given).',
  },
  {
    slug: 'electrical-engineer-hv-lv',
    site: 'dundee',
    title: 'Electrical Engineer',
    qualifier: 'HV/LV Authorised Person',
    employment: 'permanent',
    positions: 2,
    salary: { min: 54000, max: 62000 },
    family: 'Engineering',
    purpose: 'Own the electrical infrastructure from grid intake through HV/LV distribution to rack power.',
    responsibilities: [
      'Act as Authorised Person for HV/LV switching.',
      'Maintain switchgear, transformers, UPS, busbar and PDUs.',
      'Manage A/B power distribution and N+1 resilience.',
      'Liaise with SSEN and the electrical contractor (Emtec).',
    ],
    requirements:
      'HV Authorised Person status; 18th Edition; data-centre power experience; UPS and generator systems knowledge.',
    certifications: ['HV Authorised Person', '18th Edition'],
  },
  {
    slug: 'mechanical-cooling-engineer',
    site: 'dundee',
    title: 'Mechanical / Cooling Engineer',
    qualifier: 'HVAC',
    employment: 'permanent',
    positions: 2,
    salary: { min: 47000, max: 54000 },
    family: 'Engineering',
    purpose:
      'Own the cooling infrastructure: the free-cooling loop, rear-door heat exchangers, liquid-to-chip manifolds and backup chillers.',
    responsibilities: [
      'Maintain heat exchangers, pumps, glycol loops, RDHx and chillers.',
      'Monitor PUE and rack thermals; optimise free-cooling.',
      'Manage water treatment and the wet-well interface.',
      'Liaise with Scottish Water Horizons.',
    ],
    requirements: 'HVAC or refrigeration qualified; F-Gas certified; data-centre cooling and water-loop experience.',
    certifications: ['F-Gas'],
  },
  {
    slug: 'gas-generation-engineer',
    site: 'dundee',
    title: 'Gas Generation Engineer',
    qualifier: 'on-site power',
    employment: 'permanent',
    positions: 2,
    salary: { min: 49000, max: 56000 },
    family: 'Engineering',
    purpose: 'Operate and maintain the on-site gas generation plant that powers the campus.',
    responsibilities: [
      'Run and maintain the gas gensets/turbines and gas train.',
      'Maintain the pressure reduction station and HV synchronisation.',
      'Manage fuel, emissions, and safety compliance.',
      'Liaise with SGN and the gas contractor.',
    ],
    requirements: 'Gas engineering or power-generation background; IGEM awareness; G99; ATEX/DSEAR competence.',
    certifications: ['IGEM', 'G99', 'ATEX/DSEAR'],
  },
  {
    slug: 'bms-dcim-controls-engineer',
    site: 'dundee',
    title: 'BMS / DCIM Controls Engineer',
    employment: 'permanent',
    positions: 1,
    salary: { min: 45000, max: 52000 },
    family: 'Engineering',
    purpose: 'Own the building management and DCIM systems that monitor and control the campus.',
    responsibilities: [
      'Maintain and configure the BMS and DCIM platforms.',
      'Build dashboards, alarms and reporting.',
      'Integrate power, cooling and environmental telemetry.',
      'Support capacity planning.',
    ],
    requirements: 'BMS/controls background (Trend, Tridium or similar); DCIM experience; networking awareness.',
  },
  {
    slug: 'noc-engineer',
    site: 'dundee',
    title: 'Network Operations (NOC) Engineer',
    employment: 'permanent',
    positions: 3,
    salary: { min: 41000, max: 47000 },
    family: 'Engineering',
    shift: true,
    purpose: 'Run the 24/7 network operations centre for the campus and the GPU clusters.',
    responsibilities: [
      'Monitor the compute fabric, transit and management networks.',
      'First response to network and infrastructure alerts.',
      'Support client cluster connectivity.',
      'Maintain runbooks and escalate.',
    ],
    requirements: 'Networking experience (Ethernet, ideally InfiniBand); Linux; monitoring tools; shift work.',
  },
  {
    slug: 'gpu-compute-systems-engineer',
    site: 'dundee',
    title: 'GPU / Compute Systems Engineer',
    employment: 'permanent',
    positions: 2,
    salary: { min: 54000, max: 62000 },
    family: 'Engineering',
    purpose: 'Own the GPU compute estate: servers, fabric, orchestration and client cluster health.',
    responsibilities: [
      'Maintain B300 and H200 nodes and run burn-in and RMA.',
      'Manage the RoCE / InfiniBand fabric.',
      'Run Kubernetes and Slurm orchestration.',
      'Support GPUaaS client deployments.',
    ],
    requirements:
      'Strong Linux; GPU cluster or HPC experience; networking; orchestration tooling (Kubernetes/Slurm).',
  },
  {
    slug: 'security-manager',
    site: 'dundee',
    title: 'Security Manager',
    employment: 'permanent',
    positions: 1,
    salary: { min: 43500, max: 50500 },
    family: 'Security',
    purpose: 'Own physical security across the campus: perimeter, access control, CCTV and guarding.',
    responsibilities: [
      'Manage security systems and any SIA guarding.',
      'Run access control and CCTV operations.',
      'Lead incident response and visitor vetting.',
      'Report to the Security Project Manager.',
    ],
    requirements: 'Security management background; SIA; data-centre or critical-site security experience.',
    certifications: ['SIA'],
  },
  {
    slug: 'security-officer',
    site: 'dundee',
    title: 'Security Officer',
    qualifier: '24/7 gatehouse / patrol',
    employment: 'permanent',
    positions: 6,
    salary: { min: 25500, max: 29500 },
    family: 'Security',
    shift: true,
    purpose: 'Provide 24/7 gatehouse and patrol security for the campus.',
    responsibilities: [
      'Staff the gatehouse and control access.',
      'Conduct patrols and monitor CCTV.',
      'Manage visitor sign-in and deliveries.',
      'Respond to and report incidents.',
    ],
    requirements: 'SIA licence (or willingness to obtain); reliability; shift work.',
    certifications: ['SIA'],
  },
  {
    slug: 'health-safety-compliance-officer',
    site: 'dundee',
    title: 'Health & Safety / Compliance Officer',
    employment: 'permanent',
    positions: 1,
    salary: { min: 43000, max: 49000 },
    family: 'Operations',
    purpose: 'Own health, safety and compliance across the campus and its contractors.',
    responsibilities: [
      'Maintain the H&S management system and risk assessments.',
      'Manage contractor RAMS and permits to work.',
      'Run audits and drive compliance to standards.',
      'Support incident investigation and reporting.',
    ],
    requirements: 'NEBOSH or equivalent; H&S experience in construction or critical environments; CDM awareness.',
    certifications: ['NEBOSH'],
  },
  {
    slug: 'logistics-goods-in-coordinator',
    site: 'dundee',
    title: 'Logistics / Goods-In Coordinator',
    employment: 'permanent',
    positions: 1,
    salary: { min: 29500, max: 33500 },
    family: 'Operations',
    purpose: 'Coordinate goods-in, asset receipting and logistics for the campus.',
    responsibilities: [
      'Receive, check and log incoming equipment.',
      'Coordinate deliveries and equipment moves.',
      'Maintain the asset register.',
      'Support rack and stack logistics.',
    ],
    requirements: 'Logistics or warehouse experience; organised; IT-literate.',
  },
  {
    slug: 'cleaning-facilities-assistant',
    site: 'dundee',
    title: 'Cleaning / Facilities Assistant',
    employment: 'permanent',
    positions: 2,
    salary: { min: 23000, max: 27000 },
    family: 'Operations',
    purpose: 'Maintain cleanliness and general facilities across the DC halls and offices.',
    responsibilities: [
      'Clean data halls to the required standard (anti-static awareness).',
      'Maintain office and welfare areas.',
      'Support facilities tasks.',
    ],
    requirements: 'Cleaning experience; reliability; data-centre cleaning awareness desirable.',
  },
  {
    slug: 'commissioning-engineer',
    site: 'dundee',
    title: 'Commissioning Engineer',
    qualifier: 'Build',
    employment: 'contract',
    term: '12 months',
    positions: 1,
    salary: { min: 63000, max: 73000 },
    family: 'Build & commissioning',
    purpose: 'Lead the commissioning of the M&E systems through to energisation and handover.',
    responsibilities: [
      'Own the commissioning programme and witness testing.',
      'Coordinate contractors through IST and integrated testing.',
      'Produce commissioning documentation.',
      'Hand over to the operations team.',
    ],
    requirements: 'Data-centre commissioning experience; strong M&E; L5 commissioning knowledge.',
  },
  {
    slug: 'project-manager-fit-out',
    site: 'dundee',
    title: 'Project Manager',
    qualifier: 'DC fit-out',
    employment: 'contract',
    term: '12 months',
    positions: 1,
    salary: { min: 58500, max: 67500 },
    family: 'Build & commissioning',
    purpose: 'Manage the data-centre fit-out programme across the halls and contractors.',
    responsibilities: [
      'Own the programme, budget and contractor coordination.',
      'Manage risk, change and reporting.',
      'Interface with MSAI infrastructure leadership.',
    ],
    requirements: 'Data-centre or construction PM experience; APM/PRINCE2 desirable; M&E fit-out.',
  },
  {
    slug: 'electrical-site-supervisor',
    site: 'dundee',
    title: 'Electrical Site Supervisor',
    qualifier: 'Build',
    employment: 'contract',
    term: '9 months',
    positions: 1,
    salary: { min: 49000, max: 56000 },
    family: 'Build & commissioning',
    purpose: 'Supervise the electrical installation works on site during the build.',
    responsibilities: [
      'Supervise electrical contractors and quality.',
      'Manage safety and permits on the electrical works.',
      'Coordinate with the commissioning engineer.',
    ],
    requirements: 'Time-served electrician; supervisory experience; HV/LV; data-centre or industrial install.',
  },
  {
    slug: 'mechanical-site-supervisor',
    site: 'dundee',
    title: 'Mechanical Site Supervisor',
    qualifier: 'Build',
    employment: 'contract',
    term: '9 months',
    positions: 1,
    salary: { min: 47000, max: 54000 },
    family: 'Build & commissioning',
    purpose: 'Supervise the mechanical and cooling installation works on site during the build.',
    responsibilities: [
      'Supervise mechanical contractors and quality.',
      'Manage safety and permits on the mechanical works.',
      'Coordinate cooling and pipework installation.',
    ],
    requirements:
      'Time-served mechanical engineer; supervisory experience; HVAC / pipework; data-centre or industrial install.',
  },

  // ------------------------------------------------------------------
  // MSAI Manchester - MOTHER EXO humanoid factory.
  // Drafted against the published EXO programme. No salary band and no
  // headcount is advertised for these roles until one is set: add `salary`
  // and `positions` here and the whole careers surface picks them up.
  // ------------------------------------------------------------------
  {
    slug: 'robotics-programme-manager',
    site: 'manchester',
    title: 'Robotics Programme Manager',
    employment: 'permanent',
    family: 'Leadership',
    purpose:
      'Own the MOTHER EXO programme end to end - design, build, test and the ramp to volume - across the Manchester lab and assembly line.',
    responsibilities: [
      'Own the programme plan, milestones and risk register through to factory go-live in Q1 2027.',
      'Coordinate the robotics, AI and manufacturing teams against one build schedule.',
      'Manage budget, capital equipment and external partners.',
      'Report progress, risk and readiness to MSAI leadership.',
    ],
    requirements:
      'Programme or engineering management in robotics, automotive, aerospace or another regulated hardware industry; NPI to volume production; comfortable with hardware and software running in parallel.',
  },
  {
    slug: 'robotics-systems-engineer',
    site: 'manchester',
    title: 'Robotics Systems Engineer',
    qualifier: 'Humanoid Platform',
    employment: 'permanent',
    family: 'Robotics engineering',
    purpose:
      'Own the humanoid as a system: the 60 degrees of freedom, the mass and power budgets, and the interfaces every other discipline builds against.',
    responsibilities: [
      'Own the system architecture, DOF allocation and interface control across the platform.',
      'Hold the mass, power, thermal and compute budgets and arbitrate between them.',
      'Drive requirements from mission down to subsystem and back up through verification.',
      'Lead integration bring-up of new builds on the lab floor.',
    ],
    requirements:
      'Systems engineering on a complex electromechanical product; kinematics and dynamics; budget ownership across disciplines; robotics or humanoid experience strongly preferred.',
  },
  {
    slug: 'actuator-drivetrain-engineer',
    site: 'manchester',
    title: 'Actuator & Drivetrain Engineer',
    employment: 'permanent',
    family: 'Robotics engineering',
    purpose:
      'Own the joint actuators - motors, gearboxes, sensing and thermal - that give the humanoid its torque, speed and compliance.',
    responsibilities: [
      'Specify, model and select actuators against joint torque and velocity requirements.',
      'Own gearbox, bearing, backlash and efficiency characterisation.',
      'Run dynamometer and life testing; own actuator reliability data.',
      'Work with suppliers on custom and semi-custom actuator builds.',
    ],
    requirements:
      'Electromechanical actuator design or selection; BLDC/PMSM motors, harmonic or cycloidal drives, torque sensing; test rig work; robotics, automotive or aerospace background.',
  },
  {
    slug: 'mechanical-design-engineer',
    site: 'manchester',
    title: 'Mechanical Design Engineer',
    qualifier: 'Humanoid Structures',
    employment: 'permanent',
    family: 'Robotics engineering',
    purpose:
      'Design the structural and mechanical assemblies of the humanoid, including the graphene-infused materials used across the platform.',
    responsibilities: [
      'Produce CAD, drawings and tolerance stacks for structural and housing assemblies.',
      'Run FEA on load paths, stiffness and fatigue; iterate toward mass targets.',
      'Own design for manufacture and assembly with the production team.',
      'Support prototype builds and drive design changes from build feedback.',
    ],
    requirements:
      'Mechanical design to production; strong CAD and GD&T; FEA; composites or advanced materials experience welcome; DFM/DFA in a volume environment.',
  },
  {
    slug: 'electronics-power-engineer',
    site: 'manchester',
    title: 'Electronics Engineer',
    qualifier: 'Motor Drive & Power',
    employment: 'permanent',
    family: 'Robotics engineering',
    purpose:
      'Own the electronics that move and power the robot: motor drives, power distribution, battery interface and on-board compute integration.',
    responsibilities: [
      'Design and bring up motor drive, power distribution and battery management electronics.',
      'Own schematic capture, PCB layout review, EMC and safety compliance.',
      'Integrate the on-board compute and sensor buses.',
      'Support test, debug and design changes through to production.',
    ],
    requirements:
      'Power and motor-drive electronics design; schematic and PCB work; EMC and electrical safety; hardware bring-up and debug on real prototypes.',
  },
  {
    slug: 'embedded-firmware-engineer',
    site: 'manchester',
    title: 'Embedded Firmware Engineer',
    qualifier: 'Real-Time Control',
    employment: 'permanent',
    family: 'Robotics engineering',
    purpose:
      'Own the real-time firmware that closes the 1 kHz L0 motor loop and carries commands from the cognitive stack to the joints.',
    responsibilities: [
      'Write and maintain deterministic real-time control firmware on the joint and body controllers.',
      'Own the fieldbus and timing budget between controllers and on-board compute.',
      'Implement safety interlocks, limits and fault handling at the firmware layer.',
      'Build the tooling that logs, traces and replays control data.',
    ],
    requirements:
      'Embedded C/C++ on real-time targets; RTOS or bare-metal; motor control loops; CAN/EtherCAT or similar; disciplined about timing and determinism.',
  },
  {
    slug: 'controls-engineer-locomotion',
    site: 'manchester',
    title: 'Controls Engineer',
    qualifier: 'Locomotion & Balance',
    employment: 'permanent',
    family: 'Robotics engineering',
    purpose:
      'Own whole-body control: how the humanoid stands, walks, recovers from a push and stays safe while doing it.',
    responsibilities: [
      'Develop and tune whole-body, balance and locomotion controllers.',
      'Model the platform dynamics and validate against measured hardware behaviour.',
      'Close the loop between learned policies and classical control.',
      'Own controller performance, stability margins and failure behaviour.',
    ],
    requirements:
      'Robot control theory in practice - MPC, whole-body control, state estimation; strong dynamics; experience taking a controller from simulation onto real legged hardware.',
  },
  {
    slug: 'manipulation-engineer',
    site: 'manchester',
    title: 'Manipulation Engineer',
    qualifier: 'Dexterous Hands',
    employment: 'permanent',
    family: 'Robotics engineering',
    purpose:
      'Own reach, grasp and place: the arm and hand behaviours that make the humanoid useful rather than merely mobile.',
    responsibilities: [
      'Develop grasping, in-hand and bimanual manipulation behaviours.',
      'Integrate tactile and force sensing into the manipulation stack.',
      'Build task benchmarks and measure success rates honestly.',
      'Work with the world-model team to close the perception-to-action loop.',
    ],
    requirements:
      'Manipulation research or engineering; motion planning and grasp synthesis; force and tactile sensing; real-hardware results, not only simulation.',
  },
  {
    slug: 'calibration-metrology-engineer',
    site: 'manchester',
    title: 'Calibration & Metrology Engineer',
    employment: 'permanent',
    family: 'Robotics engineering',
    purpose:
      'Own how accurately the robot knows itself: kinematic calibration, sensor alignment and the measurement standards the factory works to.',
    responsibilities: [
      'Define and run kinematic, camera and IMU calibration procedures.',
      'Own measurement equipment, traceability and calibration schedules.',
      'Build the calibration cell used on every unit leaving the line.',
      'Analyse unit-to-unit variation and feed it back into design.',
    ],
    requirements:
      'Metrology or calibration engineering; robot kinematic calibration; laser trackers, CMMs or photogrammetry; statistical analysis of measurement data.',
  },
  {
    slug: 'perception-engineer',
    site: 'manchester',
    title: 'Perception Engineer',
    qualifier: 'MOTHER DeepVision',
    employment: 'permanent',
    family: 'AI & autonomy',
    purpose:
      'Own what the robot sees: detection, tracking, spatial relations and scene understanding on the sovereign DeepVision tower.',
    responsibilities: [
      'Train and evaluate perception heads on the frozen DeepVision backbone.',
      'Build and curate on-robot perception datasets from real deployments.',
      'Own perception latency and accuracy budgets on the on-board compute.',
      'Integrate the scene graph with the world model and the control stack.',
    ],
    requirements:
      'Computer vision in production; PyTorch; detection, tracking and segmentation; deploying models to constrained on-board hardware; dataset curation discipline.',
  },
  {
    slug: 'world-model-research-engineer',
    site: 'manchester',
    title: 'World Model Research Engineer',
    qualifier: 'MOTHER EXO',
    employment: 'permanent',
    family: 'AI & autonomy',
    purpose:
      'Advance the EXO world model: latent video and action dynamics that let the robot predict the consequence of an action before it takes it.',
    responsibilities: [
      'Train and evaluate world-model and latent-dynamics heads on the frozen MOTHER backbone.',
      'Design rollout and evaluation harnesses that measure prediction quality honestly.',
      'Bring published research into the stack and report what does and does not transfer.',
      'Work with controls and manipulation to turn prediction into behaviour.',
    ],
    requirements:
      'Strong machine learning research engineering; sequence and video models, latent dynamics, VLA or world models; PyTorch at multi-GPU scale; publishes or reproduces rigorously.',
  },
  {
    slug: 'rl-imitation-engineer',
    site: 'manchester',
    title: 'Machine Learning Engineer',
    qualifier: 'Imitation & Reinforcement Learning',
    employment: 'permanent',
    family: 'AI & autonomy',
    purpose:
      'Turn recorded human demonstration and simulated experience into policies that run on the real robot.',
    responsibilities: [
      'Train behaviour-cloning and reinforcement-learning policies for locomotion and manipulation.',
      'Own the training pipeline on the sovereign GB10 / GPU estate.',
      'Design reward, curriculum and domain randomisation schemes.',
      'Measure policy performance on hardware, not only on held-out data.',
    ],
    requirements:
      'RL and imitation learning in practice; PyTorch; distributed training; robotics policies deployed to real hardware; sceptical about simulation-only results.',
  },
  {
    slug: 'simulation-sim2real-engineer',
    site: 'manchester',
    title: 'Simulation & Sim-to-Real Engineer',
    employment: 'permanent',
    family: 'AI & autonomy',
    purpose:
      'Own the simulator the robot learns in, and the gap between it and the floor it walks on.',
    responsibilities: [
      'Build and maintain high-fidelity physics simulation of the humanoid and its environments.',
      'Own system identification so the model matches measured hardware.',
      'Run domain randomisation and transfer experiments; quantify the sim-to-real gap.',
      'Provide the scaled simulation infrastructure the training runs depend on.',
    ],
    requirements:
      'Physics simulation for robotics (Isaac, MuJoCo, Gazebo or similar); system identification; contact and actuator modelling; large-scale parallel simulation.',
  },
  {
    slug: 'teleoperation-data-engineer',
    site: 'manchester',
    title: 'Teleoperation & Data Collection Engineer',
    employment: 'permanent',
    family: 'AI & autonomy',
    purpose:
      'Own the teleoperation rigs and the pipeline that turns recorded human operation into clean, labelled training data.',
    responsibilities: [
      'Build and run teleoperation rigs for whole-body and manipulation data collection.',
      'Own the data pipeline: capture, sync, validate, label and version.',
      'Run structured collection campaigns against model gaps.',
      'Maintain provenance so every training record can be traced to its session.',
    ],
    requirements:
      'Robotics software and data engineering; ROS2; multi-sensor time synchronisation; hands-on with teleoperation hardware; obsessive about data quality and provenance.',
  },
  {
    slug: 'robot-safety-engineer',
    site: 'manchester',
    title: 'Robot Safety Engineer',
    qualifier: 'Guardian & Functional Safety',
    employment: 'permanent',
    family: 'AI & autonomy',
    purpose:
      'Own the safety case for a machine that moves under its own decisions - including the L4 Guardian signed action filter that can veto any motion.',
    responsibilities: [
      'Own the functional safety architecture, hazard analysis and risk assessment.',
      'Specify and verify the Guardian action filter and independent red-line limits.',
      'Drive compliance with machinery and robot safety standards.',
      'Own the audit trail: what the robot did, why, and what stopped it.',
    ],
    requirements:
      'Functional safety engineering; ISO 12100, ISO 10218 or ISO 13849 / IEC 61508 practice; hazard analysis; safety-critical software and independent protective layers.',
    certifications: ['Functional safety (TÜV or equivalent)'],
  },
  {
    slug: 'manufacturing-engineering-manager',
    site: 'manchester',
    title: 'Manufacturing Engineering Manager',
    employment: 'permanent',
    family: 'Manufacturing',
    purpose:
      'Design the line that builds the robot: process, tooling, stations, takt and the route from prototype to 1,000 units a year.',
    responsibilities: [
      'Own process design, station layout, tooling and takt for humanoid assembly.',
      'Lead the industrialisation of designs coming out of engineering.',
      'Own capital equipment selection and installation.',
      'Drive yield, cycle time and cost per unit.',
    ],
    requirements:
      'Manufacturing engineering leadership; NPI through to volume; lean and process design; complex electromechanical assembly; automotive, aerospace or robotics background.',
  },
  {
    slug: 'production-manager-assembly',
    site: 'manchester',
    title: 'Production Manager',
    qualifier: 'Humanoid Assembly',
    employment: 'permanent',
    family: 'Manufacturing',
    purpose:
      'Run the assembly line day to day: people, schedule, output and the standard of work that leaves the building.',
    responsibilities: [
      'Manage the assembly team, shifts and production schedule.',
      'Own daily output, WIP and on-time delivery.',
      'Drive continuous improvement with manufacturing engineering and quality.',
      'Own line-side safety and housekeeping standards.',
    ],
    requirements:
      'Production management in a complex assembly environment; people leadership; lean manufacturing; comfortable ramping a new line rather than running a settled one.',
  },
  {
    slug: 'robotics-assembly-technician',
    site: 'manchester',
    title: 'Robotics Assembly Technician',
    employment: 'permanent',
    family: 'Manufacturing',
    purpose:
      'Build the robot: mechanical assembly, actuator installation, harnessing and first power-on.',
    responsibilities: [
      'Assemble mechanical and electromechanical subassemblies to drawing and work instruction.',
      'Install actuators, harnesses and sensors; torque and record to specification.',
      'Carry out first power-on and functional checks.',
      'Feed build issues back to manufacturing engineering.',
    ],
    requirements:
      'Mechanical or electromechanical assembly experience; able to work to drawings and work instructions; careful, methodical and happy on a new line where the process is still settling.',
  },
  {
    slug: 'wire-harness-technician',
    site: 'manchester',
    title: 'Wire Harness & Integration Technician',
    employment: 'permanent',
    family: 'Manufacturing',
    purpose:
      'Build and install the harnesses and cable assemblies that carry power and data through the robot.',
    responsibilities: [
      'Build, dress and install wire harnesses and cable assemblies.',
      'Terminate, crimp and solder to standard; test continuity and insulation.',
      'Support routing design with manufacturing and electronics engineering.',
      'Maintain traceability records for every assembly.',
    ],
    requirements:
      'Wire harness or cable assembly experience; crimping, soldering and terminations to IPC or equivalent standard; electrical test; aerospace, motorsport or robotics background welcome.',
    certifications: ['IPC-A-620 (or equivalent)'],
  },
  {
    slug: 'test-validation-engineer',
    site: 'manchester',
    title: 'Test & Validation Engineer',
    qualifier: 'End-of-Line',
    employment: 'permanent',
    family: 'Manufacturing',
    purpose:
      'Prove every robot works before it ships: design the test sequence, build the rigs and own the pass criteria.',
    responsibilities: [
      'Design end-of-line functional, safety and performance test sequences.',
      'Build and maintain automated test rigs and fixtures.',
      'Own pass/fail criteria and the data behind them.',
      'Analyse failures and drive root cause back into design and process.',
    ],
    requirements:
      'Test engineering on electromechanical products; automated test development (Python or LabVIEW); measurement and instrumentation; root-cause analysis.',
  },
  {
    slug: 'quality-engineer-robotics',
    site: 'manchester',
    title: 'Quality Engineer',
    qualifier: 'Robotics',
    employment: 'permanent',
    family: 'Manufacturing',
    purpose:
      'Own product and process quality across the build: incoming, in-process and final, plus the supplier quality behind it.',
    responsibilities: [
      'Own the quality management system for the Manchester site.',
      'Run PPAP, FAI, SPC and non-conformance processes.',
      'Lead supplier quality audits and corrective actions.',
      'Own the traceability record for every unit built.',
    ],
    requirements:
      'Quality engineering in a regulated or safety-critical manufacturing environment; ISO 9001; APQP/PPAP; 8D and root-cause methods; supplier audits.',
    certifications: ['ISO 9001 lead auditor (desirable)'],
  },
  {
    slug: 'supply-chain-manager-robotics',
    site: 'manchester',
    title: 'Supply Chain & Procurement Manager',
    qualifier: 'Robotics',
    employment: 'permanent',
    family: 'Manufacturing',
    purpose:
      'Build the sovereign supply chain behind 1,000 robots a year - and keep it resilient.',
    responsibilities: [
      'Source and qualify suppliers for actuators, electronics, structures and materials.',
      'Own commercial negotiation, lead times and dual-sourcing strategy.',
      'Run demand and capacity planning against the production ramp.',
      'Manage supply risk, including UK and EU sourcing requirements.',
    ],
    requirements:
      'Supply chain or procurement management in electromechanical manufacturing; supplier qualification; MRP; negotiating long-lead components in a constrained market.',
  },
  {
    slug: 'field-service-deployment-engineer',
    site: 'manchester',
    title: 'Field Service & Deployment Engineer',
    employment: 'permanent',
    family: 'Manufacturing',
    purpose:
      'Take the robot to the customer: commissioning, training, support and bringing what breaks in the field back into engineering.',
    responsibilities: [
      'Commission and hand over robots on customer sites.',
      'Train operators and write the material they are trained from.',
      'Diagnose and repair in the field; manage spares.',
      'Feed field reliability data back into design and production.',
    ],
    requirements:
      'Field service on complex equipment; strong fault diagnosis; customer-facing and calm under pressure; willing to travel; robotics or automation background.',
  },
  {
    slug: 'health-safety-officer-manchester',
    site: 'manchester',
    title: 'Health & Safety Officer',
    qualifier: 'Robotics Factory',
    employment: 'permanent',
    family: 'Manufacturing',
    purpose:
      'Own health and safety across the Manchester lab and assembly line, including working safely alongside moving robots.',
    responsibilities: [
      'Maintain the H&S management system, risk assessments and safe systems of work.',
      'Own machinery safety, guarding and human-robot workspace separation.',
      'Run audits, inductions and incident investigation.',
      'Manage contractor RAMS and permits during factory fit-out.',
    ],
    requirements:
      'NEBOSH or equivalent; H&S in manufacturing or construction; machinery safety and LOTO; CDM awareness for the fit-out phase.',
    certifications: ['NEBOSH'],
  },
];

export function jobsForSite(site: SiteId): Job[] {
  return JOBS.filter((j) => j.site === site);
}

/** Advertised positions, counting only roles with a fixed headcount. */
export function positionsForSite(site: SiteId): number {
  return jobsForSite(site).reduce((n, j) => n + (j.positions ?? 0), 0);
}

export const TOTAL_POSITIONS = JOBS.reduce((n, j) => n + (j.positions ?? 0), 0);
export const TOTAL_ROLES = JOBS.length;

export function getJob(slug: string): Job | undefined {
  return JOBS.find((j) => j.slug === slug);
}

/** "Data Centre Manager (Site Lead)" - the full advertised title. */
export function fullTitle(job: Job): string {
  return job.qualifier ? `${job.title} (${job.qualifier})` : job.title;
}

/** "£70,000 to £81,000 per annum" - the band exactly as advertised, or the
 *  honest alternative where no band has been set for the role yet. */
export function salaryBand(job: Job): string {
  if (!job.salary) return 'Salary on application';
  const f = (n: number) => `£${n.toLocaleString('en-GB')}`;
  return `${f(job.salary.min)} to ${f(job.salary.max)} per annum`;
}

/** "8 positions" / "1 position" / "" where the headcount is not yet fixed. */
export function positionsLabel(job: Job): string {
  if (!job.positions) return '';
  return `${job.positions} position${job.positions === 1 ? '' : 's'}`;
}

/** The seven-stage process, shown on the index and on every role. */
export function processForSite(site: SiteId): { step: string; title: string; body: string }[] {
  const v = SITES[site].interview;
  return PROCESS.map((p) =>
    p.step === '04'
      ? { ...p, body: `Interviews are held in person at ${v.name}, ${v.locality}.` }
      : p,
  );
}

export const PROCESS: { step: string; title: string; body: string }[] = [
  { step: '01', title: 'Application', body: 'Submit your CV and a covering note against the specific role.' },
  { step: '02', title: 'Screening', body: 'We review applications and shortlist against the role requirements.' },
  {
    step: '03',
    title: 'Interview invitation',
    body: 'Shortlisted candidates are invited to interview; the date is set with each individual submission.',
  },
  { step: '04', title: 'Interview', body: `Interviews are held in person at ${INTERVIEW_VENUE.name}, ${INTERVIEW_VENUE.locality}.` },
  { step: '05', title: 'Technical / practical', body: 'Where relevant to engineering roles, a short technical or practical assessment.' },
  { step: '06', title: 'Offer', body: 'Successful candidates receive an offer, subject to references and checks.' },
  {
    step: '07',
    title: 'Onboarding',
    body: 'Pre-employment checks - including security vetting for relevant roles - and an agreed start date.',
  },
];

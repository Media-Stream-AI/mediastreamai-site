// MSAI site capacity by phase: the one source for every surface that quotes
// data-centre or colocation capacity (home page, stack diagram, nav,
// /colocation, /technology, metadata and OG cards).
//
// Figures and units are exactly as confirmed by MSAI (Nov 2026). Phase One and
// Two are stated in MWth, Phase Three in MW; do not convert or total them here.

export interface CapacityPhase {
  phase: 'Phase One' | 'Phase Two' | 'Phase Three';
  capacity: string;
  /** When it is available. */
  when: string;
  live: boolean;
}

export const CAPACITY_PHASES: CapacityPhase[] = [
  { phase: 'Phase One', capacity: '25 MWth', when: 'Live now', live: true },
  { phase: 'Phase Two', capacity: '75 MWth', when: 'December 2026', live: false },
  { phase: 'Phase Three', capacity: '25 MW', when: 'Q1 2028', live: false },
];

export const [PHASE_ONE, PHASE_TWO, PHASE_THREE] = CAPACITY_PHASES;

/** "25 MWth live · 75 MWth Dec 2026 · 25 MW Q1 2028" */
export const CAPACITY_SUMMARY = `${PHASE_ONE.capacity} live · ${PHASE_TWO.capacity} Dec 2026 · ${PHASE_THREE.capacity} Q1 2028`;

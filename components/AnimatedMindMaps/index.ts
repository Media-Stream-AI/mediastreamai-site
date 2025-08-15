// Re-export as NAMED exports exactly as your page expects
export { default as BiometricSignalsMap } from "./BiometricSignalsMap";
export { default as PersonaMindMap } from "./PersonaMindMap";
export {
  personaProductManager,
  personaStudent,
  personaNurse,
  personaRetail,
} from "./personas";

// Optional: keep a default export (not required by your import line)
// so that both `import AnimatedMindMaps from ...` and named imports can work.
const AnimatedMindMaps = {};
export default AnimatedMindMaps;

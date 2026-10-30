// Imperative Three.js scene for the home-page platform cubes.
//
// Kept framework-free and loaded with a dynamic import() from CubeHero, so
// three.js (~150 kB gzip) is split out of the main bundle and only fetched
// once the hero is on screen and the critical HTML has painted.
//
// The scene owns rendering, raycasting and cube choreography. Scroll progress
// is *read* from the host (getProgress) so the HTML copy and the canvas stay
// in lock-step and the copy still works when WebGL is unavailable.

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { Platform } from '@/lib/platforms';
import { PLATFORM_STATUS_LABEL } from '@/lib/platforms';

export interface CubeSceneOptions {
  container: HTMLElement;
  platforms: Platform[];
  /** Raw 0..1 scroll progress through the hero. */
  getProgress: () => number;
  /** Static composition: no float, no choreography. */
  reducedMotion: boolean;
  /** Absolutely positioned element the scene moves to follow the hovered cube. */
  tooltip: HTMLElement;
  /** Fires when the hovered / touch-selected cube changes. */
  onHover: (index: number | null, pinned: boolean) => void;
  /** Fires on a confirmed click (mouse/pen) or a second tap (touch). */
  onActivate: (index: number) => void;
  /** Fires if WebGL is lost after start-up. */
  onContextLost: () => void;
}

export interface CubeSceneHandle {
  setActive: (active: boolean) => void;
  clearSelection: () => void;
  dispose: () => void;
}

/* ------------------------------------------------------------------ */
/* Choreography                                                        */
/* ------------------------------------------------------------------ */

type Pose = { p: THREE.Vector3; q: THREE.Quaternion; s: number };
type Layout = { formations: Pose[][]; group: { scale: number; x: number; y: number } };

const CUBE = 1.9;
/** Reduced motion holds the readable grid formation. */
const STATIC_PROGRESS = 0.78;
const ISO = new THREE.Euler(Math.atan(1 / Math.SQRT2), Math.PI / 4, 0);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const pose = (x: number, y: number, z: number, rx: number, ry: number, rz: number, s = 1): Pose => ({
  p: new THREE.Vector3(x, y, z),
  q: new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
  s,
});

/**
 * Keyframes: 0 = scattered ring (hero), 1 = assembled hexagon ("one stack"),
 * 2 = readable platform grid, 3 = exit drift. Built per aspect ratio so the
 * composition stays clear of the copy on portrait screens.
 */
function buildLayout(aspect: number): Layout {
  const portrait = aspect < 0.85;
  const ring: Pose[] = [];
  const hex: Pose[] = [];
  const grid: Pose[] = [];
  const exit: Pose[] = [];
  const isoQ = new THREE.Quaternion().setFromEuler(ISO);

  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 2 + (i * Math.PI) / 3;
    // Ring: loose, depth-staggered, each cube turned so its screen face reads.
    const r = 2.75;
    ring.push(pose(
      Math.cos(a) * r, Math.sin(a) * r, (i % 2 ? -0.9 : 0.4),
      (i % 2 ? 0.32 : -0.28), (i % 3 === 0 ? -0.5 : 0.46), (i % 2 ? 0.12 : -0.1),
      i % 2 ? 0.94 : 1.04,
    ));
    // Hexagon: tight isometric cluster around the stack's centre.
    const hr = 1.72;
    hex.push({ p: new THREE.Vector3(Math.cos(a) * hr, Math.sin(a) * hr, 0), q: isoQ.clone(), s: 0.86 });
    // Exit: drift up and outward.
    exit.push(pose(
      Math.cos(a) * 5.2, Math.sin(a) * 3.4 + 5.5, -2 - (i % 3),
      0.9 + i * 0.3, -0.7 + i * 0.4, 0.3, 0.8,
    ));
  }

  // Grid: 3x2 landscape, 2x3 portrait. Faces nearly square-on for reading.
  const cols = portrait ? 2 : 3;
  const gap = portrait ? 2.55 : 2.6;
  for (let i = 0; i < 6; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const rows = 6 / cols;
    const x = (c - (cols - 1) / 2) * gap;
    const y = ((rows - 1) / 2 - r) * gap;
    grid.push(pose(x, y, 0, -0.06 + r * 0.04, (c - (cols - 1) / 2) * -0.16, 0, 1));
  }

  const group = portrait
    ? { scale: Math.max(0.5, Math.min(0.72, aspect * 1.02)), x: 0, y: -1.55 }
    : aspect < 1.45
      ? { scale: 0.68, x: 2.75, y: -0.35 }
      : { scale: 0.9, x: 3.3, y: -0.15 };

  return { formations: [ring, hex, grid, exit], group };
}

/** Maps scroll progress to (from, to, t) across held keyframes. */
function segment(p: number): [number, number, number] {
  // [start, end) of each transition; outside them the pose holds.
  const spans: [number, number, number, number][] = [
    [0.1, 0.36, 0, 1],
    [0.46, 0.7, 1, 2],
    [0.86, 1.0, 2, 3],
  ];
  if (p < spans[0][0]) return [0, 0, 0];
  for (let i = 0; i < spans.length; i++) {
    const [a, b, from, to] = spans[i];
    if (p < a) return [spans[i - 1][3], spans[i - 1][3], 0];
    if (p <= b) return [from, to, smooth((p - a) / (b - a))];
  }
  return [3, 3, 0];
}

/* ------------------------------------------------------------------ */
/* Textures                                                            */
/* ------------------------------------------------------------------ */

function perforationTexture(): THREE.CanvasTexture {
  // Fine halftone perforation used as a bump map on the cube bodies.
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  g.fillStyle = '#fff';
  g.fillRect(0, 0, size, size);
  g.fillStyle = '#000';
  const step = size / 32;
  for (let y = 0; y < 32; y++) {
    for (let x = 0; x < 32; x++) {
      g.beginPath();
      g.arc(x * step + step / 2, y * step + step / 2, step * 0.28, 0, Math.PI * 2);
      g.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function displayFont(): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--font-anton').trim();
  return v ? `${v}, Impact, sans-serif` : 'Impact, sans-serif';
}

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

/** Square face artwork: product name, the screenshot (uncropped), status and action. */
async function drawFace(platform: Platform, canvas: HTMLCanvasElement): Promise<void> {
  const S = canvas.width;
  const g = canvas.getContext('2d')!;
  const font = displayFont();
  try { await document.fonts.load(`96px ${font}`); } catch { /* fall back to Impact */ }

  const img = new Image();
  img.decoding = 'async';
  img.src = `${platform.image}-1024.webp`;
  try { await img.decode(); } catch { /* draw panel without the screenshot */ }

  g.clearRect(0, 0, S, S);
  roundRect(g, 0, 0, S, S, 54);
  const bg = g.createLinearGradient(0, 0, 0, S);
  bg.addColorStop(0, '#0A0D18');
  bg.addColorStop(1, '#05060B');
  g.fillStyle = bg;
  g.fill();

  // accent rule
  g.fillStyle = platform.accent;
  g.fillRect(56, 54, 120, 8);

  g.fillStyle = '#EEF3FA';
  g.font = `400 92px ${font}`;
  g.textBaseline = 'alphabetic';
  let size = 92;
  while (g.measureText(platform.name).width > S - 112 && size > 50) {
    size -= 4;
    g.font = `400 ${size}px ${font}`;
  }
  g.fillText(platform.name, 56, 168);

  // screenshot, contain-fit so nothing is cropped
  const box = { x: 40, y: 206, w: S - 80, h: 640 };
  if (img.naturalWidth) {
    const scale = Math.min(box.w / img.naturalWidth, box.h / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = box.x + (box.w - w) / 2;
    const y = box.y + (box.h - h) / 2;
    g.save();
    roundRect(g, x, y, w, h, 18);
    g.clip();
    g.drawImage(img, x, y, w, h);
    g.restore();
    g.strokeStyle = 'rgba(255,255,255,0.14)';
    g.lineWidth = 2;
    roundRect(g, x, y, w, h, 18);
    g.stroke();
  }

  // footer: status · action
  g.font = '600 30px system-ui, -apple-system, Segoe UI, sans-serif';
  g.fillStyle = platform.accent;
  g.beginPath();
  g.arc(70, 930, 9, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#A9B6CA';
  g.fillText(PLATFORM_STATUS_LABEL[platform.status].toUpperCase(), 92, 941);
  g.fillStyle = '#EEF3FA';
  g.font = '700 32px system-ui, -apple-system, Segoe UI, sans-serif';
  const action = `${platform.action.toUpperCase()}  ↗`;
  g.fillText(action, S - 56 - g.measureText(action).width, 941);
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

const RIM_CHUNK = `
#include <emissivemap_fragment>
{
  float fres = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 3.0);
  totalEmissiveRadiance += uRim * fres * uRimStrength;
}
`;

export function createCubeScene(opts: CubeSceneOptions): CubeSceneHandle {
  const { container, platforms, getProgress, reducedMotion, tooltip, onHover, onActivate, onContextLost } = opts;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  const maxDpr = window.matchMedia('(pointer: coarse)').matches ? 1.5 : 1.75;
  let dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const canvas = renderer.domElement;
  canvas.style.touchAction = 'pan-y';
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 15);

  // Coloured key/fill/rim lights carry the reference's electric palette onto
  // the metallic bodies: cyan from the left, magenta and violet from below,
  // warm orange from above, a green kicker at the back.
  const lights: [number, number, [number, number, number]][] = [
    [0xffffff, 0.9, [-3, 6, 9]],
    [0x2fd6ff, 2.4, [-9, 1, 4]],
    [0xff2fd2, 2.8, [7, -6, 3]],
    [0xff8a2a, 2.0, [4, 9, -2]],
    [0x3a4bff, 2.2, [0, -9, 5]],
    [0x2cff9a, 1.0, [-5, -4, -6]],
  ];
  for (const [color, intensity, [x, y, z]] of lights) {
    const l = new THREE.DirectionalLight(color, intensity);
    l.position.set(x, y, z);
    scene.add(l);
  }
  scene.add(new THREE.AmbientLight(0x1a2050, 0.6));

  const root = new THREE.Group();
  scene.add(root);

  const bodyGeo = new RoundedBoxGeometry(CUBE, CUBE, CUBE, 5, 0.17);
  const faceGeo = new THREE.PlaneGeometry(CUBE * 0.86, CUBE * 0.86);
  const shadowGeo = new THREE.CircleGeometry(CUBE * 0.75, 32);
  const perf = perforationTexture();
  perf.repeat.set(1, 1);

  const shadowTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d')!;
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(0,0,0,0.55)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();

  type Cube = {
    holder: THREE.Group;
    body: THREE.Mesh;
    bodyMat: THREE.MeshPhysicalMaterial;
    faceMat: THREE.MeshBasicMaterial;
    faceTex: THREE.CanvasTexture;
    shadow: THREE.Mesh;
    rim: { value: number };
    hover: number;
    seed: number;
  };

  const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const cubes: Cube[] = platforms.slice(0, 6).map((platform, i) => {
    const holder = new THREE.Group();
    holder.userData.index = i;

    const rim = { value: 0.55 };
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c0f18,
      metalness: 0.88,
      roughness: 0.34,
      clearcoat: 1,
      clearcoatRoughness: 0.22,
      iridescence: 0.65,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [180, 620],
      envMapIntensity: 0.75,
      bumpMap: perf,
      bumpScale: 0.6,
    });
    bodyMat.onBeforeCompile = (shader) => {
      shader.uniforms.uRim = { value: new THREE.Color(platform.accent) };
      shader.uniforms.uRimStrength = rim;
      shader.fragmentShader = shader.fragmentShader
        .replace('void main() {', 'uniform vec3 uRim;\nuniform float uRimStrength;\nvoid main() {')
        .replace('#include <emissivemap_fragment>', RIM_CHUNK);
    };
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.userData.index = i;
    holder.add(body);

    const faceCanvas = document.createElement('canvas');
    faceCanvas.width = faceCanvas.height = 1024;
    const faceTex = new THREE.CanvasTexture(faceCanvas);
    faceTex.colorSpace = THREE.SRGBColorSpace;
    faceTex.anisotropy = anisotropy;
    const faceMat = new THREE.MeshBasicMaterial({ color: 0x0a0d18, toneMapped: false, alphaTest: 0.5 });
    const face = new THREE.Mesh(faceGeo, faceMat);
    face.position.z = CUBE / 2 + 0.004;
    face.userData.index = i;
    holder.add(face);
    drawFace(platform, faceCanvas).then(() => {
      if (disposed) return;
      faceMat.map = faceTex;
      faceMat.color.set(0xf2f4f8);
      faceMat.needsUpdate = true;
      faceTex.needsUpdate = true;
    });

    // Soft contact shadow beneath each cube, kept in world space.
    const shadow = new THREE.Mesh(
      shadowGeo,
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }),
    );
    root.add(shadow);
    root.add(holder);

    return { holder, body, bodyMat, faceMat, faceTex, shadow, rim, hover: 0, seed: i * 1.37 + 0.4 };
  });

  /* ---------------- sizing ---------------- */
  let layout = buildLayout(16 / 9);
  let width = 1;
  let height = 1;
  const resize = () => {
    width = Math.max(1, container.clientWidth);
    height = Math.max(1, container.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = camera.aspect < 0.85 ? 44 : 34;
    camera.updateProjectionMatrix();
    layout = buildLayout(camera.aspect);
    if (!running) renderOnce();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  /* ---------------- picking ---------------- */
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const pickables = cubes.map((c) => c.holder);
  let hovered: number | null = null;
  let pinned = false;
  let down: { x: number; y: number; t: number; type: string } | null = null;

  const pick = (clientX: number, clientY: number): number | null => {
    const rect = canvas.getBoundingClientRect();
    ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(pickables, true)[0];
    const idx = hit?.object.userData.index;
    return typeof idx === 'number' ? idx : null;
  };
  const setHovered = (idx: number | null, pin = false) => {
    if (idx === hovered && pin === pinned) return;
    hovered = idx;
    pinned = idx !== null && pin;
    canvas.style.cursor = idx !== null ? 'pointer' : '';
    onHover(idx, pinned);
  };

  const pointer = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    if (e.pointerType === 'mouse' || e.pointerType === 'pen') setHovered(pick(e.clientX, e.clientY));
  };
  const onLeave = (e: PointerEvent) => { if (e.pointerType !== 'touch') setHovered(null); };
  const onDown = (e: PointerEvent) => { down = { x: e.clientX, y: e.clientY, t: performance.now(), type: e.pointerType }; };
  const onCancel = () => { down = null; };
  const onUp = (e: PointerEvent) => {
    const d = down;
    down = null;
    // Movement / duration threshold: drags, scroll gestures and long presses never navigate.
    if (!d || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6 || performance.now() - d.t > 650) return;
    const idx = pick(e.clientX, e.clientY);
    if (d.type === 'touch') {
      // First tap selects and shows the tooltip (with a real link); second tap opens.
      if (idx === null) setHovered(null);
      else if (idx === hovered && pinned) onActivate(idx);
      else setHovered(idx, true);
      return;
    }
    if (idx !== null) onActivate(idx);
  };
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerleave', onLeave);
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onCancel);

  const onLost = (e: Event) => { e.preventDefault(); onContextLost(); };
  canvas.addEventListener('webglcontextlost', onLost);

  /* ---------------- animation ---------------- */
  const tmpQ = new THREE.Quaternion();
  const tmpV = new THREE.Vector3();
  const spinAxis = new THREE.Vector3(0.3, 1, 0.2).normalize();
  const wobble = new THREE.Quaternion();
  const wobbleE = new THREE.Euler();
  let smoothed = reducedMotion ? STATIC_PROGRESS : getProgress();
  let camX = 0;
  let camY = 0;
  let last = performance.now();
  let slowFrames = 0;

  const update = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const target = reducedMotion ? STATIC_PROGRESS : getProgress();
    smoothed += (target - smoothed) * (reducedMotion ? 1 : 1 - Math.exp(-dt * 7));
    const [from, to, t] = segment(smoothed);
    const time = reducedMotion ? 0 : now / 1000;

    root.scale.setScalar(layout.group.scale);
    root.position.set(layout.group.x, layout.group.y, 0);
    // Gentle whole-cluster turn while assembled reads as "one block".
    const assembled = from === 1 || to === 1 ? (from === 1 && to === 1 ? 1 : from === 1 ? 1 - t : t) : 0;
    root.rotation.z = reducedMotion ? 0 : assembled * Math.sin(time * 0.25) * 0.12;

    const A = layout.formations[from];
    const B = layout.formations[to];
    cubes.forEach((c, i) => {
      c.hover += ((hovered === i ? 1 : 0) - c.hover) * (1 - Math.exp(-dt * 10));
      // Hover damping: a hovered cube nearly stops floating so it is easy to hit.
      const motion = (1 - c.hover * 0.85) * (reducedMotion ? 0 : 1);

      tmpV.copy(A[i].p).lerp(B[i].p, t);
      tmpV.y += Math.sin(time * 0.7 + c.seed * 2.1) * 0.12 * motion;
      tmpV.x += Math.cos(time * 0.5 + c.seed) * 0.05 * motion;
      tmpV.z += c.hover * 0.45;
      c.holder.position.copy(tmpV);

      tmpQ.copy(A[i].q).slerp(B[i].q, t);
      // Extra spin during transitions so cubes tumble rather than slide.
      if (from !== to) tmpQ.premultiply(wobble.setFromAxisAngle(spinAxis, Math.sin(Math.PI * t) * 0.9 * (i % 2 ? 1 : -1)));
      wobbleE.set(
        Math.sin(time * 0.45 + c.seed) * 0.06 * motion,
        Math.cos(time * 0.38 + c.seed * 1.7) * 0.08 * motion,
        0,
      );
      tmpQ.multiply(wobble.setFromEuler(wobbleE));
      c.holder.quaternion.copy(tmpQ);

      const s = (A[i].s + (B[i].s - A[i].s) * t) * (1 + c.hover * 0.07);
      c.holder.scale.setScalar(s);
      c.rim.value = 0.5 + c.hover * 1.8;

      // Contact shadow sits just behind the cube, fading as it lifts.
      c.shadow.position.set(tmpV.x + 0.25, tmpV.y - 0.35, tmpV.z - CUBE * 0.9);
      c.shadow.scale.setScalar(s * 1.1);
      (c.shadow.material as THREE.MeshBasicMaterial).opacity = 0.9 - c.hover * 0.3;
    });

    // Camera dolly + pointer parallax.
    const dolly = [15, 12.6, 13.6, 14.5];
    camera.position.z = dolly[from] + (dolly[to] - dolly[from]) * t;
    if (!reducedMotion) {
      camX += (pointer.x * 0.35 - camX) * (1 - Math.exp(-dt * 3));
      camY += (-pointer.y * 0.22 - camY) * (1 - Math.exp(-dt * 3));
    }
    camera.position.x = camX;
    camera.position.y = camY;
    camera.lookAt(camX * 0.4, camY * 0.4, 0);

    // Tooltip follows the hovered cube's top edge.
    if (hovered !== null) {
      const h = cubes[hovered].holder;
      tmpV.set(0, CUBE * 0.62, 0).applyMatrix4(h.matrixWorld).project(camera);
      const x = (tmpV.x * 0.5 + 0.5) * width;
      const y = (-tmpV.y * 0.5 + 0.5) * height;
      tooltip.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -100%)`;
    }

    // Adaptive resolution: drop DPR if frames are consistently slow.
    if (dt > 0.024) slowFrames++;
    else slowFrames = Math.max(0, slowFrames - 1);
    if (slowFrames > 45 && dpr > 1) {
      dpr = 1;
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      slowFrames = 0;
    }
  };

  let raf = 0;
  let running = false;
  let disposed = false;
  const frame = (now: number) => {
    if (!running) return;
    update(now);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };
  const renderOnce = () => {
    update(performance.now());
    renderer.render(scene, camera);
  };

  const setActive = (active: boolean) => {
    if (disposed || active === running) return;
    running = active;
    if (active) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(raf);
    }
  };

  resize();
  renderOnce();

  return {
    setActive,
    clearSelection: () => setHovered(null),
    dispose: () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onCancel);
      canvas.removeEventListener('webglcontextlost', onLost);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m: THREE.Material & { map?: THREE.Texture | null }) => {
            m.map?.dispose();
            m.dispose();
          });
        }
      });
      cubes.forEach((c) => c.faceTex.dispose());
      bodyGeo.dispose();
      faceGeo.dispose();
      shadowGeo.dispose();
      perf.dispose();
      shadowTex.dispose();
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}

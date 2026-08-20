'use client';

// The MOTHER EXO humanoid in a real 3D CAD area: the fabrication assembly
// itself - every manufactured part as its own solid, placed in robot
// coordinates - loaded live through /api/exo-cad and rendered with three.
// Nothing about the model lives in this repo, so whatever the robotics platform
// is serving is what visitors see.
//
// This is the engineering CAD rather than the simulation model: ~169 parts and
// close to a million triangles, against 25 decimated shells for the sim mesh.
// It is fetched when the frame scrolls into view rather than on page load, and
// parts appear as they arrive so the robot assembles in front of you.

import { useCallback, useEffect, useRef, useState } from 'react';
import { RotateCw, Move3d, Maximize2, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'ready' | 'error';

interface PartIndex {
  parts: Record<string, { file: string; subassembly: string; material?: string }>;
}
interface Placement {
  part_id: string;
  instance: number;
  subassembly: string;
  transform: number[][];
}

/** How many part files to have in flight at once. */
const CONCURRENCY = 6;

export default function ExoCadViewer({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const controlsRef = useRef<{ reset: () => void; setSpin: (on: boolean) => void } | null>(null);
  const startedRef = useRef(false);
  const retriedRef = useRef(false);
  const [status, setStatus] = useState<Status>('idle');
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(0);
  const [spin, setSpin] = useState(true);

  useEffect(() => () => cleanupRef.current?.(), []);

  const load = useCallback(async () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStatus('loading');
    setLoaded(0);

    try {
      const [THREE, { OrbitControls }, { GLTFLoader }] = await Promise.all([
        import('three'),
        import('three/examples/jsm/controls/OrbitControls.js'),
        import('three/examples/jsm/loaders/GLTFLoader.js'),
      ]);

      const mount = mountRef.current;
      if (!mount) return;

      const [indexRes, placementRes] = await Promise.all([
        fetch('/api/exo-cad/fabrication/index.json'),
        fetch('/api/exo-cad/fabrication/placements.json'),
      ]);
      if (!indexRes.ok || !placementRes.ok) throw new Error('manifest');
      const index: PartIndex = await indexRes.json();
      const manifest: { placements: Placement[] } = await placementRes.json();

      // A placement whose part is missing from the index has no file to fetch.
      const jobs = manifest.placements.filter((p) => index.parts[p.part_id]);
      setTotal(jobs.length);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#05060A');

      const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.01, 100);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      mount.appendChild(renderer.domElement);

      // Neutral key with cyan and violet rims: the site's accent pair reads on
      // the silhouette without washing the machined surfaces out.
      scene.add(new THREE.HemisphereLight(0x9fd8ff, 0x0b0e16, 0.55));
      const key = new THREE.DirectionalLight(0xffffff, 1.9);
      key.position.set(3, 4, 2);
      scene.add(key);
      const rimCyan = new THREE.DirectionalLight(0x22d3ee, 1.1);
      rimCyan.position.set(-2.5, 1.5, 2.5);
      scene.add(rimCyan);
      const rimViolet = new THREE.DirectionalLight(0xa855f7, 0.9);
      rimViolet.position.set(-3, 2, -2.5);
      scene.add(rimViolet);
      const fill = new THREE.DirectionalLight(0xffffff, 0.35);
      fill.position.set(0, -3, 1);
      scene.add(fill);

      const grid = new THREE.GridHelper(6, 24, 0x22d3ee, 0x1a1e2b);
      const gridMaterial = grid.material as { opacity: number; transparent: boolean };
      gridMaterial.opacity = 0.22;
      gridMaterial.transparent = true;
      scene.add(grid);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.07;

      // Graphene-dark parts, tinted by subassembly the way the platform's own
      // viewer groups them, so the joint chain reads at frame size.
      const grapheneBase = { metalness: 0.62, roughness: 0.44 } as const;
      const materials = {
        core: new THREE.MeshStandardMaterial({ ...grapheneBase, color: 0xc79a3a }),
        arm: new THREE.MeshStandardMaterial({ ...grapheneBase, color: 0x2aa7bd }),
        leg: new THREE.MeshStandardMaterial({ ...grapheneBase, color: 0xb2497e }),
      };
      const materialFor = (subassembly: string) => {
        if (subassembly === '300' || subassembly === '400') return materials.arm;
        if (subassembly === '500' || subassembly === '600') return materials.leg;
        return materials.core;
      };

      const robot = new THREE.Group();
      scene.add(robot);

      const gltfLoader = new GLTFLoader();
      const loadPart = (job: Placement) =>
        new Promise<void>((resolve) => {
          const entry = index.parts[job.part_id];
          gltfLoader.load(
            `/api/exo-cad/fabrication/${entry.file}`,
            (gltf) => {
              const material = materialFor(job.subassembly);
              gltf.scene.traverse((o: any) => { if (o.isMesh) o.material = material; });
              // placements.json carries row-major 4x4s in robot coordinates -
              // the whole assembly shares one frame, so no kinematics needed.
              const t = job.transform;
              const m = new THREE.Matrix4().set(
                t[0][0], t[0][1], t[0][2], t[0][3],
                t[1][0], t[1][1], t[1][2], t[1][3],
                t[2][0], t[2][1], t[2][2], t[2][3],
                t[3][0], t[3][1], t[3][2], t[3][3],
              );
              gltf.scene.applyMatrix4(m);
              robot.add(gltf.scene);
              resolve();
            },
            undefined,
            // A part that will not load should cost its own absence, not the
            // whole assembly - the count in the caption tells the truth.
            () => resolve(),
          );
        });

      let cursor = 0;
      let done = 0;
      const worker = async () => {
        while (cursor < jobs.length) {
          const job = jobs[cursor++];
          await loadPart(job);
          done += 1;
          setLoaded(done);
          if (done === 12) fit();
        }
      };

      // CAD is Z-up; three is Y-up.
      robot.rotation.x = -Math.PI / 2;

      let home = { position: new THREE.Vector3(1.9, 1.1, 2.1), target: new THREE.Vector3(0, 0.8, 0) };
      function fit() {
        robot.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(robot);
        const size = box.getSize(new THREE.Vector3());
        if (!Number.isFinite(size.y) || size.y < 1e-6) return;
        const centre = box.getCenter(new THREE.Vector3());
        robot.position.x -= centre.x - robot.position.x;
        robot.position.z -= centre.z - robot.position.z;
        robot.position.y -= box.min.y - robot.position.y;
        robot.updateMatrixWorld(true);

        const fitted = new THREE.Box3().setFromObject(robot);
        const height = fitted.max.y - fitted.min.y;
        const radius = fitted.getBoundingSphere(new THREE.Sphere()).radius;
        const distance = (radius / Math.sin((camera.fov * Math.PI) / 360)) * 1.15;
        const eye = new THREE.Vector3(0.62, 0.42, 1).normalize().multiplyScalar(distance);
        camera.position.set(eye.x, height * 0.55 + eye.y, eye.z);
        camera.near = distance / 100;
        camera.far = distance * 20;
        camera.updateProjectionMatrix();
        controls.minDistance = distance * 0.35;
        controls.maxDistance = distance * 3;
        controls.target.set(0, height * 0.5, 0);
        controls.update();
        home = { position: camera.position.clone(), target: controls.target.clone() };
      }

      let spinning = true;
      let frame = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (spinning) robot.rotation.z += 0.0032;
        controls.update();
        renderer.render(scene, camera);
      };
      tick();
      setStatus('ready');

      await Promise.all(Array.from({ length: CONCURRENCY }, worker));
      fit();

      const onResize = () => {
        if (!mount.clientWidth) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', onResize);

      controlsRef.current = {
        reset: () => {
          camera.position.copy(home.position);
          controls.target.copy(home.target);
          controls.update();
        },
        setSpin: (on: boolean) => { spinning = on; },
      };

      cleanupRef.current = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', onResize);
        controls.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        scene.traverse((o: any) => { o.geometry?.dispose?.(); });
        Object.values(materials).forEach((m) => m.dispose());
      };
    } catch {
      if (!retriedRef.current) {
        retriedRef.current = true;
        startedRef.current = false;
        setTimeout(() => { void load(); }, 1500);
        return;
      }
      setStatus('error');
    }
  }, []);

  // Fetch when the frame comes into view - a visitor who never scrolls this far
  // never pays for the assembly.
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || startedRef.current) return;

    const connection = (navigator as any).connection;
    const metered = connection?.saveData === true || /^(slow-)?2g$/.test(connection?.effectiveType ?? '');
    if (metered) return;

    if (typeof IntersectionObserver === 'undefined') { void load(); return; }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          void load();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(mount);
    return () => observer.disconnect();
  }, [load]);

  const toggleSpin = () => {
    const next = !spin;
    setSpin(next);
    controlsRef.current?.setSpin(next);
  };

  const assembling = status === 'ready' && total > 0 && loaded < total;

  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-hair bg-night-800/60 ${className}`}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div ref={mountRef} className="absolute inset-0" />

      {status !== 'ready' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <Move3d className="h-8 w-8 text-cyan" />
          <div>
            <p className="font-display text-xl text-mist">MOTHER EXO · fabrication CAD</p>
            <p className="mt-1 text-sm text-muted">
              Every machined part as a solid, straight from the robotics platform - rotate, pan and zoom the current design.
            </p>
          </div>
          {status === 'idle' && (
            <button onClick={() => { retriedRef.current = false; void load(); }} className="btn-glow px-5 py-2 text-sm">
              Load the 3D model
            </button>
          )}
          {status === 'loading' && (
            <p className="inline-flex items-center gap-2 text-sm text-cyan">
              <Loader2 className="h-4 w-4 animate-spin" /> Fetching the assembly…
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-ember">
              The CAD source is unreachable right now.{' '}
              <button
                onClick={() => { retriedRef.current = false; startedRef.current = false; setStatus('idle'); }}
                className="underline hover:text-mist"
              >
                Try again
              </button>
            </p>
          )}
        </div>
      )}

      {status === 'ready' && (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-night/85 to-transparent px-3 pb-3 pt-8">
          <span className="font-mono text-[10px] tracking-wide text-slate-400">
            {assembling ? `MOTHER EXO · assembling ${loaded} of ${total} parts` : `MOTHER EXO · fabrication CAD · ${loaded} parts`}
          </span>
          <span className="flex gap-2">
            <button onClick={toggleSpin} aria-pressed={spin}
              className="inline-flex items-center gap-1.5 rounded-lg border border-hair bg-night-800/80 px-2.5 py-1.5 text-[11px] text-muted transition-colors hover:text-mist">
              <RotateCw className="h-3.5 w-3.5" /> {spin ? 'Stop' : 'Spin'}
            </button>
            <button onClick={() => controlsRef.current?.reset()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-hair bg-night-800/80 px-2.5 py-1.5 text-[11px] text-muted transition-colors hover:text-mist">
              <Maximize2 className="h-3.5 w-3.5" /> Reset view
            </button>
          </span>
        </div>
      )}
    </div>
  );
}

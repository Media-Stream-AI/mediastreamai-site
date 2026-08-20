'use client';

// The MOTHER EXO humanoid in a real 3D CAD area: the platform's own URDF and
// meshes, loaded live through /api/exo-cad, assembled with urdf-loader and
// rendered with three. Nothing about the model lives in this repo, so whatever
// the robotics platform is serving is what visitors see.
//
// ~7 MB of binary STL is fetched when the frame scrolls into view rather than
// on page load, so it never sits on the critical path for a visitor who does
// not reach it. On a metered or very slow connection it waits to be asked.

import { useCallback, useEffect, useRef, useState } from 'react';
import { RotateCw, Move3d, Maximize2, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'ready' | 'error';

export default function ExoCadViewer({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const controlsRef = useRef<{ reset: () => void; setSpin: (on: boolean) => void } | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [progress, setProgress] = useState(0);
  const [spin, setSpin] = useState(true);
  const startedRef = useRef(false);
  const retriedRef = useRef(false);

  useEffect(() => () => cleanupRef.current?.(), []);

  const load = useCallback(async () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStatus('loading');
    setProgress(0);

    try {
      const [THREE, { OrbitControls }, { STLLoader }, urdfModule] = await Promise.all([
        import('three'),
        import('three/examples/jsm/controls/OrbitControls.js'),
        import('three/examples/jsm/loaders/STLLoader.js'),
        import('urdf-loader'),
      ]);
      const URDFLoader = urdfModule.default;

      const mount = mountRef.current;
      if (!mount) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#05060A');

      const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.05, 100);
      camera.position.set(1.9, 1.1, 2.1);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      mount.appendChild(renderer.domElement);

      // Neutral key with cyan and violet rims: the site's accent pair reads on
      // the silhouette without washing the machined surfaces out to flat cyan.
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
      controls.minDistance = 0.9;
      controls.maxDistance = 6;
      controls.target.set(0, 0.85, 0);
      controls.update();

      // Graphene-dark parts, tinted by kinematic group the way the robotics
      // platform's own viewer does - a single flat colour across 26 coarsely
      // tessellated shells reads as noise at this size, where grouping lets the
      // silhouette and the joint chain come through.
      const grapheneBase = {
        metalness: 0.62,
        roughness: 0.44,
        flatShading: true,
        // The exported STLs carry inconsistently wound facets; front-face-only
        // rendering punches dark speckles through the shells.
        side: THREE.DoubleSide,
      } as const;
      const materials = {
        core: new THREE.MeshStandardMaterial({ ...grapheneBase, color: 0xc79a3a }),
        arm: new THREE.MeshStandardMaterial({ ...grapheneBase, color: 0x2aa7bd }),
        leg: new THREE.MeshStandardMaterial({ ...grapheneBase, color: 0xb2497e }),
      };
      /** Group a part by its mesh filename - the URDF link names carry through. */
      const materialFor = (path: string) => {
        const part = path.split('/').pop()?.toUpperCase() ?? '';
        if (/SHOULDER|ELBOW|WRIST/.test(part)) return materials.arm;
        if (/HIP|KNEE|ANKLE/.test(part)) return materials.leg;
        return materials.core;
      };

      const manager = new THREE.LoadingManager();
      manager.onProgress = (_url, loaded, total) => setProgress(Math.round((loaded / Math.max(total, 1)) * 100));
      // urdf-loader resolves as soon as the XML is parsed, with every STL still
      // in flight through loadMeshCb - measuring then yields an empty bounding
      // box and a NaN camera. The manager fires onLoad once the meshes land.
      let meshesSettled: () => void = () => {};
      const meshesLoaded = new Promise<void>((resolve) => { meshesSettled = resolve; });
      manager.onLoad = () => meshesSettled();

      const loader = new URDFLoader(manager);
      loader.loadMeshCb = (path, _mgr, done) => {
        const material = materialFor(path);
        new STLLoader(manager).load(
          path,
          (geometry) => {
            // Keep the facet normals the STL ships with: recomputing them
            // smooths across machined edges and the parts read as speckled
            // blobs rather than milled surfaces.
            const mesh = new THREE.Mesh(geometry, material);
            // urdf-loader reassigns the material of any Mesh it receives to the
            // one declared in the URDF (a plain white Phong), so stash ours and
            // put it back once the robot is assembled.
            mesh.userData.msaiMaterial = material;
            done(mesh);
          },
          undefined,
          (err) => done(null as never, err as Error),
        );
      };

      const robot: any = await new Promise((resolve, reject) => {
        loader.load('/api/exo-cad/asimov_1.urdf', resolve, undefined, reject);
      });

      // URDF is Z-up; three is Y-up.
      robot.rotation.x = -Math.PI / 2;
      scene.add(robot);

      await Promise.race([
        meshesLoaded,
        new Promise((resolve) => setTimeout(resolve, 60_000)),
      ]);
      robot.traverse((o: any) => {
        if (o.isMesh && o.userData.msaiMaterial) o.material = o.userData.msaiMaterial;
      });
      robot.updateMatrixWorld(true);

      // CAD exports arrive in whatever unit the source used - these STLs are in
      // millimetres, so a raw load puts the camera inside a 1.7km robot. Fit to
      // a fixed on-screen height instead of trusting the unit, then frame it.
      const raw = new THREE.Box3().setFromObject(robot);
      const rawSize = raw.getSize(new THREE.Vector3());
      const TARGET_HEIGHT = 1.6;
      const usableHeight = Number.isFinite(rawSize.y) && rawSize.y > 1e-6 ? rawSize.y : TARGET_HEIGHT;
      const scale = TARGET_HEIGHT / usableHeight;
      robot.scale.setScalar(scale);
      robot.updateMatrixWorld(true);

      const box = new THREE.Box3().setFromObject(robot);
      const centre = box.getCenter(new THREE.Vector3());
      robot.position.x -= centre.x;
      robot.position.z -= centre.z;
      robot.position.y -= box.min.y;
      robot.updateMatrixWorld(true);

      const height = box.max.y - box.min.y;
      const radius = new THREE.Box3().setFromObject(robot).getBoundingSphere(new THREE.Sphere()).radius;
      const safeRadius = Number.isFinite(radius) && radius > 1e-6 ? radius : TARGET_HEIGHT;
      const distance = (safeRadius / Math.sin((camera.fov * Math.PI) / 360)) * 1.15;
      const eye = new THREE.Vector3(0.62, 0.42, 1).normalize().multiplyScalar(distance);
      camera.position.set(eye.x, height * 0.55 + eye.y, eye.z);
      camera.near = distance / 100;
      camera.far = distance * 20;
      camera.updateProjectionMatrix();
      controls.minDistance = distance * 0.35;
      controls.maxDistance = distance * 3;
      controls.target.set(0, height * 0.5, 0);
      controls.update();
      const home = { position: camera.position.clone(), target: controls.target.clone() };

      let spinning = true;
      let frame = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (spinning) robot.rotation.z += 0.0032;
        controls.update();
        renderer.render(scene, camera);
      };
      tick();

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

      setStatus('ready');
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
  // never pays for the model.
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

  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-hair bg-night-800/60 ${className}`}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div ref={mountRef} className="absolute inset-0" />

      {status !== 'ready' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <Move3d className="h-8 w-8 text-cyan" />
          <div>
            <p className="font-display text-xl text-mist">MOTHER EXO · full CAD</p>
            <p className="mt-1 text-sm text-muted">
              26 links, 25 joints, straight from the robotics platform - rotate, pan and zoom the current design.
            </p>
          </div>
          {status === 'idle' && (
            <button onClick={() => { retriedRef.current = false; void load(); }} className="btn-glow px-5 py-2 text-sm">
              Load the 3D model
            </button>
          )}
          {status === 'loading' && (
            <p className="inline-flex items-center gap-2 text-sm text-cyan">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading CAD… {progress}%
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
          <span className="font-mono text-[10px] tracking-wide text-slate-400">MOTHER EXO · live CAD · 26 links</span>
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

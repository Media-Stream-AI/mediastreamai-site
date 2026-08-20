// Live CAD proxy for the MOTHER EXO viewer on /exo.
//
// The robotics platform publishes the humanoid's fabrication assembly - every
// manufactured part as a GLB, plus the manifest placing each one in robot
// coordinates - but sends no CORS headers and denies framing, so the browser
// cannot read them from this origin directly. This route fetches them
// server-side and re-serves them same-origin, which means the page always
// renders whatever the platform is serving right now - there is no copy of the
// model in this repo to go stale.
//
// Only the manifest and its part files are reachable through here; anything
// else 404s rather than turning this into an open proxy.

import { NextRequest, NextResponse } from 'next/server';
import fallbackIndex from '../fallback-index.json';

const UPSTREAM = 'https://robotics.mediastreamai.com/cad/asimov_v1';

/** The fabrication assembly: its manifests and its part GLBs. Nothing else -
 *  this must not become an open proxy. */
function upstreamFor(segments: string[]): string | null {
  const path = segments.join('/');
  if (path === 'fabrication/placements.json') return `${UPSTREAM}/fabrication/placements.json`;
  if (path === 'fabrication/index.json') return `${UPSTREAM}/fabrication/index.json`;
  if (/^fabrication\/[0-9]{3}\/[A-Za-z0-9_.-]+\.glb$/.test(path)) return `${UPSTREAM}/${path}`;
  return null;
}

export const revalidate = 3600;

export async function GET(_request: NextRequest, { params }: { params: { path: string[] } }) {
  const target = upstreamFor(params.path ?? []);
  if (!target) return new NextResponse('Not found', { status: 404 });

  let upstream: Response;
  try {
    upstream = await fetch(target, {
      headers: { accept: '*/*' },
      next: { revalidate: 3600 },
    });
  } catch {
    return new NextResponse('CAD source unreachable', { status: 502 });
  }

  if (!upstream.ok) {
    // The placement manifest names parts; the index says which file holds each
    // one. The platform builds that mapping into its API rather than publishing
    // it, so until it ships an index.json we serve the mirrored one. Part files
    // carry a content hash in their name, so a mirror can go stale - which is
    // why upstream is asked first, every time.
    if (params.path?.join('/') === 'fabrication/index.json') {
      return NextResponse.json(fallbackIndex, {
        headers: { 'cache-control': 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400' },
      });
    }
    return new NextResponse('CAD source returned an error', { status: upstream.status === 404 ? 404 : 502 });
  }

  const isManifest = target.endsWith('.json');
  const body = await upstream.arrayBuffer();

  return new NextResponse(body, {
    status: 200,
    headers: {
      'content-type': isManifest ? 'application/json; charset=utf-8' : 'model/gltf-binary',
      // Long CDN cache with revalidation: the viewer stays fast, and a new
      // upstream design is picked up on the next revalidation rather than
      // needing a redeploy.
      'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

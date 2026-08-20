// Live CAD proxy for the MOTHER EXO viewer on /exo.
//
// The robotics platform publishes the humanoid's URDF and its meshes, but sends
// no CORS headers and denies framing, so the browser cannot read them from this
// origin directly. This route fetches them server-side and re-serves them
// same-origin, which means the page always renders whatever the platform is
// serving right now - there is no copy of the model in this repo to go stale.
//
// Only the URDF and its mesh files are reachable through here; anything else
// 404s rather than turning this into an open proxy.

import { NextRequest, NextResponse } from 'next/server';

const UPSTREAM = 'https://robotics.mediastreamai.com/cad/asimov_v1';

/** `asimov_1.urdf`, or `meshes/SOME_PART.STL`. Nothing else. */
function upstreamFor(segments: string[]): string | null {
  const path = segments.join('/');
  if (path === 'asimov_1.urdf') return `${UPSTREAM}/asimov_1.urdf`;
  if (/^meshes\/[A-Za-z0-9_]+\.STL$/.test(path)) return `${UPSTREAM}/${path}`;
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
    return new NextResponse('CAD source returned an error', { status: upstream.status === 404 ? 404 : 502 });
  }

  const isUrdf = target.endsWith('.urdf');
  const body = isUrdf
    // The platform's URDF points at ../assets/meshes/, which is not where it
    // serves them; rewrite to the path that actually resolves, through here.
    ? (await upstream.text()).replace(/\.\.\/assets\/meshes\//g, 'meshes/')
    : await upstream.arrayBuffer();

  return new NextResponse(body, {
    status: 200,
    headers: {
      'content-type': isUrdf ? 'application/xml; charset=utf-8' : 'model/stl',
      // Long CDN cache with revalidation: the viewer stays fast, and a new
      // upstream design is picked up on the next revalidation rather than
      // needing a redeploy.
      'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

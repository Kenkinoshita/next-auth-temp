import type { NextRequest, NextResponse } from 'next/server';

import { fetchCorporations } from '@/service/corporations';
import { sendRequestFromNextServer } from '@/service/sendRequestFromNextServer';
import { parseCorporationSearchCondition } from '@shared/features/corporation/corporationSearchCondition';

export async function GET(req: NextRequest): Promise<NextResponse<unknown>> {
  const {
    nextUrl: { searchParams },
  } = req;
  const fetcher = () => fetchCorporations(parseCorporationSearchCondition(searchParams));
  return await sendRequestFromNextServer(fetcher, req);
}

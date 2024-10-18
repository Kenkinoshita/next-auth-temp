import type { NextRequest, NextResponse } from 'next/server';

import { downloadCorporationsCsv } from '@/service/corporations';
import { sendRequestFromNextServer } from '@/service/sendRequestFromNextServer';
import { parseCorporationSearchCondition } from '@shared/features/corporation/corporationSearchCondition';

export async function GET(req: NextRequest): Promise<NextResponse<unknown>> {
  const {
    nextUrl: { searchParams },
  } = req;
  const fetcher = () => downloadCorporationsCsv(parseCorporationSearchCondition(searchParams));
  return await sendRequestFromNextServer(fetcher, req);
}

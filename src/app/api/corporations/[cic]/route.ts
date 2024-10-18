import type { NextRequest, NextResponse } from 'next/server';

import {
  createCorporation,
  updateCorporation,
  deleteCorporation,
  fetchCorporationDetail,
} from '@/service/corporations';
import { sendRequestFromNextServer } from '@/service/sendRequestFromNextServer';

type Params = { cic: string };

export async function GET(req: NextRequest, { params: { cic } }: { params: Params }): Promise<NextResponse<unknown>> {
  const fetcher = () => fetchCorporationDetail(cic);
  return await sendRequestFromNextServer(fetcher, req);
}

export async function POST(req: NextRequest, { params: { cic } }: { params: Params }): Promise<NextResponse<unknown>> {
  const body = await req.json();
  const fetcher = () => createCorporation(cic, body);
  return await sendRequestFromNextServer(fetcher, req);
}

export async function PUT(req: NextRequest, { params: { cic } }: { params: Params }): Promise<NextResponse<unknown>> {
  const body = await req.json();
  const fetcher = () => updateCorporation(cic, body);
  return await sendRequestFromNextServer(fetcher, req);
}

export async function DELETE(
  req: NextRequest,
  { params: { cic } }: { params: Params },
): Promise<NextResponse<unknown>> {
  const fetcher = () => deleteCorporation(cic);
  return await sendRequestFromNextServer(fetcher, req);
}

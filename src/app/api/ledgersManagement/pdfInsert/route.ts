import type { NextRequest, NextResponse } from 'next/server';

import { insertPDF } from '@/service/ledgersPDFInsertForBack';
import { sendRequestFromNextServer } from '@/service/sendRequestFromNextServer';

export async function POST(req: NextRequest): Promise<NextResponse<unknown>> {
  const body = await req.json();
  const fetcher = () => insertPDF(body);
  return await sendRequestFromNextServer(fetcher, req);
}

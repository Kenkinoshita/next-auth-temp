import type { NextRequest, NextResponse } from 'next/server';

import { deletePDF } from '@/service/ledgersPDFDeleteForBack';
import { sendRequestFromNextServer } from '@/service/sendRequestFromNextServer';
import type { LedgerType } from '@shared/schemas/ledger/ledgerType';

type Params = { cic: string; type: LedgerType; createdDate: string; version: number };

/**
 * 帳票管理の帳票取り下げAPIを呼び出す。
 * @param _req
 * @param params
 * @returns
 */
export async function DELETE(req: NextRequest, { params }: { params: Params }): Promise<NextResponse<unknown>> {
  const fetcher = () => deletePDF(params);
  return await sendRequestFromNextServer(fetcher, req);
}

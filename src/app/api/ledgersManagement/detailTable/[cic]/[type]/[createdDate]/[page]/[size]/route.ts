import type { NextRequest, NextResponse } from 'next/server';

import { fetchLedgersDetailTable } from '@/service/fetchLedgersDetailForBack';
import { sendRequestFromNextServer } from '@/service/sendRequestFromNextServer';
import type { LedgerType } from '@shared/schemas/ledger/ledgerType';

type Params = { cic: string; type: LedgerType; createdDate: string; page: string; size: string };

/**
 * 帳票管理詳細画面の帳票履歴情報を返却する。
 * @param _req
 * @param params
 * @returns
 */
export async function GET(req: NextRequest, { params }: { params: Params }): Promise<NextResponse<unknown>> {
  const fetcher = () => fetchLedgersDetailTable(params);
  return await sendRequestFromNextServer(fetcher, req);
}

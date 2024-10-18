import type { NextRequest, NextResponse } from 'next/server';

import { sendRequestFromNextServer } from '@/service/sendRequestFromNextServer';
import type { LedgerSearchResultInput } from '@shared/schemas/ledger/management/ledgerSearchResult';
import { apiClient } from '@shared/service/apiClient';

/**
 * 帳票管理一覧を返します。
 *
 * @param {NextRequest} req - Next.jsのリクエストオブジェクト
 * @returns {NextResponse} - Next.jsのレスポンスオブジェクト
 */
export async function GET(req: NextRequest): Promise<NextResponse<LedgerSearchResultInput | { message: string }>> {
  const {
    nextUrl: { searchParams },
  } = req;
  const fetcher = () => apiClient.fetchForServer<LedgerSearchResultInput>(`ledgersManagement?${searchParams}`);
  return await sendRequestFromNextServer<LedgerSearchResultInput>(fetcher, req);
}

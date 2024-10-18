import type { NextRequest, NextResponse } from 'next/server';

import { sendRequestFromNextServer } from '@/service/sendRequestFromNextServer';
import type { LedgerPDFSearchResultInput } from '@shared/schemas/ledger/inquiry/ledgerPDFSearchResult';
import { apiClient } from '@shared/service/apiClient';

/**
 * 指定されたIDのダウンロード要求を処理し、PDFファイルをレスポンスとして返します。
 *
 * @param {NextRequest} req - Next.jsのリクエストオブジェクト
 * @returns {NextResponse} - Next.jsのレスポンスオブジェクト
 */
export async function GET(req: NextRequest): Promise<NextResponse<LedgerPDFSearchResultInput | { message: string }>> {
  const {
    nextUrl: { searchParams },
  } = req;

  const fetchPDF = () =>
    apiClient.fetchForServer<LedgerPDFSearchResultInput>(`ledgersManagement/pdfDownload?${searchParams}`);
  return await sendRequestFromNextServer<LedgerPDFSearchResultInput>(fetchPDF, req);
}

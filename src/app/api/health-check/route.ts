import { NextResponse } from 'next/server';

/**
 * ALBのヘルスチェックに対してステータスコード200を返すAPI
 *
 * @returns {NextResponse} - Next.jsのレスポンスオブジェクト
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ message: 'It Works!' }, { status: 200 });
}

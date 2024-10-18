import { isAxiosError } from 'axios';
import { NextResponse } from 'next/server';

/**
 * @deprecated セッション管理が含まれるcreateSendRequestFromNextServerをお使いください
 */
export const sendRequestFromNextServer = async <T>(
  httpRequestFunction: () => Promise<T>,
): Promise<NextResponse<T | { message: string }>> => {
  try {
    const response = await httpRequestFunction();
    const res = NextResponse.json(response ?? { message: 'success' });
    return res;
  } catch (error) {
    //FIXME: 環境変数どうするか検討する
    if (process.env.ENV === 'local') {
      console.error('Request From Next Server is Failed.', error);
    }
    if (isAxiosError(error)) {
      const { response } = error;
      const res = NextResponse.json(
        { message: response?.data.message ?? 'Internal Server Error' },
        { status: response?.status ?? 500 },
      );
      return res;
    }

    const res = NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    return res;
  }
};

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { useSetRecoilState } from 'recoil';

import { apiClientForAuth } from '@/service/apiClientForAuth';
import { fetchSession } from '@/service/fetchSession';
import { userStore } from '@/store/user';

/**
 * LandingPageコンポーネント
 *
 * ユーザーのログイン処理を行い、ログイン成功後にリダイレクトするページ
 *
 */
const Content = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useSetRecoilState(userStore);

  useEffect(() => {
    const token = searchParams.get('token');

    const fetchData = async () => {
      if (!token) {
        router.replace('/error');
        return;
      }

      try {
        const loginResponse = await apiClientForAuth.post('/auth/signIn', { body: { token } });

        if (!loginResponse) {
          router.replace('/error');
          return;
        }

        const session = await fetchSession();
        setUser(session);

        router.replace('/');
      } catch {
        router.replace('/error');
      }
    };

    fetchData();
  }, [router, searchParams, setUser]);

  return null;
};

//NOTE: Content内でuseSearchParamsを使用しているため、Suspenseで囲っている（FYI: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout）
//FIXME: こちら暫定対応なので、後で対応すること
const LandingPage = () => {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
};

export default LandingPage;

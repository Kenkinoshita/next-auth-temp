'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useCallback, useState, type ReactNode } from 'react';

import { useUserBySession } from '@/hooks/useUserBySession';
import { AppFooter } from '@/templates/AppFooter';
import { AppHeader } from '@/templates/AppHeader';
import { Backdrop } from '@shared/components/Backdrop/Backdrop';

type Props = {
  children: ReactNode;
};

export function PageTemplate({ children }: Props) {
  const {
    user: { userName },
    resetUser,
  } = useUserBySession();

  const router = useRouter();

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [expandedTitle, setExpandedTitle] = useState('');
  const disabledBackdrop = !isOpenMenu && !expandedTitle;

  const onToggleMenu = useCallback(() => {
    setIsOpenMenu((prev) => !prev);
  }, []);

  const onClickLogout = useCallback(async () => {
    await signOut({ redirect: false });
    resetUser();
    router.replace('/logout');
  }, [resetUser, router]);

  const onChangeExpanded = useCallback((key: string) => {
    setExpandedTitle((prev) => (prev !== key ? key : ''));
  }, []);

  const onClickBackdrop = useCallback(() => {
    setIsOpenMenu(false);
    setExpandedTitle('');
  }, []);

  return (
    <>
      <AppHeader
        username={userName}
        previousLoggedAt={null} // TODO: 利用しないので後で消す
        isOpenMenu={isOpenMenu}
        onClickLogout={onClickLogout}
        onToggleMenu={onToggleMenu}
        expandedTitle={expandedTitle}
        onChangeExpandedTitle={onChangeExpanded}
      />
      <main className="min-h-main-content-sp sm:min-h-main-content-pc">{children}</main>
      <AppFooter />
      {!disabledBackdrop && <Backdrop className="bg-black/30 sm:bg-transparent" onClick={onClickBackdrop} />}
    </>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import type { LocalNavigationItem } from '@shared/components/LocalNavigation/LocalNavigation';
import { LocalNavigation } from '@shared/components/LocalNavigation/LocalNavigation';

export function CorporationLocalNavigation() {
  const pathname = usePathname();

  const NAVIGATION_ITEMS: LocalNavigationItem[] = useMemo(() => {
    return [
      {
        label: '一覧',
        href: '/corporations',
        isActive: pathname === '/corporations',
      },
      {
        label: '新規登録',
        href: '/corporations/new',
        isActive: pathname === '/corporations/new',
      },
    ];
  }, [pathname]);

  return <LocalNavigation items={NAVIGATION_ITEMS} />;
}

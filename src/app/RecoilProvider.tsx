'use client';

import type { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

/**
 * RecoilRootがuse Clientが必要になるため
 */
export function RecoilProvider({ children }: { children: ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

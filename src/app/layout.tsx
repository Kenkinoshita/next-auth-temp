import '@/styles/globals.css';

import type { Viewport } from 'next';
import type { ReactNode } from 'react';

import { AppErrorBoundary } from '@/AppErrorBoundary';
import { ReactQueryProvider } from '@/app/ReactQueryProvider';
import { RecoilProvider } from '@/app/RecoilProvider';
import { DialogProvider } from '@shared/components/Dialog/DialogProvider';
import { notoSansCJK } from '@shared/styles/appFont';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${notoSansCJK.variable}`}>
        <AppErrorBoundary>
          <RecoilProvider>
            <DialogProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </DialogProvider>
          </RecoilProvider>
        </AppErrorBoundary>
      </body>
    </html>
  );
}

export default AppLayout;

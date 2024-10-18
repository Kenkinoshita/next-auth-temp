import type { Metadata } from 'next';
import { Suspense } from 'react';

import { PAGE_TITLE_NAMES } from '@/app/consts/pageTitleNames';
import { PageTemplate } from '@/templates/PageTemplate';
import { LoadingView } from '@shared/components/LoadingView/LoadingView';

export const metadata: Metadata = {
  title: PAGE_TITLE_NAMES.LEDGER_MANAGEMENT,
};

export default function LedgerManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageTemplate>
      <Suspense fallback={<LoadingView />}>{children}</Suspense>
    </PageTemplate>
  );
}

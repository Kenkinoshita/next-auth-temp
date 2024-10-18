import type { Metadata } from 'next';

import { PAGE_TITLE_NAMES } from '@/app/consts/pageTitleNames';
import { PageTemplate } from '@/templates/PageTemplate';
import { PageTitle } from '@shared/components/PageTitle/PageTitle';

export const metadata: Metadata = {
  title: PAGE_TITLE_NAMES.LEDGER_MASTER,
};

function LedgerMasterPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageTemplate>
      <PageTitle className="mb-6 mt-10" title={PAGE_TITLE_NAMES.LEDGER_MASTER} as="h2" />
      {children}
    </PageTemplate>
  );
}

export default LedgerMasterPageLayout;

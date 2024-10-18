import { Suspense } from 'react';

import { PAGE_TITLE_NAMES } from '@/app/consts/pageTitleNames';
import { CorporationLocalNavigation } from '@/app/corporations/CorporationLocalNavigation';
import { PageTemplate } from '@/templates/PageTemplate';
import { LoadingView } from '@shared/components/LoadingView/LoadingView';

export const metadata = {
  title: PAGE_TITLE_NAMES.CORPORATE_LIST,
};

function CorporationLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageTemplate>
      <CorporationLocalNavigation />
      <Suspense fallback={<LoadingView />}>{children}</Suspense>
    </PageTemplate>
  );
}

export default CorporationLayout;

import type { ReactNode } from 'react';

import { AppFooter } from '@/templates/AppFooter';
import { AppHeader } from '@/templates/AppHeader';
import { doNothing } from '@shared/utils/forLinter';

type Props = {
  className?: string;
  children: ReactNode;
};

export function MessagePageTemplate({ className, children }: Props) {
  return (
    <div className={className}>
      <AppHeader
        username={undefined}
        previousLoggedAt={null}
        isOpenMenu={false}
        expandedTitle=""
        onChangeExpandedTitle={doNothing}
        disabledNavigation={true}
      />
      <main className="min-h-main-content-sp sm:min-h-main-content-pc">{children}</main>
      <AppFooter />
    </div>
  );
}

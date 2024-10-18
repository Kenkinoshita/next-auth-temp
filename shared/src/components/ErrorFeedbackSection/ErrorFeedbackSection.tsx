import type { ReactNode } from 'react';

import { ContentsPaper } from '@shared/components/ContentsPaper/ContentsPaper';

type Props = {
  className?: string;
  title: string;
  children: ReactNode;
};

export function ErrorFeedbackSection({ className, title, children }: Props) {
  return (
    <section className={className}>
      <h2 className="mb-6 text-2xl font-bold text-gray-dark">{title}</h2>
      <ContentsPaper className="p-2.5">{children}</ContentsPaper>
    </section>
  );
}

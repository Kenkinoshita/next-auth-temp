import type { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export function ContentsPaper({ className, children }: Props) {
  return <div className={`border border-gray-semiLight bg-white shadow ${className || ''}`}>{children}</div>;
}

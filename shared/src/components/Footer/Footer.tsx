import type { ReactNode } from 'react';

type Props = {
  className?: string;
  children?: ReactNode;
};

export function Footer({ className, children }: Props) {
  return (
    <footer className={`bg-gray-dark pb-6 pt-1 text-2xs leading-loose text-white sm:py-8 sm:text-xs ${className}`}>
      <div className="mx-8 max-w-7xl pb-safe-area sm:mx-32">
        {children}
        <p className="mt-1 text-center" lang="en">
          Copyright © au Jibun Bank Corporation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

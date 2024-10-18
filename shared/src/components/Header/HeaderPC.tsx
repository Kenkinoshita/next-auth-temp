import Link from 'next/link';
import type { ReactNode } from 'react';

import { AppImage } from '@shared/components/AppImage/AppImage';

type Props = {
  className?: string;
  /** ヘッダー右側に表示するElement */
  children?: ReactNode;
};

export function HeaderPC({ className, children }: Props) {
  return (
    <div className={`bg-white px-6 py-4 ${className || ''}`}>
      <div className="flex items-center justify-between gap-x-2">
        <h1 className="mr-auto shrink-0">
          <Link href="/" className="hover:opacity-70">
            <AppImage
              className="object-cover"
              width={114}
              height={53}
              src={`/images/logo_pc.png`}
              alt="auじぶん銀行（ネット銀行） au x 三菱ＵＦＪ銀行"
            />
          </Link>
        </h1>
        {children}
      </div>
    </div>
  );
}

import Link from 'next/link';
import type { ReactNode } from 'react';

import { AppImage } from '@shared/components/AppImage/AppImage';
import { MenuCloseIcon } from '@shared/components/Header/MenuCloseIcon';
import { MenuIcon } from '@shared/components/Header/MenuIcon';

type Props = {
  className?: string;
  /** ヘッダー右側に表示するElement */
  children?: ReactNode;
  /** （SPのみ）メニューの開閉状態 */
  isOpenMenu?: boolean;
  /** （SPのみ）左横のメニューバーの開閉を行う。 */
  onToggleMenu?: () => void;
};

export function HeaderSP({ className, children, isOpenMenu, onToggleMenu }: Props) {
  return (
    <div className={`bg-white px-2 py-2.5 ${className || ''}`}>
      <div className="relative h-9">
        {onToggleMenu && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-2">
            <button className="py-2" onClick={onToggleMenu}>
              {isOpenMenu ? (
                <MenuCloseIcon className="size-6 fill-gray-dark" titleAccess="メニューを閉じる" />
              ) : (
                <MenuIcon className="size-6 fill-gray-dark" titleAccess="メニューを開く" />
              )}
            </button>
          </div>
        )}
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="hover:opacity-70">
            <AppImage
              className="object-cover"
              width={100}
              height={33}
              src={`/images/logo_sp.png`}
              alt="auじぶん銀行（ネット銀行） au x 三菱ＵＦＪ銀行"
            />
          </Link>
        </h1>
        <div className="absolute right-0 top-1/2 -translate-x-2 -translate-y-1/2">{children}</div>
      </div>
    </div>
  );
}

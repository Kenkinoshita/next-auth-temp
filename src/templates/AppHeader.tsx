import { memo } from 'react';

import { Button } from '@shared/components/Button/Button';
import { HeaderPC } from '@shared/components/Header/HeaderPC';
import { HeaderSP } from '@shared/components/Header/HeaderSP';
import type { NavigationItem } from '@shared/components/Navigation/Navigation';
import { NavigationPC } from '@shared/components/Navigation/NavigationPC';
import { NavigationSP } from '@shared/components/Navigation/NavigationSP';

/**
 * TODO: constsに移動？？
 */
const NAVIGATION_PC_ITEMS: NavigationItem[] = [
  { label: 'TOP', href: '/' },
  {
    title: '法人一覧',
    items: [
      { label: '一覧', href: '/corporations' },
      { label: '新規登録', href: '/corporations/new' },
    ],
  },
  { label: '帳票管理', href: '/ledgersManagement' },
  { label: '帳票マスタ', href: '/ledgerMaster' },
];

/**
 * TODO: constsに移動？？
 */
const NAVIGATION_SP_ITEMS: NavigationItem[] = [
  { label: 'TOP', href: '/' },
  {
    title: '法人一覧',
    items: [
      { label: '一覧', href: '/corporations' },
      { label: '新規登録', href: '/corporations/new' },
    ],
  },
  { label: '帳票管理', href: '/ledgersManagement' },
  { label: '帳票マスタ', href: '/ledgerMaster' },
];

type Props = {
  className?: string;
  username?: string;
  previousLoggedAt: string | null;
  onClickLogout?: () => void;
  isOpenMenu: boolean;
  onToggleMenu?: () => void;
  expandedTitle: string;
  onChangeExpandedTitle: (title: string) => void;
  disabledNavigation?: boolean;
};

export const AppHeader = memo(function AppHeader({
  className,
  username,
  previousLoggedAt,
  onClickLogout,
  onToggleMenu,
  isOpenMenu,
  expandedTitle,
  onChangeExpandedTitle,
  disabledNavigation,
}: Props) {
  return (
    <header className="relative z-header">
      {/* PC用 */}
      <HeaderPC className={`hidden sm:block ${className || ''}`}>
        <div className="font-bold text-gray-dark">
          {previousLoggedAt && <span className="mr-2">前回ログイン:{previousLoggedAt}</span>}
          {username && <span className="mr-5">{username} さま</span>}
          {onClickLogout && (
            <Button
              className="px-7 py-1 text-center text-sm"
              type="button"
              variant="grayOutline"
              onClick={onClickLogout}
            >
              ログアウト
            </Button>
          )}
        </div>
      </HeaderPC>

      {!disabledNavigation && (
        <NavigationPC
          className="hidden sm:block"
          items={NAVIGATION_PC_ITEMS}
          expandedTitle={expandedTitle}
          onChangeExpanded={onChangeExpandedTitle}
        />
      )}

      {/* SP用 */}
      <HeaderSP
        className={`border-b border-gray-semiLight sm:hidden ${className || ''}`}
        isOpenMenu={isOpenMenu}
        onToggleMenu={onToggleMenu}
      >
        {onClickLogout && (
          <Button type="button" variant="grayOutline" size="sm" onClick={onClickLogout}>
            ログアウト
          </Button>
        )}
      </HeaderSP>

      {previousLoggedAt && (
        <div className="h-16 border-b border-gray-semiLight bg-white px-4 pt-2.5 sm:hidden">
          <p className="text-right text-xs text-gray-dark">前回ログイン：{previousLoggedAt}</p>
        </div>
      )}

      {!disabledNavigation && isOpenMenu && (
        <NavigationSP
          className="absolute bottom-0 w-full translate-y-full sm:hidden"
          username={username}
          items={NAVIGATION_SP_ITEMS}
          expandedTitle={expandedTitle}
          onChangeExpanded={onChangeExpandedTitle}
        />
      )}
    </header>
  );
});

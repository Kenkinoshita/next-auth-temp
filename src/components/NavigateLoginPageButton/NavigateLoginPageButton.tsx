'use client';

import { useNavigateLoginPage } from '@/hooks/useNavigateLoginPage';
import { Button } from '@shared/components/Button/Button';
import { ArrowRightIcon } from '@shared/components/Navigation/ArrowDownIcon';

export function NavigateLoginPageButton() {
  const { onClickNavigateLoginPage } = useNavigateLoginPage();

  return (
    <Button
      type="button"
      className="bg-white py-2.5 pl-4 pr-8"
      variant="grayOutline"
      onClick={onClickNavigateLoginPage}
    >
      <div className="flex items-center justify-between gap-x-3">
        <ArrowRightIcon className="mt-0.5 size-4 shrink-0 rotate-180" fill="fill-gray-semiDark" />
        <span className="flex-1 text-base">ログイン画面へ戻る</span>
      </div>
    </Button>
  );
}

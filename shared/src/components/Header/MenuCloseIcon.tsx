import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * ハンバーガーメニューを閉じるときの「x」アイコン
 * @see https://fonts.google.com/icons
 */
export function MenuCloseIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 -960 960 960">
      <path d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z" />
    </SvgIcon>
  );
}

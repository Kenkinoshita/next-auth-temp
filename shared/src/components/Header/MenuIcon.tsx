import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * ハンバーガーメニューを開くときの3本線アイコン
 * @see https://fonts.google.com/icons
 */
export function MenuIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 -960 960 960">
      <path d="M160-269.23v-40h640v40H160ZM160-460v-40h640v40H160Zm0-190.77v-40h640v40H160Z" />
    </SvgIcon>
  );
}

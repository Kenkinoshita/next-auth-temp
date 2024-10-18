import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * スクロールトップなどのボタンに利用するアイコン
 * icon_18.svg
 */
export function CircleChevronDownIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 96 96">
      <circle cx="48" cy="48" r="35" />
      <polyline
        fill="none"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeWidth="10px"
        points="32.32 40.3 47.98 55.96 63.94 40"
      />
    </SvgIcon>
  );
}

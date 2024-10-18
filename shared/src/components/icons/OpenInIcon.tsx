import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * ダイアログなどを開くアイコン
 * icon_52_1.svg
 */
export function OpenInIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="21 21 53 53">
      <polygon points="65.5 72.5 23.5 72.5 23.5 30.5 29.5 30.5 29.5 66.5 65.5 66.5 65.5 72.5" strokeWidth="0" />
      <polygon points="72.5 52.5 66.5 52.5 66.5 29.5 43.5 29.5 43.5 23.5 72.5 23.5 72.5 52.5" strokeWidth="0" />
      <rect
        x="27.85"
        y="40.75"
        width="48.79"
        height="6"
        transform="translate(-15.63 49.76) rotate(-45)"
        strokeWidth="0"
      />
    </SvgIcon>
  );
}

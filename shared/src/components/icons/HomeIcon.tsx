import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * Headerの住宅ローントップのアイコン
 * icon_11.svg
 */
export function HomeIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 96 96">
      <polyline
        points="16.42 41 48.42 15.71 79.58 41"
        fill="none"
        stroke="#eb7000"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
      <rect x="22" y="38" width="52" height="42" fill="#eb7000" />
      <rect x="59.21" y="15" width="9" height="16" fill="#eb7000" />
      <polygon points="48.21 38 74.21 38 61.21 28 48.21 18 35.21 28 22.21 38 48.21 38" fill="#eb7000" />
      <g>
        <rect x="35" y="45" width="11" height="11" fill="#fff" />
        <rect x="50" y="45" width="11" height="11" fill="#fff" />
        <rect x="50" y="61" width="11" height="11" fill="#fff" />
        <rect x="35" y="61" width="11" height="11" fill="#fff" />
      </g>
    </SvgIcon>
  );
}

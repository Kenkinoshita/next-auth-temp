import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * Footerのパンくずリストなどで利用する「>」のアイコン
 * ※たぶんstrokeでスタイルを入れているので、fillなどは利用できない
 * icon_16.svg
 */
export function ChevronRightIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 96 96">
      <polyline
        fill="none"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeWidth="10px"
        points="38.35 28.14 58.02 47.81 37.98 67.86"
      />
    </SvgIcon>
  );
}

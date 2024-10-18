import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * 印刷ボタンのアイコン
 * icon_27.svg
 */
export function CirclePrinterIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="21 21 53 53">
      <circle cx="48" cy="48" r="25" fill="#fff" />
      <rect x="31" y="39.5" width="34" height="16.5" />
      <rect x="37" y="51" width="22" height="11" />
      <rect x="39.5" y="51" width="17" height="8" fill="#fff" />
      <rect x="37" y="34" width="22" height="3" fill="#fff" />
    </SvgIcon>
  );
}

import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * ダウンロードのアイコン
 * icon_26.svg
 */
export function DownloadIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="21 21 53 53">
      <circle cx="48" cy="48" r="25" />
      <rect x="42" y="28" width="12" height="12" fill="#fff" />
      <polygon points="35 40 61 40 48 56 35 40" fill="#fff" />
      <rect x="31" y="48" width="3" height="14" fill="#fff" />
      <rect x="62" y="48" width="3" height="14" fill="#fff" />
      <rect x="46.5" y="46.5" width="3" height="28" transform="translate(-12.5 108.5) rotate(-90)" fill="#fff" />
    </SvgIcon>
  );
}

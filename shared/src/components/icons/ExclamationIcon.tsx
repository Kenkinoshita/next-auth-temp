import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * 注意文言などで表示する!のアイコン
 * icon_17.svg
 */
export function ExclamationIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="21 21 53 53">
      <circle cx="48" cy="48" r="25" />
      <rect x="45" y="31.5" width="6" height="22" fill="#fff" />
      <rect x="45" y="58.5" width="6" height="6" fill="#fff" />
    </SvgIcon>
  );
}

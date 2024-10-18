import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * クリアボタンの横に表示される円にXのアイコン
 * icon_51.svg
 */
export function CircleXIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 96 96">
      <circle cx="48" cy="48" r="35" />
      <line x1="62" y1="34" x2="34" y2="62" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="8" />
      <line x1="34" y1="34" x2="62" y2="62" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="8" />
    </SvgIcon>
  );
}

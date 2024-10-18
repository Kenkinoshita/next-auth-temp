import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * チェックボックスのチェックなしのアイコン
 * @see https://fonts.google.com/icons
 */
export function CheckboxBlankIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 -960 960 960">
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
    </SvgIcon>
  );
}

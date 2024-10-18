import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * !マークを三角で囲ったアイコン
 * @see https://fonts.google.com/icons
 */
export function WarningIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 -960 960 960">
      <path d="M74.62-140 480-840l405.38 700H74.62ZM480-247.69q13.73 0 23.02-9.29t9.29-23.02q0-13.73-9.29-23.02T480-312.31q-13.73 0-23.02 9.29T447.69-280q0 13.73 9.29 23.02t23.02 9.29Zm-30-104.62h60v-200h-60v200Z" />
    </SvgIcon>
  );
}

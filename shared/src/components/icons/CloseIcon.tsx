import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * ☓アイコン
 * @see https://fonts.google.com/icons
 */
export function CloseIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 -960 960 960">
      <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
    </SvgIcon>
  );
}

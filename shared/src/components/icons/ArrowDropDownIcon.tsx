import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * プルダウンに表示される▽と右に表示されるボーダー
 * icon_01.svg
 */
export function ArrowDropDownIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 96 96">
      <polygon points="36 38 48 62 60 38 36 38" fill="#888" />
    </SvgIcon>
  );
}

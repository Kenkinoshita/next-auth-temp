import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * icon_50.svg
 * Q&A sectionの閉じる icon
 */

export function MinusIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 96 96">
      <rect x="13" y="45.31" width="70" height="5.38" />
    </SvgIcon>
  );
}

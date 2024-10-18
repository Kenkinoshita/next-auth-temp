import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * icon_49.svg
 * Q&A sectionの開く icon
 */

export function PlusIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 96 96">
      <rect x="13" y="45.31" width="70" height="5.38" />
      <rect x="13" y="45.31" width="70" height="5.38" transform="translate(96) rotate(90)" />
    </SvgIcon>
  );
}

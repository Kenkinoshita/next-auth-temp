import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * リスト項目名などの横に表示される円のアイコン
 * icon_41.svg
 */
export function CircleIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="21 21 53 53">
      <circle cx="48" cy="48" r="25" />
    </SvgIcon>
  );
}

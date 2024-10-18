import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * マイページログインのアイコン
 * icon_3.svg
 */
export function PadlockIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 96 96">
      <path
        d="m71.58,42.68h-5.32v-15.83c0-7.64-6.19-13.83-13.83-13.83h-9.22c-7.64,0-13.83,6.19-13.83,13.83v15.83h-6.31c-1.15,0-3.19,2.04-3.19,4.56v31.18c0,2.52,2.04,4.56,3.19,4.56h48.53c2.52,0,4.56-2.04,4.56-4.56v-31.18c0-2.52-2.04-4.56-4.56-4.56Zm-32.06,33.85l5.33-13.25c-2.72-1.07-4.64-3.71-4.64-6.81,0-4.04,3.28-7.32,7.32-7.32s7.32,3.28,7.32,7.32c0,3.11-1.95,5.77-4.7,6.83l5.32,13.23h-15.95Zm19.13-33.85h-21.68v-15.83c0-3.43,2.79-6.23,6.23-6.23h9.22c3.43,0,6.23,2.79,6.23,6.23v15.83Z"
        fill="#fff"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
}

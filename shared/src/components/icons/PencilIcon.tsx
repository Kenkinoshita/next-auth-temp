import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * 鉛筆のアイコン
 * icon_2.svg
 */
export function PencilIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 96 96">
      <path
        fillRule="evenodd"
        d="m72.33,12.92l-11.27-6.6c-2.87-1.68-6.55-.68-8.21,2.24l-31.57,55.47h.01s-.63,26.47-.63,26.47l22.28-13.79h.01s31.57-55.47,31.57-55.47c1.66-2.92.68-6.65-2.19-8.33ZM28.78,82.5l-5.34-3.13.26-11,14.34,8.4-9.26,5.73Z"
      />
    </SvgIcon>
  );
}

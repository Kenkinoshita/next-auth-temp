import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * タイトル左隣のアコーディオン「+」
 * icon_30.svg
 */
export function AddIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 96 96">
      <g>
        <rect x="9.33" y="9.33" width="77.33" height="77.33" rx="10.4" ry="10.4" fill="#fff" />
        <path
          d="m76.27,10.67c5,0,9.07,4.07,9.07,9.07v56.53c0,5-4.07,9.07-9.07,9.07H19.73c-5,0-9.07-4.07-9.07-9.07V19.73c0-5,4.07-9.07,9.07-9.07h56.53m0-2.67H19.73c-6.48,0-11.73,5.25-11.73,11.73v56.53c0,6.48,5.25,11.73,11.73,11.73h56.53c6.48,0,11.73-5.25,11.73-11.73V19.73c0-6.48-5.25-11.73-11.73-11.73h0Z"
          fill="#d4d5d5"
        />
      </g>
      <rect x="43.73" y="28" width="8.53" height="40" fill="#888" />
      <rect x="28" y="43.73" width="40" height="8.53" fill="#888" />
    </SvgIcon>
  );
}

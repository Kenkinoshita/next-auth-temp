import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * 現在の年収から借入可能額を調べる
 * icon_45.svg
 */
export function NewIncomeIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 230 200">
      <g>
        <rect fill="#bcbdbd" x="148" y="20.51" width="26" height="48" />
        <polygon fill="#fff" points="185 184.5 44 184.5 44 72.5 113 22.5 185 72.5 185 184.5" />
        <rect fill="#bcbdbd" x="41" y="73.5" width="7" height="115" />
        <rect fill="#bcbdbd" x="182" y="73.5" width="7" height="115" />
        <g>
          <rect
            fill="#bcbdbd"
            x="156.5"
            y="-6.46"
            width="7"
            height="117.78"
            rx="3.5"
            ry="3.5"
            transform="translate(23.54 151.06) rotate(-54)"
          />
          <rect
            fill="#bcbdbd"
            x="66.5"
            y="-6.46"
            width="7"
            height="117.78"
            rx="3.5"
            ry="3.5"
            transform="translate(68.73 139.88) rotate(-126)"
          />
        </g>
        <rect fill="#bcbdbd" x="110.5" y="113" width="7" height="144" transform="translate(299 71) rotate(90)" />
      </g>
      <rect fill="#facf9c" x="55" y="114.5" width="37" height="60" />
      <rect fill="#facf9c" x="138" y="71.5" width="37" height="103" />
      <line
        fill="none"
        stroke="#f74d37"
        strokeDasharray="0 0 3.21 5.35"
        strokeMiterlimit="10"
        strokeWidth="3.21px"
        x1="49"
        y1="94.2"
        x2="181"
        y2="94.2"
      />
      <rect fill="#eb7000" x="96.5" y="92.5" width="37" height="82" />
    </SvgIcon>
  );
}

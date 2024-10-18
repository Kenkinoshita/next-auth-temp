import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * 「？」に円がついていて項目名の横に表示されるアイコン
 * icon_25.svg
 */
export function CircleQuestionIcon(props: IconProps) {
  return (
    <SvgIcon {...props} viewBox="21 21 53 53">
      <circle cx="48" cy="48" r="25" />
      <text
        transform="translate(35.61 66.55)"
        fill="#fff"
        fontFamily="UDShinGoPro-Bold-83pv-RKSJ-H, 'A-OTF UD Shin Go Pro'"
        fontSize="44"
        fontWeight="700"
      >
        <tspan x="0" y="0">
          ?
        </tspan>
      </text>
    </SvgIcon>
  );
}

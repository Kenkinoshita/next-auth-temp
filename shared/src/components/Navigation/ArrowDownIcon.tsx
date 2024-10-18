import type { IconProps } from '@shared/components/SvgIcon';
import { SvgIcon } from '@shared/components/SvgIcon';

/**
 * WORKAROUND: polygon側にfillを設定する必要があるため
 */
type FillClassName = `fill-${string}`;
type Props<T extends FillClassName> = IconProps & {
  fill: T;
};

/**
 * アコーディオン横に表示されるアイコン
 * /static/images/arrow_gray.svg
 */
export function ArrowRightIcon<T extends FillClassName>({ fill, ...props }: Props<T>) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <g id="ic/arrow_gray" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <polygon id="Page-1" className={fill} points="5 12 11 8 5 4"></polygon>
      </g>
    </SvgIcon>
  );
}

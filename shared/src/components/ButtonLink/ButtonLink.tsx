import type { LinkProps } from 'next/link';
import Link from 'next/link';

import type { ButtonSize, ButtonVariant } from '@shared/components/ButtonSlot/ButtonSlot';
import { ButtonSlot } from '@shared/components/ButtonSlot/ButtonSlot';
import type { ANY, MergeObject } from '@shared/utils/utilityTypes';

type BaseProps = {
  className?: string;
  /** 色を切り替える */
  variant: ButtonVariant;
  /** サイズ（padding、width、height..etc）を指定する。ない場合は指定なし */
  size?: ButtonSize;
  children: React.ReactNode;
};

type Props<T> = BaseProps & MergeObject<React.ComponentPropsWithoutRef<'a'>, LinkProps<T>>;

export function ButtonLink<T = ANY>({ className, variant, size, children, ...props }: Props<T>) {
  return (
    <Link {...props}>
      <ButtonSlot className={`inline-block ${className || ''}`} variant={variant} size={size} as="div">
        <div>{children}</div>
      </ButtonSlot>
    </Link>
  );
}

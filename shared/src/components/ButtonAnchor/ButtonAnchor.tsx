import type { ButtonSize, ButtonVariant } from '@shared/components/ButtonSlot/ButtonSlot';
import { ButtonSlot } from '@shared/components/ButtonSlot/ButtonSlot';

type Props = {
  className?: string;
  href: string;
  /** 色を切り替える */
  variant: ButtonVariant;
  /** サイズ（padding、width、height..etc）を指定する。ない場合は指定なし */
  size?: ButtonSize;
  children: React.ReactNode;
};

export function ButtonAnchor({ className, href, variant, size, children }: Props) {
  return (
    <ButtonSlot className={`inline-block ${className || ''}`} href={href} variant={variant} size={size} as="a">
      <a>{children}</a>
    </ButtonSlot>
  );
}

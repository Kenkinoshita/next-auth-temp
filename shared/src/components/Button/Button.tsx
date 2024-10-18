import type { ButtonSize, ButtonVariant } from '@shared/components/ButtonSlot/ButtonSlot';
import { ButtonSlot } from '@shared/components/ButtonSlot/ButtonSlot';

type Props = {
  id?: string;
  className?: string;
  type: 'button' | 'submit';
  /** 色を切り替える */
  variant: ButtonVariant;
  /** サイズ（padding、width、height..etc）を指定する。ない場合は指定なし */
  size?: ButtonSize;
  /** 非活性状態にする */
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export function Button({ id, className, type, variant, size, disabled, onClick, children }: Props) {
  return (
    <ButtonSlot
      id={id}
      className={className}
      disabled={disabled}
      type={type}
      onClick={onClick}
      variant={variant}
      size={size}
      as="button"
    >
      <button>{children}</button>
    </ButtonSlot>
  );
}

import { Slot } from '@radix-ui/react-slot';

type ButtonAs = 'button' | 'a' | 'div';

export type ButtonVariant = 'outline' | 'grayOutline' | 'corporate';
export type ButtonSize = 'sm' | 'md';
export type ButtonSlotProps<T extends ButtonAs> = {
  /** デザインを切り替える */
  variant: ButtonVariant;
  /** サイズ（padding、width、height）を指定する */
  size?: ButtonSize;
  as: T;
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<T>;

/**
 * ボタンのstyleを提供する。
 * <a>タグや<button>タグを囲んで利用する
 */
export function ButtonSlot<T extends ButtonAs>({
  className,
  variant,
  size,
  children,
  disabled,
  ...props
}: ButtonSlotProps<T>) {
  return (
    <Slot
      className={`
        text-center font-bold hover:opacity-70
        ${
          {
            corporate: 'text-white rounded-sm bg-corporate-dark border-2 border-corporate-dark',
            grayOutline: 'text-gray-semiDark rounded-sm border border-gray-semiDark hover:bg-gray-light',
            outline: 'text-corporate-dark rounded-sm border-corporate-dark border box-border hover:bg-corporate-light',
          }[variant]
        }
        ${
          {
            sm: 'px-2 py-1.5 text-sm',
            md: 'px-6 py-2.5 text-base',
            none: '',
          }[size ?? 'none']
        }
        ${disabled ? 'cursor-not-allowed' : ''}
        ${className || ''}`}
      {...props}
    >
      {children}
    </Slot>
  );
}

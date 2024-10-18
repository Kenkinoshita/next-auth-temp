type Props = {
  className?: string;
  style?: 'solid' | 'dashed' | 'dotted' | 'double';
};

export function Divider({ className, style = 'solid' }: Props) {
  return (
    <hr
      className={`${{ solid: 'border-solid', dashed: 'border-dashed', dotted: 'border-dotted', double: 'border-double' }[style]} border-gray-light ${className || ''}`}
    />
  );
}

type Props = {
  className?: string;
  color: 'attention' | 'gray';
  text: string;
};

export function BadgeForLabel({ className, color, text }: Props) {
  return (
    <span
      className={`${
        {
          attention: 'bg-attention-dark',
          gray: 'bg-gray-semiDark',
        }[color]
      } 
      px-1 py-0.5 text-xs
      font-normal text-white
      ${className || ''}`}
    >
      {text}
    </span>
  );
}

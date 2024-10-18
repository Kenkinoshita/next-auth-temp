type Props = {
  className?: string;
  text: string;
};

export function FormAidText({ className, text }: Props) {
  return <span className={`block text-base font-bold text-gray-dark sm:text-2xl ${className || ''}`}>{text}</span>;
}

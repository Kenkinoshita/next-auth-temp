import { BadgeForLabel } from '@shared/components/BadgeForLabel/BadgeForLabel';

type Props = {
  className?: string;
  htmlFor: string;
  prefix?: 'required' | 'optional' | 'none';
  children: React.ReactNode;
};

export function FormLabel({ className, htmlFor, prefix = 'none', children }: Props) {
  return (
    <label
      className={`flex items-center text-lg font-bold 
      text-gray-dark sm:text-2xl
      ${className || ''}`}
      htmlFor={htmlFor}
    >
      {prefix !== 'none' && (
        <BadgeForLabel
          className="mb-0.5 mr-1 shrink-0"
          color={prefix === 'optional' ? 'gray' : 'attention'}
          text={prefix === 'optional' ? '任意' : '必須'}
        />
      )}
      {children}
    </label>
  );
}

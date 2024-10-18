import { FormError } from '@shared/components/FormError/FormError';

type Props = {
  className?: string;
  label: React.ReactNode | string;
  children: React.ReactNode;
  indent?: 1;
  errorMessage?: string;
};

export function ReadonlyForm({ className, label, children, indent, errorMessage }: Props) {
  return (
    <div className={`justify-between sm:flex ${className || ''} ${indent === 1 ? 'ml-4' : ''}`}>
      <p className="flex items-center text-lg font-bold text-gray-dark sm:text-2xl">{label}</p>
      <div className="mt-3 sm:mt-0 sm:basis-1/2">
        {children}
        {!!errorMessage && <FormError className="mt-1.5 flex justify-end" message={errorMessage} />}
      </div>
    </div>
  );
}

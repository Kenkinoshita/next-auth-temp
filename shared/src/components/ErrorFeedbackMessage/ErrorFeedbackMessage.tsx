import { WarningIcon } from '@shared/components/ErrorFeedbackMessage/WarningIcon';

type Props = {
  className?: string;
  message: string;
};

export function ErrorFeedbackMessage({ className, message }: Props) {
  return (
    <p className={`text-base font-bold text-attention-dark ${className}`}>
      <WarningIcon className="mr-1.5 inline-block size-4 fill-attention-dark" />
      {message}
    </p>
  );
}

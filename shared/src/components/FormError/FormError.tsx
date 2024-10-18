type Props = {
  className?: string;
  message: string;
};

export function FormError({ className, message }: Props) {
  return (
    <p className={`text-xs text-attention-dark ${className || ''}`} role="alert" aria-live="assertive">
      {message}
    </p>
  );
}

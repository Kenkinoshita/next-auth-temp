import { FormError } from '@shared/components/FormError/FormError';
import { FormLabel } from '@shared/components/FormLabel/FormLabel';
import { QuestionCircleButton } from '@shared/components/QuestionCircleButton/QuestionCircleButton';

export type FormBaseProps = {
  className?: string;
  id: string;
  label: React.ReactNode;
  labelPrefix?: 'required' | 'optional';
  errorMessage: string | undefined;
  onClickQuestion?: () => void;
  indent?: 0 | 1 | 2;
};

export function FormBase({
  className,
  id,
  label,
  labelPrefix,
  errorMessage,
  onClickQuestion,
  children,
  indent = 0,
}: FormBaseProps & {
  children: React.ReactNode;
}) {
  return (
    <div className={`justify-between sm:flex ${className || ''}`}>
      {/* NOTE: QuestionAnchorはposition:absoluteで指定しているため、入力欄と被らない用にpadding-rightを設定している */}
      <div className={`ml-0 ${{ 0: '', 1: 'sm:pl-9', 2: 'sm:pl-12' }[indent]} mr-1 flex basis-1/2`}>
        <FormLabel className="mt-1 sm:mb-0.5 sm:mt-2" htmlFor={id} prefix={labelPrefix}>
          {label}
        </FormLabel>
        {onClickQuestion && (
          <QuestionCircleButton
            className="ml-2"
            areaLabel={typeof label === 'string' ? `${label}について確認する` : undefined}
            onClick={onClickQuestion}
          />
        )}
      </div>
      <div className="mt-3 basis-1/2 sm:mt-0">
        {children}
        {!!errorMessage && <FormError className="mt-1.5" message={errorMessage} />}
      </div>
    </div>
  );
}

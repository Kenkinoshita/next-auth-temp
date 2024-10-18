import { BadgeForLabel } from '@shared/components/BadgeForLabel/BadgeForLabel';
import { QuestionCircleButton } from '@shared/components/QuestionCircleButton/QuestionCircleButton';

export type FieldsetProps = {
  className?: string;
  title: React.ReactNode;
  titlePrefix?: 'required' | 'optional' | 'none';
  onClickQuestion?: () => void;
  indent?: 1;
};

export function Fieldset({
  className,
  title,
  titlePrefix = 'none',
  onClickQuestion,
  children,
  indent,
}: FieldsetProps & {
  children: React.ReactNode;
}) {
  return (
    <fieldset className={`justify-between sm:flex ${className || ''}`}>
      <div className={`mr-1 pr-8 ${indent === 1 ? 'ml-4 sm:ml-9' : ''}`}>
        <legend className="mb-3 flex items-center text-lg font-bold text-gray-dark sm:text-2xl">
          {titlePrefix !== 'none' && (
            <BadgeForLabel
              className="mr-1 shrink-0"
              color={titlePrefix === 'optional' ? 'gray' : 'attention'}
              text={titlePrefix === 'optional' ? '任意' : '必須'}
            />
          )}
          {title}
          {onClickQuestion && (
            <QuestionCircleButton
              className="ml-2"
              areaLabel={typeof title === 'string' ? `${title}について確認する` : undefined}
              onClick={onClickQuestion}
            />
          )}
        </legend>
      </div>
      <div className="mt-3 basis-1/2 sm:mt-0">{children}</div>
    </fieldset>
  );
}

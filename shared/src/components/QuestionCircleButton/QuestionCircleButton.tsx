import { CircleQuestionIcon } from '@shared/components/icons/CircleQuestionIcon';

type Props = {
  className?: string;
  areaLabel?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export function QuestionCircleButton({ className, areaLabel, onClick }: Props) {
  return (
    <button className={`hover:opacity-70 ${className || ''}`} type="button" onClick={onClick}>
      <CircleQuestionIcon className="w-5 fill-corporate-dark" titleAccess={areaLabel ?? '詳細'} />
    </button>
  );
}

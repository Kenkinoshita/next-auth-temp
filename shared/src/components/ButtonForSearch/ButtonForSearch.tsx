import { Button } from '@shared/components/Button/Button';
import { SearchIcon } from '@shared/components/icons/SearchIcon';

type Props = {
  className?: string;
  label: string;
  type: 'button' | 'submit';
  onClick?: () => void;
};

export function ButtonForSearch({ className, label, type, onClick }: Props) {
  return (
    <Button className={`flex items-center py-2.5 ${className || ''}`} type={type} variant="corporate" onClick={onClick}>
      <SearchIcon className="ml-2 mr-4 mt-0.5 size-6 fill-white" />
      <div className="mr-11 text-center">{label}</div>
    </Button>
  );
}

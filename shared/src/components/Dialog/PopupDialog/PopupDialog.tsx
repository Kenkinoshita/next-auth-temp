import type { DialogProps } from '@shared/components/Dialog/CustomDialog/CustomDialog';
import { CustomDialog } from '@shared/components/Dialog/CustomDialog/CustomDialog';

type Props = DialogProps & {
  children: React.ReactNode;
};

export function PopupDialog({ children, className, ...props }: Props) {
  return (
    <CustomDialog {...props} className={`bg-white ${className || ''}`}>
      {children}
    </CustomDialog>
  );
}

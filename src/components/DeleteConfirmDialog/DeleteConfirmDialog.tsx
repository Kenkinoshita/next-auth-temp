import React from 'react';

import { Button } from '@shared/components/Button/Button';
import { CustomDialog } from '@shared/components/Dialog/CustomDialog/CustomDialog';

type Props = {
  className?: string;
  title: string;
  onOk: () => void;
  onCancel: () => void;
  okLabel: string;
  cancelLabel: string;
};

export const DeleteConfirmDialog = React.forwardRef<HTMLDivElement, Props>(function DeleteConfirm(
  { onOk, onCancel, className, title, okLabel, cancelLabel },
  ref,
) {
  return (
    <CustomDialog className={`sm:w-96 ${className || ''}`} id="delete-confirm-dialog" title={title} onClose={onCancel}>
      <div ref={ref} className={`items-center justify-center bg-white${className || ''}`}>
        <div className="flex items-center justify-around gap-3 p-10">
          <Button type="submit" variant="corporate" size="md" onClick={onOk}>
            {okLabel}
          </Button>

          <Button type="submit" variant="grayOutline" size="md" onClick={onCancel}>
            {cancelLabel}
          </Button>
        </div>
      </div>
    </CustomDialog>
  );
});

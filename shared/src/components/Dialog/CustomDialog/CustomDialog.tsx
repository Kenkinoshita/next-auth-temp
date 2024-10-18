import { CircleXIcon } from '@shared/components/icons/CircleXIcon';

export type DialogProps = {
  className?: string;
  id: string;
  title?: string;
  onClose: () => void;
};

export function CustomDialog({
  className,
  id,
  title,
  children,
  onClose,
}: DialogProps & {
  children: React.ReactNode;
}) {
  const dialogId = `dialog-${id}`;
  const dialogLabelId = title ? `${dialogId}__label` : undefined;
  const dialogDescribedId = typeof children === 'string' ? `${dialogId}__described` : undefined;

  return (
    <div
      className={`relative max-h-[calc(100vh_-_180px)] max-w-[calc(100vw_-_20px)] rounded-md border border-solid border-gray-semiLight text-gray-dark ${
        className || ''
      }`}
      role="dialog"
      id={id}
      aria-labelledby={dialogLabelId}
      aria-describedby={dialogDescribedId}
      aria-modal="true"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button className="absolute right-2 top-4 bg-transparent hover:opacity-70" onClick={onClose}>
        <CircleXIcon className="-my-1.5 w-7 fill-gray-semiDark" titleAccess="ダイアログを閉じる" />
      </button>
      <div
        id={dialogLabelId}
        className="flex h-12 items-center justify-between rounded-t bg-gray-light p-2.5 pr-8 text-base font-bold sm:px-4 sm:text-lg"
      >
        {title}
      </div>
      <div id={dialogDescribedId} className="max-h-[calc(100vh_-_248px)] overflow-y-auto overscroll-y-none rounded-b">
        {children}
      </div>
    </div>
  );
}

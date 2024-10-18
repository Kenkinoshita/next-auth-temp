import { forwardRef } from 'react';

type Props = {
  className?: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: React.ReactNode;
};

export const Backdrop = forwardRef<HTMLDivElement, Props>(function Backdrop({ onClick, children, className }, ref) {
  return (
    <div
      ref={ref}
      className={`fixed inset-0 z-backdrop flex items-center justify-center ${className || ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      {children}
    </div>
  );
});

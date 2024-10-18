import React, { memo } from 'react';

type Props = {
  className?: string;
  currentPage: number;
  maxPage: number;
  onChange: (page: number) => void;
};

export const Pagination = memo(function Pagination({ className, currentPage, maxPage, onChange }: Props) {
  const pages = Array.from({ length: maxPage }, (_, i) => i + 1);

  // TODO: レスポンシブ未対応なので、デザインわかったら対応する
  return (
    <div>
      <div className={`flex flex-wrap items-center justify-center text-sm ${className || ''}`}>
        <SideButton
          className="order-1"
          label="前のページへ"
          currentPage={currentPage}
          disabled={currentPage === 1}
          onChange={(page) => onChange(page - 1)}
        />

        <div className="flex w-full justify-center sm:order-2 sm:w-auto">
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`flex-col justify-center border px-3 py-2 hover:opacity-70 ${
                pageNumber === 1 ? 'border-l-0' : pageNumber === maxPage ? 'border-x-0' : 'border-l-0'
              } ${currentPage === pageNumber ? 'border-corporate-dark bg-corporate-dark text-white' : 'border-gray-semiLight bg-white text-corporate-dark '}`}
              disabled={currentPage === pageNumber}
              aria-label={`${pageNumber}ページへ`}
              onClick={() => onChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <SideButton
          className="order-2 rotate-180"
          label="次のページへ"
          currentPage={currentPage}
          disabled={currentPage === maxPage}
          onChange={(page) => onChange(page + 1)}
        />
      </div>
      <div className="mt-3 text-center">{`Page ${currentPage} of ${maxPage}.`}</div>
    </div>
  );
});

function SideButton({
  className,
  label,
  currentPage,
  onChange,
  disabled,
}: {
  className?: string;
  label: string;
  currentPage: number;
  onChange: (currentPage: number) => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`rounded-s border border-gray-semiLight bg-white px-3 py-2 text-center align-middle text-corporate-dark enabled:hover:opacity-70 disabled:cursor-not-allowed disabled:text-gray-dark ${className || ''}`}
      disabled={disabled}
      aria-label={label}
      onClick={() => onChange(currentPage)}
    >
      {'<'}
    </button>
  );
}

type Props = {
  size: 'lg' | 'md' | 'sm';
};

/**
 * @see https://dubdesign.net/download/html-css/htmlcss-loading8/
 */
export function LoadingSpinner({ size }: Props) {
  return (
    <div className={`relative ${{ sm: 'w-20 h-20', md: 'w-28 h-28', lg: 'w-44 h-44' }[size]}`}>
      <div
        aria-label="ローディング中"
        className={`absolute left-1/2 top-1/2 size-[1em] -translate-x-1/2 -translate-y-1/2 animate-loading-spin
        rounded-1/2 indent-[-9999em] text-corporate-dark
        ${{ sm: 'text-[0.5rem]', md: 'text-xs', lg: 'text-xl' }[size]}
      `}
      />
    </div>
  );
}

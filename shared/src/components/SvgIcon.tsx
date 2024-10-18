export type IconProps = {
  className?: string;
  titleAccess?: string;
};

/**
 * @see https://github.com/mui-org/material-ui/blob/next/packages/material-ui/@/SvgIcon/SvgIcon.js
 */
export function SvgIcon({
  className,
  titleAccess,
  viewBox = '0 0 24 24',
  children = null,
}: IconProps & { viewBox?: string; children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={titleAccess ? undefined : true}
      aria-label={titleAccess || undefined}
      role={titleAccess ? 'img' : undefined}
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
}

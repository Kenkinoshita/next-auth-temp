export type HeadingLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Props = {
  className?: string;
  as: HeadingLevel;
  children: React.ReactNode;
};

export function Heading({ className, as, children }: Props) {
  switch (as) {
    case 'h2':
      return <h2 className={className}>{children}</h2>;
    case 'h3':
      return <h3 className={className}>{children}</h3>;
    case 'h4':
      return <h4 className={className}>{children}</h4>;
    case 'h5':
      return <h5 className={className}>{children}</h5>;
    case 'h6':
      return <h6 className={className}>{children}</h6>;
    default:
      // eslint-disable-next-line
      const _: never = as;
  }
}

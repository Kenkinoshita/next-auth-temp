import type { HeadingLevel } from '@shared/components/Heading/Heading';
import { Heading } from '@shared/components/Heading/Heading';

type Props = {
  className?: string;
  as: HeadingLevel;
  title: string;
  subTitle?: string;
};

export function PageTitle({ className, as, title, subTitle }: Props) {
  return (
    <Heading
      className={`text-center text-xl font-bold leading-8 text-gray-dark sm:text-2xl ${className || ''}`}
      as={as}
    >
      {!subTitle ? (
        title
      ) : (
        <div className="flex items-center">
          <div className="shrink grow basis-0 text-right">{title}</div>
          <div className="mx-4 mb-0.5">|</div>
          <div className="shrink grow basis-0 text-left">{subTitle}</div>
        </div>
      )}
    </Heading>
  );
}

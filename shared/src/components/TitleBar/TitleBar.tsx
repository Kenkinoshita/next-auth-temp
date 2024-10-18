import type { HeadingLevel } from '@shared/components/Heading/Heading';
import { Heading } from '@shared/components/Heading/Heading';

type Props = {
  className?: string;
  as: HeadingLevel;
  title: string;
};

export function TitleBar({ className, as, title }: Props) {
  return (
    <Heading className={`text-xl font-bold leading-8 text-gray-dark ${className || ''}`} as={as}>
      {title}
    </Heading>
  );
}

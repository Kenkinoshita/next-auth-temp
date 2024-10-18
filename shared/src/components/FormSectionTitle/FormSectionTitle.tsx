import { Heading, type HeadingLevel } from '@shared/components/Heading/Heading';

type Props = {
  className?: string;
  title: React.ReactNode;
  size: HeadingLevel;
};

export function FormSectionTitle({ className, title, size }: Props) {
  return (
    <Heading className={`text-lg font-bold leading-8 text-gray-dark sm:text-2xl ${className || ''}`} as={size}>
      {title}
    </Heading>
  );
}

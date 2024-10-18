import { FormSectionTitle } from '@shared/components/FormSectionTitle/FormSectionTitle';

type Props = {
  className?: string;
  title: string;
  children?: React.ReactNode;
};

export function FormSection({ className, title, children }: Props) {
  return (
    <section className={className}>
      <FormSectionTitle title={title} className="mb-6 sm:mb-10" size="h2" />
      <div className="flex">
        <div className="basis-12" />
        <div className="flex w-full flex-col gap-6 sm:gap-10">{children}</div>
      </div>
    </section>
  );
}

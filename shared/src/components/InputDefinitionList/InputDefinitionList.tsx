type Props = {
  className?: string;
  contents: { label: string; text: string }[];
};

export function InputDefinitionList({ className, contents }: Props) {
  return (
    <dl className={`${className || ''}`}>
      {contents.map(({ label, text }) => (
        <div key={label} className={'items-center justify-between space-y-3 text-gray-dark sm:flex'}>
          <dt className="text-base font-bold sm:ml-1/4">{label}</dt>
          <dd className="basis-1/2 text-left text-sm">{text}</dd>
        </div>
      ))}
    </dl>
  );
}

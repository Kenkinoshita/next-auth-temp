type Props = {
  className?: string;
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  accept?: string;
  disabled?: boolean;
};

export function FileUploader({ className, id, name, onChange, children, accept, disabled }: Props) {
  return (
    <label className={`cursor-pointer ${className}`} htmlFor={id}>
      <input
        type="file"
        id={id}
        name={name}
        accept={accept}
        hidden={true}
        onChange={(e) => {
          onChange(e);
          //NOTE: 連続して同じファイルを選択した際、onChangeが走らないため以下の処理を追加した
          e.currentTarget.value = '';
        }}
        disabled={disabled}
      />
      {children}
    </label>
  );
}

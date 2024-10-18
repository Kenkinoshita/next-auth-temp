import type {
  ChangeHandler,
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName;
  control: Control<TFieldValues>;
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: Omit<ControllerRenderProps<TFieldValues, TName>, 'onBlur'> & { onBlur: ChangeHandler };
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => React.ReactNode;
};

/**
 * Checkbox用のController
 * registerのpropsに加えて、Controllerから返却されるfield.valueとfieldState、formStateをrenderで返却する
 */
export function CheckboxUnController<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  control,
  render,
}: Props<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value }, fieldState, formState }) => {
        const { ref, onChange, onBlur, disabled, name: _name } = control.register(name);
        return <>{render({ field: { name: _name, value, ref, onChange, onBlur, disabled }, fieldState, formState })}</>;
      }}
    />
  );
}

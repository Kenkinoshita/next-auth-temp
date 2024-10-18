import type React from 'react';
import type {
  ControllerFieldState,
  FieldPathValue,
  FieldValues,
  UseFormStateReturn,
  Control,
  FieldPath,
} from 'react-hook-form';
import { useWatch } from 'react-hook-form';

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName;
  control: Control<TFieldValues>;
  render: ({
    fieldValue,
    fieldState,
    formState,
  }: {
    fieldValue: FieldPathValue<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => React.ReactElement;
};

export function Watcher<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  control,
  render,
}: Props<TFieldValues, TName>) {
  const fieldValue = useWatch({ name, control });
  const { getFieldState, _formState: formState } = control;

  return render({ fieldValue, fieldState: getFieldState(name), formState });
}

import { Controller, useFormContext, useFormState } from 'react-hook-form';

import { ButtonForSearch } from '@shared/components/ButtonForSearch/ButtonForSearch';
import { Checkbox } from '@shared/components/Checkbox/Checkbox';
import { DateInput } from '@shared/components/DateInput/DateInput';
import { Fieldset } from '@shared/components/Fieldset/Fieldset';
import { FormError } from '@shared/components/FormError/FormError';
import { PulldownForm } from '@shared/components/PulldownForm/PulldownForm';
import { TextForm } from '@shared/components/TextForm/TextForm';
import { TextInput } from '@shared/components/TextInput/TextInput';
import { DEPARTMENT_WITH_NONE_ITEMS } from '@shared/consts/department';
import { ledgerPublishDateRange } from '@shared/consts/ledgerPublishDateRange';
import type { LedgerManagementSearchConditionInput } from '@shared/schemas/ledger/management/ledgerManagement';

/**
 * NOTE: react-hook-formのregisterからmin/maxも提供される型エラーを解消するため
 */
const dateInputRange = {
  min: ledgerPublishDateRange.start,
  max: ledgerPublishDateRange.end,
};

const idPrefix = 'searchConditionSection';

type Props = {
  className?: string;
  onClickSearch: () => void;
};

export function SearchConditionSection({ className, onClickSearch }: Props) {
  const { register, control, setValue } = useFormContext<LedgerManagementSearchConditionInput>();
  const { errors } = useFormState({ control });

  const rootErrorMessage = errors?.createdDateRange?.message;
  const startErrorMessage = errors?.createdDateRange?.start?.message;
  const endErrorMessage = errors?.createdDateRange?.end?.message;
  const errorMessage = rootErrorMessage ?? startErrorMessage ?? endErrorMessage;

  return (
    <div className={className}>
      <form className="space-y-4 p-10">
        <Controller
          name="responsibleDepartment"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PulldownForm
              id={`${idPrefix}-responsibleDepartment`}
              label="所轄部署"
              errorMessage={error?.message}
              items={DEPARTMENT_WITH_NONE_ITEMS}
              {...field}
            />
          )}
        />
        <Controller
          name="cic"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextForm id={`${idPrefix}-cic`} type="text" label="CIC" errorMessage={error?.message} {...field} />
          )}
        />
        <Controller
          name="companyName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextForm
              id={`${idPrefix}-companyName`}
              type="text"
              label="法人名"
              errorMessage={error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="isPartial"
          control={control}
          render={({ field }) => (
            <Checkbox
              className="flex justify-end"
              id={`${idPrefix}-isPartial`}
              text="部分一致"
              checked={field.value === 'true'}
              {...field}
              onChange={(e) => {
                // NOTE: field.onChangeはvalueをbooleanで上書きしてしまうため、setValueを利用する
                setValue('isPartial', e.currentTarget.checked ? 'true' : 'false');
              }}
            />
          )}
        />

        <Fieldset title="金額（税抜）">
          <div>
            <div className="flex items-center gap-x-2">
              <Controller
                name="amountRange.min"
                control={control}
                render={({ field, fieldState: { invalid } }) => (
                  <div className="w-2/5">
                    <TextInput type="text" id={`${idPrefix}-amountRange-min`} isInvalid={invalid} {...field} />
                  </div>
                )}
              />
              <span className={`w-12 text-base font-bold text-gray-dark sm:text-xl `}>円 ～</span>
              <Controller
                name="amountRange.max"
                control={control}
                render={({ field, fieldState: { invalid } }) => (
                  <div className="w-2/5">
                    <TextInput type="text" id={`${idPrefix}-amountRange-max`} isInvalid={invalid} {...field} />
                  </div>
                )}
              />
              <span className={`text-base font-bold text-gray-dark sm:text-xl `}>円</span>
            </div>
            <Controller
              name="amountRange"
              control={control}
              render={({
                formState: {
                  errors: { amountRange: error },
                },
              }) => {
                const errorMessage = error
                  ? error.root
                    ? error.root.message
                    : error.min
                      ? error.min.message
                      : error.max
                        ? error.max.message
                        : undefined
                  : undefined;
                return errorMessage ? <FormError className={` mt-1.5 sm:ml-0`} message={errorMessage} /> : <></>;
              }}
            />
          </div>
        </Fieldset>
        <Fieldset title="発行日">
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <DateInput
              id={`${idPrefix}-createdDateRange-start`}
              isInvalid={!!rootErrorMessage || !!startErrorMessage}
              ariaLabel="発行日（開始日）"
              {...register('createdDateRange.start')}
              {...dateInputRange}
            />
            <span className={`mx-4 mt-1 text-base font-bold text-gray-dark sm:text-2xl `}>～</span>
            <DateInput
              id={`${idPrefix}-createdDateRange-end`}
              isInvalid={!!rootErrorMessage || !!endErrorMessage}
              ariaLabel="発行日（終了日）"
              {...register('createdDateRange.end')}
              {...dateInputRange}
            />
          </div>
          {!!errorMessage && <FormError className="mt-1.5 sm:ml-0" message={errorMessage} />}
        </Fieldset>
      </form>
      <div className="flex items-center justify-center sm:mt-6">
        <ButtonForSearch type="submit" label="検索" onClick={onClickSearch} />
      </div>
    </div>
  );
}

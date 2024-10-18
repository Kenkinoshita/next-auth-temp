import { isCorporationCancellationDateChoiceInput } from '@shared/features/corporation/isCorporationCancellationDateChoiceInput';
import { isFeeBillingMethodInput } from '@shared/features/isFeeBillingMethodInput';
import { isMonthInput } from '@shared/features/isMonthInput';
import type { CorporationSearchConditionInput } from '@shared/schemas/corporation/corporationSearchCondition';
import { CORPORATION_SEARCH_CONDITION_INPUT_DEFAULT_VALUE } from '@shared/schemas/corporation/corporationSearchCondition';
import { toStrictEntries } from '@shared/utils/utilityFunction';

type CorporationSearchConditionInputKey = keyof CorporationSearchConditionInput;

/**
 * URLSearchParamからCorporationSearchConditionInputへ変換する
 */
export const parseCorporationSearchCondition = (params: URLSearchParams): CorporationSearchConditionInput => {
  const keys = Array.from(params.keys()) as CorporationSearchConditionInputKey[];

  const condition = keys.reduce(
    (acc, key) => {
      switch (key) {
        case 'cic':
        case 'name':
        case 'kana':
        case 'page':
        case 'size':
          return { ...acc, [key]: params.get(key) ?? CORPORATION_SEARCH_CONDITION_INPUT_DEFAULT_VALUE[key] };

        case 'cancellationDate': {
          const value = params.get(key);
          return {
            ...acc,
            [key]:
              !value || !isCorporationCancellationDateChoiceInput(value)
                ? CORPORATION_SEARCH_CONDITION_INPUT_DEFAULT_VALUE[key]
                : value,
          };
        }

        case 'balanceStatementIssuingBankMonth':
        case 'balanceStatementIssuingAuditingFirmMonth':
        case 'transactionStatementIssuingMonth': {
          const value = params.get(key);
          return {
            ...acc,
            [key]: !value || !isMonthInput(value) ? CORPORATION_SEARCH_CONDITION_INPUT_DEFAULT_VALUE[key] : value,
          };
        }

        case 'feeBillingMethods': {
          const value = params.get(key);
          const values = !value ? [] : value.split(',').filter(isFeeBillingMethodInput);
          return { ...acc, [key]: values };
        }

        default: {
          const _key: never = key;
          console.warn(`${_key} is unknown property. skipped.`);
          return acc;
        }
      }
    },
    { ...CORPORATION_SEARCH_CONDITION_INPUT_DEFAULT_VALUE },
  );

  return condition;
};

/**
 * CorporationSearchConditionInputからURLSearchParamへ変換する
 */
export const stringifyCorporationSearchCondition = (condition: CorporationSearchConditionInput): URLSearchParams => {
  const params = new URLSearchParams();
  toStrictEntries(condition).forEach(([key, value]) => {
    switch (key) {
      case 'cic':
      case 'name':
      case 'kana':
      case 'balanceStatementIssuingBankMonth':
      case 'balanceStatementIssuingAuditingFirmMonth':
      case 'transactionStatementIssuingMonth':
      case 'cancellationDate':
      case 'page':
      case 'size':
        params.append(key, value);
        return;

      case 'feeBillingMethods':
        params.append(key, value.join(','));
        return;

      default: {
        const _key: never = key;
        console.warn(`${_key} is unknown property. something wrong.`);
        return;
      }
    }
  });

  return params;
};

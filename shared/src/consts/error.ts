import { toEnumLikeObject } from '@shared/utils/utilityFunction';

//FIXME: 実際のエラー画面に合わせて修正する
export const ERROR_CODE = toEnumLikeObject([
  'unknown',
  'notFoundPage',
  'notFoundHomeLoanJson',
  'requiredUpdate',
  'cannotCalculate',
  'invalidParameter',
]);

export type ErrorCode = keyof typeof ERROR_CODE;

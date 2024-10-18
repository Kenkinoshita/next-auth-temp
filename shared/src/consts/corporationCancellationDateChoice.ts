import { toEnumLikeObject } from '@shared/utils/utilityFunction';

export const CORPORATION_CANCELLATION_DATE_CHOICE = toEnumLikeObject(['all', 'canceled', 'uncancelled']);

export const CORPORATION_CANCELLATION_DATE_ITEMS = [
  { id: CORPORATION_CANCELLATION_DATE_CHOICE.uncancelled, text: '未解約の顧客のみ' },
  { id: CORPORATION_CANCELLATION_DATE_CHOICE.all, text: 'すべての顧客' },
  { id: CORPORATION_CANCELLATION_DATE_CHOICE.canceled, text: '解約済みの顧客のみ' },
] as const;

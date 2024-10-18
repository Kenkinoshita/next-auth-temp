import { z } from 'zod';

import { CORPORATION_CANCELLATION_DATE_CHOICE } from '@shared/consts/corporationCancellationDateChoice';
import { toStrictKeys } from '@shared/utils/utilityFunction';

const [head, second, ...rest] = toStrictKeys(CORPORATION_CANCELLATION_DATE_CHOICE).map((v) => z.literal(v));

/**
 * 法人一覧 - 一覧画面 - 解約日の入力値を検証する
 */
export const corporationCancelChoiceSchema = z.union([head, second, ...rest]);

export type corporationCancelChoice = z.output<typeof corporationCancelChoiceSchema>;

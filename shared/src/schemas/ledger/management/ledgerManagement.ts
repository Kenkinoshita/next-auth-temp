import { z } from 'zod';

import { cicSchema } from '@shared/schemas/cic';
import { DATE_STRING_RANGE_DEFAULT_VALUE } from '@shared/schemas/dateStringRange';
import { flagSchema } from '@shared/schemas/flag';
import { ledgerPublishDateRangeSchema } from '@shared/schemas/ledger/ledgerPublishDateRange';
import {
  AMOUNT_INPUT_RANGE_DEFAULT_VALUE,
  amountInputRangeSchema,
} from '@shared/schemas/ledger/management/amountInputRange';
import { departmentSchema } from '@shared/schemas/ledger/management/department';
import { noneSchema } from '@shared/schemas/none';
import { pageNumberSchema } from '@shared/schemas/pageNumber';
import { pageSizeSchema } from '@shared/schemas/pageSize';
import type { NestedRequired, Expand } from '@shared/utils/utilityTypes';

/**
 * 「帳票管理一覧」の検索条件の入力値を検証する
 */
export const ledgerManagementSearchConditionSchema = z.object({
  page: pageNumberSchema,
  size: pageSizeSchema,
  responsibleDepartment: noneSchema(departmentSchema),
  cic: z.string().trim().pipe(z.literal('').or(cicSchema)),
  companyName: z.string().trim().max(38, '38文字以内で入力してください。'),
  // FIXME: isPartialのバリデーションを修正する
  isPartial: flagSchema,
  amountRange: amountInputRangeSchema,
  createdDateRange: ledgerPublishDateRangeSchema,
});

export type LedgerManagementSearchConditionInput = NestedRequired<
  z.input<typeof ledgerManagementSearchConditionSchema>
>;
export type LedgerManagementSearchCondition = Expand<z.output<typeof ledgerManagementSearchConditionSchema>>;

export const LEDGER_MANAGEMENT_SEARCH_CONDITION_DEFAULT_VALUE: Readonly<LedgerManagementSearchConditionInput> = {
  page: '1',
  size: '20',
  responsibleDepartment: 'none',
  cic: '',
  companyName: '',
  isPartial: 'true',
  amountRange: AMOUNT_INPUT_RANGE_DEFAULT_VALUE,
  createdDateRange: DATE_STRING_RANGE_DEFAULT_VALUE,
};

import { z } from 'zod';

import { dateTimeStringSchema } from '@shared/schemas/dateTimeString';
import { flagSchema } from '@shared/schemas/flag';
import { versionSchema } from '@shared/schemas/version';

export const ledgerManagementDetailSummarySchema = z.object({
  no: z.number().gte(1),
  version: versionSchema,
  createdDateTime: dateTimeStringSchema,
  isInvalidStatus: flagSchema,
  isDownloaded: flagSchema,
});

export type LedgerManagementDetailSummaryInput = z.input<typeof ledgerManagementDetailSummarySchema>;
export type LedgerManagementDetailSummary = z.output<typeof ledgerManagementDetailSummarySchema>;

export const LEDGER_MANAGEMENT_DETAIL_SUMMARY_INPUT_DEFAULT_VALUE: Readonly<LedgerManagementDetailSummaryInput> = {
  no: 0,
  version: 0,
  createdDateTime: '',
  isInvalidStatus: 'false',
  isDownloaded: 'false',
};

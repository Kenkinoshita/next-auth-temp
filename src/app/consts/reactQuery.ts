import type { CorporationSearchConditionInput } from '@shared/schemas/corporation/corporationSearchCondition';
import type { LedgerManagementSearchConditionInput } from '@shared/schemas/ledger/management/ledgerManagement';
import type {
  LedgerManagementDetailConditionInput,
  LedgerManagementDetailConditionTableInput,
} from '@shared/schemas/ledger/management/ledgerManagementDetailCondition';
import type { GetReturnTypeIfFunction, ValueOf } from '@shared/utils/utilityTypes';

const findCorporation = (cic: string) => ['corporation', cic] as const;
const searchCorporations = (condition?: CorporationSearchConditionInput) =>
  condition ? (['corporations', condition] as const) : (['corporations'] as const);

const searchLedgerManagement = (condition?: LedgerManagementSearchConditionInput) =>
  condition ? (['ledgersManagement', condition] as const) : (['ledgersManagement'] as const);
const fetchLedgerManagementDetailConditionTable = (condition: LedgerManagementDetailConditionTableInput) =>
  ['ledgerManagementDetailConditionTable', condition] as const;
const fetchLedgerManagementDetailCondition = (condition: LedgerManagementDetailConditionInput) =>
  ['ledgerManagementDetailCondition', condition] as const;

export const REACT_QUERY_KEY = {
  findCorporation,
  searchCorporations,
  searchLedgerManagement,
  fetchLedgerManagementDetailConditionTable,
  fetchLedgerManagementDetailCondition,
} as const;

export type ReactQueryKey = GetReturnTypeIfFunction<ValueOf<typeof REACT_QUERY_KEY>>;

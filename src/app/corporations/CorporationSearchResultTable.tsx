import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { ButtonLink } from '@shared/components/ButtonLink/ButtonLink';
import type { TableHeader } from '@shared/components/Table/Table';
import { Table } from '@shared/components/Table/Table';
import type { CorporationSearchCondition } from '@shared/schemas/corporation/corporationSearchCondition';
import type { CorporationSummaryInput } from '@shared/schemas/corporation/corporationSummary';

type Props = {
  className?: string;
  searchCondition: CorporationSearchCondition;
  results: CorporationSummaryInput[];
};

type TableHeaderKey = 'no' | 'cic' | 'name' | 'kana' | 'bankMonth' | 'auditMonth' | 'issueMonth' | 'action';
type TableData = Record<TableHeaderKey, ReactNode>;

const HEADER: TableHeader<TableData> = {
  no: { name: '#', order: 0 },
  action: { name: '', order: 1 },
  cic: { name: 'CIC', order: 2 },
  name: { name: '法人名(漢字)', order: 3 },
  kana: { name: '法人名(カナ)', order: 4 },
  bankMonth: { name: '残証明書\n(銀行様式)', order: 5 },
  auditMonth: { name: '残証明書\n(監査法人様式)', order: 6 },
  issueMonth: { name: '取引明細書', order: 7 },
};

export function CorporationSearchResultTable({
  className,
  results,
  searchCondition: {
    balanceStatementIssuingBankMonth,
    balanceStatementIssuingAuditingFirmMonth,
    transactionStatementIssuingMonth,
  },
}: Props) {
  const items: TableData[] = useMemo(
    () =>
      results.map(
        ({
          cic,
          balanceStatementIssuingBankMonths,
          balanceStatementIssuingAuditingFirmMonths,
          transactionStatementIssuingMonths,
          ...rest
        }) => ({
          ...rest,
          action: (
            <ButtonLink size="sm" variant="corporate" href={`/corporations/${cic}`}>
              詳細
            </ButtonLink>
          ),
          cic,
          bankMonth:
            balanceStatementIssuingBankMonth !== 'none' &&
            balanceStatementIssuingBankMonths.includes(balanceStatementIssuingBankMonth)
              ? 'o'
              : '',
          auditMonth:
            balanceStatementIssuingAuditingFirmMonth !== 'none' &&
            balanceStatementIssuingAuditingFirmMonths.includes(balanceStatementIssuingAuditingFirmMonth)
              ? 'o'
              : '',
          issueMonth:
            transactionStatementIssuingMonth !== 'none' &&
            transactionStatementIssuingMonths.includes(transactionStatementIssuingMonth)
              ? 'o'
              : '',
        }),
      ),
    [
      balanceStatementIssuingAuditingFirmMonth,
      balanceStatementIssuingBankMonth,
      results,
      transactionStatementIssuingMonth,
    ],
  );

  return <Table className={className} header={HEADER} data={items} />;
}

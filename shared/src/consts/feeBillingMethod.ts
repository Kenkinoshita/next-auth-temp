const billingMethod = {
  partial: 0,
  partialWithoutCic: 1,
  totalIndividually: 2,
  total: 3,
};

const billingMethodItems = [
  { id: 'partial', text: '合算なし（CICに紐づく普通預金口座より引落）' },
  { id: 'partialWithoutCic', text: '合算なし（CICに紐づかない普通預金口座より引落）' },
  { id: 'totalIndividually', text: '合算あり（引落は発生件数毎、個別引落）' },
  { id: 'total', text: '合算あり（引落は合算し、1本で引落）' },
];

export const FEE_BILLING_METHOD = {
  ...billingMethod,
} as const;

export const FEE_BILLING_METHOD_ITEMS = [...billingMethodItems] as const;

/** 本部端末からの振込手数料口座 */
export const FEE_BILLING_METHOD_FOR_HEADQUARTERS = {
  ...billingMethod,
  reduction: 4,
} as const;

/** 本部端末からの振込手数料口座 */
export const FEE_BILLING_METHOD_ITEMS_FOR_HEADQUARTERS = [
  ...billingMethodItems,
  { id: 'reduction', text: '減免' },
] as const;

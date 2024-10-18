import { toStrictEntries } from '@shared/utils/utilityFunction';

export const DEPARTMENT = {
  d001: '事務企画推進部',
  d002: 'マーケティング企画部',
  d003: '住宅ローン営業第一部',
  d004: '住宅ローン営業第二部',
  d005: 'サービス企画推進部',
  d006: 'UIUX企画推進部',
  d007: 'マーケティング推進部',
} as const;

const entries = toStrictEntries(DEPARTMENT).sort();

export const DEPARTMENT_ITEMS = [...entries.slice(3), ...entries.slice(0, 3)].map(
  ([id, value]) => ({ id, text: value }) as const,
);

export const DEPARTMENT_WITH_NONE_ITEMS = [
  { id: 'none', text: '選択なし' },
  ...entries.map(([id, value]) => ({ id, text: value }) as const),
] as const;

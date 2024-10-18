import { toStrictEntries } from '@shared/utils/utilityFunction';

export const MONTH = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
} as const;

const entries = toStrictEntries(MONTH).sort(([, a], [, b]) => a - b);

export const MONTH_ITEMS = [...entries.slice(3), ...entries.slice(0, 3)].map(
  ([id, value]) => ({ id, text: `${value}月` }) as const,
);

export const MONTH_WITH_NONE_ITEMS = [
  { id: 'none', text: '選択なし' },
  ...entries.map(([id, value]) => ({ id, text: `${value}月` }) as const),
] as const;

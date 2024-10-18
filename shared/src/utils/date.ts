// eslint-disable-next-line no-restricted-imports
import { parse, toDate, format } from 'date-fns';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DATE_FORMAT = {
  date: 'yyyy/MM/dd',
  dateNum: 'y/M/d',
  dateISO: 'yyyy-MM-dd',
  dateJp: 'yyyy年M月d日',
  dateForFileName: 'yyyyMMdd',
  yearMonthJp: 'yyyy年M月',
  yearMonth: 'yyyy/MM',
  dateFixDigit: 'yyyyMMdd',
  bankCalendarDate: 'ddMMMyyyy',
  dateTimeFixDigit: 'yyyyMMddHHmmssSSS',
  dateTimeISO: 'yyyy-MM-dd HH:mm:ss',
  dateTime: 'yyyy/MM/dd HH:mm:ss',
} as const;
export type DateFormat = (typeof DATE_FORMAT)[keyof typeof DATE_FORMAT];

// eslint-disable-next-line no-restricted-syntax
const REFERENCE_DATE = new Date();
export const dateStringToDate = (dateString: string, dateFormat: DateFormat) =>
  parse(dateString, dateFormat, REFERENCE_DATE);

export const dateToDateString: (date: Date, dateFormat: DateFormat) => string = format;

/**
 * （テスト用にモック化するため）
 */
export const getCurrentDate = () =>
  toDate(
    // eslint-disable-next-line no-restricted-syntax
    new Date(),
  );

/**
 * 日付の文字列を指定したフォーマットに変換する
 * @param dateString 日付の文字列
 * @param param1 入出力の日付のフォーマットを指定する。fromを省略した場合は'yyyy-mm-dd'で行う
 * @returns toで指定したフォーマットに変換された日付の文字列
 */
export const changeDateFormat = (
  dateString: string,
  {
    from = 'yyyy-MM-dd',
    to,
  }: {
    from?: DateFormat;
    to: DateFormat;
  },
): string => format(dateStringToDate(dateString, from), to);

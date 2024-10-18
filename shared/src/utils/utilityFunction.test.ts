import {
  jsonSafeParse,
  toArrayIfNonArray,
  toEnumLikeObject,
  toHeadUpperCase,
  toOneOrMore,
  toOneOrTwo,
  toSearchParams,
  xor,
} from '@shared/utils/utilityFunction';

describe('utils/utilityFunction', () => {
  describe('xor', () => {
    it('いずれかのみがtrueの場合、trueを返却する', () => {
      expect(xor(true, true)).toBe(false);
      expect(xor(true, false)).toBe(true);
      expect(xor(false, true)).toBe(true);
      expect(xor(false, false)).toBe(false);
    });
  });
  describe('toEnumLikeObject', () => {
    const obj = toEnumLikeObject(['a', 'b']);
    it('指定したプロパティの値を返却する', () => {
      expect(obj.a).toBe('a');
      expect(obj.b).toBe('b');
    });
  });

  describe('toOneOrMore', () => {
    it('配列の要素が1つもない場合、エラーを返却', () => {
      expect(() => toOneOrMore([])).toThrowError();
    });
    it('配列の要素が1つだけの場合、1つの要素が入ったタプルを返却', () => {
      expect(toOneOrMore(['apple'])).toEqual(['apple']);
      expect(toOneOrMore(['grape'])).toEqual(['grape']);
    });
    it('配列の要素が2つ以上の場合、全ての要素が入ったタプルを返却', () => {
      expect(toOneOrMore(['apple', 'grape'])).toEqual(['apple', 'grape']);
      expect(toOneOrMore(['apple', 'grape', 'orange'])).toEqual(['apple', 'grape', 'orange']);
    });
  });
  describe('toOneOrTwo', () => {
    it('配列の要素が1つもないの場合、エラーを返却', () => {
      expect(() => toOneOrTwo([])).toThrowError();
    });
    it('配列の要素が1つだけの場合、1つの要素が入ったタプルを返却', () => {
      expect(toOneOrTwo(['apple'])).toEqual(['apple']);
      expect(toOneOrTwo(['grape'])).toEqual(['grape']);
    });
    it('配列の要素が2つ以上の場合、先頭の2つの要素が入ったタプルを返却', () => {
      expect(toOneOrTwo(['apple', 'grape'])).toEqual(['apple', 'grape']);
      expect(toOneOrTwo(['apple', 'grape', 'orange'])).toEqual(['apple', 'grape']);
    });
  });

  describe('toArrayIfNonArray', () => {
    it('配列の場合、そのまま返却', () => {
      expect(toArrayIfNonArray(['apple', 'grape'])).toEqual(['apple', 'grape']);
      expect(toArrayIfNonArray(['orange'])).toEqual(['orange']);
    });
    it('配列でない場合、配列にして返却', () => {
      expect(toArrayIfNonArray('melon')).toEqual(['melon']);
    });
  });

  describe('toHeadUpperCase', () => {
    it('空文字の場合、エラーを返却', () => {
      expect(() => toHeadUpperCase('')).toThrowError();
      expect(() => toHeadUpperCase(' ')).toThrowError();
    });
    it('半角英数字以外を含む文字列の場合、エラーを返却', () => {
      expect(() => toHeadUpperCase('aあa')).toThrowError();
      expect(() => toHeadUpperCase('bＢb')).toThrowError();
    });
    it('文字列の先頭を大文字にした文字列を返却', () => {
      expect(toHeadUpperCase('apple')).toBe('Apple');
      expect(toHeadUpperCase('grape')).toBe('Grape');
      expect(toHeadUpperCase('melon')).toBe('Melon');
    });
  });

  describe('toSearchParams', () => {
    it('空オブジェクトの場合、空オブジェクトを返却', () => {
      expect(toSearchParams({})).toEqual({});
    });
    it('valueが文字列のオブジェクトの場合、そのまま返却', () => {
      expect(toSearchParams({ type: 'C301' })).toEqual({ type: 'C301' });
      expect(toSearchParams({ cic: '1234567890' })).toEqual({ cic: '1234567890' });
    });
    it('valueが数値のオブジェクトの場合、valueを文字列に変換して返却', () => {
      expect(toSearchParams({ page: 1 })).toEqual({ page: '1' });
      expect(toSearchParams({ size: 20 })).toEqual({ size: '20' });
    });
    it('valueが文字列の配列のオブジェクトの場合、配列をカンマで結合して返却', () => {
      expect(toSearchParams({ types: ['C301', 'C302'] })).toEqual({ types: 'C301,C302' });
    });
    it('valueがオブジェクトの場合、ネストしたオブジェクトのkeyとvalueを返却', () => {
      //FIXME: あとで「Type instantiation is excessively deep and possibly infinite.」の対処を行う（NestedKeyが間違ってそう）
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      expect(toSearchParams({ dateRange: { start: '2020-01-01', end: '2020-12-31' } })).toEqual({
        start: '2020-01-01',
        end: '2020-12-31',
      });
      expect(
        toSearchParams({
          key1: { type: 'C301', dateRange: { start: '2020-01-01', end: '2020-12-31' } },
          key2: { page: 1, size: 20 },
          key3: 'key3',
        }),
      ).toEqual({
        type: 'C301',
        start: '2020-01-01',
        end: '2020-12-31',
        page: '1',
        size: '20',
        key3: 'key3',
      });
    });
  });

  describe('jsonSafeParse', () => {
    it('json文字列でない値を受け取った場合、data: null, success: falseを返却する', () => {
      expect(jsonSafeParse('apple')).toEqual({
        data: null,
        success: false,
      });
      expect(jsonSafeParse(null)).toEqual({
        data: null,
        success: false,
      });
      expect(jsonSafeParse([])).toEqual({
        data: null,
        success: false,
      });
      expect(jsonSafeParse({})).toEqual({
        data: null,
        success: false,
      });
      expect(jsonSafeParse([1, 2, 3])).toEqual({
        data: null,
        success: false,
      });
      expect(jsonSafeParse({ name: 'John' })).toEqual({
        data: null,
        success: false,
      });
    });

    it('json形式の文字列を受け取った場合、data: パースした値, success: trueを返却する', () => {
      expect(jsonSafeParse('[1, 2, 3]')).toEqual({
        data: [1, 2, 3],
        success: true,
      });
      expect(jsonSafeParse('{"name": "John"}')).toEqual({
        data: { name: 'John' },
        success: true,
      });
    });
  });
});

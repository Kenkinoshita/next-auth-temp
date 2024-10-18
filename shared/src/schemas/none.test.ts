import { z } from 'zod';

import { noneSchema } from '@shared/schemas/none';

describe('none', () => {
  const testSchema1 = z.union([z.literal('a'), z.literal('b')]);
  const testSchema2 = z.union([z.literal(1), z.literal(2)]);

  it('noneSchemaを適用させたschemaに期待される値を入力した場合、エラーとならないこと', () => {
    expect(() => noneSchema(testSchema1).parse('none')).not.toThrow();
    expect(() => noneSchema(testSchema1).parse('a')).not.toThrow();
    expect(() => noneSchema(testSchema1).parse('b')).not.toThrow();
    expect(() => noneSchema(testSchema2).parse('none')).not.toThrow();
    expect(() => noneSchema(testSchema2).parse(1)).not.toThrow();
    expect(() => noneSchema(testSchema2).parse(2)).not.toThrow();
  });
  it('noneSchemaを適用させた後の元のschemaに「none」を入力した場合、エラーとなること', () => {
    expect(() => testSchema1.parse('none')).toThrow();
    expect(() => testSchema2.parse('none')).toThrow();
  });
  it('noneSchemaを適用させたschemaに期待される値以外を入力した場合、エラーとなること', () => {
    expect(() => noneSchema(testSchema1).parse('month')).toThrow();
    expect(() => noneSchema(testSchema1).parse('')).toThrow();
  });
});

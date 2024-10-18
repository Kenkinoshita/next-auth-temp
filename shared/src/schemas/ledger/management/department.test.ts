import { departmentSchema } from '@shared/schemas/ledger/management/department';

describe('departmentSchema', () => {
  describe('入力されたIDが正しいか', () => {
    it('定義されたIDを入力した場合、エラーとならないこと', () => {
      expect(() => departmentSchema.parse('d001')).not.toThrow();
      expect(() => departmentSchema.parse('d006')).not.toThrow();
    });
    it('定義されたID以外を入力した場合、エラーとなること', () => {
      expect(() => departmentSchema.parse('hoge')).toThrow();
      expect(() => departmentSchema.parse('d000')).toThrow();
      expect(() => departmentSchema.parse('a001')).toThrow();
      expect(() => departmentSchema.parse(123)).toThrow();
      expect(() => departmentSchema.parse(null)).toThrow();
      expect(() => departmentSchema.parse(undefined)).toThrow();
    });
  });
});

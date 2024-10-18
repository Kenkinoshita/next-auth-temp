import { dateStringRangeSchema } from '@shared/schemas/dateStringRange';

describe('dateStringRange', () => {
  describe('開始日と終了日の組み合わせ', () => {
    it('開始日が終了日より後の日付の場合、エラーとなること', () => {
      expect(() => dateStringRangeSchema.parse({ start: '2024-01-01', end: '2023-12-31' })).toThrow();
    });
    it('開始日が終了日より前の日付の場合、エラーとならないこと', () => {
      expect(() => dateStringRangeSchema.parse({ start: '2024-01-01', end: '2024-01-02' })).not.toThrow();
    });
    it('開始日と終了日が等しい場合、エラーとならないこと', () => {
      expect(() => dateStringRangeSchema.parse({ start: '2024-01-01', end: '2024-01-01' })).not.toThrow();
    });
  });
});

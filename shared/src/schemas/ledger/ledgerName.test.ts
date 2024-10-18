import { ledgerNameSchema } from '@shared/schemas/ledger/ledgerName';

describe('ledgerName', () => {
  describe('データ型が正しいか', () => {
    it('string型である場合、エラーとならないこと', () => {
      expect(() => ledgerNameSchema.parse('振込手数料引落事前通知書')).not.toThrow();
      expect(() => ledgerNameSchema.parse('123')).not.toThrow();
      expect(() => ledgerNameSchema.parse(123 + '振込手数料引落事前通知書')).not.toThrow();
    });
    it('string型でない場合、エラーとなること', () => {
      expect(() => ledgerNameSchema.parse(123)).toThrow();
      expect(() => ledgerNameSchema.parse(null)).toThrow();
      expect(() => ledgerNameSchema.parse(undefined)).toThrow();
    });
  });

  describe('文字数が正しいか', () => {
    const character = 'あ';
    const gte1Character = character.repeat(1);
    const lte0Character = character.repeat(0);
    const lte100Character = character.repeat(100);
    const gte101MaxCharacter = character.repeat(101);

    it('文字数が1文字以上の場合、エラーとならないこと', () => {
      expect(() => ledgerNameSchema.parse(gte1Character)).not.toThrow();
    });
    it('文字数が0文字以下の場合、エラーとなること', () => {
      expect(() => ledgerNameSchema.parse(lte0Character)).toThrow();
    });
    it('文字数が100文字以下の場合、エラーとならないこと', () => {
      expect(() => ledgerNameSchema.parse(lte100Character)).not.toThrow();
    });
    it('文字数が101文字以上の場合、エラーとなること', () => {
      expect(() => ledgerNameSchema.parse(gte101MaxCharacter)).toThrow();
    });
  });
});

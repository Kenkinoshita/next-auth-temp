import { corporationNameSchema } from '@shared/schemas/corporation/corporationName';

describe('corporationName', () => {
  describe('データ型が正しいか', () => {
    it('string型である場合、エラーとならないこと', () => {
      expect(() => corporationNameSchema.parse('auじぶん銀行')).not.toThrow();
      expect(() => corporationNameSchema.parse('10')).not.toThrow();
      expect(() => corporationNameSchema.parse(10 + 'auじぶん銀行')).not.toThrow();
    });
    it('string型でない場合、エラーとなること', () => {
      expect(() => corporationNameSchema.parse(10)).toThrow();
    });
  });

  describe('文字数が正しいか', () => {
    const character = 'あ';
    const lowerMinCharacters = character.repeat(0);
    const minCharacters = character.repeat(1);
    const maxCharacters = character.repeat(100);
    const upperMaxCharacters = character.repeat(101);

    it('文字数が1文字以上100文字以下の場合、エラーとならないこと', () => {
      expect(() => corporationNameSchema.parse(minCharacters)).not.toThrow();
      expect(() => corporationNameSchema.parse(maxCharacters)).not.toThrow();
    });
    it('文字数が0文字の場合、エラーとなること', () => {
      expect(() => corporationNameSchema.parse(lowerMinCharacters)).toThrow();
    });
    it('文字数が101文字以上の場合、エラーとなること', () => {
      expect(() => corporationNameSchema.parse(upperMaxCharacters)).toThrow();
    });
  });
});

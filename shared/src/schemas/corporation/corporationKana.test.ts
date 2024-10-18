import { corporationKanaSchema } from '@shared/schemas/corporation/corporationKana';

describe('corporationKana', () => {
  describe('データ型が正しいか', () => {
    it('string型でありかつ文字種がカタカナ・長音記号のみの場合、エラーとならないこと', () => {
      expect(() => corporationKanaSchema.parse('エーユージブンギンコウ')).not.toThrow();
    });
    it('string型でありかつ文字種がカタカナ・長音記号以外の場合、エラーとなること', () => {
      expect(() => corporationKanaSchema.parse(10 + 'エーユージブンギンコウ')).toThrow();
      expect(() => corporationKanaSchema.parse('10')).toThrow();
      expect(() => corporationKanaSchema.parse('あ')).toThrow();
      expect(() => corporationKanaSchema.parse('銀')).toThrow();
    });
    it('string型でない場合、エラーとなること', () => {
      expect(() => corporationKanaSchema.parse(10)).toThrow();
    });
  });

  describe('文字数が正しいか', () => {
    const character = 'ア';
    const lowerMinCharacters = character.repeat(0);
    const minCharacters = character.repeat(1);
    const maxCharacters = character.repeat(100);
    const upperMaxCharacters = character.repeat(101);

    it('文字数が1文字以上100文字以下の場合、エラーとならないこと', () => {
      expect(() => corporationKanaSchema.parse(minCharacters)).not.toThrow();
      expect(() => corporationKanaSchema.parse(maxCharacters)).not.toThrow();
    });
    it('文字数が0文字の場合、エラーとなること', () => {
      expect(() => corporationKanaSchema.parse(lowerMinCharacters)).toThrow();
    });
    it('文字数が101文字以上の場合、エラーとなること', () => {
      expect(() => corporationKanaSchema.parse(upperMaxCharacters)).toThrow();
    });
  });
});

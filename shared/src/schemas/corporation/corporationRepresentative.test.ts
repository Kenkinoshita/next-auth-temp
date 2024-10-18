import { corporationRepresentativeSchema } from '@shared/schemas/corporation/corporationRepresentative';

describe('corporationRepresentative', () => {
  const validTestValue = {
    required: 'true',
    name: 'auじぶん銀行',
  };

  const character = 'あ';

  describe('オブジェクトとして正しく機能するか', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => corporationRepresentativeSchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        name: 'auじぶん銀行',
      };
      expect(() => corporationRepresentativeSchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      const invalidPropertyTestValue = { ...validTestValue, name: character.repeat(51) };
      expect(() => corporationRepresentativeSchema.parse(invalidPropertyTestValue)).toThrow();
    });
    it('required=falseの場合、notes以外のpropertyの値が不適切でもエラーとならないこと', () => {
      expect(() =>
        corporationRepresentativeSchema.parse({
          ...validTestValue,
          required: 'false',
          name: character.repeat(51),
        }),
      ).not.toThrow();
    });
  });

  describe('name', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => corporationRepresentativeSchema.parse(validTestValue)).not.toThrow();
        expect(() => corporationRepresentativeSchema.parse({ ...validTestValue, name: '123' })).not.toThrow();
        expect(() =>
          corporationRepresentativeSchema.parse({ ...validTestValue, name: 123 + 'auじぶん銀行' }),
        ).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => corporationRepresentativeSchema.parse({ ...validTestValue, name: 123 })).toThrow();
        expect(() => corporationRepresentativeSchema.parse({ ...validTestValue, name: null })).toThrow();
        expect(() => corporationRepresentativeSchema.parse({ ...validTestValue, name: undefined })).toThrow();
      });
    });

    describe('文字数が正しいか', () => {
      const minNameCharacterTestValue = { ...validTestValue, name: character.repeat(0) };
      const lte50NameCharacterTestValue = { ...validTestValue, name: character.repeat(50) };
      const gte51NameCharacterTestValue = { ...validTestValue, name: character.repeat(51) };

      it('文字数が0文字である場合、エラーとなること', () => {
        expect(() => corporationRepresentativeSchema.parse(minNameCharacterTestValue)).toThrow();
      });
      it('文字数が50文字以下である場合、エラーとならないこと', () => {
        expect(() => corporationRepresentativeSchema.parse(lte50NameCharacterTestValue)).not.toThrow();
      });
      it('文字数が51文字以上である場合、エラーとなること', () => {
        expect(() => corporationRepresentativeSchema.parse(gte51NameCharacterTestValue)).toThrow();
      });
    });
  });
});

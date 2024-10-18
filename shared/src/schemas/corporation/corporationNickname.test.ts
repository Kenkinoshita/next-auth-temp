import { corporationNicknameSchema } from '@shared/schemas/corporation/corporationNickname';

describe('corporationNickname', () => {
  const validTestValue = {
    required: 'true',
    name: 'auじぶん銀行',
    kana: 'エーユージブンギンコウ',
  };

  const character = 'ア';

  describe('オブジェクトとして正しく機能するか', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => corporationNicknameSchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        required: 'true',
        // name: 'auじぶん銀行',
        kana: 'エーユージブンギンコウ',
      };
      expect(() => corporationNicknameSchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      expect(() => corporationNicknameSchema.parse({ ...validTestValue, name: character.repeat(71) })).toThrow();
    });
    it('required=falseの場合、propertyの値が不適切でもエラーとならないこと', () => {
      expect(() =>
        corporationNicknameSchema.parse({
          ...validTestValue,
          required: 'false',
          name: character.repeat(71),
        }),
      ).not.toThrow();
    });
  });

  describe('name', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => corporationNicknameSchema.parse(validTestValue)).not.toThrow();
        expect(() => corporationNicknameSchema.parse({ ...validTestValue, name: '123' })).not.toThrow();
        expect(() => corporationNicknameSchema.parse({ ...validTestValue, name: 123 + 'auじぶん銀行' })).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => corporationNicknameSchema.parse({ ...validTestValue, name: 123 })).toThrow();
        expect(() => corporationNicknameSchema.parse({ ...validTestValue, name: null })).toThrow();
        expect(() => corporationNicknameSchema.parse({ ...validTestValue, name: undefined })).toThrow();
      });
    });

    describe('文字数が正しいか', () => {
      const minNameCharacterTestValue = { ...validTestValue, name: character.repeat(0) };
      const lte70NameCharacterTestValue = { ...validTestValue, name: character.repeat(70) };
      const gte71NameCharacterTestValue = { ...validTestValue, name: character.repeat(71) };

      it('文字数が0文字である場合、エラーとなること', () => {
        expect(() => corporationNicknameSchema.parse(minNameCharacterTestValue)).toThrow();
      });
      it('文字数が70文字以下である場合、エラーとならないこと', () => {
        expect(() => corporationNicknameSchema.parse(lte70NameCharacterTestValue)).not.toThrow();
      });
      it('文字数が71文字以上である場合、エラーとなること', () => {
        expect(() => corporationNicknameSchema.parse(gte71NameCharacterTestValue)).toThrow();
      });
    });
  });

  describe('kana', () => {
    describe('データ型が正しいか', () => {
      it('string型かつカタカナ・長音記号の場合、エラーとならないこと', () => {
        expect(() => corporationNicknameSchema.parse(validTestValue)).not.toThrow();
      });
      it('string型であるがカタカナ・長音記号以外の場合、エラーとなること', () => {
        expect(() => corporationNicknameSchema.parse({ ...validTestValue, kana: '123' })).toThrow();
        expect(() => corporationNicknameSchema.parse({ ...validTestValue, kana: 123 + 'auじぶん銀行' })).toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => corporationNicknameSchema.parse({ ...validTestValue, kana: 123 })).toThrow();
        expect(() => corporationNicknameSchema.parse({ ...validTestValue, kana: null })).toThrow();
        expect(() => corporationNicknameSchema.parse({ ...validTestValue, kana: undefined })).toThrow();
      });
    });

    describe('文字数が正しいか', () => {
      const minKanaCharacterTestValue = { ...validTestValue, kana: character.repeat(0) };
      const lte100KanaCharacterTestValue = { ...validTestValue, kana: character.repeat(100) };
      const gte101KanaCharacterTestValue = { ...validTestValue, kana: character.repeat(101) };

      it('文字数が0文字である場合、エラーとなること', () => {
        expect(() => corporationNicknameSchema.parse(minKanaCharacterTestValue)).toThrow();
      });
      it('文字数が100文字以下である場合、エラーとならないこと', () => {
        expect(() => corporationNicknameSchema.parse(lte100KanaCharacterTestValue)).not.toThrow();
      });
      it('文字数が101文字以上である場合、エラーとなること', () => {
        expect(() => corporationNicknameSchema.parse(gte101KanaCharacterTestValue)).toThrow();
      });
    });
  });
});

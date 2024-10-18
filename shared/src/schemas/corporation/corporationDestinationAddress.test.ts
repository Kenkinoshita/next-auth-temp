import { corporationDestinationAddressSchema } from '@shared/schemas/corporation/corporationDestinationAddress';

describe('corporationDestinationAddress', () => {
  const validTestValue = {
    corporationName: 'auじぶん銀行',
    name: '山田太郎',
    honorificTitle: '様',
    postalCode: '1234567',
    address: '東京都中央区日本橋',
    buildingName: '日本橋ダイヤビルディング',
    phoneNumber: '00011112222',
  };

  const kanaCharacter = 'あ';
  const numberCharacter = '1';

  describe('オブジェクトとして正しく機能するか', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => corporationDestinationAddressSchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        name: '山田太郎',
        honorificTitle: '様',
        postalCode: '1234567',
        address: '東京都中央区日本橋',
        buildingName: '日本橋ダイヤビルディング',
        phoneNumber: '11122223333',
      };
      expect(() => corporationDestinationAddressSchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      const invalidPropertyTestValue = { ...validTestValue, corporationName: null };
      expect(() => corporationDestinationAddressSchema.parse(invalidPropertyTestValue)).toThrow();
    });
  });

  describe('corporationName', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => corporationDestinationAddressSchema.parse(validTestValue)).not.toThrow();
        expect(() =>
          corporationDestinationAddressSchema.parse({ ...validTestValue, corporationName: '123' }),
        ).not.toThrow();
        expect(() =>
          corporationDestinationAddressSchema.parse({ ...validTestValue, corporationName: 123 + 'auじぶん銀行' }),
        ).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, corporationName: 123 })).toThrow();
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, corporationName: null })).toThrow();
        expect(() =>
          corporationDestinationAddressSchema.parse({ ...validTestValue, corporationName: undefined }),
        ).toThrow();
      });
    });
    describe('文字数が正しいか', () => {
      const lte100corporationNameCharacterTestValue = { ...validTestValue, corporationName: kanaCharacter.repeat(38) };
      const gte101corporationNameCharacterTestValue = { ...validTestValue, corporationName: kanaCharacter.repeat(39) };

      it('文字数が38文字以下である場合、エラーとならないこと', () => {
        expect(() => corporationDestinationAddressSchema.parse(lte100corporationNameCharacterTestValue)).not.toThrow();
      });
      it('文字数が39文字以上である場合、エラーとなること', () => {
        expect(() => corporationDestinationAddressSchema.parse(gte101corporationNameCharacterTestValue)).toThrow();
      });
    });
  });

  describe('name', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => corporationDestinationAddressSchema.parse(validTestValue)).not.toThrow();
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, name: '123' })).not.toThrow();
        expect(() =>
          corporationDestinationAddressSchema.parse({ ...validTestValue, name: 123 + '山田太郎' }),
        ).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, name: 123 })).toThrow();
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, name: null })).toThrow();
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, name: undefined })).toThrow();
      });
    });
    describe('文字数が正しいか', () => {
      const lte38NameCharacterTestValue = { ...validTestValue, name: kanaCharacter.repeat(38) };
      const gte39NameCharacterTestValue = { ...validTestValue, name: kanaCharacter.repeat(39) };

      it('文字数が38文字以下である場合、エラーとならないこと', () => {
        expect(() => corporationDestinationAddressSchema.parse(lte38NameCharacterTestValue)).not.toThrow();
      });
      it('文字数が39文字以上である場合、エラーとなること', () => {
        expect(() => corporationDestinationAddressSchema.parse(gte39NameCharacterTestValue)).toThrow();
      });
    });
  });

  describe('honorificTitle', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => corporationDestinationAddressSchema.parse(validTestValue)).not.toThrow();
        expect(() =>
          corporationDestinationAddressSchema.parse({ ...validTestValue, honorificTitle: '123' }),
        ).not.toThrow();
        expect(() =>
          corporationDestinationAddressSchema.parse({ ...validTestValue, honorificTitle: 123 + '様' }),
        ).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, honorificTitle: 123 })).toThrow();
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, honorificTitle: null })).toThrow();
        expect(() =>
          corporationDestinationAddressSchema.parse({ ...validTestValue, honorificTitle: undefined }),
        ).toThrow();
      });
    });
    describe('文字数が正しいか', () => {
      const lte4HonorificTitleCharacterTestValue = { ...validTestValue, honorificTitle: kanaCharacter.repeat(4) };
      const gte5HonorificTitleCharacterTestValue = { ...validTestValue, honorificTitle: kanaCharacter.repeat(5) };

      it('文字数が4文字以下である場合、エラーとならないこと', () => {
        expect(() => corporationDestinationAddressSchema.parse(lte4HonorificTitleCharacterTestValue)).not.toThrow();
      });
      it('文字数が5文字以上である場合、エラーとなること', () => {
        expect(() => corporationDestinationAddressSchema.parse(gte5HonorificTitleCharacterTestValue)).toThrow();
      });
    });
  });

  describe('address', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => corporationDestinationAddressSchema.parse(validTestValue)).not.toThrow();
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, address: '123' })).not.toThrow();
        expect(() =>
          corporationDestinationAddressSchema.parse({ ...validTestValue, address: 123 + '東京都中央区日本橋' }),
        ).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, address: 123 })).toThrow();
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, address: null })).toThrow();
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, address: undefined })).toThrow();
      });
    });
    describe('文字数が正しいか', () => {
      const lte43AddressCharacterTestValue = { ...validTestValue, address: kanaCharacter.repeat(43) };
      const gte44AddressCharacterTestValue = { ...validTestValue, address: kanaCharacter.repeat(44) };

      it('文字数が43文字以下である場合、エラーとならないこと', () => {
        expect(() => corporationDestinationAddressSchema.parse(lte43AddressCharacterTestValue)).not.toThrow();
      });
      it('文字数が44文字以上である場合、エラーとなること', () => {
        expect(() => corporationDestinationAddressSchema.parse(gte44AddressCharacterTestValue)).toThrow();
      });
    });
  });

  describe('buildingName', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => corporationDestinationAddressSchema.parse(validTestValue)).not.toThrow();
        expect(() =>
          corporationDestinationAddressSchema.parse({ ...validTestValue, buildingName: '123' }),
        ).not.toThrow();
        expect(() =>
          corporationDestinationAddressSchema.parse({
            ...validTestValue,
            buildingName: 123 + '日本橋ダイヤビルディング',
          }),
        ).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, buildingName: 123 })).toThrow();
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, buildingName: null })).toThrow();
        expect(() =>
          corporationDestinationAddressSchema.parse({ ...validTestValue, buildingName: undefined }),
        ).toThrow();
      });
    });
    describe('文字数が正しいか', () => {
      const lte43BuildingNameCharacterTestValue = { ...validTestValue, buildingName: kanaCharacter.repeat(43) };
      const gte44BuildingNameCharacterTestValue = { ...validTestValue, buildingName: kanaCharacter.repeat(44) };

      it('文字数が43文字以内である場合、エラーとならないこと', () => {
        expect(() => corporationDestinationAddressSchema.parse(lte43BuildingNameCharacterTestValue)).not.toThrow();
      });
      it('文字数が44文字以上である場合、エラーとなること', () => {
        expect(() => corporationDestinationAddressSchema.parse(gte44BuildingNameCharacterTestValue)).toThrow();
      });
    });
  });

  describe('phoneNumber', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => corporationDestinationAddressSchema.parse(validTestValue)).not.toThrow();
        expect(() =>
          corporationDestinationAddressSchema.parse({ ...validTestValue, phoneNumber: 123 + '11112222' }),
        ).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, phoneNumber: 123 })).toThrow();
        expect(() => corporationDestinationAddressSchema.parse({ ...validTestValue, phoneNumber: null })).toThrow();
        expect(() =>
          corporationDestinationAddressSchema.parse({ ...validTestValue, phoneNumber: undefined }),
        ).toThrow();
      });
    });
    describe('文字数が正しいか', () => {
      const lte11PhoneNumberCharacterTestValue = { ...validTestValue, phoneNumber: numberCharacter.repeat(11) };
      const gte12PhoneNumberCharacterTestValue = { ...validTestValue, phoneNumber: numberCharacter.repeat(12) };

      it('文字数が11文字以内である場合、エラーとならないこと', () => {
        expect(() => corporationDestinationAddressSchema.parse(lte11PhoneNumberCharacterTestValue)).not.toThrow();
      });
      it('文字数が12文字以上である場合、エラーとなること', () => {
        expect(() => corporationDestinationAddressSchema.parse(gte12PhoneNumberCharacterTestValue)).toThrow();
      });
    });
  });
});

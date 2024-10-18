import { portalTokenPayloadSchema } from '@shared/schemas/portalTokenPayload';

describe('portalTokenPayload', () => {
  const validTestValue = {
    type: 'portal',
    userName: 'auじぶん銀行',
    cic: '1234567890',
    sessionKey: 'sessionKey',
    lastLogin: '2024-10-03',
    corporationName: 'auじぶん銀行',
  };

  describe('オブジェクトとして正しく機能するか', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => portalTokenPayloadSchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        type: 'portal',
        // userName: 'auじぶん銀行',
        cic: '12345467890',
        sessionKey: 'sessionKey',
        lastLogin: '2024-10-03',
        corporationName: 'auじぶん銀行',
      };
      expect(() => portalTokenPayloadSchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      expect(() => portalTokenPayloadSchema.parse({ ...validTestValue, userName: 123 })).toThrow();
    });
  });
  describe('typeに期待した値が入力されたか', () => {
    it('"portal"を入力した場合、エラーとならないこと', () => {
      expect(() => portalTokenPayloadSchema.parse(validTestValue)).not.toThrow();
    });
    it('"portal"以外を入力した場合、エラーとなること', () => {
      expect(() => portalTokenPayloadSchema.parse({ ...validTestValue, type: 'back' })).toThrow();
      expect(() => portalTokenPayloadSchema.parse({ ...validTestValue, type: null })).toThrow();
      expect(() => portalTokenPayloadSchema.parse({ ...validTestValue, type: undefined })).toThrow();
    });
  });
  describe('userNameのデータ型が正しいか', () => {
    it('string型を入力した場合、エラーとならないこと', () => {
      expect(() => portalTokenPayloadSchema.parse(validTestValue)).not.toThrow();
    });
    it('string型以外を入力した場合、エラーとなること', () => {
      expect(() => portalTokenPayloadSchema.parse({ ...validTestValue, userName: 123 })).toThrow();
      expect(() => portalTokenPayloadSchema.parse({ ...validTestValue, userName: null })).toThrow();
      expect(() => portalTokenPayloadSchema.parse({ ...validTestValue, userName: undefined })).toThrow();
    });
  });
  describe('sessionKeyのデータ型が正しいか', () => {
    it('string型を入力した場合、エラーとならないこと', () => {
      expect(() => portalTokenPayloadSchema.parse(validTestValue)).not.toThrow();
    });
    it('string型以外を入力した場合、エラーとなること', () => {
      expect(() => portalTokenPayloadSchema.parse({ ...validTestValue, sessionKey: 123 })).toThrow();
      expect(() => portalTokenPayloadSchema.parse({ ...validTestValue, sessionKey: null })).toThrow();
      expect(() => portalTokenPayloadSchema.parse({ ...validTestValue, sessionKey: undefined })).toThrow();
    });
  });
  describe('lastLoginのデータ型が正しいか', () => {
    it('string型を入力した場合、エラーとならないこと', () => {
      expect(() => portalTokenPayloadSchema.parse(validTestValue)).not.toThrow();
    });
    it('string型以外を入力した場合、エラーとなること', () => {
      expect(() => portalTokenPayloadSchema.parse({ ...validTestValue, lastLogin: 123 })).toThrow();
      expect(() => portalTokenPayloadSchema.parse({ ...validTestValue, lastLogin: null })).toThrow();
      expect(() => portalTokenPayloadSchema.parse({ ...validTestValue, lastLogin: undefined })).toThrow();
    });
  });
});

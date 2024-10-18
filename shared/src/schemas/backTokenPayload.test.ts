import { backTokenPayloadSchema } from '@shared/schemas/backTokenPayload';

describe('backTokenPayload', () => {
  const validTestValue = {
    type: 'back',
    userName: 'auじぶん銀行',
    roleId: 'roleId',
    sessionKey: 'sessionKey',
    permissions: ['23', '24'],
  };

  describe('オブジェクトとして正しく機能するか', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => backTokenPayloadSchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        type: 'back',
        // userName: 'auじぶん銀行',
        roleId: 'roleId',
        sessionKey: 'sessionKey',
        permissions: ['23'],
      };
      expect(() => backTokenPayloadSchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, userName: 123 })).toThrow();
    });
  });
  describe('permissionsのデータ型と内容が正しいか', () => {
    it('string型の配列を入力した場合、エラーとならないこと', () => {
      expect(() => backTokenPayloadSchema.parse(validTestValue)).not.toThrow();
    });
    it('空の配列を入力した場合、エラーとならないこと', () => {
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, permissions: [] })).not.toThrow();
    });
    it('string型以外の要素を含む配列を入力した場合、エラーとなること', () => {
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, permissions: ['23', 123] })).toThrow();
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, permissions: [null] })).toThrow();
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, permissions: [undefined] })).toThrow();
    });
    it('permissionsが配列でない場合、エラーとなること', () => {
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, permissions: '23' })).toThrow();
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, permissions: null })).toThrow();
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, permissions: undefined })).toThrow();
    });
  });
  describe('typeに期待した値が入力されたか', () => {
    it('"back"を入力した場合、エラーとならないこと', () => {
      expect(() => backTokenPayloadSchema.parse(validTestValue)).not.toThrow();
    });
    it('"back"以外を入力した場合、エラーとなること', () => {
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, type: 'portal' })).toThrow();
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, type: null })).toThrow();
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, type: undefined })).toThrow();
    });
  });
  describe('userNameのデータ型が正しいか', () => {
    it('string型を入力した場合、エラーとならないこと', () => {
      expect(() => backTokenPayloadSchema.parse(validTestValue)).not.toThrow();
    });
    it('string型以外を入力した場合、エラーとなること', () => {
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, userName: 123 })).toThrow();
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, userName: null })).toThrow();
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, userName: undefined })).toThrow();
    });
  });
  describe('roleIdのデータ型が正しいか', () => {
    it('string型を入力した場合、エラーとならないこと', () => {
      expect(() => backTokenPayloadSchema.parse(validTestValue)).not.toThrow();
    });
    it('string型以外を入力した場合、エラーとなること', () => {
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, roleId: 123 })).toThrow();
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, roleId: null })).toThrow();
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, roleId: undefined })).toThrow();
    });
  });
  describe('sessionKeyのデータ型が正しいか', () => {
    it('string型を入力した場合、エラーとならないこと', () => {
      expect(() => backTokenPayloadSchema.parse(validTestValue)).not.toThrow();
    });
    it('string型以外を入力した場合、エラーとなること', () => {
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, sessionKey: 123 })).toThrow();
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, sessionKey: null })).toThrow();
      expect(() => backTokenPayloadSchema.parse({ ...validTestValue, sessionKey: undefined })).toThrow();
    });
  });
});

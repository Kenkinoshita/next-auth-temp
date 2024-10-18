import { corporationBasicInfoSchema } from '@shared/schemas/corporation/corporationBasicInfo';

describe('corporationBasicInfo', () => {
  const validTestValue = {
    cic: '1234567890',
    name: 'auじぶん銀行',
    kana: 'エーユージブンギンコウ',
    note: 'テキスト',
  };

  it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
    expect(() => corporationBasicInfoSchema.parse(validTestValue)).not.toThrow();
  });
  it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
    const invalidTestValue1 = {
      name: 'auじぶん銀行',
      kana: 'エーユージブンギンコウ',
      note: 'テキスト',
    };
    expect(() => corporationBasicInfoSchema.parse(invalidTestValue1)).toThrow();
  });
  it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
    const invalidTestValue2 = { ...validTestValue, cic: 'invalid' };
    expect(() => corporationBasicInfoSchema.parse(invalidTestValue2)).toThrow();
  });
  it('法人名（カナ）に、漢字・ひらがなが含まれている場合、エラーとなること', () => {
    const invalidTestValue3 = { ...validTestValue, kana: 'あいうえおかきくけこさしすせそたちつてと' };
    expect(() => corporationBasicInfoSchema.parse(invalidTestValue3)).toThrow();
    const invalidTestValue4 = { ...validTestValue, kana: '一二三四五' };
    expect(() => corporationBasicInfoSchema.parse(invalidTestValue4)).toThrow();
    const invalidTestValue5 = { ...validTestValue, kana: 'アイウエオ力キクケコ' }; // カではなく、力（ちから）
    expect(() => corporationBasicInfoSchema.parse(invalidTestValue5)).toThrow();
  });
});

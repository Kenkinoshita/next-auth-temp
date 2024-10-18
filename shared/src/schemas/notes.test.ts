import { notesSchema } from '@shared/schemas/notes';

describe('notesSchema', () => {
  describe('データ型が正しいか', () => {
    it('string型である場合、エラーとならないこと', () => {
      expect(() => notesSchema.parse('auじぶん銀行')).not.toThrow();
      expect(() => notesSchema.parse('123')).not.toThrow();
      expect(() => notesSchema.parse(123 + 'auじぶん銀行')).not.toThrow();
    });
    it('string型でない場合、エラーとなること', () => {
      expect(() => notesSchema.parse(123)).toThrow();
      expect(() => notesSchema.parse(null)).toThrow();
      expect(() => notesSchema.parse(undefined)).toThrow();
    });
  });

  describe('文字数が正しいか', () => {
    const character = 'あ';
    const maxCharacter = character.repeat(100);
    const upperMaxCharacter = character.repeat(101);

    it('文字数が100文字以下の場合、エラーとならないこと', () => {
      expect(() => notesSchema.parse('')).not.toThrow();
      expect(() => notesSchema.parse(maxCharacter)).not.toThrow();
    });
    it('文字数が101文字以上の場合、エラーとなること', () => {
      expect(() => notesSchema.parse(upperMaxCharacter)).toThrow();
    });
  });
});

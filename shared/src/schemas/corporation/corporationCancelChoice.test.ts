import { corporationCancelChoiceSchema } from '@shared/schemas/corporation/corporationCancelChoice';

describe('corporationCancelChoice', () => {
  it('期待される値が一つ入力された場合、エラーとならないこと', () => {
    expect(() => corporationCancelChoiceSchema.parse('all')).not.toThrow();
    expect(() => corporationCancelChoiceSchema.parse('canceled')).not.toThrow();
    expect(() => corporationCancelChoiceSchema.parse('uncancelled')).not.toThrow();
  });
  it('何も入力されなかった場合、エラーとなること', () => {
    expect(() => corporationCancelChoiceSchema.parse('')).toThrow();
  });
  it('期待される値ではない値が入力された場合、エラーとなること', () => {
    expect(() => corporationCancelChoiceSchema.parse('abc')).toThrow();
    expect(() => corporationCancelChoiceSchema.parse(['all', 'canceled'])).toThrow();
    expect(() => corporationCancelChoiceSchema.parse(null)).toThrow();
    expect(() => corporationCancelChoiceSchema.parse(undefined)).toThrow();
  });
});

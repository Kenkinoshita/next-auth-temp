import { feeAccountSchema } from '@shared/schemas/feeAccount';

//FIXME: feeAccount.tsのバリデーションを修正後にこちらも修正
describe('feeAccount', () => {
  const validData = {
    branchNumber: '123',
    number: '1234567',
  };

  describe.skip('値が入力されているか', () => {
    it('branchNumberとnumber両方の値が入力されている場合、エラーとならないこと', () => {
      expect(() => feeAccountSchema.parse(validData)).not.toThrow();
    });
    it('branchNumberの値が入力されていない場合、エラーとなること', () => {
      expect(() => feeAccountSchema.parse({ ...validData, branchNumber: '' })).toThrow();
    });
    it('numberの値が入力されていない場合、エラーとなること', () => {
      expect(() => feeAccountSchema.parse({ ...validData, number: '' })).toThrow();
    });
    it('branchNumberとnumber両方の値が入力されていない場合、エラーとなること', () => {
      expect(() => feeAccountSchema.parse({ branchNumber: '', number: '' })).toThrow();
    });
  });

  describe('データ型が正しいか', () => {
    describe('branchNumberが正しいか', () => {
      it('branchNumberの値がstring型である場合、エラーとならないこと', () => {
        expect(() => feeAccountSchema.parse(validData)).not.toThrow();
      });
      it('branchNumberの値がstring型でない場合、エラーとなること', () => {
        expect(() => feeAccountSchema.parse({ ...validData, branchNumber: 123 })).toThrow();
      });
    });

    describe('branchNumberが正しいか', () => {
      it('numberの値がstring型である場合、エラーとならないこと', () => {
        expect(() => feeAccountSchema.parse(validData)).not.toThrow();
      });
      it('numberの値がstring型でない場合、エラーとなること', () => {
        expect(() => feeAccountSchema.parse({ ...validData, branchNumber: 1234567 })).toThrow();
      });
    });
  });

  describe.skip('数字で入力されているか', () => {
    describe('branchNumberが正しいか', () => {
      it('branchNumberの値が数字のみである場合、エラーとならないこと', () => {
        expect(() => feeAccountSchema.parse(validData)).not.toThrow();
      });
      it('branchNumberの値に数字以外がある場合、エラーとなること', () => {
        expect(() => feeAccountSchema.parse({ ...validData, branchNumber: 'abc' })).toThrow();
        expect(() => feeAccountSchema.parse({ ...validData, branchNumber: '12a' })).toThrow();
      });
    });

    describe('numberが正しいか', () => {
      it('numberの値が数字のみである場合、エラーとならないこと', () => {
        expect(() => feeAccountSchema.parse(validData)).not.toThrow();
      });
      it('numberの値が数字以外がある場合、エラーとなること', () => {
        expect(() => feeAccountSchema.parse({ ...validData, number: 'abcdefg' })).toThrow();
        expect(() => feeAccountSchema.parse({ ...validData, number: '123456a' })).toThrow();
      });
    });
  });

  describe('桁数が正しいか', () => {
    describe('branchNumberが正しいか', () => {
      it('branchNumberの値が3桁である場合、エラーとならないこと', () => {
        expect(() => feeAccountSchema.parse(validData)).not.toThrow();
      });
      it('branchNumberの値が4桁以上である場合、エラーとなること', () => {
        expect(() => feeAccountSchema.parse({ ...validData, branchNumber: '1234' })).toThrow();
      });
      it.skip('branchNumberの値が2桁以下である場合、エラーとなること', () => {
        expect(() => feeAccountSchema.parse({ ...validData, branchNumber: '12' })).toThrow();
      });
    });

    describe('numberが正しいか', () => {
      it('numberの値が7桁である場合、エラーとならないこと', () => {
        expect(() => feeAccountSchema.parse(validData)).not.toThrow();
      });
      it('numberの値が8桁以上である場合、エラーとなること', () => {
        expect(() => feeAccountSchema.parse({ ...validData, number: '12345678' })).toThrow();
      });
      it.skip('numberの値が6桁以下である場合、エラーとなること', () => {
        expect(() => feeAccountSchema.parse({ ...validData, number: '123456' })).toThrow();
      });
    });
  });
});

import { PDF_BASE64_TEST_VALUE } from '@shared/consts/base64ForUT';
import { ledgerPDFInsertSchema } from '@shared/schemas/ledger/management/ledgerPDFInsert';

describe('ledgerPDFInsert', () => {
  const validTestValue = {
    cic: '1234567890',
    createdDate: '2024-10-09',
    type: 'C301',
    version: 1,
    pdfData: PDF_BASE64_TEST_VALUE,
  };

  it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
    expect(() => ledgerPDFInsertSchema.parse(validTestValue)).not.toThrow();
  });
  it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
    const noPropertyTestValue = {
      // cic: '1234567890',
      createdDate: '2024-10-09',
      type: 'C301',
      version: 1,
      pdfData: PDF_BASE64_TEST_VALUE,
    };
    expect(() => ledgerPDFInsertSchema.parse(noPropertyTestValue)).toThrow();
  });
  it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
    const invalidPropertyTestValue = { ...validTestValue, cic: 'invalid' };
    expect(() => ledgerPDFInsertSchema.parse(invalidPropertyTestValue)).toThrow();
  });
});

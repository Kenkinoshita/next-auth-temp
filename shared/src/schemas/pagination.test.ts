import { z } from 'zod';

import { createPaginationSchema } from '@shared/schemas/pagination';

describe('pagination', () => {
  const userListSchema = createPaginationSchema(
    z.object({
      name: z.string().min(1),
      email: z.string().email(),
    }),
  );

  const USER_LIST_VALID_DATA: z.infer<typeof userListSchema> = {
    total: 21,
    pageNumber: 1,
    maxPage: 2,
    hasNext: true,
    items: [
      {
        name: 'yuji.ono',
        email: 'yuji.ono@example.com',
      },
      {
        name: 'sota.kuki',
        email: 'sota.kuki@example.com',
      },
    ],
  };

  it('totalがnumberでないとき、エラーとなること', () => {
    expect(() => userListSchema.parse(USER_LIST_VALID_DATA)).not.toThrow();
    expect(() => userListSchema.parse({ ...USER_LIST_VALID_DATA, total: '0' })).toThrow();
  });
  it('totalが整数でないとき、エラーとなること', () => {
    expect(() => userListSchema.parse(USER_LIST_VALID_DATA)).not.toThrow();
    expect(() => userListSchema.parse({ ...USER_LIST_VALID_DATA, total: 1.1 })).toThrow();
  });
  it('totalが0未満のとき、エラーとなること', () => {
    expect(() => userListSchema.parse(USER_LIST_VALID_DATA)).not.toThrow();
    expect(() => userListSchema.parse({ ...USER_LIST_VALID_DATA, total: -1 })).toThrow();
  });

  it('pageNumberがnumberでないとき、エラーとなること', () => {
    expect(() => userListSchema.parse(USER_LIST_VALID_DATA)).not.toThrow();
    expect(() => userListSchema.parse({ ...USER_LIST_VALID_DATA, pageNumber: '1' })).toThrow();
  });
  it('pageNumberが整数でないとき、エラーとなること', () => {
    expect(() => userListSchema.parse(USER_LIST_VALID_DATA)).not.toThrow();
    expect(() => userListSchema.parse({ ...USER_LIST_VALID_DATA, pageNumber: 1.1 })).toThrow();
  });
  it('pageNumberが1未満のとき、エラーとなること', () => {
    expect(() => userListSchema.parse(USER_LIST_VALID_DATA)).not.toThrow();
    expect(() => userListSchema.parse({ ...USER_LIST_VALID_DATA, pageNumber: 0 })).toThrow();
  });

  it('maxPageがnumberでないとき、エラーとなること', () => {
    expect(() => userListSchema.parse(USER_LIST_VALID_DATA)).not.toThrow();
    expect(() => userListSchema.parse({ ...USER_LIST_VALID_DATA, maxPage: '1' })).toThrow();
  });
  it('maxPageが整数でないとき、エラーとなること', () => {
    expect(() => userListSchema.parse(USER_LIST_VALID_DATA)).not.toThrow();
    expect(() => userListSchema.parse({ ...USER_LIST_VALID_DATA, maxPage: 1.1 })).toThrow();
  });
  it('maxPageが1未満のとき、エラーとなること', () => {
    expect(() => userListSchema.parse(USER_LIST_VALID_DATA)).not.toThrow();
    expect(() => userListSchema.parse({ ...USER_LIST_VALID_DATA, maxPage: 0 })).toThrow();
  });

  it('hasNextがbooleanでない場合、エラーとなること', () => {
    expect(() => userListSchema.parse(USER_LIST_VALID_DATA)).not.toThrow();
    expect(() => userListSchema.parse({ ...USER_LIST_VALID_DATA, hasNext: false })).not.toThrow();
    expect(() => userListSchema.parse({ ...USER_LIST_VALID_DATA, hasNext: 0 })).toThrow();
  });

  it('itemsがarrayでない場合、エラーとなること', () => {
    expect(() => userListSchema.parse(USER_LIST_VALID_DATA)).not.toThrow();
    expect(() => userListSchema.parse({ ...USER_LIST_VALID_DATA, items: { name: 'kuki' } })).toThrow();
  });
  it('itemsが引数で指定したschemaに合致しない場合、エラーとなること', () => {
    expect(() => userListSchema.parse(USER_LIST_VALID_DATA)).not.toThrow();
    expect(() =>
      userListSchema.parse({
        ...USER_LIST_VALID_DATA,
        items: [
          {
            name: 100000,
            email: 'sota.kuki@example.com',
          },
        ],
      }),
    ).toThrow();
    expect(() =>
      userListSchema.parse({
        ...USER_LIST_VALID_DATA,
        items: [
          {
            name: 'sota.kuki',
            email: 'sota.kuki',
          },
        ],
      }),
    ).toThrow();
  });
});

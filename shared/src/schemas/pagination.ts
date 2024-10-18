import { z } from 'zod';

/**
 * ページネーションのデータを検証する
 * FIXME: バリデーションを修正する
 */
export const createPaginationSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    /** 検索結果の総件数 */
    total: z.number().gte(0).int(),
    /** 検索したページ数 */
    pageNumber: z.number().gte(1).int(),
    /** 検索したページの最大数 */
    maxPage: z.number().gte(1).int(),
    /** 次のページがあるか */
    hasNext: z.boolean(),
    /** 検索結果 */
    items: z.array(itemSchema),
  });

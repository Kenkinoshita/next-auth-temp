import { z } from 'zod';

import { DEPARTMENT } from '@shared/consts/department';
import { toStrictKeys } from '@shared/utils/utilityFunction';

const [head, second, ...rest] = toStrictKeys(DEPARTMENT).map((v) => z.literal(v));

/**
 * 「帳票管理一覧」の所轄部署の入力値を検証する
 */
export const departmentSchema = z.union([head, second, ...rest]);

export type Department = z.output<typeof departmentSchema>;

/**
 * 更新成功時のレスポンス
 */
export const SUCCEEDED_RESPONSE = { succeeded: true } as const;

export type SucceededResponse = typeof SUCCEEDED_RESPONSE;

import { apiClient } from '@/service/apiClient';
import type { BackTokenPayload } from '@shared/schemas/backTokenPayload';

export const fetchSession = async () => {
  const { userName } = await apiClient.fetch<BackTokenPayload>('/auth/session', {});
  return { userName };
};

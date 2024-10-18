import { apiClient } from '@/service/apiClient';
import { stringifyCorporationSearchCondition } from '@shared/features/corporation/corporationSearchCondition';
import type { CorporationInput } from '@shared/schemas/corporation/corporation';
import type { CorporationCsvResult } from '@shared/schemas/corporation/corporationCsvResult';
import type { CorporationSearchConditionInput } from '@shared/schemas/corporation/corporationSearchCondition';
import type { CorporationSearchResult } from '@shared/schemas/corporation/corporationSearchResult';

export const fetchCorporations = async (input: CorporationSearchConditionInput) => {
  const searchParams = stringifyCorporationSearchCondition(input);
  const res = await apiClient.fetch<CorporationSearchResult>('/corporations', { searchParams });
  return res;
};

export const fetchCorporationDetail = async (cic: string) => {
  const res = await apiClient.fetch<CorporationInput>('/corporations/[cic]', { pathParams: { cic } });
  return res;
};

export const deleteCorporation = async (cic: string) => {
  await apiClient.delete('/corporations/[cic]', { pathParams: { cic } });
};

export const createCorporation = async (cic: string, input: CorporationInput) => {
  await apiClient.post<CorporationInput, unknown>('/corporations/[cic]', {
    pathParams: { cic },
    body: input,
  });
};

export const updateCorporation = async (cic: string, input: CorporationInput) => {
  await apiClient.put<CorporationInput, unknown>('/corporations/[cic]', {
    pathParams: { cic },
    body: input,
  });
};

export const downloadCorporationsCsv = async (input?: CorporationSearchConditionInput) => {
  const searchParams = input ? stringifyCorporationSearchCondition(input) : new URLSearchParams();
  const res = await apiClient.fetch<CorporationCsvResult>('/corporations/downloadCsv', { searchParams });
  return res;
};

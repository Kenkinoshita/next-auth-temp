/**
 * apiClient（認証）
 */
import axios from 'axios';

import { createFetchApiClient, createSendApiClient, createDeleteApiClient } from '@shared/service/apiClientV2';

const browser = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_FOR_BROWSER,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

const server = axios.create({
  baseURL: process.env.API_URL_FOR_SERVER_FOR_AUTH, //認証用ベースURL
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

const config = {
  browser,
  server,
};

export const apiClientForAuth = {
  fetch: createFetchApiClient(config),
  post: createSendApiClient('post', config),
  patch: createSendApiClient('patch', config),
  put: createSendApiClient('put', config),
  delete: createDeleteApiClient(config),
} as const;

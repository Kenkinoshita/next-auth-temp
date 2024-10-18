import type { AxiosInstance, AxiosRequestConfig } from 'axios';

import { getIsServer } from '@shared/service/getIsServer';

type ApiClientConfig = {
  /** browser <-> next.js server */
  browser: AxiosInstance;
  /** next.js server <-> API Gateway + Lambda */
  server: AxiosInstance;
};

type ApiClientParams = {
  searchParams?: URLSearchParams;
  pathParams?: Record<string, string>;
};

/**
 * パラメータに応じてURLを組み立てる
 * url="/greeting/[type]/[name]"、parameter="{name:'ono', type:'morning'}"の場合、
 * /greeting/morning/ono のようにURLを置換する。
 * searchParamsはurlの後ろに付ける。
 */
const makeRequestUrl = (url: string, { pathParams, searchParams }: ApiClientParams) => {
  const path = url.replace(/\[(\w+)\]/g, (_, key) => pathParams?.[key] ?? '');
  const stringParams = searchParams?.toString();
  return `${path}${stringParams ? `?${stringParams}` : ``}`;
};

/**
 * Method = GET用のAPIクライアントを作成する
 * @param url endpointとなるurl（baseUrlを除く）
 * @param instances 利用するそれぞれのaxiosのインスタンス
 * @returns browser/server両方で利用できる共通関数を返却する
 */
export const createFetchApiClient = ({ browser, server }: ApiClientConfig) => {
  return async <Response = unknown>(url: string, params: ApiClientParams, config?: AxiosRequestConfig<undefined>) => {
    const client = getIsServer() ? server : browser;
    return client.get<Response>(makeRequestUrl(url, params), config).then(({ data }) => data);
  };
};

/**
 * Method = POST、PATCH、PUT用のAPIクライアントを作成する
 * @param url endpointとなるurl（baseUrlを除く）
 * @param instances 利用するそれぞれのaxiosのインスタンス
 * @returns browser/server両方で利用できる共通関数を返却する
 */
export const createSendApiClient = (method: 'post' | 'put' | 'patch', { browser, server }: ApiClientConfig) => {
  return async <Request, Response>(
    url: string,
    params: ApiClientParams & {
      body?: Request;
    },
    config?: AxiosRequestConfig<Request>,
  ) => {
    const client = getIsServer() ? server : browser;
    const { body, ...rest } = params;
    return client[method]<Response>(makeRequestUrl(url, rest), body, config).then(({ data }) => data);
  };
};

/**
 * Method = DELETE用のAPIクライアントを作成する
 * @param url endpointとなるurl（baseUrlを除く）
 * @param instances 利用するそれぞれのaxiosのインスタンス
 * @returns browser/server両方で利用できる共通関数を返却する
 */
export const createDeleteApiClient = ({ browser, server }: ApiClientConfig) => {
  return async <Response = unknown>(url: string, params: ApiClientParams, config?: AxiosRequestConfig<undefined>) => {
    const client = getIsServer() ? server : browser;
    return client.delete<Response>(makeRequestUrl(url, params), config).then(({ data }) => data);
  };
};

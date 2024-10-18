import axios from 'axios';

/**
 * NOTICE: ts-jestがcommonjsでしか動作しないため、import.metaを直接参照するとテストが失敗する
 * そのため、mock化できるように別の関数に切り出して対応した
 * @returns {string} import.meta.env.BASE_URLの値を返却
 */
//FIXME: 環境変数どうするか検討する
const getApiBaseUrlForBrowser = () => process.env.NEXT_PUBLIC_API_URL_FOR_BROWSER; //import.meta.env.BASE_URL;

const clientForBrowser = axios.create({
  baseURL: getApiBaseUrlForBrowser(),
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

const getResponseForBrowser = <T = unknown>(url: string) => clientForBrowser.get<T>(url).then(({ data }) => data);

const getApiBaseUrlForServer = () => process.env.API_URL_FOR_SERVER; //import.meta.env.BASE_URL;

const clientForServer = axios.create({
  baseURL: getApiBaseUrlForServer(),
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

const getResponseForServer = <T = unknown>(url: string) => clientForServer.get<T>(url).then(({ data }) => data);

export const apiClient = {
  fetchForBrowser: getResponseForBrowser,
  fetchForServer: getResponseForServer,
} as const;

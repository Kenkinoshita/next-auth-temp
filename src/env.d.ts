declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV?: string;

        ENV: 'local' | 'dev' | 'stg' | 'prod';
        NEXT_PUBLIC_BASE_PATH: string;
        NEXT_PUBLIC_API_URL_FOR_BROWSER: string;
        NEXT_PUBLIC_USE_MOCK_DATA?: '1';

        API_URL_FOR_SERVER: string;
        API_URL_FOR_SERVER_FOR_AUTH: string;
        NEXTAUTH_URL: string;
        NEXTAUTH_COOKIE_SESSION_KEY_NAME: string;
        NEXTAUTH_COOKIE_SECURE?: 'true';
        NEXTAUTH_COOKIE_SAMESITE: string;
        CRYPTO_QUERY_PARAM_EXPIRE_SEC: string;
        SESSION_MAX_AGE_SEC: string;
        IGNORED_SESSION?: '1';

        // FIXME: SecretManegerから取得し、.localにファイルに移動する
        NEXTAUTH_SECRET: string;
        CRYPTO_SECRET_KEY: string;
      }
    }
  }
}

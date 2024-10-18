import path from 'node:path';

const USED_ENV = [
  'ENV',
  'NEXT_PUBLIC_API_URL_FOR_BROWSER',
  'API_URL_FOR_SERVER',
  'NEXT_PUBLIC_BASE_PATH',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_COOKIE_SESSION_KEY_NAME',
  'NEXTAUTH_COOKIE_SECURE',
  'NEXTAUTH_COOKIE_SAMESITE',
  'CRYPTO_SECRET_KEY',
  'CRYPTO_QUERY_PARAM_EXPIRE_SEC',
  'SESSION_MAX_AGE_SEC',
  'API_URL_FOR_SERVER_FOR_AUTH',
];
const env = USED_ENV.reduce((acc, key) => ({ ...acc, [key]: process.env?.[key] ?? '' }), {});

/**
 * next.config.mjs
 *
 * Next.jsアプリケーションの設定を行うためのものです。
 * プロジェクト全体の設定やカスタマイズを行うことができます。
 *
 * 主な設定項目:
 * 1. React Strict Mode:
 *    - Reactの厳密モードを有効にする設定です。これにより、潜在的な問題を特定しやすくなります。
 *
 * 2. Swc Minify:
 *    - SWCを使用してコードを圧縮する設定です。これにより、ビルド速度が向上し、パフォーマンスが向上します。
 *
 * 3. Page Extensions:
 *    - プロジェクトで使用するページファイルの拡張子を指定する設定です。これにより、特定の拡張子を持つファイルをページとして扱います。
 *
 * 使用例:
 * - この設定ファイルに設定を追加または変更することで、Next.jsアプリケーションの動作をカスタマイズできます。
 *
 * 注意:
 * - このファイルの変更を保存した後、サーバーを再起動する必要があります。
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  webpack: (config) => {
    // TODO: 後でtsconfigから設定できるようにする
    config.resolve.alias['@'] = path.join(process.cwd(), 'src');
    config.resolve.alias['@shared'] = path.join(process.cwd(), 'shared/src');

    return config;
  },
  reactStrictMode: true,
  // 全ての API routes にマッチ
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Authorization, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  env,
};

console.info(env);

export default nextConfig;

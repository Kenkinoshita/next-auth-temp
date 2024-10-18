/**
 * tailwind.config.ts
 *
 * Tailwind CSSの設定を行うためのものです。
 * プロジェクト全体のスタイルガイドラインやカスタマイズを定義することができます。
 *
 * 主な設定項目:
 *
 * 1. content:
 *    - Tailwind CSSがスキャンするコンテンツファイルを指定します。
 *    - これにより、使用されているクラスのみがビルド時に含まれます。
 *
 * 2. theme:
 *    - カスタムカラー、フォント、スペーシングなどを含むプロジェクト固有のデザインシステムを定義します。
 *    - これにより、プロジェクト全体で一貫したデザインを適用できます。
 *
 * 3. plugins:
 *    - Tailwind CSSのプラグインを追加して機能を拡張します。
 *    - 例: フォームスタイルのリセット、カスタムグリッドシステムなど
 *
 * 使用例:
 * - この設定ファイルにカスタム設定を追加することで、Tailwind CSSのデフォルト設定を上書きし、プロジェクトに適したスタイルを適用できます。
 *
 * 注意:
 * - このファイルの変更を保存した後、開発サーバーを再起動する必要があります。
 */
import type { Config } from 'tailwindcss';
import tailwindCSSAnimate from 'tailwindcss-animate';

// eslint-disable-next-line no-restricted-imports
import sharedConfig from './shared/tailwind.config';

const config = {
  presets: [sharedConfig],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './shared/src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  prefix: '',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [tailwindCSSAnimate],
} satisfies Config;

export default config;

import localFont from 'next/font/local';

export const notoSansCJK = localFont({
  variable: '--font-noto-sans',
  src: [
    {
      path: '../../public/fonts/NotoSansCJKjp-RegularSubset.woff',
      weight: 'normal',
    },
    {
      path: '../../public/fonts/NotoSansCJKjp-MediumSubset.woff',
      weight: 'bold',
    },
  ],
  display: 'swap',
  preload: true,
});

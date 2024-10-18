import type { Decorator, Preview } from '@storybook/react';
import React from 'react';
import '../src/styles/globals.css';
import { notoSansCJK } from '../src/styles/appFont';

const Root = ({ children }: { children: React.ReactNode }) => {
  return <div className={`${notoSansCJK.variable} font-body`}>{children}</div>;
};

export const rootDecorator: Decorator = (fn) => {
  return <Root>{fn()}</Root>;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [rootDecorator],
};

export default preview;

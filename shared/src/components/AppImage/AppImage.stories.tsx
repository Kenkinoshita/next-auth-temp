import type { Meta, StoryObj } from '@storybook/react';

import { AppImage as Component } from '@shared/components/AppImage/AppImage';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  className: 'object-cover',
  width: 114,
  height: 53,
  //FIXME: 後で対応する
  src: `/images/logo_pc.png`,
  alt: 'auじぶん銀行（ネット銀行） au x 三菱ＵＦＪ銀行',
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  component: Component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...DEFAULT_PROPS,
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Docs: Story = {
  args: {
    ...DEFAULT_PROPS,
  },
};

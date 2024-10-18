import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CustomDialog as Component } from '@shared/components/Dialog/CustomDialog/CustomDialog';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  id: 'custom',
  children: <div className="p-2.5">カスタムダイアログのサンプル</div>,
  title: 'カスタムダイアログ',
  onClose: doNothing,
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

export const WithoutTitle: Story = {
  args: {
    ...DEFAULT_PROPS,
    title: undefined,
    children: <div className="px-2.5 pb-2.5">カスタムダイアログ（タイトルなし）のサンプル</div>,
  },
};

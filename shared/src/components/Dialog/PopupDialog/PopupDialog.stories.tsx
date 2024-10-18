import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { PopupDialog as Component } from '@shared/components/Dialog/PopupDialog/PopupDialog';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  id: 'popup',
  children: <div className="pb-2.5 pl-2.5">ポップアップダイアログのサンプル</div>,
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

import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { WITH_LARGE_ITEM_PROPS } from '@shared/components/Pulldown/Pulldown.stories';
import { PulldownForm as Component } from '@shared/components/PulldownForm/PulldownForm';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  id: 'pulldown',
  name: 'pulldown',
  label: '借入期間',
  errorMessage: '',
  selectedId: '2',
  onBlur: doNothing,
  onChange: doNothing,
  items: [
    {
      id: '1',
      text: '10',
    },
    {
      id: '2',
      text: '20',
    },
    {
      id: '3',
      text: '30',
    },
  ],
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
    postfix: '年',
  },
};

export const WithLargeItem: Story = {
  args: {
    ...DEFAULT_PROPS,
    ...WITH_LARGE_ITEM_PROPS,
  },
};

export const Error: Story = {
  args: {
    ...DEFAULT_PROPS,
    errorMessage: '正しい値を選択してください',
  },
};

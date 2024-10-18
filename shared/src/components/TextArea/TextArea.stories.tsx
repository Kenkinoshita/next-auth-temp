import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { TextArea as Component } from '@shared/components/TextArea/TextArea';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  id: 'text-input',
  name: 'text-input',
  value: 'フリーメモ欄',
  onBlur: doNothing,
  onChange: doNothing,
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

export const Placeholder: Story = {
  args: {
    ...DEFAULT_PROPS,
    value: '',
    placeholder: 'フリーメモ欄のプレースホルダー',
  },
};

export const Error: Story = {
  args: {
    ...DEFAULT_PROPS,
    isInvalid: true,
  },
};

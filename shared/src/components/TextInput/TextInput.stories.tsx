import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { TextInput as Component } from '@shared/components/TextInput/TextInput';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  type: 'text',
  id: 'text-input',
  name: 'text-input',
  value: '999',
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

export const Error: Story = {
  args: {
    ...DEFAULT_PROPS,
    isInvalid: true,
  },
};

export const Placeholder: Story = {
  args: {
    ...DEFAULT_PROPS,
    value: '',
    placeholder: '500',
  },
};

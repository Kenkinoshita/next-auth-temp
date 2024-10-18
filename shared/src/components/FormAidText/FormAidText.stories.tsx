import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { FormAidText as Component } from '@shared/components/FormAidText/FormAidText';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  text: '必須',
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

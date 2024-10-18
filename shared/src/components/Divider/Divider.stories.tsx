import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { Divider as Component } from '@shared/components/Divider/Divider';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  className: '',
  style: 'solid',
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

export const Dashed: Story = {
  args: {
    ...DEFAULT_PROPS,
    style: 'dashed',
  },
};

export const Dotted: Story = {
  args: {
    ...DEFAULT_PROPS,
    style: 'dotted',
  },
};

export const Double: Story = {
  args: {
    ...DEFAULT_PROPS,
    style: 'double',
  },
};

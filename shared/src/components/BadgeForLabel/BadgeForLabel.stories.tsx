import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { BadgeForLabel as Component } from '@shared/components/BadgeForLabel/BadgeForLabel';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  color: 'attention',
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

export const Colors: Story = {
  render: () => {
    return (
      <div className="flex [&>*]:mr-1">
        <Component color="attention" text="必須" />
        <Component color="gray" text="任意" />
      </div>
    );
  },
};

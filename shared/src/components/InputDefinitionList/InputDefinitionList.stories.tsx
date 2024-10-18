import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { InputDefinitionList as Component } from '@shared/components/InputDefinitionList/InputDefinitionList';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  contents: [
    {
      label: 'CIC',
      text: '1234567890',
    },
    {
      label: '法人名',
      text: '株式会社サンプル',
    },
  ],
};

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

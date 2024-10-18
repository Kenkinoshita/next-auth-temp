import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { Pulldown as Component } from '@shared/components/Pulldown/Pulldown';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  id: 'pulldown',
  name: 'pulldown',
  selectedId: '2',
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
  },
};

export const WITH_LARGE_ITEM_PROPS = {
  selectedId: '1',
  items: [
    {
      id: '1',
      text: 'とても長い名前とても長い名前とても長い名前とても長い名前とても長い名前とても長い名前とても長い名前とても長い名前とても長い名前',
    },
    {
      id: '2',
      text: '短い名前',
    },
  ],
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
    isInvalid: true,
  },
};

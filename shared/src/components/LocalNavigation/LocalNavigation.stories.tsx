import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import type { LocalNavigationItem } from '@shared/components/LocalNavigation/LocalNavigation';
import { LocalNavigation as Component } from '@shared/components/LocalNavigation/LocalNavigation';

const items: LocalNavigationItem[] = [
  {
    label: '残高証明書発行_1',
    href: '/foo',
    isActive: true,
  },
  {
    label: '残高証明書発行_2',
    href: '/',
    isActive: false,
  },
  {
    label: '残高証明書発行_3',
    href: '/3',
    isActive: false,
  },
];

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  items,
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
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    ...DEFAULT_PROPS,
  },
};

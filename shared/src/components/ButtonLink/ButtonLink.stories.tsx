import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { ButtonLink as Component } from '@shared/components/ButtonLink/ButtonLink';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  className: '',
  href: '/',
  variant: 'outline',
  size: 'md',
  children: '現在の年収から借入可能額を調べる',
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

export const CorporateColor: Story = {
  args: {
    ...DEFAULT_PROPS,
    variant: 'corporate',
    href: { search: '?hoge=foo' },
  },
};

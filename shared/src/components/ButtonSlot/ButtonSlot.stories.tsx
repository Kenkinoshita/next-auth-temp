import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import type { ButtonSlotProps } from '@shared/components/ButtonSlot/ButtonSlot';
import { ButtonSlot as Component } from '@shared/components/ButtonSlot/ButtonSlot';

const DEFAULT_PROPS: ButtonSlotProps<'button'> = {
  className: '',
  variant: 'outline',
  size: 'md',
  children: <button>残高証明書発行</button>,
  as: 'button',
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  component: Component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...DEFAULT_PROPS,
  },
} satisfies Meta<(p: ButtonSlotProps<'button'>) => JSX.Element>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Docs: Story = {
  args: {
    ...DEFAULT_PROPS,
  },
};

export const GrayOutline: Story = {
  args: {
    ...DEFAULT_PROPS,
    variant: 'grayOutline',
  },
};

export const Corporate: Story = {
  args: {
    ...DEFAULT_PROPS,
    variant: 'corporate',
  },
};

export const Small: Story = {
  args: {
    ...DEFAULT_PROPS,
    size: 'sm',
  },
};

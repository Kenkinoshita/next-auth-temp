import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { RadioButton as Component } from '@shared/components/RadioButton/RadioButton';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  id: 'radio-button',
  name: 'rate-type',
  children: '元利均等返済',
  checked: true,
  value: '',
  disabled: false,
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
    id: 'radio-button-docs',
    name: 'radio-button-docs',
  },
};

export const CheckOff: Story = {
  args: {
    ...DEFAULT_PROPS,
    id: 'radio-button-off',
    name: 'radio-button-off',
    checked: false,
  },
};

export const DisabledOn: Story = {
  args: {
    ...DEFAULT_PROPS,
    id: 'radio-button-on-disabled',
    name: 'radio-button-on-disabled',
    checked: true,
    disabled: true,
  },
};

export const DisabledOff: Story = {
  args: {
    ...DEFAULT_PROPS,
    id: 'radio-button-off-disabled',
    name: 'radio-button-off-disabled',
    checked: false,
    disabled: true,
  },
};

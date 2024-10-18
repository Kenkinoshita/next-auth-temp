import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { Checkbox as Component } from '@shared/components/Checkbox/Checkbox';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  id: 'checkbox',
  name: 'plan-type',
  value: '',
  text: 'auモバイル優遇割',
  checked: true,
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
  },
};

export const CheckOff: Story = {
  args: {
    ...DEFAULT_PROPS,
    id: 'checkbox-off',
    name: 'checkbox-off',
    checked: false,
  },
};

export const DisabledCheckOn: Story = {
  args: {
    ...DEFAULT_PROPS,
    id: 'checkbox-disabled-on',
    name: 'checkbox-disabled-on',
    checked: true,
    disabled: true,
  },
};

export const DisabledCheckOFF: Story = {
  args: {
    ...DEFAULT_PROPS,
    id: 'checkbox-disabled-off',
    name: 'checkbox-disabled-off',
    checked: false,
    disabled: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { DummyInput } from '@shared/components/DummyInput/DummyInput';
import { Fieldset as Component } from '@shared/components/Fieldset/Fieldset';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  title: '借入金額',
  titlePrefix: 'required',
  children: (
    <div className="flex items-center ">
      <DummyInput text="Dummy Input" />
      <DummyInput text="Dummy Input" />
    </div>
  ),
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

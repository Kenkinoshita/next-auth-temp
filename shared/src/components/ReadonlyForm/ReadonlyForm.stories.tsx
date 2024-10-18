import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { FormAidText } from '@shared/components/FormAidText/FormAidText';
import { ReadonlyForm as Component } from '@shared/components/ReadonlyForm/ReadonlyForm';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  label: '借入総額',
  children: (
    <div className="flex items-center justify-end">
      <FormAidText text="5000" />
      <FormAidText className="ml-1" text="万円" />
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

export const Error: Story = {
  args: {
    ...DEFAULT_PROPS,
    errorMessage: '',
  },
};

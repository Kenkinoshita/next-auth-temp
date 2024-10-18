import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { DummyInput } from '@shared/components/DummyInput/DummyInput';
import { FormBase as Component } from '@shared/components/FormBase/FormBase';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  id: 'form-base',
  label: '借入金額',
  labelPrefix: 'optional',
  errorMessage: '',
  onClickQuestion: undefined,
  children: <DummyInput text="Dummy Input" />,
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
    id: 'form-base-error',
    errorMessage: '数値で入力してください',
    labelPrefix: 'required',
  },
};

export const WithQuestionLink: Story = {
  args: {
    ...DEFAULT_PROPS,
    onClickQuestion: doNothing,
  },
};

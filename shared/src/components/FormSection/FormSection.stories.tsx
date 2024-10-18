import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { Fragment } from 'react';

import { FormSection as Component } from '@shared/components/FormSection/FormSection';
import { RadioButtonForm } from '@shared/components/RadioButtonForm/RadioButtonForm';
import { YES_OR_NO_PROPS } from '@shared/components/RadioButtonForm/RadioButtonForm.stories';
import { TextAreaForm } from '@shared/components/TextAreaForm/TextAreaForm';
import { FREE_MEMO_PROPS } from '@shared/components/TextAreaForm/TextAreaForm.stories';
import { TextForm } from '@shared/components/TextForm/TextForm';
import { MEMO_PROPS } from '@shared/components/TextForm/TextForm.stories';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  title: '基本情報',
  children: (
    <Fragment>
      <TextForm {...MEMO_PROPS} />
      <RadioButtonForm {...YES_OR_NO_PROPS} />
      <TextAreaForm {...FREE_MEMO_PROPS} />
    </Fragment>
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

export const InsertedPadding: Story = {
  args: {
    title: '基本情報',
    className: 'p-10',
  },
  decorators: [(fn) => <div className="bg-white">{fn()}</div>],
};

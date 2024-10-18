import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { ErrorFeedbackMessage } from '@shared/components/ErrorFeedbackMessage/ErrorFeedbackMessage';
import { ErrorFeedbackSection as Component } from '@shared/components/ErrorFeedbackSection/ErrorFeedbackSection';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  title: 'エラーが発生しました',
  children: <ErrorFeedbackMessage message="橋本さんは風邪をひいていないと偽って出社しました。" />,
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

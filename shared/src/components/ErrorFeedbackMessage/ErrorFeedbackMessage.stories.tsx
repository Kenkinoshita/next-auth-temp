import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { ErrorFeedbackMessage as Component } from '@shared/components/ErrorFeedbackMessage/ErrorFeedbackMessage';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  message: '再度、お取引ください。ブラウザの「戻る」や「更新」を使用すると、お取引を継続できない場合があります。',
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

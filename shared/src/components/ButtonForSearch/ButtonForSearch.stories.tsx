import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { ButtonForSearch } from '@shared/components/ButtonForSearch/ButtonForSearch';

const DEFAULT_PROPS: React.ComponentProps<typeof ButtonForSearch> = {
  label: '検索',
  type: 'submit',
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  component: ButtonForSearch,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...DEFAULT_PROPS,
  },
} satisfies Meta<typeof ButtonForSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Docs: Story = {
  args: {
    ...DEFAULT_PROPS,
  },
};

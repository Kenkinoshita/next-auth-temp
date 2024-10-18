import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { FormSectionTitle as Component } from '@shared/components/FormSectionTitle/FormSectionTitle';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  title: '基本情報',
  className: 'py-10',
  size: 'h2',
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
export const DocsCorporate: Story = {
  args: {
    ...DEFAULT_PROPS,
  },
};

export const BasicInfo: Story = {
  args: {
    title: '基本情報',
    className: 'py-10',
    size: 'h2',
  },
};

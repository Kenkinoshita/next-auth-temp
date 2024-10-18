import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { Pagination as Component } from '@shared/components/Pagination/Pagination';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  maxPage: 7,
  currentPage: 1,
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

export const FirstPage: Story = {
  args: {
    ...DEFAULT_PROPS,
  },
};

export const SecondPage: Story = {
  args: {
    ...DEFAULT_PROPS,
    currentPage: 2,
  },
};

export const FifthPage: Story = {
  args: {
    ...DEFAULT_PROPS,
    currentPage: 5,
  },
};

export const LastPage: Story = {
  args: {
    ...DEFAULT_PROPS,
    currentPage: DEFAULT_PROPS.maxPage,
  },
};

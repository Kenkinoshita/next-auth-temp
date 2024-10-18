import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { ContentsPaper as Component } from '@shared/components/ContentsPaper/ContentsPaper';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  className: 'max-w-content-max p-2.5',
  children: (
    <section>
      <h2>Lorem ipsum dolor sit amet</h2>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </section>
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

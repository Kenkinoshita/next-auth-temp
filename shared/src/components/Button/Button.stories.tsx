import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button } from '@shared/components/Button/Button';

const DEFAULT_PROPS: React.ComponentProps<typeof Button> = {
  type: 'button',
  variant: 'corporate',
  size: 'md',
  children: 'Button',
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...DEFAULT_PROPS,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Docs: Story = {
  args: {
    ...DEFAULT_PROPS,
  },
};

export const Styles: Story = {
  render: () => {
    return (
      <div className="flex space-x-2">
        <Button {...DEFAULT_PROPS} variant="corporate">
          corporate
        </Button>
        <Button {...DEFAULT_PROPS} variant="outline">
          outline
        </Button>
        <Button {...DEFAULT_PROPS} variant="grayOutline">
          grayOutline
        </Button>
      </div>
    );
  },
};

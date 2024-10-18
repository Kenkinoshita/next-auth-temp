import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Backdrop as Component } from '@shared/components/Backdrop/Backdrop';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  className: 'bg-transparent',
  onClick: doNothing,
  children: 'backdrop',
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
  render: () => {
    // NOTE: Storyの中なので問題なし
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = useState(true);
    return !expanded ? (
      <button
        onClick={() => {
          setExpanded(true);
        }}
      >
        show
      </button>
    ) : (
      <Component
        onClick={() => {
          setExpanded(false);
        }}
      >
        <p className="text-3xl font-bold text-white">クリックして閉じる</p>
      </Component>
    );
  },
};

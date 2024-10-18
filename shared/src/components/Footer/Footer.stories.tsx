import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { Footer as Component } from '@shared/components/Footer/Footer';

const DEFAULT_PROPS: ComponentProps<typeof Component> = {};

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

export const WithChildren: Story = {
  args: {
    ...DEFAULT_PROPS,
    children: (
      <>
        <p>
          商号等：auじぶん銀行株式会社 / 登録金融機関：関東財務局長（登金）第652号 /
          加入協会：日本証券業協会、一般社団法人金融先物取引業協会
        </p>
        <p>金融機関コード（銀行コード）：0039</p>
      </>
    ),
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { Table as Component } from '@shared/components/Table/Table';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  data: [
    {
      no: 1,
      publishDate: '2024-01-01',
      ledgerName: '引落結果計算書',
      pdf: <div>ダウンロード</div>,
    },
    {
      no: 2,
      publishDate: '2024-01-05',
      ledgerName: '支払明細書',
      pdf: <div>ダウンロード</div>,
    },
  ],
  header: {
    no: { name: '#', order: 1 },
    publishDate: { name: '発行日', order: 2 },
    ledgerName: { name: '書類名', order: 3 },
    pdf: { name: '発行書類', order: 4 },
  },
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

export const NoData: Story = {
  args: {
    ...DEFAULT_PROPS,
    data: [],
  },
};

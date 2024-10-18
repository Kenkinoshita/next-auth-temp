import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@shared/components/Button/Button';
import { HeaderPC } from '@shared/components/Header/HeaderPC';
import { HeaderSP } from '@shared/components/Header/HeaderSP';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: React.ComponentProps<typeof HeaderPC> = {};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  component: HeaderPC,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...DEFAULT_PROPS,
  },
} satisfies Meta<typeof HeaderPC>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Docs: Story = {
  args: {
    ...DEFAULT_PROPS,
  },
};

export const Laptop: Story = {
  render: () => {
    return <HeaderPC {...DEFAULT_PROPS} />;
  },
};

export const LaptopWithChild: Story = {
  render: () => {
    return (
      <HeaderPC {...DEFAULT_PROPS}>
        <div className="flex items-center justify-end gap-x-4 overflow-hidden text-sm text-gray-dark">
          <dl className="overflow-hidden">
            <div className="flex items-center gap-x-2">
              <dt className="shrink-0">顧客番号:</dt>
              <dd className="mr-3">1234567890</dd>
              <dt className="sr-only">顧客名称:</dt>
              <dd className="flex items-center gap-x-1 overflow-hidden">
                <span className="truncate">検証用テスト口座</span>
                <span className="shrink-0">さま</span>
              </dd>
            </div>
            <div className="mt-2 flex items-center gap-x-2 overflow-hidden">
              <dt className="shrink-0">前回ログイン:</dt>
              <dd className="truncate">2024年09月05日 08時35分</dd>
            </div>
          </dl>
          <Button className="shrink-0 px-7 py-1 text-center" type="button" variant="grayOutline" onClick={doNothing}>
            ログアウト
          </Button>
        </div>
      </HeaderPC>
    );
  },
};

export const SmartPhone: Story = {
  render: () => {
    return <HeaderSP {...DEFAULT_PROPS} />;
  },
};

export const SmartPhoneWithChild: Story = {
  render: () => {
    return (
      <HeaderSP {...DEFAULT_PROPS}>
        <Button type="button" variant="grayOutline" size="sm" onClick={doNothing}>
          ログアウト
        </Button>
      </HeaderSP>
    );
  },
};

export const SmartPhoneWithMenu: Story = {
  render: () => {
    return (
      <HeaderSP {...DEFAULT_PROPS} onToggleMenu={doNothing}>
        <Button type="button" variant="grayOutline" size="sm" onClick={doNothing}>
          ログアウト
        </Button>
      </HeaderSP>
    );
  },
};

export const SmartPhoneMenuIsOpen: Story = {
  render: () => {
    return (
      <HeaderSP {...DEFAULT_PROPS} onToggleMenu={doNothing} isOpenMenu={true}>
        <Button type="button" variant="grayOutline" size="sm" onClick={doNothing}>
          ログアウト
        </Button>
      </HeaderSP>
    );
  },
};

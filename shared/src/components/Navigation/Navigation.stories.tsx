import type { Meta, StoryObj } from '@storybook/react';

import type { NavigationItem } from '@shared/components/Navigation/Navigation';
import { NavigationPC } from '@shared/components/Navigation/NavigationPC';
import { NavigationSP } from '@shared/components/Navigation/NavigationSP';
import { doNothing } from '@shared/utils/forLinter';

const FOR_PC_ITEMS: NavigationItem[] = [
  { label: 'TOP画面', href: '/capf' },
  {
    title: '証明書発行',
    items: [{ label: '残高証明書発行', href: '/capf/pdf/balancecertificate/' }],
  },
  { label: '各種お手続き', href: '/capf/flow' },
  { label: 'お問い合わせ', href: '/capf/question-form' },
  { label: 'パスワード変更', href: '/capf/change-password' },
];

const FOR_SP_ITEMS: NavigationItem[] = [
  {
    title: '証明書発行',
    items: [{ label: '残高証明書発行', href: '/capf/pdf/balancecertificate/' }],
  },
  { label: '各種お手続き', href: '/capf/flow' },
  { label: 'お問い合わせ', href: '/capf/question-form' },
  { label: 'パスワード変更', href: '/capf/change-password' },
  { label: 'よくあるご質問', href: 'https://example.com/qa' },
];

const DEFAULT_PROPS: React.ComponentProps<typeof NavigationSP> = {
  username: '検証用テスト口座',
  items: FOR_SP_ITEMS,
  onChangeExpanded: doNothing,
  expandedTitle: '',
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  component: NavigationSP,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...DEFAULT_PROPS,
  },
} satisfies Meta<typeof NavigationSP>;

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
    return <NavigationPC {...DEFAULT_PROPS} items={FOR_PC_ITEMS} />;
  },
};

export const LaptopExpanded: Story = {
  render: () => {
    return <NavigationPC {...DEFAULT_PROPS} expandedTitle="証明書発行" items={FOR_PC_ITEMS} />;
  },
};

export const SmartPhone: Story = {
  render: () => {
    return <NavigationSP {...DEFAULT_PROPS} />;
  },
};

export const SmartPhoneExpanded: Story = {
  render: () => {
    return <NavigationSP {...DEFAULT_PROPS} expandedTitle="証明書発行" />;
  },
};

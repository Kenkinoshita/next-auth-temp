import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { RadioButtonForm as Component } from '@shared/components/RadioButtonForm/RadioButtonForm';
import { doNothing } from '@shared/utils/forLinter';

const groupCreditLifeInsurancePlanItems = [
  { id: 'cancerHalf', text: 'がん50%保障団信/一般団信（年0%引上げ）' },
  { id: 'cancerFull', text: 'がん100%保障団信（年0.05%引上げ）' },
  { id: 'cancerPremium', text: 'がん100%保障団信プレミアム（年0.15%引上げ）' },
  { id: 'wide', text: 'ワイド団信（年0.03%引上げ）' },
];

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  title: '団体信用生命保険プランを選ぶ',
  titlePrefix: 'optional',
  idPrefix: 'radio-form',
  name: 'radio-form',
  selectedId: groupCreditLifeInsurancePlanItems[0].id,
  items: groupCreditLifeInsurancePlanItems,
  errorMessage: '',
  onBlur: doNothing,
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
    idPrefix: 'radio-form-docs',
  },
};

export const YES_OR_NO_PROPS = {
  title: '有り/無し',
  name: 'pppppp',
  idPrefix: 'aaaa',
  onBlur: doNothing,
  onChange: doNothing,
  errorMessage: '',
  items: [
    { id: '0', text: 'なし' },
    { id: '1', text: 'あり' },
  ],
};
export const YesOrNo: Story = {
  args: YES_OR_NO_PROPS,
};

export const Error: Story = {
  args: {
    ...DEFAULT_PROPS,
    idPrefix: 'radio-form-error',
    errorMessage: '選択してください',
    titlePrefix: 'required',
    selectedId: '',
  },
};

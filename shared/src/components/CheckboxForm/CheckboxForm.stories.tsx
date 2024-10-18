import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { CheckboxForm as Component } from '@shared/components/CheckboxForm/CheckboxForm';
import { MONTH_ITEMS } from '@shared/consts/month';
import { doNothing } from '@shared/utils/forLinter';

const items = MONTH_ITEMS.slice(0, 4);

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  title: '実行する月',
  titlePrefix: 'optional',
  idPrefix: 'checkbox-form',
  name: 'checkbox-form',
  selectedIds: [items[0].id],
  items,
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
  },
};

export const DirectionRow: Story = {
  args: {
    ...DEFAULT_PROPS,
    direction: 'row',
    idPrefix: 'checkbox-form-direction-row',
    items: MONTH_ITEMS,
    selectedIds: [items[0].id],
  },
};

export const Error: Story = {
  args: {
    ...DEFAULT_PROPS,
    idPrefix: 'checkbox-form-error',
    errorMessage: '選択してください',
    titlePrefix: 'required',
    selectedIds: [],
  },
};

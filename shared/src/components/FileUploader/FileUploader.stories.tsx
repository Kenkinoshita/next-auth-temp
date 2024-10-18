import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { ButtonSlot } from '@shared/components/ButtonSlot/ButtonSlot';
import { FileUploader as Component } from '@shared/components/FileUploader/FileUploader';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: ComponentProps<typeof Component> = {
  id: 'file-uploader',
  name: 'file-uploader',
  onChange: doNothing,
  children: <div> アップロードする</div>,
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
export const FileUpload: Story = {
  render: () => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget?.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result !== 'string') return;
        console.log(result);
      };

      reader.readAsText(file);
    };

    return (
      <Component {...DEFAULT_PROPS} onChange={onChange}>
        {DEFAULT_PROPS.children}
      </Component>
    );
  },
};

//FIXME: acceptがstoryBook環境だと機能しないので、後で対応する
export const PDFUpload: Story = {
  render: () => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget?.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result !== 'string') return;
        console.log(result);
      };

      reader.readAsText(file);
    };

    return (
      <Component {...DEFAULT_PROPS} onChange={onChange} accept=".pdf">
        <ButtonSlot as="div" variant="grayOutline" size="md" className="w-64">
          <div>PDFアップロードする</div>
        </ButtonSlot>
      </Component>
    );
  },
};

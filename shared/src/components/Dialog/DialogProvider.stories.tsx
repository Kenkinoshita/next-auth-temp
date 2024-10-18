import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button } from '@shared/components/Button/Button';
import { CustomDialog } from '@shared/components/Dialog/CustomDialog/CustomDialog';
import { DialogProvider as Component } from '@shared/components/Dialog/DialogProvider';
import { useDialog } from '@shared/hooks/useDialog';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  component: Component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: 'DialogProvider',
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

function DialogContent({ className, children = null }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="mb-3 text-xl">叩かれて伸びるタイプです</p>
      {children}
    </div>
  );
}

function PlayGround({ children = null }: { children?: React.ReactNode }) {
  const { showPopupDialog, showCustomDialog } = useDialog();

  return (
    <div className="flex flex-wrap space-x-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          void showPopupDialog({
            content: <DialogContent className="py-2 pl-2 pr-4">{children}</DialogContent>,
          });
        }}
      >
        ポップアップ
      </Button>
      <Button
        type="button"
        variant="corporate"
        onClick={() => {
          void showCustomDialog((resolve) => (
            <CustomDialog id="custom" title="カスタムダイアログ" onClose={() => resolve('close')} className="bg-white">
              <DialogContent className="p-2">{children}</DialogContent>,
            </CustomDialog>
          ));
        }}
      >
        カスタム
      </Button>
    </div>
  );
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Docs: Story = {
  render: () => {
    return (
      <Component>
        <PlayGround>
          <PlayGround />
        </PlayGround>
      </Component>
    );
  },
};

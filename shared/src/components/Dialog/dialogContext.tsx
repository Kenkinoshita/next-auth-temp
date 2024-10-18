import { createContext } from 'react';

import { doNothing } from '@shared/utils/forLinter';

type PopupDialogAction = {
  type: 'popup';
};

type DialogParameter = {
  title?: string;
  content: React.ReactNode;
};
type WithDialogParameter<T extends { type: string }> = T & DialogParameter & { onClose: () => void };

export type Dialog =
  | WithDialogParameter<PopupDialogAction>
  | {
      type: 'custom';
      dialog: JSX.Element;
      onClose: () => void;
    };

export type IDialogContext = {
  showPopupDialog: (v: DialogParameter) => Promise<'close'>;
  showCustomDialog: <T extends string>(
    render: (resolver: (v: T | 'close') => void) => JSX.Element,
  ) => Promise<T | 'close'>;
  hideDialog: (id: string) => void;
  hideAllDialog: () => void;
};
export const dialogContext = createContext<IDialogContext>({
  showPopupDialog: () => Promise.resolve('close'),
  showCustomDialog: <T,>() => Promise.resolve('close' as unknown as T),
  hideDialog: doNothing,
  hideAllDialog: doNothing,
});

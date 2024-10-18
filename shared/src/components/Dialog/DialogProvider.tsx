'use client';
import { nanoid } from 'nanoid';
import { useEffect, useMemo, useReducer } from 'react';

import { Backdrop } from '@shared/components/Backdrop/Backdrop';
import { PopupDialog } from '@shared/components/Dialog/PopupDialog/PopupDialog';
import { dialogContext } from '@shared/components/Dialog/dialogContext';
import type { Dialog, IDialogContext } from '@shared/components/Dialog/dialogContext';

type DialogState = (Dialog & {
  id: string;
})[];

type DialogAction =
  | {
      type: 'add';
      payload: DialogState[number];
    }
  | {
      type: 'remove';
      payload: { id: string };
    }
  | {
      type: 'removeAll';
    };

const dialogReducer = (state: DialogState, action: DialogAction): DialogState => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      return state.filter(({ id }) => id !== action.payload.id);
    case 'removeAll':
      return [];
    default:
      return state;
  }
};

function DialogContainer({ state }: { state: DialogState }) {
  if (state.length < 1) {
    return null;
  }

  return (
    <>
      {state.map(({ id, ...rest }, index) => {
        const isHead = index === 0;
        switch (rest.type) {
          case 'popup':
            return (
              <Backdrop key={id} className={!isHead ? 'bg-transparent' : 'bg-black/50'} onClick={rest.onClose}>
                <PopupDialog id={`popup-${id}`} title={rest.title} onClose={rest.onClose}>
                  {rest.content}
                </PopupDialog>
              </Backdrop>
            );
          case 'custom':
            return (
              <Backdrop key={id} className={!isHead ? 'bg-transparent' : 'bg-black/50'} onClick={rest.onClose}>
                {rest.dialog}
              </Backdrop>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

/**
 * inert属性を設定したdivで囲むコンポーネント
 * @see https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/inert
 * @see https://github.com/facebook/react/issues/17157#issuecomment-1572230721
 * @see https://dx-dev.jbk-ops.jp/rd/issues/15943
 * @see https://dx-dev.jbk-ops.jp/rd/issues/21917
 */
function InertContainer({
  className,
  inert,
  children,
}: {
  className?: string;
  inert: boolean;
  children: React.ReactNode;
}) {
  return (
    //NOTE: Reactではinert属性をサポートしていないため、このような表記をしている。（参考：https://stackoverflow.com/questions/72720469/error-when-using-inert-attribute-with-typescript）
    //FIXME: 正しい実装がわからないので、いったんignoreする
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <div className={className} {...{ inert: inert ? '' : undefined }}>
      {children}
    </div>
  );
}

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dialogReducer, []);

  useEffect(() => {
    if (state.length) {
      // dialogを表示するとき、本体ページのスクロールを固定化する
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.height = '';
    }
  }, [state.length]);

  const value = useMemo(() => {
    const hideDialog: IDialogContext['hideDialog'] = (id) => {
      dispatch({ type: 'remove', payload: { id } });
    };
    const hideAllDialog: IDialogContext['hideAllDialog'] = () => {
      dispatch({ type: 'removeAll' });
    };
    const showPopupDialog: IDialogContext['showPopupDialog'] = (params) =>
      new Promise((resolve) => {
        const id = nanoid();
        dispatch({
          type: 'add',
          payload: {
            ...params,
            type: 'popup',
            id,
            onClose: () => {
              hideDialog(id);
              resolve('close');
            },
          },
        });
      });

    const showCustomDialog = <T extends string>(render: (resolver: (v: T | 'close') => void) => JSX.Element) =>
      new Promise<T | 'close'>((resolve) => {
        const id = nanoid();
        dispatch({
          type: 'add',
          payload: {
            type: 'custom',
            id,
            dialog: render((v) => {
              hideDialog(id);
              resolve(v);
            }),
            onClose: () => {
              hideDialog(id);
              resolve('close');
            },
          },
        });
      });
    return {
      hideDialog,
      hideAllDialog,
      showPopupDialog,
      showCustomDialog,
    };
  }, []);

  return (
    <dialogContext.Provider value={value}>
      <InertContainer inert={!!state.length}>{children}</InertContainer>
      <DialogContainer state={state} />
    </dialogContext.Provider>
  );
}

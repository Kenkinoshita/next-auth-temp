'use client';

import { type ReactNode } from 'react';

import { NavigateLoginPageButton } from '@/components/NavigateLoginPageButton/NavigateLoginPageButton';
import { MessagePageTemplate } from '@/templates/MessagePageTemplate';
import { ErrorBoundary } from '@shared/ErrorBoundary';
import { ErrorFeedbackMessage } from '@shared/components/ErrorFeedbackMessage/ErrorFeedbackMessage';
import { ErrorFeedbackSection } from '@shared/components/ErrorFeedbackSection/ErrorFeedbackSection';

/**
 * エラーログ
 */
const onError = (e: Error, info: React.ErrorInfo) => {
  // TODO: 本番環境の場合、表示しないようにする
  console.error(e, info);
};

// FIXME: (仮)適切なメッセージに置き換えてください
const ERROR_DEFAULT_MESSAGE =
  '再度、お取引ください。ブラウザの「戻る」や「更新」を使用すると、お取引を継続できない場合があります。';

/**
 * エラー画面
 */
const fallbackError = (e: Error) => {
  console.log(e.message);
  // FIXME: エラーに応じてコンテンツの表示を切り替える

  return (
    <MessagePageTemplate>
      <div className="max-w-content-max pt-5 content-max:mx-auto">
        <ErrorFeedbackSection className="px-6" title="エラー">
          <ErrorFeedbackMessage message={ERROR_DEFAULT_MESSAGE} />
        </ErrorFeedbackSection>
        <div className="mt-10 flex justify-center px-6">
          <NavigateLoginPageButton />
        </div>
      </div>
    </MessagePageTemplate>
  );
};

type Props = {
  children: ReactNode;
};

export function AppErrorBoundary({ children }: Props) {
  return (
    <ErrorBoundary onError={onError} fallback={fallbackError}>
      {children}
    </ErrorBoundary>
  );
}

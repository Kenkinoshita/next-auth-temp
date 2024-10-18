import type { Metadata } from 'next';

import { NavigateLoginPageButton } from '@/components/NavigateLoginPageButton/NavigateLoginPageButton';
import { MessagePageTemplate } from '@/templates/MessagePageTemplate';
import { ErrorFeedbackMessage } from '@shared/components/ErrorFeedbackMessage/ErrorFeedbackMessage';
import { ErrorFeedbackSection } from '@shared/components/ErrorFeedbackSection/ErrorFeedbackSection';

export const metadata: Metadata = {
  title: 'ページが見つかりません',
};

function NotFoundPage() {
  return (
    <MessagePageTemplate>
      <div className="max-w-content-max pt-5 content-max:mx-auto">
        <ErrorFeedbackSection className="px-6" title="エラー">
          {/* FIXME: メッセージは仮なのであとで修正する */}
          <ErrorFeedbackMessage message="ページが見つかりません" />
        </ErrorFeedbackSection>
        <div className="mt-10 flex justify-center px-6">
          <NavigateLoginPageButton />
        </div>
      </div>
    </MessagePageTemplate>
  );
}

export default NotFoundPage;

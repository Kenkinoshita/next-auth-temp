import type { Metadata } from 'next';

import { PAGE_TITLE_NAMES } from '@/app/consts/pageTitleNames';
import { MessagePageTemplate } from '@/templates/MessagePageTemplate';
import { ContentsPaper } from '@shared/components/ContentsPaper/ContentsPaper';
import { Heading } from '@shared/components/Heading/Heading';

export const metadata: Metadata = {
  title: PAGE_TITLE_NAMES.LOGOUT,
};

function LogoutPage() {
  return (
    <MessagePageTemplate>
      <section className="max-w-content-max px-6 pt-5 content-max:mx-auto">
        <Heading className="mb-6 text-2xl font-bold text-gray-dark" as="h2">
          {PAGE_TITLE_NAMES.LOGOUT}
        </Heading>
        <ContentsPaper className="p-2.5">
          <p className="text-base font-bold text-gray-dark">ご利用ありがとうございました。</p>
        </ContentsPaper>
      </section>
    </MessagePageTemplate>
  );
}

export default LogoutPage;

import type { Metadata } from 'next';

import { PAGE_TITLE_NAMES } from '@/app/consts/pageTitleNames';
import { PageTemplate } from '@/templates/PageTemplate';
import { ButtonLink } from '@shared/components/ButtonLink/ButtonLink';
import { ContentsPaper } from '@shared/components/ContentsPaper/ContentsPaper';
import { Divider } from '@shared/components/Divider/Divider';
import { PageTitle } from '@shared/components/PageTitle/PageTitle';
import { TitleBar } from '@shared/components/TitleBar/TitleBar';

export const metadata: Metadata = {
  title: PAGE_TITLE_NAMES.TOP,
};

function TopPage() {
  return (
    <PageTemplate>
      <PageTitle className="mb-6 mt-10" title={PAGE_TITLE_NAMES.TOP} as="h2" />
      <ContentsPaper className="mx-2.5 mb-12 max-w-content-max px-8 py-4 text-gray-dark content-max:mx-auto">
        <section>
          <TitleBar className="my-6" title="法人一覧登録" as="h3" />
          <p>法人情報の登録を行います。</p>
          <div className="mb-8 mt-6 flex justify-center">
            <ButtonLink className="w-80 rounded-lg" variant="corporate" href="/corporations" size="md">
              法人一覧登録
            </ButtonLink>
          </div>
        </section>
        <Divider />
        <section>
          <TitleBar className="my-6 mt-8" title="帳票マスタ登録" as="h3" />
          <p>自動生成される帳票毎に個別の設定を行います。</p>
          <div className="mb-8 mt-6 flex justify-center">
            <ButtonLink className="w-80 rounded-lg" variant="corporate" href="/ledgerMaster" size="md">
              帳票マスタ登録
            </ButtonLink>
          </div>
        </section>
        <Divider />
        <section>
          <TitleBar className="mb-6 mt-8" title="帳票管理" as="h3" />
          <p>生成された帳票の確認を行います。</p>
          <p>必要に応じ、帳票の取下げや手動で作成した帳票の登録を行うことができます。</p>
          <div className="mb-8 mt-6 flex justify-center">
            <ButtonLink className="w-80 rounded-lg" variant="corporate" href="/ledgersManagement" size="md">
              帳票管理
            </ButtonLink>
          </div>
        </section>
      </ContentsPaper>
    </PageTemplate>
  );
}

export default TopPage;

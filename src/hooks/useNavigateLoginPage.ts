import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useNavigateLoginPage = () => {
  const router = useRouter();

  const onClickNavigateLoginPage = useCallback(() => {
    // バックのSTG, PRODはサブドメインが主系(ccob-1a.*), 副系(ccob-1c.*), DNP拠点(ccob.*)
    // 別々のためwindow.location.originを使用している
    const origin = window.location.origin;
    router.push(`${origin}/ccob`);
  }, [router]);

  return { onClickNavigateLoginPage };
};

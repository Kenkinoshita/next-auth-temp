import { useRecoilState, useResetRecoilState } from 'recoil';

import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { fetchSession } from '@/service/fetchSession';
import { userStore } from '@/store/user';
import { doNothing } from '@shared/utils/forLinter';

/**
 * sessionから取得したユーザー情報を返却する
 * @returns ユーザー情報
 */
export const useUserBySession = () => {
  const [user, setUser] = useRecoilState(userStore);
  const resetUser = useResetRecoilState(userStore);

  useIsomorphicLayoutEffect(() => {
    // 初回のrenderingで1回だけ呼び出す
    fetchSession().then(setUser).catch(doNothing);
  }, [setUser]);

  return { user, resetUser };
};

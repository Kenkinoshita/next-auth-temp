import { atom } from 'recoil';

import { RECOIL_STORE_KEY } from '@/store/storeKey';

type UserStore = {
  userName: string;
};

export const userStore = atom<UserStore>({
  key: RECOIL_STORE_KEY.user,
  default: { userName: '' },
});

import { useEffect, useLayoutEffect } from 'react';

import { getIsServer } from '@shared/service/getIsServer';

/**
 * SSRでない場合はuseLayoutEffect、SSRの場合はuseEffectを返却する
 * @see https://zenn.dev/stin/scraps/ec71e0bfde8973
 * @see https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
 */
export const useIsomorphicLayoutEffect = getIsServer() ? useEffect : useLayoutEffect;

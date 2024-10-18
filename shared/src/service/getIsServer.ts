export const getIsServer = () => {
  const isServer = typeof window === 'undefined';
  return isServer;
};

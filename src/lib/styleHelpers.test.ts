import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { cn } from '@/lib/styleHelpers';

vitest.mock('clsx');
vitest.mock('tailwind-merge');

describe('cn', () => {
  const clsxMock = vitest.mocked(clsx);
  const twMergeMock = vitest.mocked(twMerge);

  afterEach(() => {
    clsxMock.mockClear();
    twMergeMock.mockClear();
  });

  it('claxに引数が渡されること', () => {
    const inputs = ['bg-red', 'text-white'];
    cn(...inputs);
    expect(clsxMock).toBeCalledWith(inputs);
  });
});

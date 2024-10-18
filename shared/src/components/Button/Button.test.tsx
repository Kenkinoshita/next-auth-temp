// @vitest-environment jsdom
// MEMO: テストコードが正しく機能するかを確認するためなので、必要なテストケースではない
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Button } from '@shared/components/Button/Button';

describe('Button.tsx', () => {
  it('render Button', () => {
    render(
      <Button type="button" variant="corporate">
        sample
      </Button>,
    );
    expect(screen.getByText('sample')).toBeInTheDocument();
  });
});

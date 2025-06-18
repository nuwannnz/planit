import { expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import { AuthPageLayout } from './AuthPageLayout';
import { renderComponent } from '@/shared/utils/tests/render';

test('AuthPageLayout', () => {
  renderComponent(<AuthPageLayout title="Create new account" />);
  expect(
    screen.getByRole('heading', { level: 2, name: 'Create new account' })
  ).toBeDefined();
});

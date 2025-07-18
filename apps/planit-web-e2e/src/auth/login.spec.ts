import { test, expect } from '@playwright/test';

test('has login form', async ({ page }) => {
  await page.goto('/auth/login');

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain(
    'Login to your account'
  );
  expect(page.locator('input[name=email]')).toBeDefined();
  expect(page.locator('input[name=password]')).toBeDefined();
  await expect(page.locator('button[type=submit]')).toContainText('Login');
});

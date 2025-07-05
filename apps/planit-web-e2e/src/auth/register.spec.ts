import { test, expect } from '@playwright/test';

test('has register form', async ({ page }) => {
  await page.goto('/auth/register');

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Create an account');
  expect(page.locator('input[name=name]')).toBeDefined();
  expect(page.locator('input[name=email]')).toBeDefined();
  expect(page.locator('input[name=password]')).toBeDefined();
  await expect(page.locator('button[type=submit]')).toContainText('Sign up');
});

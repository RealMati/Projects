import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/admin/signup');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('admin@email.com');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('admin123');
  await page.getByPlaceholder('Confirm Password').click();
  await page.getByPlaceholder('Confirm Password').fill('admin123');
  await page.getByRole('button', { name: 'Sign Up' }).click();

});


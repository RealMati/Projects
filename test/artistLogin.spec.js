import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('artist1@music.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('artist1');
  await page.getByRole('button', { name: 'Login' }).click();
});
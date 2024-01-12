import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signup');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('artist1');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('artist1@music.com');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('artist1');
  await page.getByPlaceholder('Confirm Password').click();
  await page.getByPlaceholder('Confirm Password').fill('artist1');
  await page.getByRole('button', { name: 'Sign Up' }).click();
});
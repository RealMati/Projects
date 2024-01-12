import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('artist1@music.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('artist1');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('img', { name: 'The album', exact: true }).first().click();
  await page.locator('#editIcon').getByText('Edit Album').click();
  await page.locator('input[name="title"]').click();
  await page.locator('input[name="title"]').fill('');
  await page.locator('textarea[name="description"]').click();
  await page.locator('textarea[name="description"]').fill(' the best album');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Save' }).click();
});
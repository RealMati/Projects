import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/admin/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('admin@email.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('.w-8').first().click();
  await page.getByRole('textbox', { name: 'New Password' }).click();
  await page.getByRole('textbox', { name: 'New Password' }).fill('artist123');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByRole('main').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  
  await page.locator('#contentContainer img').nth(1).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#contentContainer img').nth(3).click();
  
});
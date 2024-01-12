import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('artist1@music.com');
  await page.getByPlaceholder('Password').fill('a');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('artist1');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(3000)
  await page.goto('http://localhost:3000/albums/manage');
  await page.waitForTimeout(1000)
  await page.getByRole('link', { name: 'Add Music' }).click();
  await page.getByRole('combobox').selectOption('Album');
  await page.getByText('Name').click();
  await page.getByText('Name').click();
  await page.locator('#albumNameEl').click();
  await page.locator('#albumNameEl').fill('The album');
  await page.locator('form div').filter({ hasText: 'Genre' }).click();
  await page.locator('#albumGenreEl').fill('pop');
  await page.locator('textarea[name="description"]').click();
  await page.locator('textarea[name="description"]').fill('a good album');
  await page.locator('input[name="albumArt"]').click();
  await page.locator('input[name="albumArt"]').setInputFiles('test/upload/albumPlaceholder.png');
  await page.waitForTimeout(2000)
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Add' }).click();
  await page.waitForTimeout(2000)
  await page.getByRole('heading', { name: 'The album' }).first().click();
  await page.goto('http://localhost:3000/albums/info/65a197a101978a368401bd29');
  await page.waitForTimeout(1000)
  await page.getByText('Add Song', { exact: true }).click();
  await page.locator('#songNameEl').click();
  await page.locator('#songNameEl').fill('wonderful riff');
  await page.locator('#fileEl').click();
  await page.waitForTimeout(1000)
  await page.locator('#fileEl').setInputFiles('test/upload/guitar_riff.mp3');
  await page.waitForTimeout(2000)
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Add' }).click();
  
});
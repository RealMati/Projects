const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
      headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    const absolutePath = path.resolve(__dirname, '../views/adminSignup.hbs');
    await page.goto(`file://${absolutePath}`);

    await page.getByPlaceholder('Name').click();
    await page.getByPlaceholder('Name').fill('admin');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('admin@email.com');
    await page.getByPlaceholder('Password', { exact: true }).click();
    await page.getByPlaceholder('Password', { exact: true }).fill('admin');
    await page.getByPlaceholder('Confirm Password').click();
    await page.getByPlaceholder('Confirm Password').fill('admin');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    // ---------------------
    await context.close();
    await browser.close();
})();
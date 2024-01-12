const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
  
    const absolutePath = path.resolve(__dirname, '../views/adminLogin.hbs');
    await page.goto(`file://${absolutePath}`);

    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('admin');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();

    // ---------------------
    await context.close();
    await browser.close();
})();
import { test, expect, chromium } from '@playwright/test';

// Test suite
test.describe('My Playwright Tests', () => {
  let browser;

  // Test setup: launch browser before each test
  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  // Test teardown: close browser after each test
  test.afterAll(async () => {
    await browser.close();
  });

  // Test case
  test('Should access the server and get a response', async ({ request }) => {
    // Navigate to the server endpoint
    const response = await request.post('http://localhost:3000/auth/signup',{
        data: {
            "name":"artist1",
            "email":"artist1@music.com",
            "password":"artist1"   
        }
    });
    // Log the response body
    console.log('Response body:', await response.text());
    expect(response).toBeOK
  });
});

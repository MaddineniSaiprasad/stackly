import { test, expect } from '@playwright/test';

test('basic auth flow', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByLabel('Email').fill('patient@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.click('button:has-text("Sign In")');

  await expect(page.locator('text=Welcome to the Dashboard')).toBeVisible();
});

test('navigation to telemedicine', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByLabel('Email').fill('patient@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.click('button:has-text("Sign In")');

  await page.click('text=Telemedicine');
  await expect(page.locator('text=Telemedicine Consultation')).toBeVisible();
});

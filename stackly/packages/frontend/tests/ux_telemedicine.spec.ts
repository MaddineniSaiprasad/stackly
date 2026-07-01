import { test, expect } from '@playwright/test';

test('Telemedicine page should have accessible controls', async ({ page }) => {
  // Bypass login if possible or navigate to Telemedicine
  // For this verification, we'll just check if the page can be rendered and has the elements
  // Assuming the dev server is running and we can access the page

  await page.goto('http://localhost:3000/telemedicine');

  // Click "Start Virtual Session" to see the controls
  const startButton = page.getByRole('button', { name: /Start Virtual Session/i });
  if (await startButton.isVisible()) {
    await startButton.click();
  }

  // Check for Microphone button with aria-label
  const micButton = page.getByRole('button', { name: /microphone/i });
  await expect(micButton).toBeVisible();
  const micAriaLabel = await micButton.getAttribute('aria-label');
  expect(['Mute microphone', 'Unmute microphone']).toContain(micAriaLabel);

  // Check for Camera button with aria-label
  const camButton = page.getByRole('button', { name: /camera/i });
  await expect(camButton).toBeVisible();
  const camAriaLabel = await camButton.getAttribute('aria-label');
  expect(['Turn off camera', 'Turn on camera']).toContain(camAriaLabel);

  // Check for End Session button
  const endButton = page.getByRole('button', { name: /End Session/i });
  await expect(endButton).toBeVisible();
});

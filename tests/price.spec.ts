import { test, expect } from "@playwright/test";

test.describe("Gift Wrapping Calculator", () => {
  test("EP-1: SANTA promo code should give $10 discount, not negative price", async ({
    page,
  }) => {
    // Navigate to the gift wrapping calculator page
    await page.goto("/");

    // Select Medium gift size ($25) - it's already selected by default but let's be explicit
    await page.locator("#size-medium").check();

    // Clear and fill the promo code
    await page.locator("#promoCode").clear();
    await page.locator("#promoCode").fill("SANTA");

    // Click the calculate button
    await page.locator("#calculateBtn").click();

    // Wait for the result to appear
    await expect(page.locator("#result")).toBeVisible();

    // THE CRITICAL ASSERTION:
    // Final price must be POSITIVE $15, not negative!
    // Medium ($25) - SANTA discount ($10) = $15
    // We charge customers for wrapping, we don't pay them.
    await expect(page.locator("#priceAmount")).toHaveText("$15");
  });
});

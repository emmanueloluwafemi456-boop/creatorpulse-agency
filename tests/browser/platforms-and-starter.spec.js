import { test, expect } from "@playwright/test";
test("platform marks load with accurate context and no endorsement claim", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".platform-badges li")).toHaveCount(4);
  expect(
    await page.locator(".platform-badges strong").allTextContents(),
  ).toEqual(["Twitch", "Google Ads", "Google Analytics", "YouTube"]);
  for (const image of await page.locator(".platform-badges img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((i) => i.complete && i.naturalWidth > 0))
      .toBe(true);
  }
  await expect(page.locator(".platform-independence")).toContainText(
    "do not indicate certification, partnership, or endorsement",
  );
  await page
    .locator(".platform-strip")
    .screenshot({ path: "test-results/platform-strip-desktop.png" });
});
test("FAQ inquiry starter copies a useful message and announces it", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.__inquiryTemplate = text;
        },
      },
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Copy a message template" }).click();
  await expect(
    page.getByRole("button", { name: "Message template copied" }),
  ).toBeVisible();
  const text = await page.evaluate(() => window.__inquiryTemplate);
  expect(text).toContain("My Twitch channel link:");
  expect(text).toContain("What I’d like to improve:");
  await expect(page.locator(".inquiry-copy-feedback")).toContainText(
    "Paste it into WhatsApp",
  );
});
test("clipboard fallback and new panels work on mobile", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("Not available");
        },
      },
    });
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Copy a message template" }).click();
  await expect(page.getByLabel("Message template to copy")).toHaveValue(
    /My Twitch channel link/,
  );
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      `overflow at ${width}`,
    ).toBe(false);
  }
  await page
    .locator(".inquiry-starter")
    .screenshot({ path: "test-results/faq-inquiry-starter-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .locator(".inquiry-starter")
    .screenshot({ path: "test-results/faq-inquiry-starter-mobile.png" });
});
test("service illustrations explicitly disclose sample scores and metrics", async ({
  page,
}) => {
  await page.goto("/#services");
  await expect(page.locator(".scene-sample-label")).toHaveCount(6);
  await expect(page.locator(".scene-sample-label").first()).toContainText(
    "not an official Twitch rating",
  );
  await expect(page.locator(".scene-sample-label").nth(4)).toContainText(
    "not client results",
  );
  await expect(page.locator(".scene-sample-label").nth(5)).toContainText(
    "sample metrics",
  );
});

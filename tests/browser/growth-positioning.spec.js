import { test, expect } from "@playwright/test";
test("growth expert positioning runs from hero to contact and footer", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(
    "Emmanuel — Twitch Channel Growth Expert & Creator Services",
  );
  await expect(page.locator("header .logo small")).toHaveText(
    "TWITCH CHANNEL GROWTH EXPERT",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "grow their presence.",
  );
  await expect(page.locator(".hero-description")).toContainText(
    "created, launched, and refined",
  );
  await expect(page.locator(".about-copy")).toContainText(
    "My hands-on execution.",
  );
  await expect(page.locator(".about-copy")).toContainText(
    "develop and manage campaigns",
  );
  await expect(page.locator(".contact-person")).toContainText(
    "Twitch channel growth expert",
  );
  await expect(page.locator(".footer-specialty")).toHaveText(
    "TWITCH CHANNEL GROWTH EXPERT",
  );
  await expect(page.locator("body")).not.toContainText(
    "TWITCH CHANNEL SUPPORT",
  );
  await expect(page.locator("body")).not.toContainText(
    "Twitch channel support specialist",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    /Twitch Channel Growth, Strategy & Execution/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /growth-social-card.svg$/,
  );
});
test("growth offer explains strategy and real execution, with mobile-safe branding", async ({
  page,
}) => {
  await page.goto("/");
  const faq = page
    .locator("details")
    .filter({
      hasText: "What does working with a channel growth expert involve?",
    });
  await faq.locator("summary").click();
  await expect(faq).toContainText("practical services needed to execute it");
  await expect(faq).toContainText("carrying out the work");
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      `overflow at ${width}`,
    ).toBe(false);
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: "test-results/growth-positioning-desktop.png",
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: "test-results/growth-positioning-mobile.png" });
});

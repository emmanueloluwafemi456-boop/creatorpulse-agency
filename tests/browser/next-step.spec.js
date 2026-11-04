import { test, expect } from "@playwright/test";
const services = [
  ["audit", "Channel Audit"],
  ["survey", "Survey"],
  ["landing", "Creator Landing Page"],
  ["club", "Creator Club Application"],
  ["management", "Channel Management"],
  ["ads", "Google Ads"],
];
test("portrait space holds a service guide on desktop, with a natural mobile reading order", async ({
  page,
}) => {
  await page.goto("/#about");
  await expect(page.locator(".next-step-guide")).toBeVisible();
  const photo = await page.locator(".about-photo").boundingBox(),
    guide = await page.locator(".next-step-guide").boundingBox(),
    copy = await page.locator(".about-copy").boundingBox();
  expect(Math.abs(photo.x - guide.x)).toBeLessThan(2);
  expect(guide.y).toBeGreaterThanOrEqual(photo.y + photo.height + 20);
  expect(guide.x + guide.width).toBeLessThan(copy.x);
  await page
    .locator("#about")
    .screenshot({ path: "test-results/about-guide-desktop.png" });
  for (const width of [320, 390, 600, 768]) {
    await page.setViewportSize({ width, height: 900 });
    const p = await page.locator(".about-photo").boundingBox(),
      c = await page.locator(".about-copy").boundingBox(),
      g = await page.locator(".next-step-guide").boundingBox();
    expect(c.y).toBeGreaterThanOrEqual(p.y + p.height);
    expect(g.y).toBeGreaterThanOrEqual(c.y + c.height);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      `overflow at ${width}`,
    ).toBe(false);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .locator(".next-step-guide")
    .screenshot({ path: "test-results/about-guide-mobile.png" });
});
test("each priority opens matching on-page service details", async ({
  page,
}) => {
  await page.goto("/#about");
  for (const [id, title] of services) {
    await page.getByLabel("What would you like help with?").selectOption(id);
    await expect(page.locator(".next-step-recommendation h4")).toHaveText(
      title,
    );
    await page.getByRole("button", { name: "See what’s included" }).click();
    await expect(page.getByRole("dialog")).toHaveAccessibleName(title);
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "See what’s included" }),
    ).toBeFocused();
  }
  await page.getByLabel("What would you like help with?").selectOption("ads");
  await expect(page.locator(".next-step-recommendation")).toContainText(
    "budget",
  );
});
test("guide carries the choice into the same-page inquiry on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#about");
  await page
    .getByLabel("What would you like help with?")
    .selectOption("management");
  await page.getByRole("link", { name: "Discuss this option" }).click();
  await expect(page).toHaveURL(/#project-brief$/);
  await expect(page.locator("select[name=service]")).toHaveValue(
    "Channel Management",
  );
  await expect(page.locator(".contact-form")).toBeInViewport();
});

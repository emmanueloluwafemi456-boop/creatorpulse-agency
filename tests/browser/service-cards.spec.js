import { test, expect } from "@playwright/test";
test("image-led service cards match the reference structure and load all six scenes", async ({
  page,
}) => {
  await page.goto("/#services");
  await expect(page.locator(".image-led-service")).toHaveCount(6);
  const positions = [];
  for (const card of await page.locator(".image-led-service").all()) {
    await card.scrollIntoViewIfNeeded();
    await expect(card.locator(".service-scene img")).toBeVisible();
    await expect
      .poll(() =>
        card
          .locator(".service-scene img")
          .evaluate((i) => i.complete && i.naturalWidth > 0),
      )
      .toBe(true);
    await expect(card.locator(".service-card-deliverables li")).toHaveCount(3);
    const button = card.getByRole("button");
    await expect(button).toContainText("See scope & deliverables");
    const widths = await card.evaluate((el) => ({
      card: el.querySelector(".channel-card-copy").getBoundingClientRect()
        .width,
      button: el.querySelector("button").getBoundingClientRect().width,
    }));
    expect(widths.button / widths.card).toBeGreaterThan(0.8);
    positions.push(await card.locator("img").getAttribute("style"));
  }
  expect(new Set(positions).size).toBe(6);
  await page
    .locator("#services")
    .screenshot({ path: "test-results/image-led-services-desktop.png" });
});
test("image cards work on phone and tablet widths and retain service details", async ({
  page,
}) => {
  await page.goto("/#services");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      `overflow at ${width}`,
    ).toBe(false);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .getByRole("button", { name: "Explore Channel Audit", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText(
    "A prioritized action list",
  );
  await page.keyboard.press("Escape");
  await page
    .locator(".image-led-service")
    .first()
    .screenshot({ path: "test-results/image-led-service-mobile.png" });
});

import { test, expect } from "@playwright/test";
test("promotion concept demonstrates strategy with functional accessible tabs", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/work-section-concept.html");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "a considered promotion plan",
  );
  await expect(page.locator(".honest-label")).toContainText(
    "Fictional channels",
  );
  await expect(page.locator("#panel-channel")).toBeVisible();
  await page
    .getByRole("tab", { name: "The promotion plan", exact: true })
    .click();
  await expect(page.locator("#panel-scenes")).toBeVisible();
  await expect(page.locator("#panel-channel")).toBeHidden();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "The review rhythm" }),
  ).toBeFocused();
  await expect(page.locator("#panel-details")).toBeVisible();
  await expect(page.locator("#panel-details")).toContainText(
    "No reach, follower, or monetization outcome is guaranteed",
  );
  await page.keyboard.press("Home");
  await expect(page.locator("#panel-channel")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Discuss my channel promotion" }),
  ).toHaveAttribute("href", /^mailto:emmanueloluwafemi456@gmail.com/);
  expect(errors).toEqual([]);
  await page.screenshot({
    path: "test-results/work-concept-desktop.png",
    fullPage: true,
  });
});
test("promotion concept fits small mobile screens and larger layouts", async ({
  page,
}) => {
  await page.goto("/work-section-concept.html");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const tab of await page.getByRole("tab").all()) {
      await tab.click();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        `overflow at ${width}px`,
      ).toBe(false);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("tab", { name: "The channel angle" }).click();
  await page.screenshot({
    path: "test-results/work-concept-mobile.png",
    fullPage: true,
  });
});

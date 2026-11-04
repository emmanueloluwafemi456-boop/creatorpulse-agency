import { test, expect } from "@playwright/test";
const titles = [
  "Channel Audit",
  "Survey",
  "Creator Landing Page",
  "Creator Club Application",
  "Channel Management",
  "Google Ads",
];
test("main page has the six requested services in two desktop rows", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator(".channel-service-card")).toHaveCount(6);
  expect(await page.locator(".channel-card-copy h3").allTextContents()).toEqual(
    [
      "Twitch Channel Audit",
      "Creator Survey",
      "Creator Landing Page",
      "Creator Club Application",
      "Twitch Channel Management",
      "Google Ads (Channel Promotion)",
    ],
  );
  const boxes = await Promise.all(
    (await page.locator(".channel-service-card").all()).map((c) =>
      c.boundingBox(),
    ),
  );
  expect(Math.abs(boxes[0].y - boxes[2].y)).toBeLessThan(2);
  expect(Math.abs(boxes[3].y - boxes[5].y)).toBeLessThan(2);
  expect(boxes[3].y).toBeGreaterThan(boxes[0].y + boxes[0].height - 2);
  await expect(page.locator(".project-card,.filters,.work-grid")).toHaveCount(
    0,
  );
  await expect(page.locator("body")).not.toContainText("NOVA");
  expect(
    await page
      .locator(".portrait-circle img")
      .evaluate((i) => i.complete && i.naturalWidth > 0),
  ).toBe(true);
  expect(errors).toEqual([]);
  await page
    .locator("#services")
    .screenshot({ path: "test-results/six-services-desktop.png" });
});
test("every service opens useful details within the page", async ({ page }) => {
  await page.goto("/");
  for (const title of titles) {
    await page
      .getByRole("button", { name: "Explore " + title, exact: true })
      .click();
    await expect(page.getByRole("dialog")).toHaveAccessibleName(title);
    await expect(page.getByRole("dialog")).toContainText(
      "What we can agree to deliver",
    );
    await expect(page.getByRole("dialog")).toContainText(
      "How it supports your next stage",
    );
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
});
test("keyboard focus stays in details and inquiry selects the requested service", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Explore Google Ads",
    exact: true,
  });
  await trigger.click();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close details" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("link", { name: "Discuss a Google Ads project" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("link", { name: "Discuss a Google Ads project" })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("select[name=service]")).toHaveValue("Google Ads");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("external navigation is limited to the supplied contact choices", async ({
  page,
}) => {
  await page.goto("/");
  const hrefs = await page
    .locator("a[href]")
    .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")));
  expect(
    hrefs.every(
      (h) =>
        h.startsWith("#") ||
        h === "https://wa.link/rloavr" ||
        h.startsWith("https://mail.google.com/mail/?"),
    ),
  ).toBe(true);
  await expect(
    page.locator(".faq-contact-choices .platform-contact"),
  ).toHaveCount(2);
  await expect(
    page.locator(".professional-footer .platform-contact"),
  ).toHaveCount(2);
});
test("mobile menu, FAQ, reduced motion and responsive service layouts work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/#services$/);
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  await page
    .locator("#services")
    .screenshot({ path: "test-results/six-services-mobile.png" });
  const q = page
    .locator("summary")
    .filter({ hasText: "Can you guarantee monetization or earnings?" });
  await q.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details[open]")).toContainText("No.");
  for (const width of [320, 390, 600, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      `overflow at ${width}`,
    ).toBe(false);
  }
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.locator(".back-top").click();
  await expect(page).toHaveURL(/#home$/);
});

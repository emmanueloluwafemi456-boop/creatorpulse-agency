import { test, expect } from "@playwright/test";

test("personal identity, real portraits, navigation and no retired product tools", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "I help Twitch creators",
  );
  await expect(page.locator(".portrait-circle img")).toBeVisible();
  expect(
    await page
      .locator(".portrait-circle img")
      .evaluate((img) => img.complete && img.naturalWidth > 0),
  ).toBe(true);
  await expect(page.locator("#about")).toContainText("I’m Emmanuel.");
  expect(
    await page.locator("#about").evaluate((el) => el.nextElementSibling.id),
  ).toBe("fit");
  await expect(page.locator("#audit")).toHaveCount(0);
  await expect(page.locator(".dashboard")).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText("Shopify");
  await page
    .getByRole("link", { name: "Explore my work", exact: true })
    .click();
  await expect(page).toHaveURL(/#work$/);
  await page.locator(".back-top").click();
  await expect(page).toHaveURL(/#home$/);
  expect(errors).toEqual([]);
  await page.screenshot({
    path: "test-results/emmanuel-desktop.png",
    fullPage: true,
  });
});

test("service details, keyboard focus and personal inquiry handoff", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Explore Twitch channel branding",
    exact: true,
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText(
    "Visual direction & color palette",
  );
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close details" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("link", { name: "Ask me about this service" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  for (const button of await page.locator(".service-card>button").all()) {
    await button.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: "Close details" }).click();
  }
  await trigger.click();
  await page.getByRole("link", { name: "Ask me about this service" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("select[name=service]")).toHaveValue(
    "Twitch channel branding",
  );
  await expect(page).toHaveURL(/#contact$/);
});

test("work filters and detailed concept projects", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".project-card")).toHaveCount(6);
  for (const [category, count] of [
    ["Channel Branding", 1],
    ["Banner Designs", 2],
    ["Stream Overlays", 2],
    ["Channel Concepts", 1],
  ]) {
    await page.getByRole("button", { name: category, exact: true }).click();
    await expect(page.locator(".project-card")).toHaveCount(count);
    await page.locator(".project-card").first().click();
    await expect(page.getByRole("dialog")).toContainText(
      "The thinking behind it",
    );
    await expect(page.getByRole("dialog")).toContainText(
      "not commissioned client work",
    );
    await page.keyboard.press("Escape");
  }
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(6);
});

test("contact validation, configured email, and truthful email draft", async ({
  page,
}) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Prepare my email inquiry" }).click();
  await expect(page.locator(".draft-result")).toHaveCount(0);
  await page.getByLabel("Your name", { exact: true }).fill("Test Streamer");
  await page.getByLabel("Email address").fill("streamer@example.com");
  await page
    .getByLabel("What can I help you with?")
    .selectOption("Overlays, scenes & alerts");
  await page
    .getByLabel("A little about your project")
    .fill("I need a calm purple stream package for art streams.");
  await page.getByRole("button", { name: "Prepare my email inquiry" }).click();
  await expect(page.locator(".draft-result")).toContainText(
    "No message has been submitted",
  );
  await expect(page.getByLabel("Your prepared project brief")).toHaveValue(
    /Overlays, scenes & alerts/,
  );
  await expect(page.locator(".email-draft")).toHaveAttribute(
    "href",
    /mailto:emmanueloluwafemi456@gmail.com\?subject=Twitch/,
  );
  await expect(page.locator(".email-link")).toHaveAttribute(
    "href",
    "mailto:emmanueloluwafemi456@gmail.com",
  );
});

test("FAQ is accessible from the keyboard", async ({ page }) => {
  await page.goto("/");
  const summary = page
    .locator("summary")
    .filter({ hasText: "Can you guarantee followers or viewers?" });
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details[open]")).toContainText("No.");
  await page.keyboard.press("Enter");
  await expect(page.locator("details[open]")).toHaveCount(0);
});

test("mobile menu, responsive layouts and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "About me", exact: true })
    .click();
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  await expect(page).toHaveURL(/#about$/);
  await page.locator(".back-top").click();
  await page.screenshot({
    path: "test-results/emmanuel-mobile.png",
    fullPage: true,
  });
  for (const width of [320, 390, 600, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      `horizontal overflow at ${width}px`,
    ).toBe(false);
  }
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

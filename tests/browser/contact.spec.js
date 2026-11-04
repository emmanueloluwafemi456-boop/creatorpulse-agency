import { test, expect } from "@playwright/test";
const endpoint = "https://formsubmit.co/ajax/emmanueldigital839@gmail.com";
async function fill(page, skip = "") {
  if (skip !== "name")
    await page.locator("input[name=name]").fill("Test Creator");
  if (skip !== "email")
    await page.locator("input[name=email]").fill("creator@example.com");
  if (skip !== "channel")
    await page
      .locator("input[name=channel]")
      .fill("https://twitch.tv/testcreator");
  if (skip !== "service")
    await page.locator("select[name=service]").selectOption("Channel Audit");
  if (skip !== "message")
    await page
      .locator("textarea[name=message]")
      .fill("I would like a channel audit and practical next steps.");
}
test("WhatsApp and Gmail are correctly addressed in contact, FAQ, and footer", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".contact-options")).toHaveCount(3);
  for (const options of await page.locator(".contact-options").all()) {
    await expect(options.locator(".platform-logo")).toHaveCount(2);
    await expect(options.locator(".whatsapp-contact")).toHaveAttribute(
      "href",
      "https://wa.link/rloavr",
    );
    const href = await options.locator(".gmail-contact").getAttribute("href");
    const u = new URL(href);
    expect(u.hostname).toBe("mail.google.com");
    expect(u.searchParams.get("to")).toBe("emmanueldigital839@gmail.com");
    expect(u.searchParams.get("body")).toContain(
      "interested in your Twitch services",
    );
  }
});
test("every visible brief field must be completed before submission", async ({
  page,
}) => {
  let requests = 0;
  await page.route(endpoint, async (route) => {
    requests++;
    await route.fulfill({ json: { success: "true" } });
  });
  for (const missing of ["name", "email", "channel", "service", "message"]) {
    await page.goto(`/?missing=${missing}#contact`);
    await fill(page, missing);
    await page.getByRole("button", { name: "Send my project brief" }).click();
    expect(requests, `submission attempted while ${missing} was missing`).toBe(
      0,
    );
    await expect(page.locator(".success-feedback")).toHaveCount(0);
  }
  await page
    .locator("textarea[name=message]")
    .fill("A detailed project brief for my channel.");
  await page
    .locator("input[name=channel]")
    .fill("https://example.com/not-a-twitch-channel");
  await page.getByRole("button", { name: "Send my project brief" }).click();
  expect(requests).toBe(0);
});
test("complete brief posts every field to the configured email endpoint", async ({
  page,
}) => {
  let payload;
  await page.route(endpoint, async (route) => {
    payload = route.request().postDataJSON();
    await new Promise((resolve) => setTimeout(resolve, 900));
    await route.fulfill({
      status: 200,
      json: {
        success: "true",
        message: "The form was submitted successfully.",
      },
    });
  });
  await page.goto("/#contact");
  await fill(page);
  await page.getByRole("button", { name: "Send my project brief" }).click();
  await expect(
    page.getByRole("button", { name: "Submitting your brief…" }),
  ).toBeDisabled();
  await expect(page.locator(".success-feedback")).toContainText(
    "Your brief was submitted.",
  );
  expect(payload.Name).toBe("Test Creator");
  expect(payload.Email).toBe("creator@example.com");
  expect(payload["Twitch channel"]).toBe("https://twitch.tv/testcreator");
  expect(payload["Service of interest"]).toBe("Channel Audit");
  expect(payload["Project description"]).toContain("practical next steps");
  expect(payload._replyto).toBe("creator@example.com");
  await expect(
    page.getByRole("button", { name: "Brief submitted" }),
  ).toBeDisabled();
  await expect(page).toHaveURL(/#contact$/);
});
test("provider failures preserve the brief and allow a retry", async ({
  page,
}) => {
  let calls = 0;
  await page.route(endpoint, async (route) => {
    calls++;
    await route.fulfill({
      status: calls === 1 ? 503 : 200,
      json: calls === 1 ? { success: false } : { success: true },
    });
  });
  await page.goto("/#contact");
  await fill(page);
  await page.getByRole("button", { name: "Send my project brief" }).click();
  await expect(page.getByRole("alert")).toContainText("could not be confirmed");
  await expect(page.locator("textarea[name=message]")).toHaveValue(
    /practical next steps/,
  );
  await expect(page.locator(".success-feedback")).toHaveCount(0);
  await page.getByRole("button", { name: "Send my project brief" }).click();
  await expect(page.locator(".success-feedback")).toBeVisible();
  expect(calls).toBe(2);
});
test("activation-required responses are not reported as delivery success", async ({
  page,
}) => {
  await page.route(endpoint, (route) =>
    route.fulfill({
      json: {
        success: false,
        message: "Please activate this form before submitting.",
      },
    }),
  );
  await page.goto("/#contact");
  await fill(page);
  await page.getByRole("button", { name: "Send my project brief" }).click();
  await expect(page.getByRole("alert")).toContainText("awaiting activation");
  await expect(page.locator(".success-feedback")).toHaveCount(0);
});
test("contact and footer remain readable across screen sizes", async ({
  page,
}) => {
  await page.goto("/#contact");
  for (const width of [320, 390, 600, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      `overflow at ${width}`,
    ).toBe(false);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page
    .locator("#contact")
    .screenshot({ path: "test-results/contact-desktop.png" });
  await page
    .locator(".professional-footer")
    .screenshot({ path: "test-results/footer-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .locator("#contact")
    .screenshot({ path: "test-results/contact-mobile.png" });
  await page
    .locator(".professional-footer")
    .screenshot({ path: "test-results/footer-mobile.png" });
});

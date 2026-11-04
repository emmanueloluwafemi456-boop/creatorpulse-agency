import { test, expect } from "@playwright/test";
function contrast(a, b) {
  const lum = (c) => {
    const rgb = c
      .match(/[\d.]+/g)
      .slice(0, 3)
      .map(Number)
      .map((v) => {
        v /= 255;
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  const l = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l[0] + 0.05) / (l[1] + 0.05);
}
test("slow service ticker loops, duplicates seamlessly, and supports optional pause", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const track = page.locator(".ticker-track");
  const animation = await track.evaluate((el) => {
    const s = getComputedStyle(el);
    return {
      name: s.animationName,
      duration: s.animationDuration,
      count: s.animationIterationCount,
      timing: s.animationTimingFunction,
    };
  });
  expect(animation).toEqual({
    name: "services-drift",
    duration: "78s",
    count: "infinite",
    timing: "linear",
  });
  await expect(page.locator(".ticker-group")).toHaveCount(2);
  expect(
    await page
      .locator(".ticker-group")
      .first()
      .locator(".ticker-service")
      .count(),
  ).toBe(6);
  const widths = await page
    .locator(".ticker-group")
    .evaluateAll((nodes) =>
      nodes.map((el) => el.getBoundingClientRect().width),
    );
  expect(Math.abs(widths[0] - widths[1])).toBeLessThan(1);
  const initial = await track.evaluate(
    (el) => new DOMMatrix(getComputedStyle(el).transform).m41,
  );
  await expect
    .poll(
      () =>
        track.evaluate(
          (el) => new DOMMatrix(getComputedStyle(el).transform).m41,
        ),
      { timeout: 2500 },
    )
    .toBeLessThan(initial - 0.5);
  await page.getByRole("button", { name: "Pause service scrolling" }).click();
  expect(
    await track.evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("paused");
  await page.getByRole("button", { name: "Resume service scrolling" }).click();
  expect(
    await track.evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("running");
});
test("readable typography, contrasting surfaces, and solid accents across screen sizes", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const selector of [
      ".hero-description",
      ".about-copy>p",
      ".about-features p",
      ".fit-card li",
      ".channel-card-copy>p",
      ".engagement-step p",
      ".form-introduction p",
      ".form-grid input",
      ".form-grid textarea",
    ]) {
      const font = await page
        .locator(selector)
        .first()
        .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
      expect(font, `${selector} at ${width}px`).toBeGreaterThanOrEqual(16);
    }
    for (const selector of [
      ".hero-description",
      ".about-features p",
      ".fit-card li",
      ".channel-card-copy>p",
      ".engagement-step p",
      ".form-data-note",
      ".footer-identity>p",
    ]) {
      const result = await page
        .locator(selector)
        .first()
        .evaluate((el) => {
          const color = getComputedStyle(el).color;
          let node = el,
            bg;
          while (node) {
            bg = getComputedStyle(node).backgroundColor;
            if (bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") break;
            node = node.parentElement;
          }
          return { color, bg };
        });
      expect(
        contrast(result.color, result.bg),
        `${selector} contrast at ${width}px`,
      ).toBeGreaterThanOrEqual(4.5);
    }
    for (const selector of [
      ".hero",
      ".primary",
      ".gradient-text",
      ".connected-contact-form",
      ".engagement-section",
    ])
      expect(
        await page
          .locator(selector)
          .first()
          .evaluate((el) => getComputedStyle(el).backgroundImage),
      ).toBe("none");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      `overflow ${width}`,
    ).toBe(false);
  }
});
test("expanded FAQ and deliverable-led process remain accessible", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".engagement-step")).toHaveCount(4);
  await expect(page.locator(".engagement-output")).toHaveCount(4);
  await expect(page.locator(".faq-list details")).toHaveCount(10);
  for (const d of await page.locator(".faq-list details").all()) {
    await d.locator("summary").click();
    await expect(d.locator(".faq-answer p")).toHaveCount(2);
    for (const paragraph of await d.locator(".faq-answer p").all())
      expect((await paragraph.textContent()).length).toBeGreaterThan(100);
    await d.locator("summary").click();
  }
  await page
    .locator("#process")
    .screenshot({ path: "test-results/process-readable-desktop.png" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "test-results/readable-full-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .locator("#process")
    .screenshot({ path: "test-results/process-readable-mobile.png" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "test-results/readable-full-mobile.png",
    fullPage: true,
  });
  expect(
    await page
      .locator(".ticker-track")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await expect(page.locator(".ticker-group[aria-hidden=true]")).toBeHidden();
});

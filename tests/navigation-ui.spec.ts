import { test, expect } from "@playwright/test";

test("operations menu opens, dismisses, and links to the operation pages", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Our operations",
    exact: true,
  });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const popover = page.getByRole("region", { name: "Operations menu" });
  await expect(popover).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(popover).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.locator("h1").click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await popover.getByRole("link", { name: /Gold processing/ }).click();
  await expect(page).toHaveURL("/operations/gold-processing");
  await expect(page.locator("h1")).toContainText("The next stage.");
});

test("mobile operations navigation closes after selecting a page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("button", { name: "Our operations", exact: true })
    .click();
  await page
    .getByRole("region", { name: "Operations menu" })
    .getByRole("link", { name: /Exploration Understanding/ })
    .click();
  await expect(page).toHaveURL("/operations/exploration");
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("hero and project cards fit compact, tablet, and desktop layouts", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator(".hero h1")
        .evaluate((element) => element.scrollWidth <= element.clientWidth + 8),
    ).toBe(true);
    await page
      .getByRole("button", { name: "Show processing highlight" })
      .click();
    await expect(page.locator(".hero-project-preview")).toContainText(
      "Gold processing",
    );
    await page.getByRole("button", { name: "Processing", exact: true }).click();
    await expect(page.locator(".project-card")).toHaveCount(1);
    const button = page.locator(".project-card");
    expect(
      await button.evaluate(
        (element) => element.scrollWidth <= element.clientWidth + 2,
      ),
    ).toBe(true);
  }
});

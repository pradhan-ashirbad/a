import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("operations filter and project inquiry flow", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /There’s more/ }),
  ).toBeVisible();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Processing", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText(
    "Gold Processing Plant",
  );
  await page.locator(".project-card").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "Gold Processing Plant" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Inquire about this project" })
    .click();
  await expect(page.getByLabel("I’m interested in")).toHaveValue(
    "Gold processing",
  );
  await page.getByLabel("Your name").fill("Ananya Rao");
  await page.getByLabel("Email address").fill("ananya@example.com");
  await page.getByLabel("I’m interested in").selectOption("Gold processing");
  await page
    .getByLabel("Your message")
    .fill("Please share more information about your processing plant.");
  await page.getByRole("button", { name: "Prepare inquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your inquiry is ready, Ananya.",
  );
  await expect(page.getByRole("status")).toContainText("has not been sent");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download inquiry" }).click();
  const file = await download;
  expect(file.suggestedFilename()).toBe("geo-mysore-inquiry.txt");
  expect(await readFile((await file.path())!, "utf8")).toContain(
    "Regarding: Gold processing",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: /All projects/ }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
});

test("processing tabs and FAQ respond to interaction", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Show processing highlight" }).click();
  await expect(
    page.getByRole("heading", { name: "From potential to possibility." }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "02 Recover" }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Realising the potential.",
  );
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "03 Control" })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Care in every detail.",
  );
  await page
    .getByRole("button", { name: "Where is the Jonnagiri project located?" })
    .click();
  await expect(page.locator("#answer-1")).toBeVisible();
  await expect(page.locator("#answer-0")).toBeHidden();
});

test("mobile navigation, dialog keyboard access, and layout", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Gold processing" })
    .click();
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Let’s connect" }).click();
  await expect(
    page.getByRole("button", { name: "Close dialog" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Prepare inquiry" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close dialog" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Let’s connect" }),
  ).toBeFocused();
});

test("page loads assets locally without browser errors", async ({ page }) => {
  const errors: string[] = [];
  const broken: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) broken.push(response.url());
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".hero-photo")).toHaveCSS(
    "background-image",
    /hero-mine/,
  );
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(200);
  for (const asset of [
    "/images/hero-mine.webp",
    "/images/processing-plant.webp",
  ]) {
    expect(
      await page.evaluate(async (path) => {
        const image = new Image();
        image.src = path;
        await image.decode();
        return image.naturalWidth > 1000;
      }, asset),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
  expect(broken).toEqual([]);
});

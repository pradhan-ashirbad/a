import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

for (const [slug, title, tab] of [
  ["mining", "Jonnagiri Gold Project", "02 Plan"],
  ["gold-processing", "Gold Processing Plant", "02 Prepare"],
  ["exploration", "Exploration portfolio", "02 Investigate"],
]) {
  test(`${slug} has a working direct route, journey, and inquiry`, async ({
    page,
  }) => {
    await page.goto(`/operations/${slug}`);
    await expect(page).toHaveTitle(`${title} | Geo Mysore`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("tab")).toHaveCount(4);
    await page.getByRole("tab", { name: tab, exact: true }).click();
    await expect(page.getByRole("tabpanel")).toContainText("STAGE 02 / 04");
    await page.keyboard.press("End");
    await expect(page.getByRole("tab").last()).toBeFocused();
    await expect(page.getByRole("tabpanel")).toContainText("STAGE 04 / 04");
    await page.getByRole("button", { name: "Return to first stage" }).click();
    await expect(page.getByRole("tabpanel")).toContainText("STAGE 01 / 04");
    await page.locator(".operation-inquiry .button").click();
    await expect(page.getByLabel("I’m interested in")).toHaveValue(
      slug === "gold-processing" ? "Gold processing" : "Project information",
    );
    await page.keyboard.press("Escape");
    await page.reload();
    await expect(page).toHaveTitle(`${title} | Geo Mysore`);
    await page
      .getByRole("navigation", { name: "Breadcrumb" })
      .getByRole("link", { name: "Our operations" })
      .click();
    await expect(page).toHaveURL("/#projects");
    await expect(
      page.getByRole("heading", {
        name: "Our operations. Connected by purpose.",
      }),
    ).toBeVisible();
  });
}

test("inquiry review can be edited without losing fields", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Get in touch", exact: true }).click();
  await page.getByLabel("Your name").fill("  Priya Sharma  ");
  await page.getByLabel("Email address").fill("priya@example.com");
  await page.getByLabel(/Company/).fill("Example Company");
  await page
    .getByLabel("Your message")
    .fill("Please share information about the processing plant.");
  await page.getByRole("button", { name: "Prepare inquiry" }).click();
  await expect(page.locator(".inquiry-review")).toContainText(
    "Example Company",
  );
  await expect(page.locator("#modal-title")).toBeFocused();
  await expect.poll(() => page.locator(".modal").evaluate(element => element.scrollTop)).toBe(0);
  await expect(page.getByRole("button", {name: "Close dialog"})).toBeVisible();
  await page.getByRole("button", { name: "Edit inquiry" }).click();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await expect(page.getByLabel("Your name")).toHaveValue("Priya Sharma");
  await expect(page.getByLabel("Your message")).toHaveValue(
    "Please share information about the processing plant.",
  );
  await page
    .getByLabel("Your message")
    .fill("Updated request: please share your processing flowsheet.");
  await page.getByRole("button", { name: "Prepare inquiry" }).click();
  const waiting = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download inquiry" }).click();
  const download = await waiting;
  const contents = await readFile((await download.path())!, "utf8");
  expect(contents).toContain("Name: Priya Sharma");
  expect(contents).toContain("Company: Example Company");
  expect(contents).toContain(
    "Updated request: please share your processing flowsheet.",
  );
  expect(contents).not.toContain(
    "Please share information about the processing plant.",
  );
});

test("inquiry rejects whitespace-only content", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Get in touch", exact: true }).click();
  await page.getByLabel("Your name").fill("Priya Sharma");
  await page.getByLabel("Email address").fill("priya@example.com");
  await page.getByLabel("Your message").fill("   ");
  await page.getByRole("button", { name: "Prepare inquiry" }).click();
  await expect(page.getByRole("alert")).toContainText("Please add a message");
  await expect(page.getByLabel("Your message")).toBeFocused();
  await expect(page.locator(".inquiry-review")).toHaveCount(0);
});

test("mobile detail pages fit the viewport and demo contact is clearly labelled", async ({
  page,
}) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/operations/gold-processing");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("tab", { name: "03 Recover" }).click();
    await expect(page.getByRole("tabpanel")).toContainText(
      "Bring mineral potential into focus.",
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#contact");
  await expect(page.locator("#contact")).toContainText("Priya Sharma");
  await expect(page.locator("#contact")).toContainText("DEMO CONTACT DETAILS");
  await expect(page.locator("#contact")).toContainText(
    "hello@geomysore.example",
  );
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

test("full operation links and unknown-page recovery work", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore processing", exact: true })
    .click();
  await expect(page).toHaveURL("/operations/gold-processing");
  await page.locator(".related-card").first().click();
  await expect(page).toHaveURL("/operations/mining");
  await page.goto("/page-that-does-not-exist");
  await expect(page).toHaveTitle("Page not found | Geo Mysore");
  await page.getByRole("link", { name: "Return home" }).click();
  await expect(
    page.getByRole("heading", { name: /There’s more/ }),
  ).toBeVisible();
});

test("responsibility details expand and partnership inquiry keeps its context", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Respect for the environment" })
    .click();
  await expect(page.locator("#principle-0")).toBeVisible();
  await page
    .getByRole("button", { name: "Connection with communities" })
    .click();
  await expect(page.locator("#principle-0")).toBeHidden();
  await expect(page.locator("#principle-1")).toBeVisible();
  await page.getByRole("button", { name: "Partnerships", exact: true }).click();
  await expect(page.getByLabel("I’m interested in")).toHaveValue(
    "Business partnership",
  );
});

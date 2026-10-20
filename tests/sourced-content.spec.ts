import { test, expect } from "@playwright/test";

test("homepage carries the published company history and capacity figures", async ({
  page,
}) => {
  await page.goto("/");
  const facts = page.getByLabel("Published company facts");
  await expect(facts).toContainText("1994");
  await expect(facts).toContainText("35,000+ km²");
  await expect(facts).toContainText("0.4 MTPA");
  await expect(facts).toContainText("0.3 MTPA");
  await expect(page.locator(".brand .official-mark").first()).toHaveAttribute(
    "src",
    "/images/official-logo.png",
  );
  await expect(page.locator("#community")).toContainText(
    "Education & opportunity",
  );
  await expect(page.locator("#community")).toContainText(
    "Water for communities",
  );
});

test("processing specifies the published design and preserves the source discrepancy", async ({
  page,
}) => {
  await page.goto("/operations/gold-processing");
  const specs = page.getByLabel("Published project specifications");
  await expect(specs).toContainText("1,000 t/day");
  await expect(specs).toContainText("50 t/hour");
  await expect(specs).toContainText("Gravity + CIL");
  await expect(page.locator(".operation-source-note")).toContainText("2 t/h");
  await expect(page.locator(".operation-source-note")).toContainText("3 TPH");
  await expect(
    page.getByRole("link", { name: "Company source" }),
  ).toHaveAttribute("href", "https://geomysore.com/processing-plant.php");
  await page.locator(".processing-flowsheet img").scrollIntoViewIfNeeded();
  await expect(page.locator(".processing-flowsheet img")).toHaveJSProperty(
    "naturalWidth",
    1024,
  );
});

test("public company contacts are sourced and the demo person remains labelled", async ({
  page,
}) => {
  await page.goto("/#contact");
  await expect(page.locator("#contact")).toContainText("Priya Sharma");
  await expect(page.locator("#contact")).toContainText("Demo contact person");
  await expect(page.locator("#contact")).toContainText(
    "#187/1E, Pagidirai Village",
  );
  await expect(page.locator("#contact")).not.toContainText("00000");
  await expect(page.locator('#contact a[href^="mailto:"]')).toHaveAttribute(
    "href",
    "mailto:reception@geomysore.com",
  );
});

test("email draft safely encodes the reviewed inquiry without sending it", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Get in touch", exact: true }).click();
  await page.getByLabel("Your name").fill("Ananya Rao");
  await page.getByLabel("Email address").fill("ananya@example.com");
  await page.getByLabel(/Company/).fill("Example & Co");
  await page.getByLabel("I’m interested in").selectOption("Gold processing");
  await page
    .getByLabel("Your message")
    .fill("Could you share the flowsheet & pilot capacity?\nThank you.");
  await page.getByRole("button", { name: "Prepare inquiry" }).click();
  const href = await page
    .getByRole("link", { name: "Open email draft" })
    .getAttribute("href");
  const mailto = new URL(href!);
  expect(mailto.protocol).toBe("mailto:");
  expect(mailto.pathname).toBe("reception@geomysore.com");
  expect(mailto.searchParams.get("subject")).toBe(
    "Website inquiry: Gold processing",
  );
  expect(mailto.searchParams.get("body")).toContain("Example & Co");
  expect(mailto.searchParams.get("body")).toContain(
    "flowsheet & pilot capacity?\nThank you.",
  );
  await expect(page.getByRole("status")).toContainText("has not been sent");
});

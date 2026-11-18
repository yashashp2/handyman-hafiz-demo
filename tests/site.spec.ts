import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import path from "node:path";

test("desktop content, imagery, accessibility and navigation", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Reliable Handyman & Home Improvement Services in Ilford");
  await expect(page.locator("meta[name=robots]")).toHaveAttribute("content", "noindex, nofollow");
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  for (const call of await page.locator("a[href^='tel:']").all()) await expect(call).toHaveAttribute("href", "tel:+447863225508");
  await page.getByText("How do I enquire about a job?", { exact: true }).click();
  await expect(page.locator("details[open]")).toContainText("does not send");
  const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(audit.violations).toEqual([]);
  expect(errors).toEqual([]);
  await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo({ top: 0, behavior: "instant" }); });
  await page.screenshot({ path: "artifacts/desktop-full.png", fullPage: true });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "artifacts/desktop-hero.png" });
});

test("mobile navigation, service selection and responsive widths", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Services", exact: true }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  await page.locator(".service-card").filter({ hasText: "Furniture Assembly" }).click();
  await expect(page.getByLabel("Service required")).toHaveValue("assembly");
  await expect(page.locator("#contact")).toBeInViewport();
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(audit.violations).toEqual([]);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "artifacts/mobile-full.png", fullPage: true });
});

test("quote validates, previews photos and never transmits or stores entries", async ({ page, context }) => {
  await page.goto("./#contact");
  await page.getByRole("button", { name: "Preview quote request" }).click();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await expect(page.locator("#name-error")).toBeVisible();
  await page.getByLabel("Your name").fill("Demo Visitor");
  await page.getByRole("textbox", { name: "Phone number" }).fill("07123 456789");
  await page.getByLabel("Email address").fill("demo@example.com");
  await page.getByRole("textbox", { name: "Postcode" }).fill("IG3 9PW");
  await page.getByLabel("Service required").selectOption("carpentry");
  await page.getByLabel("Tell us about your project").fill("Please discuss fitting shelves in the living room.");
  await page.waitForLoadState("networkidle");
  const requests: string[] = [];
  page.on("request", request => { if (!request.url().startsWith("blob:")) requests.push(`${request.method()} ${request.url()}`); });
  await page.locator("#photos").setInputFiles(path.resolve("public/images/kitchen.jpg"));
  await expect(page.getByAltText("Local preview of kitchen.jpg")).toBeVisible();
  await page.getByRole("button", { name: "Preview quote request" }).click();
  await expect(page.getByRole("status")).toContainText("nothing has been sent");
  expect(requests).toEqual([]);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  expect(await context.cookies()).toEqual([]);
  await page.getByRole("button", { name: "Remove kitchen.jpg" }).click();
  await expect(page.getByAltText("Local preview of kitchen.jpg")).toHaveCount(0);
  await page.locator("#photos").setInputFiles({ name: "invalid.txt", mimeType: "text/plain", buffer: Buffer.from("not an image") });
  await expect(page.locator(".quote-form").getByRole("alert")).toContainText("Use JPG, PNG or WebP");
  await page.getByRole("button", { name: "Clear form and photos" }).click();
  await expect(page.getByLabel("Your name")).toHaveValue("");
  await expect(page.locator(".quote-form").getByRole("alert")).toHaveCount(0);
  await page.getByLabel("Your name").fill("Temporary name");
  await page.reload();
  await expect(page.getByLabel("Your name")).toHaveValue("");
});

test("without JavaScript form is disabled and phone links remain available", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("./");
  await expect(page.getByLabel("Your name")).toBeDisabled();
  await expect(page.getByRole("button", { name: "Preview quote request" })).toBeDisabled();
  await expect(page.getByText("This demo form needs JavaScript.", { exact: false })).toBeVisible();
  await context.close();
});

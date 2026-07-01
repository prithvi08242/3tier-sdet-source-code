// Sample Playwright spec. Requires: npm i -D @playwright/test
// Run: BASE_URL=http://localhost:3000 npx playwright test
import { test, expect } from "@playwright/test";

const BASE = process.env.BASE_URL || "http://localhost:3000";

test("landing to practice grid", async ({ page }) => {
  await page.goto(BASE);
  await page.getByTestId("hero-start-practicing").click();
  await expect(page.getByTestId("sections-grid")).toBeVisible();
  await expect(page.getByTestId("practice-card-basic-form")).toBeVisible();
});

test("basic form submission", async ({ page }) => {
  await page.goto(`${BASE}/practice/basic-form`);
  await page.getByTestId("bf-name").fill("Ada");
  await page.getByTestId("bf-email").fill("ada@test.dev");
  await page.getByTestId("bf-submit").click();
  await expect(page.getByTestId("bf-result")).toContainText("Ada");
});

test("admin login flow", async ({ page }) => {
  await page.goto(`${BASE}/login`);
  await page.getByTestId("login-email-input").fill("admin@example.com");
  await page.getByTestId("login-password-input").fill("admin123");
  await page.getByTestId("login-submit-button").click();
  await expect(page.getByTestId("current-user-email")).toContainText("admin@example.com");
});

test("table sort and paginate", async ({ page }) => {
  await page.goto(`${BASE}/practice/table-automation`);
  await page.getByTestId("th-score").click();
  await page.getByTestId("page-next").click();
  await expect(page.getByTestId("page-indicator")).toContainText("2");
});

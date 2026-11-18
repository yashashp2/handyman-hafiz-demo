import { defineConfig } from "@playwright/test";
const baseURL = process.env.TEST_BASE_URL || `http://localhost:3000${process.env.NEXT_PUBLIC_BASE_PATH || ""}/`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: { baseURL, channel: "chrome", trace: "retain-on-failure" },
  webServer: process.env.TEST_BASE_URL ? undefined : { command: "npm run start", url: baseURL, reuseExistingServer: !process.env.CI, timeout: 60_000 },
});

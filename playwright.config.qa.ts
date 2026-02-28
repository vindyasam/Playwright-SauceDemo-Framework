import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: [
  ['list'],
  ['allure-playwright']
],
  
  use: {
    trace: 'on-first-retry',
    headless: !!process.env.CI,  // false locally, true in CI
    screenshot: 'on-first-failure',
    video: 'on',
    baseURL: 'https://www.saucedemo.com/',
  },

  metadata: {
  appUsername: 'standard_user',
  appPassword: 'secret_sauce',
},

  /* Configure projects for major browsers */
  /* ✅ All browsers enabled for manual selection via --project flag */
  projects: [
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },  // ✅ Fixed viewport for CI (no --start-maximized in headless)
        launchOptions: {
          args: ['--window-size=1920,1080'],
        }
      }
    },
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //     viewport: { width: 1920, height: 1080 },
    //     launchOptions: {
    //       args: ['--window-size=1920,1080'],
    //     }
    //   }
    // },
    // {
    //   name: 'Chromium',
    //   use: {
    //     browserName: 'chromium',
    //     viewport: { width: 1920, height: 1080 },
    //     launchOptions: {
    //       args: [],
    //     }
    //   }
    // },
    // {
    //   name: 'Firefox',
    //   use: {
    //     browserName: 'firefox',
    //     viewport: { width: 1920, height: 1080 },
    //     launchOptions: {
    //       args: [],
    //     }
    //   }
    // },
    // {
    //   name: 'WebKit',
    //   use: {
    //     browserName: 'webkit',
    //     viewport: { width: 1920, height: 1080 },
    //     launchOptions: {
    //       args: [],
    //     }
    //   }
    // }
  ],
});
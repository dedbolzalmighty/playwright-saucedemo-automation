Overview

Playwright test automation suite for the SauceDemo
 e-commerce demo site. It includes:
Organized Page Object Model (POM) under the pages/ directory.
Example and core test files across tests/ and tests-examples/.
GitHub Actions workflows for CI automation.
Config files like playwright.config.js for browser and test behavior setup.

Installation
git clone https://github.com/dedbolzalmighty/playwright-saucedemo-automation.git
cd playwright-saucedemo-automation
npm install

Running Tests
Via CLI
npx playwright test
Runs the full test suite across supported browsers (Chromium, Firefox, WebKit) depending on your playwright.config.js.
Specifying a Single Test File or Project
npx playwright test tests/login.spec.ts
# or
npx playwright test --project=chromium

Structure & Highlights
pages/: Contains page classes following the Page Object Model (POM) — e.g., LoginPage, ProductPage, etc.
tests/: Holds structured test suites (e.g., login, product features).
tests-examples/: Sample test scripts or prototypes illustrating usage.
.github/workflows/ci.yml: Automates test execution on PRs and commits.
playwright.config.js: Setup for browsers, retries, base URL, timeouts, reporting, and more.

Features
Login and authentication flows.
Product listing and interaction checks.
Checkout process validations.
Cross-browser support (Chromium, Firefox, WebKit).
Automated CI via GitHub Actions.

Technology Stack
Playwright (JavaScript)
Node.js
GitHub Actions for CI
Optional: Mocha/Chai, Jest, or built-in Playwright test runner (based on config)

Configuration & Customization
Modify behavior via playwright.config.js:
projects: Define which browsers or environments to test.
use: Specify test settings (viewport, headless, base URL, etc.).
Retry logic, test timeouts, test directory paths, and reporter details.

Contributing
Fork the repo.
Create a meaningful feature branch — e.g., feature/navigate-intro.
Work with POM style for maintainability — new pages in pages/, related tests in tests/.
Add tests and verify locally: npx playwright test.

Submit a PR for review.
Resources & References

Playwright Documentation
POM design pattern guidelines
GitHub Actions setup for Playwright

Detailed test case descriptions

Folder-level diagrams or architecture overview

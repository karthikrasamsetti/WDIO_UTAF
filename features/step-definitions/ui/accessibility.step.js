const { Given, When, Then } = require("@wdio/cucumber-framework");
const assert = require("assert");
const runAccessibilityTests = require("../../../utils/a11y");
require("dotenv").config();

Given(/^I am on the homepage$/, async () => {
  await browser.maximizeWindow();
  await browser.url(process.env.sphere_url);
});

When(/^I run the accessibility tests$/, async function () {
  this.results = await runAccessibilityTests();
});

Then(/^There should be no accessibility violations$/, function () {
  assert.strictEqual(
    this.results.violations.length,
    0,
    "Expected no a11y violations"
  );
});


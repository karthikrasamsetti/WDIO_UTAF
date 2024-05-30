const { Given, When, Then } = require("@wdio/cucumber-framework");
const { expect, $ } = require("@wdio/globals");
const indexPage=require("../../../utils/index");
require("dotenv").config();

Given(/^I open (.*?)$/, async (venuePage) => {
  await indexPage.homePage.startChrome();
  await indexPage.homePage.searchUrl(venuePage);
});

When(/^I scroll to the recommended events module on page$/,async () => {
	await indexPage.homePage.closingAdd();
});

Then(
  /^I expect to see (.*?) recommended events rendered with associated name, venue, dates, times and buy tickets buttons from recommendation event engine api$/,
  async (site) => {
    await indexPage.homePage.validatingEvents();
  }
);

Then(/^I clicked Buy Tickets Button$/, async () => {
	await indexPage.homePage.clickBuyTickets();
});

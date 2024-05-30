require("dotenv").config();
const { Given, When, Then } = require("@wdio/cucumber-framework");
const expect = require("chai").expect;
const indexpage = require("../../../utils/index");

Given(/^I launch (.*?)$/, async (venuePage) => {
  await browser.maximizeWindow();
  await browser.url(`${process.env.msg_url}${venuePage}`);
});

When(/^I scroll to the recommended events module on home page$/, async () => {
  await indexpage.venuePage.closingAdd();
});

Then(
  /^I expect to see all (.*?) recommended events rendered with associated name, venue, dates, times and buy tickets buttons from recommendation event engine api$/,
  async (site) => {
    await indexpage.venuePage.validatingEvents();
  }
);

Given(/^I am on MSG Calendar$/, async () => {
  await browser.maximizeWindow();
  await browser.url(`${process.env.msg_url}`);
  await indexpage.venuePage.calender();
});

Then(
  /^I Click on the Buy Ticket Button for all available show in the calendar and I Expect I have navigated to Ticket master Page for the same Show$/,
  async () => {
    await indexpage.venuePage.buytickets();
  }
);

Given(/^I am launching msg application$/, async () => {
  await browser.maximizeWindow();
  await browser.url(process.env.msg_url);
});

Then(/^I am matching the images$/,async () => {
	await indexpage.venuePage.visualTesting();
});
Then(/^I am comparing the images$/, async () => {
  await indexpage.venuePage.visual_Negative();
});

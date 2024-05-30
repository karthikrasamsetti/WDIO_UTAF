require("dotenv").config();
const { Given, When, Then } = require("@wdio/cucumber-framework");
const expect = require("chai").expect;
const indexpage = require("../../../utils/index");

Given(/^I am opening the (.*?)$/, async (eventpage) => {
  await browser.maximizeWindow();
  await browser.url(`${process.env.sphere_url}${eventpage}`);
});

When(
  /^I scroll to the available showtimes and tickets calendar component$/,
  async () => {
    await indexpage.eventPage.showTimes();
  }
);

Then(
  /^I expect to see title, year dropdown, events rendered with month, date, day, buttons with time and load more button$/,
  async () => {
    await indexpage.eventPage.validateCalendarComponent();
  }
);

Then(
  /^I click on any event time button and showtime selected modal render with the related event information$/,
  async () => {
    await indexpage.eventPage.viewEventInfo();
  }
);

When(
  /^I click on buy tickets button on modal pop up ticket master page shows with related event information$/,
  async () => {
    await indexpage.eventPage.buyTickets();
  }
);

Given(/^I am opening Msgsphere homepage$/, async () => {
  await browser.maximizeWindow();
  await browser.url(`${process.env.sphere_url}`);
  await browser.setTimeout({ implicit: 4000 });
});

Then(
  /^I validate hero elements, video autoplay and play in loop if possible, buy ticket button$/,
  async () => {
    await indexpage.eventPage.validateAutoPlay();
  }
);

When(
  /^I click on Buy ticket button show sphere experience page display.$/,
  async () => {
    await indexpage.eventPage.clickbuyTicket();
  }
);

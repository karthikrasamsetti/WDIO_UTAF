const platform = require("../../utils/platform");
const { assert, expect } = require("chai");

class HomePage {
  locators = {
    android: {
      welcomeChrome:
        "//android.widget.Button[@resource-id='com.android.chrome:id/terms_accept']",
      noThanksEle:
        "//android.widget.Button[@resource-id='com.android.chrome:id/negative_button']",
      // skipChromeWelcome:"/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.viewpager.widget.ViewPager/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button[2]",
      // skipNotificationPop:"/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.widget.Button[1]",
      searchBox:
        "//android.widget.EditText[@resource-id='com.android.chrome:id/search_box_text']",
      locationPop:
        "//android.widget.Button[@resource-id='com.android.chrome:id/negative_button']",
      signUpPop: "//android.widget.Button[@text='Close the overlay']",
      languagePop: "//android.widget.ImageButton[@content-desc='Close']",
      nameEle:
        "//android.widget.Button[@text='Buy Tickets']/../preceding-sibling::android.view.View",
      dateEle:
        "//android.widget.Button[@text='Buy Tickets']/preceding-sibling::android.view.View",
      timeEle:
        "//android.widget.Button[@text='Buy Tickets']/preceding-sibling::android.widget.TextView",
      buyTicketEle: "//android.widget.Button[@text='Buy Tickets']",
      // calanderEle: "//android.view.View[@content-desc='calendar']",
      // buyTicket: "//android.widget.TextView[@text='Buy Tickets']",
    },
  };
  get locationPop() {
    return $(this.locators[platform()].locationPop);
  }
  get signUpPop() {
    return $(this.locators[platform()].signUpPop);
  }
  get languagePop() {
    return $(this.locators[platform()].languagePop);
  }
  get nameEle() {
    return $(this.locators[platform()].nameEle);
  }
  get dateEle() {
    return $(this.locators[platform()].dateEle);
  }
  get timeEle() {
    return $(this.locators[platform()].timeEle);
  }
  get buyTicketEle() {
    return $(this.locators[platform()].buyTicketEle);
  }
  get searchBox() {
    return $(this.locators[platform()].searchBox);
  }
  get welcomeChrome() {
    return $(this.locators[platform()].welcomeChrome);
  }
  get noThanksEle() {
    return $(this.locators[platform()].noThanksEle);
  }
  get calanderEle() {
    return $(this.locators[platform()].calanderEle);
  }
  async startChrome() {
    await this.welcomeChrome.click();
    await browser.setTimeout({ implicit: 60000 });
    await this.noThanksEle.click();
  }
  async searchUrl(pageName) {
    await this.searchBox.setValue(`${process.env.msg_url}${pageName}`);
    await browser.keys("\uE007");
    await browser.pause(process.env.small_wait);
  }
  async closingAdd() {
    await browser.setTimeout({ implicit: 60000 });
    await this.locationPop.click();
    await this.signUpPop.click();
    await this.languagePop.click();
  }
  async validatingEvents() {
    // for (let index = 1; index < this.buyTicketEle.length; index++) {
    expect(await this.buyTicketEle.isDisplayed()).to.be.true;
    // if (dateEleLength != 0) {
    expect(await this.dateEle.isDisplayed()).to.be.true;
    //   dateEleLength--;
    // }
    // if (timeEleLenght != 0) {
    expect(await this.timeEle.isDisplayed()).to.be.true;
    //   timeEleLenght--;
    // }
    // if (nameEleLength != 0) {
    expect(await this.nameEle.isDisplayed()).to.be.true;
    //   nameEleLength--;
    // }
    // await this.calanderEle.click();
    // await this.buyTicketEle.scrollIntoView();
  }

  async clickBuyTickets() {
    await this.buyTicketEle.click();
    await browser.pause(5000);
  }
}

module.exports = new HomePage();

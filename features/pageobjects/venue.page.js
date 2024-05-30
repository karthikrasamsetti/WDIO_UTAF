const { assert, expect } = require("chai");
class VenuPage {
  get closeAdd() {
    return $("//button[@class='btn btn-plain']");
  }
  get nameEle() {
    return $$("//a[text()='See Details']/../../../../child::a/h3");
  }
  get dateEle() {
    return $$(
      "(//a[text()='See Details'])[1]/../../preceding-sibling::div//button[@role='button']"
    );
  }
  get timeEle() {
    return $$(
      "(//a[text()='See Details'])[1]/../../preceding-sibling::div//time"
    );
  }
  get buyTicketEle() {
    return $$("(//a[text()='See Details'])[1]/preceding-sibling::a");
  }

  get calenderbtn() {
    return $("//div[text()='Calendar']/parent::div");
  }
  get buyticket() {
    return $$(`//a[text()='Buy Tickets']`);
  }
  get closeAdd() {
    return $("//button[@class='btn btn-plain']");
  }
  get heading() {
    return $("//img[@alt='leasbl2cuxzz4ypozygg']");
  }
  get continuebtn() {
    return $("//span[text()='Continue']");
  }
  get eventCardTiltle() {
    return $(`//div[@class='EventCard_title__4Vkof']`);
  }
  get headerLogo() {
    return $("//div[@class='lg']");
  }
  get eventHeader() {
    return $("//h1[@data-bdd='event-header-title']");
  }
  get eventdate() {
    return $("//span[@data-bdd='event-header-date']");
  }
  get chatBtn(){
    return $("//button[@class='btn btn-primary _1MKah']");
  }
  get closechat(){
    return $("//button[@aria-label='Close Chat Popup']");
  }
  async calender() {
    await browser.setTimeout({ implicit: 5000 });
    await this.closeAdd.click();
    await this.calenderbtn.click();
    await browser.setTimeout({ implicit: 5000 });
  }

  async buytickets() {
    for (let index = 1; index < (await this.buyticket.length); index++) {
      await this.buyticket[index].click();
      const windowHandles = await browser.getWindowHandles();
      await browser.switchToWindow(windowHandles[1]);
      await browser.closeWindow();
      await browser.switchToWindow(windowHandles[0]);
    }
  }

  async closingAdd() {
    await this.closeAdd.click();
  }

  async validatingEvents() {
    let dateEleLength = this.dateEle.length;
    let timeEleLenght = this.timeEle.length;
    let nameEleLength = this.nameEle.length;
    for (let index = 1; index < this.buyTicketEle.length/3; index++) {
      expect(await buyTicketEle.isDisplayed()).to.be.true;
      if (dateEleLength != 0) {
        expect(await this.dateEle.isDisplayed()).to.be.true;
        dateEleLength--;
      }
      if (timeEleLenght != 0) {
        expect(await this.timeEle.isDisplayed()).to.be.true;
        timeEleLenght--;
      }
      if (nameEleLength != 0) {
        expect(await this.nameEle.isDisplayed()).to.be.true;
        nameEleLength--;
      }
    }
  }
  async visualTesting(){
    await this.closeAdd.click();
    await this.chatBtn.click();
    await browser.pause(10000);
    expect(await browser.checkElement(await $("#satisfi_dialog-title"),'Image_positive',{})).to.equal(0);
    await this.closechat.click();
    await browser.pause(10000);
    await this.chatBtn.click();
    await browser.pause(10000);
   expect(await browser.checkElement(await $("#satisfi_dialog-title"),'Image_positive',{})).to.equal(0);
  }
  async visual_Negative(){
    expect(await browser.checkScreen("Image_Negative"), {}).to.equal(0);
    await this.closeAdd.click();
    expect(await browser.checkScreen("Image_Negative"), {}).to.equal(0);
  }

}

module.exports = new VenuPage();

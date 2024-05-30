const { assert, expect } = require("chai");
class EventPage {
  get showtimesTitle() {
    return $("(//h2[contains(text(),'tickets')]/parent::div/div/div)[1]");
  }
  get monthEle() {
    return $("(//h2[contains(text(),'tickets')]/parent::div/div/div/h6)[1]");
  }
  get dateEle() {
    return $(
      "(//h2[contains(text(),'tickets')]/following::ul/li/div/div/div)[1]"
    );
  }
  get timeEle() {
    return $("(//h2[contains(text(),'tickets')]/following::ul/li//button)[1]");
  }
  //after clicking time btn
  get popup_showTime() {
    return $("//h6[text()='Showtime selected']");
  }
  get popup_timeEle() {
    return $("(//h6[text()='Showtime selected']/following::h2)[1]");
  }
  get popup_buyTicket() {
    return $("//a[@id='buy-tickets-btn-calendar-ga']");
  }
  //after clicking buy ticket btn in pop up
  get acceptBtn() {
    return $("//span[text()='Accept']");
  }
  get sellTicket() {
    return $("//span[text()='Sell Tickets']");
  }

  get videoEle() {
    return $("//div[@class='Video_full-screen-video-container__9nVfy']/video");
  }
  get videoSrc() {
    return $(
      "//div[@class='Video_full-screen-video-container__9nVfy']//source"
    );
  }
  get pauseVideo() {
    return $("//div[@aria-label='pause video']");
  }
  get playVideo() {
    return $("//div[@aria-label='play video']");
  }
  get buyTicketBtn() {
    return $("(//button[contains(text(),'Buy')])[1]");
  }
  get videoCorosalEle() {
    return $$("//div[contains(@class,'TileCarousel_tile__wIPWq')]");
  }
  get corosalArrow(){
    return $("(//div[@class='TileCarousel_slick-arrow-custom__XqtFd'])[2]")
  }
  async showTimes() {
    await browser.setTimeout({ implicit: 5000 });
    expect(await this.showtimesTitle.isDisplayed()).to.be.true;
  }
  async validateCalendarComponent() {
    await browser.setTimeout({ implicit: 5000 });
    expect(await this.monthEle.isDisplayed()).to.be.true;
    expect(await this.dateEle.isDisplayed()).to.be.true;
    expect(await this.timeEle.isDisplayed()).to.be.true;
  }
  async viewEventInfo() {
    await this.timeEle.click();
    expect(await this.popup_showTime.isDisplayed()).to.be.true;
    expect(await this.popup_timeEle.isDisplayed()).to.be.true;
    expect(await this.popup_buyTicket.isDisplayed()).to.be.true;
  }
  async buyTickets() {
    await this.popup_buyTicket.click();
  }
  async validateAutoPlay() {
    for (let index = 1; index < (await this.videoCorosalEle.length-1); index++) {
      await browser.setTimeout({ implicit: 5000 });
      const isAutoplay = await this.videoEle.getAttribute("autoplay");
      console.log(`Video autoplay: ${isAutoplay != null}`);
      expect(isAutoplay).to.not.be.null;
      const isLooping = await this.videoEle.getAttribute("loop");
      console.log(`Video looping: ${isLooping != null}`);
      expect(isLooping).to.not.be.null;
      const type = await this.videoSrc.getAttribute("type");
      console.log(`Source type: ${type}`);
      expect(type).to.equal("video/mp4");
      await browser.setTimeout({ implicit: 5000 });
      expect(await this.pauseVideo.isDisplayed()).to.be.true;
      await this.pauseVideo.click();
      await browser.setTimeout({ implicit: 5000 });
      expect(await this.playVideo.isDisplayed()).to.be.true;
      await this.playVideo.click();
      await browser.setTimeout({ implicit: 5000 });
      const duration = await this.videoEle.getProperty("duration");
      console.log(`Video duration: ${duration}`);
      await this.corosalArrow.click();
    }
  }
  async clickbuyTicket() {
    await this.buyTicketBtn.waitForClickable({ timeout: 10000 });
    await this.buyTicketBtn.click();
  }
}
module.exports = new EventPage();

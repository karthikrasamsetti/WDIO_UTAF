const { driver } = require("@wdio/globals")

module.exports = function platform () {
    return driver.isAndroid ? 'android' : 'ios';
}

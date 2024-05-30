const merge = require("deepmerge");
const wdioConf = require("./wdio.conf");
require("dotenv").config();

exports.config = merge(
  wdioConf.config,
  {
    capabilities: [
      {
        maxInstances: 1,
        browserName: "chrome",
        "goog:chromeOptions": {
          args: [
             "--headless",
            "--disable-gpu",
            "--no-sandbox",
            "--disable-dev-shm-usage",
          ],
        },
        acceptInsecureCerts: true,
      },
    ],
    services: ["chromedriver"],
  },
  { clone: false }
);

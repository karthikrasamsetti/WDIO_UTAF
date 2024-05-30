const merge = require("deepmerge");
const wdioConf = require("./wdio.conf");
require("dotenv").config();

exports.config = merge(
  wdioConf.config,
  {
    capabilities: [
      {
        maxInstances: 1,
        browserName: "MicrosoftEdge",
        "ms:edgeOptions": {
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
    services: ["edgedriver"],
  },
  { clone: false }
);

const { generate } = require("multiple-cucumber-html-reporter");
const { removeSync } = require("fs-extra");
const { attach } = require("wdio-cucumberjs-json-reporter");
const { expect } = require("chai").expect;
const path = require("path");
require("dotenv").config();
const { Reporter } = require("@reportportal/agent-js-webdriverio");
const RPClient = require("@reportportal/client-javascript");
const glob = require("glob");
const fs = require("fs");
let startTime;
let endTime;
const RPconfig = {
  apiKey:
    "MSG_ar4YdRVzQbSlxLdQvMa6I5qpsNgOZJIAvcLfdmDkdfEOR30tNbA2AennvzpSIj6P",
  endpoint: "http://10.10.90.97:8080/api/v1",
  launch: "Regression",
  project: "msg_poc",
  description: "WDIO Cucumber",
  attributes: [
    {
      key: "tool",
      value: "Cucumber",
    },
  ],
  description: "MSG POC with WDIO",
  restClientConfig: {
    timeout: 0,
  },
  // includeTestSteps: true,
  skippedIssue: false,
  isLaunchMergeRequired: true,
  attachPicturesToLogs: true,
};
exports.config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO supports running e2e tests as well as unit and component tests.

  runner: "local",

  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // of the configuration file being run.
  //
  // The specs are defined as an array of spec files (optionally using wildcards
  // that will be expanded). The test for each spec file will be run in a separate
  // worker process. In order to have a group of spec files run in the same worker
  // process simply enclose them in an array within the specs array.
  //
  // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
  // then the current working directory is where your `package.json` resides, so `wdio`
  // will be called from there.
  //
  specs: ["./features/msg.feature","./features/thesphere.feature"],
  exclude: ["./features/mobile.feature"],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  // maxInstances: 1,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://saucelabs.com/platform/platform-configurator
  //
  capabilities: [],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: "error",
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/appium-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,

  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  // baseUrl: "http://localhost",
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 40000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: [
    [
      "visual",
      {
        baselineFolder: path.join(process.cwd(), "./baselineImages/"),
        formatImageName: "{tag}-{logName}",
        screenshotPath: path.join(process.cwd(), "/actualImages/"),
        savePerInstance: true,
        autoSaveBaseline: true,
        blockOutStatusBar: true,
        blockOutToolBar: true,
      },
    ],
  ],

  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: "cucumber",
  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter
  reporters: [
    // Like this with the default options, see the options below
    ["cucumberjs-json", { jsonFolder: ".tmp/json/", language: "en" }],
    [Reporter, RPconfig],
  ],
  before: async (capabilities, specs) => {
    global.expect = expect;
  },

  //
  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    // <string[]> (file/dir) require files before executing features
    require: ["./features/step-definitions/ui/*.js"],
    // <boolean> show full backtrace for errors
    backtrace: false,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    requireModule: [],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <boolean> abort the run on first failure
    failFast: false,
    // <boolean> hide step definition snippets for pending steps
    snippets: true,
    // <boolean> hide source uris
    source: true,
    // <boolean> fail if there are any undefined or pending steps
    strict: false,
    // <string> (expression) only execute the features or scenarios with tags matching the expression
    tagExpression: "",
    // <number> timeout for step definitions
    timeout: 120000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
    //after: function (scenarioResult) {},
  },

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (config, capabilities) {
    removeSync(".tmp/json/");
    startTime = new Date();
  },
  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {[type]} args     object that will be merged with the main configuration once worker is initialized
   * @param  {[type]} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just after a worker process has exited.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {Number} exitCode 0 - success, 1 - fail
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {Number} retries  number of retries used
   */
  // onWorkerEnd: function (cid, exitCode, specs, retries) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   * @param {String} cid worker id (e.g. 0-0)
   */

  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {Object}         browser      instance of created browser/device session
   */
  // before: function (capabilities, specs) {
  // },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Cucumber Hooks
   *
   * Runs before a Cucumber Feature.
   * @param {String}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  // beforeFeature: function (uri, feature) {
  // },
  /**
   *
   * Runs before a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
   * @param {Object}                 context  Cucumber World object
   */
  // beforeScenario: function (world, context) {
  // },
  /**
   *
   * Runs before a Cucumber Step.
   * @param {Pickle.IPickleStep} step     step data
   * @param {IPickle}            scenario scenario pickle
   * @param {Object}             context  Cucumber World object
   */
  // beforeStep: function (step, scenario, context) {
  // },
  /**
   *
   * Runs after a Cucumber Step.
   * @param {Pickle.IPickleStep} step             step data
   * @param {IPickle}            scenario         scenario pickle
   * @param {Object}             result           results object containing scenario results
   * @param {boolean}            result.passed    true if scenario has passed
   * @param {string}             result.error     error stack if scenario failed
   * @param {number}             result.duration  duration of scenario in milliseconds
   * @param {Object}             context          Cucumber World object
   */

  afterStep: async function (Step, Scenario, result) {
    const stepName = Scenario.name;
    if (!result.passed) {
      let screenshotPath;
      let screenshotPath_actual;
      let screenshotPath_baseLine;
     if (stepName == "Visual testing Negative case") {
        screenshotPath_actual = path.join(
          process.cwd(),
          "actualImages/actual/desktop_chrome-headless-shell/",
          "Image_Negative-.png"
        );
        screenshotPath_baseLine = path.join(
          process.cwd(),
          "baselineImages/desktop_chrome-headless-shell/",
          "Image_Negative-.png"
        );
        screenshotPath = path.join(
          process.cwd(),
          "actualImages/diff/desktop_chrome-headless-shell/",
          "Image_Negative-.png"
        );
        const absolutePath = path.resolve(screenshotPath);
        const absolutePath1 = path.resolve(screenshotPath_actual);
        const absolutePath2 = path.resolve(screenshotPath_baseLine);
        const imageDiffScreenshot = fs.readFileSync(absolutePath, "base64");
        const actualImgScreenshot = fs.readFileSync(absolutePath1, "base64");
        const baselineScreenshot = fs.readFileSync(absolutePath2, "base64");
        attach("BaseLine Image", "text/plain");
        attach(baselineScreenshot, "image/png");
        attach("Actual Image", "text/plain");
        attach(actualImgScreenshot, "image/png");
        attach("Difference we are getting while comparing Actual and Baseline images", "text/plain");
        attach(imageDiffScreenshot, "image/png");
      } else {
        const screenshot = await browser.takeScreenshot();
        attach(screenshot, "image/png");
      }
    }
  },
  /**
   *
   * Runs after a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
   * @param {Object}                 result           results object containing scenario results
   * @param {boolean}                result.passed    true if scenario has passed
   * @param {string}                 result.error     error stack if scenario failed
   * @param {number}                 result.duration  duration of scenario in milliseconds
   * @param {Object}                 context          Cucumber World object
   */
  afterScenario: async function (world, result, context) {
    await browser.reloadSession();
  },
  /**
   *
   * Runs after a Cucumber Feature.
   * @param {String}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  // afterFeature: function (uri, feature) {
  // },

  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */

  onComplete: async function (exitCode, config, capabilities, results) {
    endTime = new Date();
    const formatDate = (date) => {
      return date.toLocaleString("en-US", { timeZone: "IST" });
    };
    const executionStartTime = formatDate(startTime);
    const executionEndTime = formatDate(endTime);
    const durationMillis = endTime - startTime;
    const duration = new Date(durationMillis).toISOString().substr(11, 8);
    // First part: generate report
    generate({
      jsonDir: ".tmp/json/",
      reportPath: ".tmp/report/",
      customData: {
        title: "Run info",
        data: [
          { label: "Project", value: "wdio" },
          { label: "Execution Start Time", value: executionStartTime },
          { label: "Execution End Time", value: executionEndTime },
          { label: "Duration", value: duration },
        ],
      },
    });

    // Second part: merge launches if required
    if (RPconfig.isLaunchMergeRequired) {
      try {
        const client = new RPClient(RPconfig);
        await client.mergeLaunches();
        console.log("Launches successfully merged!");
      } catch (error) {
        console.error(error);
      } finally {
        const files = glob.sync("rplaunch-*.tmp");
        const deleteTempFile = (filename) => {
          fs.unlinkSync(filename);
        };
        files.forEach(deleteTempFile);
      }
    }
  },

  /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
  // onReload: function(oldSessionId, newSessionId) {
  // }
};

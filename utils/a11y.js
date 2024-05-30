const axeSource = require('axe-core').source;
const { createHtmlReport } = require('axe-html-reporter');

async function runAccessibilityTests(){
    await browser.execute(axeSource);
 
    const results = await browser.executeAsync(function (done) {
        axe.run(
            {
                runOnly: {
                    type: 'tag',
                    values: ['wcag2a', 'wcag2aa', 'best-practice']
                }
            },
            (err, result) => {
                if (err) done(err);
                done(result);
            }
        );
    });
 
    createHtmlReport({
        results: results,
        options: {
            projectKey: "thesphere.com",
            reportFileName: 'accessibilityReport.html',
            outputDir: ".tmp/report/",
        },
    });
    return results;
}

module.exports = runAccessibilityTests;
// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

import auth from '../../../src/api/auth'



module.exports = {
    /*before : function(browser) {
        var site = browser.globals.site;
        console.log(site);
    },*/
    'Login Test with SSO': function (browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer+'/login')
            .waitForElementVisible('body',2000)
            .setValue('input[type=text]', 'dev@wirelessanalytics.com')
            .click('.button',function () {
                auth.login(this,'dev@wirelessanalytics.com', 'dashboard');
                console.log('clicked');
            })
            .waitForElementVisible('body',2000)
            .waitForElementVisible('input#cred_userid_inputtext',2000)
            .waitForElementVisible('input#cred_password_inputtext',2000)
            .setValue('input#cred_userid_inputtext','dev@wirelessanalytics.com')
            .setValue ('input#cred_password_inputtext', 'Test@ccount' )
            .waitForElementVisible('#cred_sign_in_button',2000)
            .submitForm('#credentials', function () {
            console.log('Submit form <#signupForm>');

            })
            .pause(2000)

    },
    ' Client Data render properly': function (browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        const devServer = browser.globals.devServerURL
        browser

            .assert.urlEquals(devServer+'/dashboard')
            .waitForElementVisible('body', 1000)
            .waitForElementVisible ('.avatar', 2000)
            .waitForElementVisible ('.greeting', 2000)
            .assert.containsText(".greeting", "Hi, Wireless Analytics")
            .waitForElementVisible('.client-info h2', 2000)
            .assert.containsText(".callout h2", "Wireless Analytics")

    },
    ' Client charge data': function (browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        const devServer = browser.globals.devServerURL

        browser

            .waitForElementVisible('.wireless-overview', 2000)
            .waitForElementVisible ('table.responsive',2000)
            .isVisible('table.responsive td', results => {
                if (results.value) {
                    console.log('Client charge data loaded successfully')
                }
                else { console.log("Client charge data isn't loaded")  }
            })


    },
    ' Support Request': function (browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        const devServer = browser.globals.devServerURL

        browser

            .waitForElementVisible('.btn-provision', 2000)
            .click('.btn-provision',function () {
                console.log('clicked for support-form');
            })
            .waitForElementVisible ('.support-form-holder',2000)



    },
    ' Side Menu Test': function (browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        const devServer = browser.globals.devServerURL
        browser
            .waitForElementVisible('#menu', 2000)
            .waitForElementVisible('.treeview a',2000)
            .click('.treeview a',function () {
                console.log('Click for Submenu');
            })
            .waitForElementVisible('.page-link a',2000)
            .click('.page-link a',function () {
                console.log('Redirected to legacy site');
            })
            .pause(3000)
            .assert.urlEquals('https://app.wirelessanalytics.com/platform/login.asp')
            .end()

    }


}

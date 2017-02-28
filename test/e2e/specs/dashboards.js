
module.exports = {

  before: function(browser) {
    const devServer = browser.globals.devServerURL;
  browser
    .url(devServer)
    .login('Sample3433@email.com', 'user')

},

' Client Data render properly': function (browser) {
const devServer = browser.globals.devServerURL;
    browser
        .assert.urlEquals(devServer+'/dashboard')
        .waitForElementVisible('body', 1000)
        .waitForElementVisible ('.avatar', 2000)
        .waitForElementVisible ('.greeting', 5000)
        .execute(function(data) {
                try {
              return  JSON.parse(localStorage.getItem("userProfile")).firstName
                } catch(e) {
                    return e

                }
            }, [], function(result) {
            browser.assert.containsText(".greeting",result.value )
            })



},
/*' Client charge data': function (browser) {

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
  }*/



' Support Request': function (browser) {
    browser
        .waitForElementVisible('.btn-provision', 2000)
        .click('.btn-provision',function () {
            console.log('clicked for support-form');
        })
        .waitForElementVisible ('.support-form-holder',25000)
        .click("#btn-close")



},

'Logout': function (browser) {
browser
      .waitForElementVisible('.float-right', 2000)
  .click('.float-right')
         .click('#logout')
         .waitForElementVisible('#email', 25000)
         .end()

},


}

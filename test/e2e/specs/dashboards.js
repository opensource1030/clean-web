module.exports = {
  before: function (browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .url(devServer)
    .login('Sample3433@email.com', 'user')
  },

  'Client Data render properly': function (browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .assert.urlEquals(devServer + '/dashboard')
    .waitForElementVisible('body', 1000)
    .waitForElementVisible ('.avatar', 2000)
    .waitForElementVisible ('.greeting', 5000)
    .execute(function (data) {
      try {
        return JSON.parse(localStorage.getItem("userProfile")).firstName
      } catch(e) {
        return e
      }
    }, [], function (result) {
      browser.assert.containsText(".greeting",result.value )
    })
  },

  'MorphSearch':function (browser){
    browser
    .waitForElementVisible('.morphsearch', 2000)
    .click('.morphsearch')
    .waitForElementVisible('.morphsearch-close', 2000)
    .pause(1000)
    .click('.morphsearch-close')
  },

  // 'Client charge data': function (browser) {
  //   const devServer = browser.globals.devServerURL
  //   browser
  //   .waitForElementPresent('.wireless-overview table', 15000)
  //   .click('.choose-issues')
  //   .click('option')
  //   .waitForElementVisible('.support-form-holder')
  // },

  'Support Request': function (browser) {
    browser
    .waitForElementVisible('.btn-provision', 2000)
    .click('.btn-provision')
    .waitForElementVisible ('.support-form-holder',25000)
    .click("#btn-close")
  },

  'Side Menu Test': function (browser) {
    browser
    .waitForElementVisible('#menu', 2000)
    .waitForElementVisible('a[name="Inventory"]', 15000)
    .click('a[name="Inventory"]')
    .waitForElementVisible('a[name="Devices"]', 25000)
    .waitForElementVisible('a[name="services"]', 25000)
    // .click('a[name="services"]')
    // .windowHandles(function(result) {
    //   let newWindow;
    //   this.verify.equal(result.value.length, 3, 'There should be 3 windows open');
    // })
    // .pause(3000)
    .waitForElementVisible('a[name="Polices"]', 15000)
    .click('a[name="Polices"]')
    .waitForElementVisible('a[name="AllPackages"]', 5000)
    .waitForElementVisible('a[name="createPackage"]', 5000)
    .click('a[name="presets"]')
    .waitForElementVisible('a[name="device"]', 5000)
    .waitForElementVisible('a[name="app"]', 5000)
    .waitForElementVisible('a[name="address"]', 5000)
    .click('a[name="configuration"]')
    .waitForElementVisible('a[name="portal"]', 5000)
    .waitForElementVisible('a[name="procurement"]', 5000)
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
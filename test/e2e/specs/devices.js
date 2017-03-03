


module.exports = {
  before: function(browser) {
    const devServer = browser.globals.devServerURL;
  browser
    .url(devServer)
    .login('Sample3433@email.com', 'user')
    .routes('Inventory','Devices')



},
' DevicesList': function (browser) {
const devServer = browser.globals.devServerURL;
    browser
      .assert.urlEquals(devServer+'/devices')
        .waitForElementVisible('#app  #tables', 15000)
      .waitForElementVisible('table', 5000)
      .waitForElementVisible('tbody', 5000)
      .waitForElementVisible('#open', 5000)
      .click('#open')
        .waitForElementVisible('.detail', 5000)
        .waitForElementVisible('.information span', 5000)
        .assert.containsText(".information span","Technical Information" )
    .pause(1000)

},
'AddDevice': function (browser) {
  const devServer = browser.globals.devServerURL;
      browser
            .click('.buttonTable')
        .assert.urlEquals(devServer+'/device')

},
'ManageDevice': function (browser) {


}

}

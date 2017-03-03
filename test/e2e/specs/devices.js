


module.exports = {
  before: function(browser) {
    const devServer = browser.globals.devServerURL;
  browser
    .url(devServer)
    .login('rgonzalez@zipcar.com', 'zpncdlliptncojmyaqko')
    .routes('Inventory','Devices')
      .waitForElementVisible('#app  #tables', 15000)
      .assert.urlEquals(devServer+'/devices')

},
' DevicesList': function (browser) {
const devServer = browser.globals.devServerURL;
    browser
    .pause(1000)








}

}

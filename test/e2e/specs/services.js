module.exports = {
before: function(browser) {
  const devServer = browser.globals.devServerURL;
browser
  .url(devServer)
  .login('Sample3433@email.com', 'user')
  .routes('Inventory','services')
},
' ServicesList': function (browser) {
const devServer = browser.globals.devServerURL;
  browser
    .assert.urlEquals(devServer+'/services')
      .waitForElementVisible('#app  #tables', 15000)
    .waitForElementVisible('table', 5000)
    .waitForElementVisible('tbody', 5000)
    .waitForElementVisible('#open', 5000)
    .click('#open')
    .waitForElementVisible('#updateService', 5000)
    .click('#updateService')

    //  .waitForElementVisible('.detail', 5000)
//  .pause(1000)
},

' ManageService': function (browser) {
const devServer = browser.globals.devServerURL;
  browser
  .assert.urlEquals(devServer+'/service/3')
.pause()

//  .pause(1000)
}


}

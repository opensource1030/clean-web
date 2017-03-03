


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
            .end()

}

}

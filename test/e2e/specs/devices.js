


module.exports = {
  before: function(browser) {
    const devServer = browser.globals.devServerURL;
  browser
    .url(devServer)
    .login('Sample3433@email.com', 'user')

},

}

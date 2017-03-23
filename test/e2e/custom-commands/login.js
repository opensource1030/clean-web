exports.command = function(email, password, callback) {
    var self = this;
    this
        .frame(null)
        .waitForElementPresent('#app',5000)
        .waitForElementVisible('#email', 5000)
          .setValue('#app #email', email)
          .click('#app .button')
          .waitForElementVisible('input[type=password]', 15000)
          .waitForElementVisible('#email', 5000)
          .setValue('input[type=password]', password)
          .click('input[type=submit]')
          .waitForElementVisible ('.greeting', 15000)


    return this;
};

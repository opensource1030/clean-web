const path = require('path')

module.exports = {
  before: function (browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .url(devServer)
    .login('Sample3433@email.com', 'user')
    .waitForElementVisible('a[name="configuration"]', 25000)
    .click('a[name="configuration"]')
    .waitForElementVisible('a[name="employees"]', 25000)
    .click('a[name="employees"]')
  },

'EmployeeIndex': function (browser) {
    const devServer = browser.globals.devServerURL;
    const client = browser
    browser
    .waitForElementVisible('table tbody', 25000)
    .assert.urlEquals(devServer + '/employees')
    .click('label[for="status-1"]')
    .element('css selector', '#status-1', function (response) {
      client.assert.ok(response.value.ELEMENT, 'checkbox present')
      client.elementIdSelected(response.value.ELEMENT, function (result) {
        client.verify.equal(result.value, false, 'checkbox deselected')
      })
    })
  },

  'EmployeeCreate': function (browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .waitForElementVisible('table tbody', 25000)
    .click('.add-button')
    .waitForElementVisible('.grid-box.overview input[name="employee-email"]', 25000)
    .assert.urlEquals(devServer + '/employees/new')
    .setValue('.grid-box.overview input[name="employee-email"]', 'abc@email.com')
    .setValue('.grid-box.overview input[name="employee-username"]', 'abc')
    .click('.grid-box.overview select[name="employee-company"] option:nth-child(2)')
    .setValue('.grid-box.overview input[name="employee-first-name"]', 'fname')
    .setValue('.grid-box.overview input[name="employee-last-name"]', 'lname')
    .setValue('.grid-box.overview input[name="employee-location"]', '')
    .setValue('.grid-box.overview textarea[name="employee-notes"]', 'Here goes notes')
    .click('label[for="active-0"]')
    .click('.save-button')
    .waitForElementVisible('table tbody', 25000)
    .assert.urlEquals(devServer + '/employees')
  },

  'EmployeeUpdate': function (browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .waitForElementVisible('table tbody', 25000)
    .click('a[name="edit-1"]')
    .waitForElementVisible('.grid-box.overview input[name="employee-email"]', 25000)
    .assert.urlContains(devServer + '/employees/')
    .click('.save-button')
    .waitForElementVisible('table tbody', 25000)
    .assert.urlEquals(devServer + '/employees')
    // .pause()
    .end()
  },
}
const path = require('path')

module.exports = {

  before: function (browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .url(devServer)
    .login('Sample3433@email.com', 'user')
    .waitForElementVisible('a[name="configuration"]', 15000)
    .click('a[name="configuration"]')
    .waitForElementVisible('a[name="companies"]', 25000)
    .click('a[name="companies"]')
    .pause(5000)
  },

  'CompaniesList': function (browser) {
    const devServer = browser.globals.devServerURL;
    const client = browser
    browser
    .waitForElementVisible('table tbody', 25000)
    .assert.urlEquals(devServer + '/companies')
    .click('label[for="status-1"]')
    .element('css selector', '#status-1', function (response) {
      client.assert.ok(response.value.ELEMENT, 'checkbox present')
      client.elementIdSelected(response.value.ELEMENT, function (result) {
        client.verify.equal(result.value, false, 'checkbox deselected')
      })
    })
    // .waitForElementVisible('.detail', 5000)
    // .waitForElementVisible('.information span', 5000)
    // .assert.containsText(".information span", "Technical Information")
    // .pause(1000)
  },

  'CreateCompany': function (browser) {
    const devServer = browser.globals.devServerURL;
    let client = browser;
    // console.log('dirname', __dirname)
    const imagePath = path.join(__dirname, '../../../src/assets/test')
    // console.log('image_path', imagePath)
    browser
    .click('.add-button')
    .pause(1000)
    .waitForElementVisible('.grid-box.overview input[name="company-name"]', 25000)
    .assert.urlEquals(devServer + '/companies/new')
    .setValue('.grid-box.overview input[name="company-name"]', 'ABC Co.Ltd')
    .setValue('.grid-box.overview input[name="company-shortname"]', 'ABC')
    // .click('label[for="FileUpload"]')
    // .setValue('input#FileUpload', imagePath + '/wa-logo.png')
    .waitForElementVisible('.grid-box.udl input[name="udl-key"]', 5000)
    .click('.add-udl-button')
    .setValue('.grid-box.udl .udl-wrapper:nth-child(1) input[name="udl-key"]', 'department')
    // .setValue('.grid-box.udl .udl-wrapper:nth-child(1) input[name="udl-value"]', 'human resource,financial analytics,technical support')
    .execute(function () {
      $('.grid-box.udl .udl-wrapper:nth-child(1) input[name="udl-value"]').tagEditor('addTag', 'human resource')
      $('.grid-box.udl .udl-wrapper:nth-child(1) input[name="udl-value"]').tagEditor('addTag', 'financial analytics')
      $('.grid-box.udl .udl-wrapper:nth-child(1) input[name="udl-value"]').tagEditor('addTag', 'technical support')
    }, [])
    .setValue('.grid-box.udl .udl-wrapper:nth-child(2) input[name="udl-key"]', 'skill')
    .execute(function () {
      $('.grid-box.udl .udl-wrapper:nth-child(2) input[name="udl-value"]').tagEditor('addTag', 'html')
      $('.grid-box.udl .udl-wrapper:nth-child(2) input[name="udl-value"]').tagEditor('addTag', 'css')
      $('.grid-box.udl .udl-wrapper:nth-child(2) input[name="udl-value"]').tagEditor('addTag', 'js')
      $('.grid-box.udl .udl-wrapper:nth-child(2) input[name="udl-value"]').tagEditor('addTag', 'jquery')
    }, [])
    .click('.save-button')
    .pause(5000)
    .waitForElementVisible('table tbody', 25000)
    .assert.urlEquals(devServer + '/companies')
  },

  'UpdateCompany': function (browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .waitForElementVisible('table tbody', 25000)
    .click('a[name="edit-1"]')
    .pause(5000)
    .waitForElementVisible('.grid-box.overview input[name="company-name"]', 25000)
    .assert.urlContains(devServer + '/companies/')
    .click('.save-button')
    .pause(5000)
    .waitForElementVisible('table tbody', 25000)
    .assert.urlEquals(devServer + '/companies')
    // .pause()
    .end()
  }
}
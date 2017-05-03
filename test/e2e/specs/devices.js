const path = require('path')

module.exports = {

  before: function (browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .resizeWindow(1200, 800)
    .url(devServer)
    .login('Sample3433@email.com', 'user')
    // .routes('Inventory', 'Devices')
    .waitForElementVisible('a[name="Inventory"]', 25000)
    .click('a[name="Inventory"]')
    .waitForElementVisible('a[name="Devices"]', 25000)
    .click('a[name="Devices"]')
    .pause(5000)
  },

  'DevicesList': function (browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .assert.urlEquals(devServer + '/devices')
    // .waitForElementVisible('#app #tables', 15000)
    .waitForElementVisible('table', 25000)
    .waitForElementVisible('tr.overview-tr .toggle-button', 5000)
    .click('.toggle-button')
    .waitForElementVisible('.detail-box', 5000)
    .waitForElementVisible('.information span', 5000)
    .assert.containsText(".information span", "Technical Information")
  },

  'AddDevice': function (browser) {
    const devServer = browser.globals.devServerURL;
    let client = browser;
    // console.log('dirname', __dirname)
    const imagePath = path.join(__dirname, '../../../src/assets/test')
    // console.log('image_path', imagePath)
    browser
    .click('.add-button')
    .waitForElementVisible('.devicename input', 25000)
    .assert.urlEquals(devServer + '/devices/new')
    .setValue('.devicename input', 'moto g')

    // .elements('link text', 'Device Overview', function (result) {
    //   client.elementIdClick(result.value[0].ELEMENT)
    // })
    // .waitForElementVisible('#testDefaultPrice', 5000)
    .setValue('#testDefaultPrice', '123')
    .click("#testMoney option[value='USD']")
    .click("#testDeviceType option[value='2']")
    .setValue('#testManu', 'motorola')
    .setValue('#testModel', 'moto x')
    .setValue('#testInfo', 'mobile phone x')
    // .setValue('input#FileUpload', imagePath + '/wa-logo.png')

    .elements('link text', 'Attributes', function (result) {
      client.elementIdClick(result.value[0].ELEMENT)
    })
    .waitForElementVisible('input[name="capacities"]', 5000)
    .element('name', 'capacities', function (response) {
      client.assert.ok(response.value.ELEMENT, 'checkbox present')
      client.click('input[name="capacities"]')
      client.elementIdSelected(response.value.ELEMENT, function (result) {
        client.verify.ok(result.value, 'Checkbox selected')
      })
    })
    .element('name', 'styles', function (response) {
      client.assert.ok(response.value.ELEMENT, 'checkbox present')
      client.click('input[name="styles"]')
      client.elementIdSelected(response.value.ELEMENT, function (result) {
        client.verify.ok(result.value, 'Checkbox selected')
      })
    })

    .elements('link text', 'Vendors', function (result) {
      client.elementIdClick(result.value[0].ELEMENT)
    })
    // .waitForElementVisible('input[name="carriers"][value="2"]', 15000)
    // .click('input[name="carriers"][value="2"]')
    .waitForElementVisible('label[for="carrier-2"]', 15000)
    .click('label[for="carrier-2"]')
    .pause(1000)
    .element('css selector', 'input[name="carriers"][value="2"]', function (response) {
      // console.log('input[name="carriers"][value="2"]', response)
      client.assert.ok(response.value.ELEMENT, 'checkbox present')
      // client.elementIdSelected(response.value.ELEMENT, function (result) {
      //   client.verify.ok(result.value, 'checkbox selected')
      // })
    })
    .waitForElementVisible('label[for="carrier-4"]', 15000)
    .click('label[for="carrier-4"]')
    .pause(1000)
    .element('css selector', 'input[name="carriers"][value="4"]', function (response) {
      client.assert.ok(response.value.ELEMENT, 'checkbox present')
      // client.elementIdSelected(response.value.ELEMENT, function (result) {
      //   client.verify.ok(result.value, 'checkbox selected')
      // })
    })

    .elements('link text', 'Companies', function (result) {
      client.elementIdClick(result.value[0].ELEMENT)
    })
    .waitForElementVisible('label[for="company-2"]', 15000)
    .click('label[for="company-2"]')
    .pause(1000)
    .element('css selector', 'input[name="companies"][value="2"]', function(response) {
      client.assert.ok(response.value.ELEMENT, 'checkbox present')
      // client.elementIdSelected(response.value.ELEMENT, function (result) {
      //   client.verify.ok(result.value, 'checkbox selected')
      // })
    })
    .waitForElementVisible('label[for="company-3"]', 15000)
    .click('label[for="company-3"]')
    .pause(1000)
    .element('css selector', 'input[name="companies"][value="3"]', function(response) {
      client.assert.ok(response.value.ELEMENT, 'checkbox present')
      // client.elementIdSelected(response.value.ELEMENT, function (result) {
      //   client.verify.ok(result.value, 'checkbox selected')
      // })
    })

    .elements('link text', 'Prices', function (result) {
      client.elementIdClick(result.value[0].ELEMENT)
    })
    .waitForElementVisible('.prices-content input.input-group-field.price-retail', 15000)
    .setValue('.prices-content input.input-group-field.price-retail', '110')
    .setValue('.prices-content input.input-group-field.price-one', '11')
    .setValue('.prices-content input.input-group-field.price-two', '12')
    .setValue('.prices-content input.input-group-field.price-own', '13')
    .click('.prices-content select.dv-capacity option[value="0"]')
    .pause(1000)
    .click('.prices-content select.dv-capacity option:nth-child(2)')
    .click('.prices-content select.dv-style option:nth-child(2)')
    .click('.prices-content select.dv-carrier option:nth-child(2)')
    .click('.prices-content select.dv-company option:nth-child(2)')
    .click('.save-button')
    .waitForElementVisible('table', 25000)
    .assert.urlEquals(devServer + '/devices')
  },

  'ManageDevice': function (browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .waitForElementVisible('table', 25000)
    .waitForElementVisible('tr.overview-tr .edit-button', 5000)
    .click('.edit-button')
    .waitForElementVisible('.devicename input ', 25000)
    .assert.urlContains(devServer + '/devices/')
    .click('.save-button')
    .waitForElementVisible('table', 25000)
    .assert.urlEquals(devServer + '/devices')
    // .pause()
    .end()
  }
}
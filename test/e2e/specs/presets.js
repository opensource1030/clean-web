/*
module.exports = {
  before: function(browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .url(devServer)
    .login('Sample3433@email.com', 'user')
    .routes('presets','device')
  },

  'PresetsList': function (browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .pause(10000)
    .assert.urlEquals(devServer+'/presets')
    .waitForElementVisible('#app  #tables', 25000)
    .waitForElementVisible('table', 5000)
    .waitForElementVisible('tbody', 5000)
    .waitForElementVisible('#open', 5000)
    .click('#open')
    .waitForElementVisible('a[name="manage"]', 25000)
    .click('a[name="manage"]')
  //  .waitForElementVisible('#updateService', 5000)
    //    .click('#updateService')
    // .waitForElementVisible('.detail', 5000)
   .pause(10000)
 },

  'ManagePreset': function (browser) {
    const devServer = browser.globals.devServerURL;
    let client =browser;
    browser
    .assert.urlEquals(devServer+'/preset/1')
    .pause(1000)
    .waitForElementVisible('#name', 15000)
 .assert.attributeContains('#name', 'value', 'preset1')
    .waitForElementVisible('table', 5000)
    .waitForElementVisible('tbody', 5000)
    .waitForElementVisible('#open', 5000)
    .click('#open')
    .element('id', 'devicecheck', function(response) {
      client.assert.ok(response.value.ELEMENT, 'Checkbox response OK');
      client.elementIdSelected(response.value.ELEMENT, function(result){
        client.verify.ok(result.value, 'Checkbox selected');
      });
    })
    .elements('link text', 'Selected Devices', function (result) {
      client.elementIdClick(result.value[0].ELEMENT)
    })
    .element('css selector', 'input[name="variations"]', function (response) {
      client.assert.ok(response.value.ELEMENT, 'checkbox present')
       client.elementIdSelected(response.value.ELEMENT, function (result) {
         client.verify.ok(result.value, 'checkbox selected')
      })
    })
   .click('#button')
  },

  'addPreset': function (browser) {
   const devServer = browser.globals.devServerURL;
    let client =browser;
    browser
    .pause(10000)
    .waitForElementVisible('.buttonTable', 25000)
    .assert.urlEquals(devServer+'/presets')
    .click('.buttonTable')
    .waitForElementVisible('#name', 25000)
    .setValue('#name', 'preset3')
    .assert.urlEquals(devServer+'/preset')
    .waitForElementVisible('table', 5000)
    .waitForElementVisible('tbody', 5000)
    .waitForElementVisible('#open', 5000)
    .click('#open')
    .pause(10000)
    .click("#devicecheck")
    .element('id', 'devicecheck', function(response) {
      client.assert.ok(response.value.ELEMENT, 'Checkbox response OK');
      client.elementIdSelected(response.value.ELEMENT, function(result){
        client.verify.ok(result.value, 'Checkbox selected');
      });
    })
  .pause(100)
  .elements('link text', 'Selected Devices', function (result) {

    client.elementIdClick(result.value[0].ELEMENT)
  })
    .click('input[name="variations"]')
    .pause(100)

    .click('#button')
    .end()
  }
}
*/
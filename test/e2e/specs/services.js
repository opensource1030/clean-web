/*
module.exports = {
  before: function(browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .url(devServer)
    .login('Sample3433@email.com', 'user')
    // .routes('Inventory','services')
    .waitForElementVisible('a[name="Inventory"]', 15000)
    .click('a[name="Inventory"]')
    .waitForElementVisible('a[name="services"]', 15000)
    .click('a[name="services"]')
    .pause(5000)
  },

  'ServicesList': function (browser) {
    const devServer = browser.globals.devServerURL;
    browser
    .assert.urlEquals(devServer+'/services')
    // .waitForElementVisible('#app  #tables', 15000)
    .waitForElementVisible('table', 25000)
    .waitForElementVisible('tbody', 5000)
    .waitForElementVisible('#open', 5000)
    // .click('#open')
    // .waitForElementVisible('#updateService', 5000)
    // .click('#updateService')
    // .waitForElementVisible('.detail', 5000)
    // .pause(1000)
  },

  'ManageService': function (browser) {
    const devServer = browser.globals.devServerURL;
    let client = browser;
    browser
    // .waitForElementVisible('#app  #tables', 15000)
    .waitForElementVisible('table', 25000)
    .click('#open')
    .waitForElementVisible('#updateService', 5000)
    .click('#updateService')
    .pause(5000)
    .assert.urlContains(devServer + '/service/')
    .waitForElementVisible('input[name="tittle"]', 25000)
    .assert.attributeContains('input[name="tittle"]', 'value', 'Nisi quis exercitationem voluptas.')
    .setValue('input[name="tittle"]', '')
    .setValue('input[name="tittle"]', 'pooled international plan')
    .waitForElementVisible('input[name="planCode"]', 5000)
    .assert.attributeContains('input[name="planCode"]', 'value', 77239)
    .setValue('input[name="planCode"]', 0)
    .setValue('input[name="planCode"]', 656565)
    .waitForElementVisible('input[name="cost"]', 5000)
    .assert.attributeContains('input[name="cost"]', 'value', 178)
    .setValue('input[name="cost"]', 80)
    .assert.attributeContains('textarea[name="description"]', 'value', "Quia provident laborum eaque deserunt voluptas voluptatem. Cumque blanditiis veritatis a qui. Vitae error ut eveniet accusantium. Neque impedit fugiat quasi consectetur eum. Consequatur voluptatem doloremque impedit nobis.")
    .setValue('textarea[name="description"]', 'hola')
    .click('input[id="status"]')
    .click('input[id="status"]')
    .element('id', 'status', function(response) {
      client.assert.ok(response.value.ELEMENT, 'Checkbox response OK');
      client.elementIdSelected(response.value.ELEMENT, function(result){
        client.verify.ok(result.value, 'Checkbox selected');
      });
    })
    // Domestic Plan
    .waitForElementVisible('input[name="minutesD"]', 5000)
    .assert.attributeContains('input[name="minutesD"]', 'value', 261)
    .setValue('input[name="minutesD"]', 80)

    .waitForElementVisible('input[name="dataD"]', 5000)
    .assert.attributeContains('input[name="dataD"]', 'value', 2)
    .setValue('input[name="dataD"]', 6)

    .waitForElementVisible('input[name="smsD"]', 5000)
    .assert.attributeContains('input[name="smsD"]', 'value', 117)
    .setValue('input[name="smsD"]', 6)

    // International Plan
    .waitForElementVisible('input[name="iminutes"]', 5000)
    .assert.attributeContains('input[name="iminutes"]', 'value', 288)
    .setValue('input[name="iminutes"]', 80)

    .waitForElementVisible('input[name="idata"]', 5000)
    .assert.attributeContains('input[name="idata"]', 'value', 3)
    .setValue('input[name="idata"]', 6)

    .waitForElementVisible('input[name="isms"]', 5000)
    .assert.attributeContains('input[name="isms"]', 'value', 281)
    .setValue('input[name="isms"]', 100)

    // addons
    .waitForElementVisible('input[name="addonDes0"]', 5000)
    .assert.attributeContains('input[name="addonDes0"]', 'value', '')
    .setValue('input[name="addonDes0"]', 'Taum, Taum')
    .assert.attributeContains('input[name="addonDes0"]', 'value', 'Taum, Taum')

    .waitForElementVisible('input[name="addonCost0"]', 5000)
    .assert.attributeContains('input[name="addonCost0"]', 'value', '')
    .setValue('input[name="addonCost0"]', 15)
    .assert.attributeContains('input[name="addonCost0"]', 'value', 15)

    .waitForElementVisible('#add0', 5000)
    .click('#add0')
    .waitForElementVisible('input[name="addonDes1"]', 5000)
    .setValue('input[name="addonDes1"]', 'mateo')
    .click('#delete1')
    .click('.save')

    // .pause(1000)
  },

  'addService': function (browser) {
    const devServer = browser.globals.devServerURL;
    let client =browser;
    browser
    .pause(100)
    .waitForElementVisible('.buttonTable', 25000)
    .assert.urlEquals(devServer+'/services')
    .click('.buttonTable')
    .waitForElementVisible('input[name="tittle"]', 25000)
    .setValue('input[name="tittle"]', 'pooled international plan')
    .assert.urlEquals(devServer+'/service')
    .waitForElementVisible('input[name="planCode"]', 5000)
    .setValue('input[name="planCode"]', 656565)
    .waitForElementVisible('input[name="cost"]', 5000)
    .setValue('input[name="cost"]', '80')
    .setValue('textarea[name="description"]', 'hola')
    .click('#carriers label  div')
    .waitForElementVisible('#carriers   .multiselect__option', 25000)
    .click('#carriers   .multiselect__option ')
    .click('input[id="status"]')
    .element('id', 'status', function(response) {
      client.assert.ok(response.value.ELEMENT, 'Checkbox response OK');
      client.elementIdSelected(response.value.ELEMENT, function(result){
        client.verify.ok(result.value, 'Checkbox selected');
      });
    })
    // Domestic Plan
    .waitForElementVisible('input[name="minutesD"]', 5000)
    .setValue('input[name="minutesD"]', 80)
    .waitForElementVisible('input[name="dataD"]', 5000)
    .setValue('input[name="dataD"]', 6)
    .click('#unitD div')
    .waitForElementVisible('#unitD div .multiselect__option', 25000)
    .click('#unitD div  .multiselect__option ')
    .waitForElementVisible('input[name="smsD"]', 5000)
    .setValue('input[name="smsD"]', 6)

    // international Plan
    .waitForElementVisible('input[name="iminutes"]', 5000)
    .setValue('input[name="iminutes"]', 80)
    .waitForElementVisible('input[name="idata"]', 5000)
    .setValue('input[name="idata"]', 6)
    .waitForElementVisible('input[name="isms"]', 5000)
    .setValue('input[name="isms"]', 9)
    .click('#iunit div')
    .waitForElementVisible('#iunit div  .multiselect__option', 25000)
    .click('#iunit  div .multiselect__option ')

    // addons
    .waitForElementVisible('input[name="addonDes0"]', 5000)
    .assert.attributeContains('input[name="addonDes0"]', 'value', '')
    .setValue('input[name="addonDes0"]', 'Taum, Taum')
    .assert.attributeContains('input[name="addonDes0"]', 'value', 'Taum, Taum')

    .waitForElementVisible('input[name="addonCost0"]', 5000)
    .assert.attributeContains('input[name="addonCost0"]', 'value', '')
    .setValue('input[name="addonCost0"]', '15')
    .assert.attributeContains('input[name="addonCost0"]', 'value', '15')
    .click('.save')
  }
}
*/
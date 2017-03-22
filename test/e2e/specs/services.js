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
let client =browser;
  browser
  .assert.urlEquals(devServer+'/service/11')
    .waitForElementVisible('input[name="tittle"]', 25000)
.assert.attributeContains('input[name="tittle"]', 'value', 'Pooled Domestic Voice Plan')
.setValue('input[name="tittle"]', '')
.setValue('input[name="tittle"]', 'pooled international plan')
.waitForElementVisible('input[name="planCode"]', 5000)
.assert.attributeContains('input[name="planCode"]', 'value', '55555')
  .setValue('input[name="planCode"]', '')
.setValue('input[name="planCode"]', 656565)
.waitForElementVisible('input[name="cost"]', 5000)
.assert.attributeContains('input[name="cost"]', 'value', 70)
.setValue('input[name="cost"]','' )
.assert.attributeContains('input[name="cost"]', 'value', '')
.setValue('input[name="cost"]', 80)
.click('#currency div')
.click('#currency div  .multiselect__option ')
.assert.attributeContains('textarea[name="description"]', 'value', "")
  .setValue('textarea[name="description"]', 'hola')
    .click('#carriers label  div')
    .click('#carriers label div  .multiselect__option ')
    .click('input[id="status"]')
    .click('input[id="status"]')
    .element('id', 'status', function(response) {
      client.assert.ok(response.value.ELEMENT, 'Checkbox response OK');
      client.elementIdSelected(response.value.ELEMENT, function(result){
        client.verify.ok(result.value, 'Checkbox selected');
      });
    })
    //Domestic Plan
    .waitForElementVisible('input[name="minutesD"]', 5000)
    .assert.attributeContains('input[name="minutesD"]', 'value', 500)
    .setValue('input[name="minutesD"]','' )
    .assert.attributeContains('input[name="minutesD"]', 'value','' )
    .setValue('input[name="minutesD"]', 80)

    .waitForElementVisible('input[name="minutesD"]', 5000)
    .assert.attributeContains('input[name="dataD"]', 'value', 2)
    .setValue('input[name="dataD"]','' )
    .assert.attributeContains('input[name="dataD"]', 'value','' )
    .setValue('input[name="dataD"]', 6)

    .click('#unitD div')
    .click('#unitD div  .multiselect__option ')

    .waitForElementVisible('input[name="smsD"]', 5000)
    .assert.attributeContains('input[name="smsD"]', 'value', 100)
    .setValue('input[name="smsD"]','' )
    .assert.attributeContains('input[name="smsD"]', 'value','' )
    .setValue('input[name="smsD"]', 6)



  //international Plan

  .waitForElementVisible('input[name="iminutes"]', 5000)
  .assert.attributeContains('input[name="iminutes"]', 'value', 50)
  .setValue('input[name="iminutes"]','' )
  .assert.attributeContains('input[name="iminutes"]', 'value', '')
  .setValue('input[name="iminutes"]', 80)

  .waitForElementVisible('input[name="iminutes"]', 5000)
  .assert.attributeContains('input[name="idata"]', 'value', 1)
  .setValue('input[name="idata"]','' )
  .assert.attributeContains('input[name="idata"]', 'value', '')
  .setValue('input[name="idata"]', 6)

  .click('#iunit div')
  .click('#iunit div  .multiselect__option ')

  .waitForElementVisible('input[name="isms"]', 5000)
  .assert.attributeContains('input[name="isms"]', 'value', 50)
  .setValue('input[name="isms"]', '')
  .assert.attributeContains('input[name="isms"]', 'value','')
  .setValue('input[name="isms"]', 100)

  //addons
  .waitForElementVisible('input[name="addonDes0"]', 5000)
  .assert.attributeContains('input[name="addonDes0"]', 'value', 'Ar sa Kiyo Ariquitaum')
  .setValue('input[name="addonDes0"]','' )
  .setValue('input[name="addonDes0"]', 'Taum, Taum')
  .assert.attributeContains('input[name="addonDes0"]', 'value', 'Taum, Taum')

  .waitForElementVisible('input[name="addonCost0"]', 5000)
  .assert.attributeContains('input[name="addonCost0"]', 'value', 10)
  .setValue('input[name="addonCost0"]','' )
  .setValue('input[name="addonCost0"]', 15)
  .assert.attributeContains('input[name="addonCost0"]', 'value', 15)


  .waitForElementVisible('input[name="addonDes1"]', 5000)
  .assert.attributeContains('input[name="addonDes1"]', 'value', 'Taum, Taum')
  .setValue('input[name="addonDes1"]','' )
  .setValue('input[name="addonDes1"]', 'Ar sa Kiyo Ariquitaum')
  .assert.attributeContains('input[name="addonDes1"]', 'value', 'Ar sa Kiyo Ariquitaum')


  .waitForElementVisible('input[name="addonCost1"]', 5000)
  .assert.attributeContains('input[name="addonCost1"]', 'value', 15)
  .setValue('input[name="addonCost1"]', '')
    .setValue('input[name="addonCost1"]', 10)
  .assert.attributeContains('input[name="addonCost1"]', 'value', 10)

  .waitForElementVisible('#add1', 5000)
  .click('#add1')
  .waitForElementVisible('input[name="addonDes2"]', 5000)
  .setValue('input[name="addonDes2"]', 'mateo')
    .click('#delete2')
        .click('.save')
            .pause()

//  .pause(1000)
},
' addService': function (browser) {
  const devServer = browser.globals.devServerURL;
  let client =browser;
    browser
        .assert.urlEquals(devServer+'/services')
}
}

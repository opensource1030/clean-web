


module.exports = {
  before: function(browser) {
    const devServer = browser.globals.devServerURL;
  browser
    .url(devServer)
    .login('Sample3433@email.com', 'user')
    .routes('Inventory','Devices')
},
' DevicesList': function (browser) {
const devServer = browser.globals.devServerURL;
    browser
      .assert.urlEquals(devServer+'/devices')
        .waitForElementVisible('#app  #tables', 15000)
      .waitForElementVisible('table', 5000)
      .waitForElementVisible('tbody', 5000)
      .waitForElementVisible('#open', 5000)
      .click('#open')
        .waitForElementVisible('.detail', 5000)
        .waitForElementVisible('.information span', 5000)
        .assert.containsText(".information span","Technical Information" )
    .pause(1000)

},
'AddDevice': function (browser) {
  const devServer = browser.globals.devServerURL;
  let client =browser;
      browser
            .click('.buttonTable')
        .assert.urlEquals(devServer+'/device')
      .waitForElementVisible('.devicename input ', 5000)
      .setValue('.devicename input', 'moto g')
        .setValue('#testDefaultPrice', '34')
          .click("#testMoney option[value='USD']")
          .click("#testDeviceType option[value='2']")
            .setValue('#testManu', 'motorola')
              .setValue('#testModel', 'moto x')
                .setValue('#testInfo', 'mobile phone x')
                .click('button')
                .setValue('input#FileUpload', __dirname + '\\mat.jpg')
                  .click('button')
                  .elements('link text', 'Atributes', function (result) {
                  client.elementIdClick( result.value[0].ELEMENT)

  })
              .waitForElementVisible('input[id="capa1"]', 15000)
              .pause(1000)
      .click('input[id="capa1"]')
      .element('id', 'capa1', function(response) {
        client.assert.ok(response.value.ELEMENT, 'Checkbox response OK');
        client.elementIdSelected(response.value.ELEMENT, function(result){
          client.verify.ok(result.value, 'Checkbox selected');
        });
      })
      .click('input[id="st2"]')
      .element('id', 'st2', function(response) {
        client.assert.ok(response.value.ELEMENT, 'Checkbox response OK');
        client.elementIdSelected(response.value.ELEMENT, function(result){
          client.verify.ok(result.value, 'Checkbox selected');
        });
      })
      .pause(1000)
      .elements('link text', 'Vendors', function (result) {
      client.elementIdClick( result.value[0].ELEMENT)

})
.pause(1000)
.end()
/*  .waitForElementPresent('input[id="cr1"]',15000)
    .click('input[id="cr1"]')
.element('id', 'cr1', function(response) {
  client.assert.ok(response.value.ELEMENT, 'Checkbox response OK');
  client.elementIdSelected(response.value.ELEMENT, function(result){
    client.verify.ok(result.value, 'Checkbox selected');
  });
})
*/

},
'ManageDevice': function (browser) {


}

/*var path = require('path');
var testFilePath = path.resolve(
    path.join(__dirname, '../../../tests/data/test.csv'));

module.exports = {
    "Test Fiddle": function(browser) {
        console.log(require('fs').existsSync(testFilePath));

        browser.url("http://run.plnkr.co/plunks/N2jnixIyyjy1gIo2UhzT/")
            // url ripped from the iframe src on the plunkr 'embedded' view
        .pause(1000)

        .setValue('#invisible_input', testFilePath)
        .waitForElementPresent('#result', 2000)

        .end();

    }
};*/

}

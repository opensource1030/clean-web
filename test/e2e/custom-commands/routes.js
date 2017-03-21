exports.command = function(section, redirect, callback) {
    this
        .frame(null)
        .waitForElementVisible('a[name="'+section+'"]', 15000)
        .click('a[name="'+section+'"]')
        .waitForElementVisible('a[name="'+redirect+'"]', 25000)
        .click('a[name="'+redirect+'"]')
        .windowHandles(function(result) {
            let newWindow;
              this.verify.equal(result.value.length, 1, 'There should be 1 windows open');
                newWindow = result.value[1];
                  this.switchWindow(newWindow);
})
    return this;
};

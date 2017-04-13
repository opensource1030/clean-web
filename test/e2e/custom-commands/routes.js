exports.command = function(section, redirect, callback) {
    this
        .frame(null)
        .waitForElementVisible('a[name="'+section+'"]', 15000)
        .click('a[name="'+section+'"]')
        .waitForElementVisible('a[name="'+redirect+'"]', 25000)
        .click('a[name="'+redirect+'"]')
    return this;
};

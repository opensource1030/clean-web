exports.command = function(section, redirect, callback) {
    var self = this;
    this
        .frame(null)
        .waitForElementVisible('a[name="'+section+'"]', 15000)
        .click('a[name="'+section+'"]')
        .waitForElementVisible('a[name="'+redirect+'"]', 15000)
        .click('a[name="'+redirect+'"]')

    return this;
};

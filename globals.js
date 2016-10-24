var args = require('minimist')(process.argv);
var globalSite = ''

function getSite() {
    var localStorage ={
     'userId' : 18
    }
    return localStorage.userId;
}
module.exports = {
    get site() {
        if (!globalSite) {
            globalSite = getSite();
        }
        return globalSite;
    }
};

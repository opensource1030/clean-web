import auth from './../api/auth'
var {Store} = require('yayson')()
var    store = new Store()

export default {
    name: "ChargeInfo",
    beforeCreate(){
        this.id = this.$route.params.id;
    },
    created(){
        this.$http.get(process.env.URL_API+'/users/'+localStorage.userId+'?include=companies,companies.currentBillMonths,allocations&filter[allocations.billMonth]=[currentBillMonths.last:1]').then((response) => {
            var event = store.sync(response.data);
            this.allocation= event;

        }, (response) => {

        });
    },
    data(){
        return {
            allocation: {}
        }
    }
}
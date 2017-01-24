import auth from './../api/auth'
var {Store} = require('yayson')()
var    store = new Store()

export default {
    name: "LegacyInfo",
    beforeCreate() {
        Event.$on('provision', (title)=>  {
            this.popOver = true,
                this.company = title;

        });
    },
    computed:{
        iframeUrl : function (){
            return "http://app.wirelessanalytics.com/helpdesk/r_1.asp?company="+this.$route.params.client+"&token="+this.token+"&email="+this.user.email+"&ref=v4"
        }
    },
    data(){
        return {
            isActive: true,
            popOver : true,
            token: localStorage.token,
            user: auth.user,
            company: '',

        }
    }
}
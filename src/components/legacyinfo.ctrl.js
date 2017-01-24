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
          return process.env.LEGACY_URL+"/helpdesk/r_1.asp?token="+this.token+"&version=v4"
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

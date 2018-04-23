var {Store} = require('yayson')()
var    store = new Store()
export default {
    name: "LegacyInfo",
    computed:{
        iframeUrl : function (){
          return process.env.LEGACY_URL+"/helpdesk/r_1.asp?token="+this.token+"&version=v4"
        }
    },
    mounted(){
        $('body').addClass('full-height');
        this.greet();
    },
    data(){
        return {
            isActive: true,
            popOver : true,
            token: localStorage.token

        }
    },
    methods: {
        closePop(){

            if (document.getElementsByTagName('body')[0].classList.contains('full-height')) {
                // The box that we clicked has a class of bad so let's remove it and add the good class
                document.getElementsByTagName('body')[0].classList.remove('full-height');
            }
            document.getElementById('legacy-info').src = process.env.LEGACY_URL+ "/platform/logout.asp";
            setTimeout(function(){
                history.back();
            },200)

        },
        greet () {
            this.$ga.trackEvent('Click to Get Started');
        }
    }
}

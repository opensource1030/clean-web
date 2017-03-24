var {Store} = require('yayson')()
var  store = new Store()
import supportRequest from './support-request';
export default {
    name: "ClientInfo",
    created(){
        this.fetchData();

    },
    computed : {
        fullName : function () {
            if(localStorage.userProfile)
                return JSON.parse(localStorage.getItem("userProfile")).firstName + " " + JSON.parse(localStorage.getItem("userProfile")).lastName;
            else
                return "User"
        }
    },
    methods:{
        fetchData : function(){
            this.$http.get(process.env.URL_API + '/users/'+ localStorage.userId +'?include=companies.contents', {

            }).then((response) => {

                var event = store.sync(response.data);

                if(event.companies.length>0){

                    var cosmicdata = event.companies[0].contents[0].content;

                    this.$http.get(cosmicdata, {

                    }).then((response) => {

                        this.client= response.data;

                        setTimeout(function(){
                            $(function() {
                                $('.eq-Hght').matchHeight({
                                    byRow: true,
                                    property: 'height',
                                    target: null,
                                    remove: false
                                });
                            });
                        },200);


                    });
                }


            });
        },
        openTicket () {
            this.$ga.trackEvent('Open a ticket');
            setTimeout(supportRequest, 500);
        }

    },
    data(){
        return {
            client: {},

        }
    }

}

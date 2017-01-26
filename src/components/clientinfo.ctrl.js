var {Store} = require('yayson')()
var  store = new Store()
import auth from './../api/auth'
export default {
    name: "ClientInfo",
    created(){
        this.fetchData();
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


                    });
                }


            });
        }
    },
    data(){
        return {
            client: {}
        }
    }

}

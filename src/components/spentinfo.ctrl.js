import Vue from 'vue'
import auth from './../api/auth'
import supportRequest from './support-request'
var {Store} = require('yayson')()
var    store = new Store()


export default {
    name: "SpentInfo",
    created(){
        this.$http.get(process.env.URL_API+'/users/'+localStorage.userId).then((response) => {
            var event = store.sync(response.data);
            this.userInfo= event;
        }, (response) => {

        });
        this.$http.get(process.env.URL_API+'/allocations/'+this.$route.params.id).then((response) => {
            var event = store.sync(response.data);
            this.allocation= event;
        }, (response) => {

        });

    },
    mounted () {
        $('.has-tip').foundation();
        setTimeout(supportRequest(this.user),300);
        $('.scrollup').click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            $(".pop-content").scrollTop(0);
            return false;
        });

    },
    computed:{
        fullName : function () {
            return this.userInfo.firstName + " " + this.userInfo.lastName
        },

        dataPackage: function(data){
            var data = data;
            console.log(data);
            return data ;
        }

    },
    data(){
        return {
            userInfo: {},
            allocation : {},
            isActive: true,
            viewText : 'All',
            popOver : true,
            user : auth.user
        }
    },
    methods:{
        viewToggle(e){
            e.stopPropagation();
            var el = document.querySelector('.list-striped');
            el.classList.toggle('all');
            e.target.classList.toggle('all');




        }
    }
}

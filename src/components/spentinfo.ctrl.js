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
        setTimeout(supportRequest(this.user),300)
    },
    computed:{
        fullName : function () {
            return this.userInfo.firstName + " " + this.userInfo.lastName
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
        viewToggle(){
            var el = document.querySelector('.list-striped');
            el.classList.toggle('all');
            return this.active ? 'You like this' : 'Like this not'
        }
    }
}

import Vue from 'vue'
import supportRequest from './support-request'
import { format, parse } from 'libphonenumber-js'
let {Store} = require('yayson')()
let store = new Store()

export default {
    name: "SpentInfo",
    created(){
        this.$http.get(process.env.URL_API + '/users/' + localStorage.userId).then((response) => {
            var event = store.sync(response.data);
            this.userInfo = event;
        }, (response) => {

        });
        this.$http.get(process.env.URL_API + '/allocations/' + this.$route.params.id).then((response) => {
            var event = store.sync(response.data);
            this.allocation = event;
        }, (response) => {

        });

    },
    mounted () {
        $('.has-tip').foundation();
        setTimeout(supportRequest, 300);
        $('.scrollup').click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            $(".pop-content").scrollTop(0);
            return false;
        });

    },
    computed: {
        fullName: function () {
            return this.userInfo.firstName + " " + this.userInfo.lastName
        },

        dataPackage: function (data) {
            var data = data;
            return data;
        },

        mobileNumber: function () {
            return this.allocation.mobile_number ? format(this.allocation.mobile_number,'US','National') : '-'
        }

    },
    data(){
        return {
            userInfo: {},
            allocation: {},
            isActive: true,
            viewText: 'All',
            popOver: true,

        }
    },
    methods: {
        viewToggle(e){
            e.stopPropagation();
            var el = document.querySelector('.list-striped');
            el.classList.toggle('all');
            e.target.classList.toggle('all');


        }
    }
}

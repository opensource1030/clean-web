import Vue from 'vue'
import supportRequest from './support-request'
import {format, parse} from 'libphonenumber-js'
import allocationAPI from '../api/allocation-api'

let {Store} = require('yayson')()
let store = new Store()

export default {
    name: "SpentInfo",
    data() {
        return {
            userInfo: {},
            allocation: {},
            popOver: true,
        }
    },
    created() {

        let _params = {
            params: {
                include: ''
            }
        }
        allocationAPI.get(this.$route.params.id, _params, res => {
            if (res.status == 404) {
                this.allocation = {}
            } else {
                // console.log('dashboard/created userInfo', res)
                let event = store.sync(res.data)
                this.allocation = event
                for (let allocation of this.allocations) {
                    allocation.issue = ''
                }
            }
            // this.userInfo.loading = false;
            // setTimeout(supportRequest, 2000);
            console.log(this.allocation)
        }, err => {
            Log.put('dashboard/created user allocation err', err)
            this.allocation.data = {allocations: []}
            // this.userInfo.loading = false
        })


        this.userInfo = JSON.parse(localStorage.profile);

        // this.$http.get(process.env.URL_API + '/allocations/' + this.$route.params.id).then((response) => {
        //     this.allocation = store.sync(response.data);
        // });
    },
    mounted() {
        setTimeout(supportRequest, 500);

        $('.has-tip').foundation();

        $('.scrollup').click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 600);

            $(".pop-content").scrollTop(0);
            return false;
        });
    },
    computed: {
        mobileNumber: function () {
            return this.allocation.mobile_number ? format(this.allocation.mobile_number, 'US', 'National') : '-'
        }
    }
}
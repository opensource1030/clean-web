var {Store} = require('yayson')()
var  store = new Store()
window.Event = new Vue();
require('script!jquery');
require('script!jquery-match-height');
require('script!jquery-validation');
import _ from 'lodash';
import auth from './../api/auth'
import supportRequest from './support-request';
import Vue from 'vue'
import Avatar from 'vue-avatar/dist/Avatar'
import Breadcrumb from 'vue-bulma-breadcrumb'
import ClientInfo from './ClientInfo.vue'
import ChargeInfo from './ChargeInfo.vue'
import Morphsearch from './Morphsearch.vue'
import Piechart from './Piechart.vue'
import Trendchart from './Trendchart.vue'
import SpentInfo from './SpentInfo.vue'
import LegacyInfo from './LegacyInfo.vue'
export default {
    name: "Dashboard",
    components: {
        Breadcrumb,
        Morphsearch,
        ClientInfo,
        ChargeInfo,
        Piechart,
        Trendchart,
        Avatar,
        SpentInfo,
        LegacyInfo
    },

    computed: {
        name() {
            return this.$route.name
        },

        list() {
            return this.$route.matched
        },
    },
    created(){
        this.fetchUserData();
        this.grid();
    },
    mounted(){
        $('.redirect-link a').each(function(e){
            $(this).click(function(e){
                var link = this.href;
                var $modalredirect = $('#modal');
                e.preventDefault();
                $modalredirect.addClass('is-error').html("<h5 class='text-center'>You will now be redirected to this section in our legacy app</h5>").foundation('open');
                setTimeout(function() {
                    $('.for-dashboard').hide(100);
                    $modalredirect.foundation('close');
                    window.location=link;
                }, 2000);
            });
        });

        this.$http.get(process.env.URL_API + '/users/'+ localStorage.userId +'?include=companies,companies.contents,companies.currentBillMonths,allocations&filter[allocations.billMonth]=[currentBillMonths.last:3]', {
        }).then((response) => {
            var event = store.sync(response.data);
            if (event.companies.length>0) {
                var clientdata = event.companies[0].contents[0].content;
                this.$http.get(clientdata, {
                }).then((response) => {
                    this.data= response.data;
                    setTimeout(supportRequest(this.user),300);
                    setTimeout( function(){
                        $(document).foundation(),400
                    });
                });
            }

            if (event.allocations && event.allocations.length > 0) {
                this.$set(this, 'trendchartData', event.allocations);
            }
        });

        this.$http.get(process.env.URL_API + '/users/'+ localStorage.userId +'?include=companies,companies.contents,companies.currentBillMonths,allocations&filter[allocations.billMonth]=[currentBillMonths.last:1]', {
        }).then((response) => {
            var event = store.sync(response.data);
            if (event.allocations && event.allocations.length > 0) {
                this.$set(this, 'piechartData', event.allocations);
            }
        });
    },
    methods:{
        logout() {
            auth.logout()
        },
        grid(){
            $(function() {
                $('.eq-Hght').matchHeight({
                    byRow: true,
                    property: 'height',
                    target: null,
                    remove: false
                });
            });
        },
        fetchUserData : function(){
            this.$http.get(process.env.URL_API + '/users/'+ localStorage.userId +'?users', {

            }).then((response) => {

                var event = store.sync(response.data);
                this.user.email= event.email;
                this.user.firstName= event.firstName;
                this.user.lastName= event.lastName;
                this.user.alternateEmail= event.alternateEmail;
                this.user.supervisorEmail= event.supervisorEmail;

            });
        }
    },
    data(){
        return {
            data: {},
            version : null,
            user: auth.user,
            piechartData: [],
            trendchartData: [],
            LegacyData : ''
        }
    }
}
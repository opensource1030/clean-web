var {Store} = require('yayson')()
var  store = new Store()
window.Event = new Vue();
require('script!jquery');
require('script!jquery-match-height');
require('script!jquery-validation');
import _ from 'lodash';
import auth from './../api/auth'
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
        var user = {};
        $.ajax({
            type: 'GET',
            url: process.env.URL_API + '/users/' + localStorage.userId + '?users',
            success: function (data) {
                return user = {
                    "email": data.data.attributes.email,
                    "firstName": data.data.attributes.firstName,
                    "lastName": data.data.attributes.lastName
                }
            }
        });

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
            // console.log('response', response.data);
            var event = store.sync(response.data);
            if (event.companies.length>0) {
                var clientdata = event.companies[0].contents[0].content;
                this.$http.get(clientdata, {
                }).then((response) => {
                    this.data= response.data;
                    setTimeout(function(){
                        $(document).foundation();
                        $('.eq-Hght').matchHeight({
                            byRow: true,
                            property: 'height',
                            target: null,
                            remove: false
                        });
                        var config = {
                            selector: ".HW-container",
                            account: "JPYPKy",
                            enabled : true
                        };
                        var $select = $('#support-form .user-actions')
                        $select.on('change', function () {
                            var value = '.' + $(this).val();
                        });

                        var $selectOption = $('.user-actions');
                        $selectOption.on('change', function () {
                            var value1 = $(this).val();
                            $('.btn-provision').click();
                            $select.prop('value', value1);
                        });

                        $('.btn-provision').click(function () {
                            $('#recipient_email').val(user.email);
                            $('#recipient_firstname').val(user.firstName);
                            $('#recipient_lastName').val(user.lastName);
                            $('.support-form-holder').show(200);
                        });

                        $('#btn-close').click(function () {
                            $('#support-form')[0].reset();
                            $('.support-form-holder').hide(200);
                            $selectOption.prop('selectedIndex', 0);
                        });

                        $(document).keyup(function (e) {
                            if (e.keyCode == 27) $('#btn-close').click();
                        });

                        $("#support-form").validate({
                            rules: {
                                "description": {
                                    required: true,
                                    minlength: 8
                                }
                            },
                            submitHandler: function (form) {
                                var form = $('#support-form');
                                var $modal = $('#modal');
                                var company = "wirelessanalytics";
                                var key = "PMf04HTtZ7dNDIS2gmQCUWWRw0IwaHvdoa3MYQ6Fg6f23s8zrr";
                                var json = {
                                    "assignedTo":59063,
                                    "inboxId":1778,
                                    "subject": $('#subject').val(),
                                    "customerEmail": $('#recipient_email').val(),
                                    "customerMobileNumber" : $('#recipient_mobilenumber').val(),
                                    "customerPhoneNumber" : $('#recipient_phonenumber').val(),
                                    "message":$('#description').val() + ' ' + ' Preferred:'+ ' ' + $('input[name=method]:checked', '#support-form').val(),
                                    "source": "clean-dashboard",
                                    "status" : "active",
                                    "tags[]" : $('#tags').val(),
                                    "priority" : $('input[name=priority]:checked', '#support-form').val()
                                };
                                $.ajax({
                                    type: "POST",
                                    url: "https://" + company + ".teamwork.com/desk/v1/tickets.json",
                                    headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
                                    data : JSON.stringify(json),
                                    processData: false,
                                    contentType: "application/json; charset=UTF-8",
                                    success: function(){
                                        $modal.html('');
                                        $modal.removeClass('is-error').addClass('is-success').append("<h4>Request sent succefully </h4>" +"<button data-close='' aria-label='Close Accessible Modal' type='button' class='close-button'><span aria-hidden='true'>×</span></button>").foundation('open');
                                        $('#support-form')[0].reset();
                                    },
                                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                                        $('#modal').html('');
                                        $modal.removeClass('is-success').addClass('is-error').append("<h4>"+"Status: " + textStatus+"</h4>"+"<p>"+"Error: " + "Please fill all the required fields with appropriate value" + "</p>" +"<button data-close='' aria-label='Close Accessible Modal' type='button' class='close-button'><span aria-hidden='true'>×</span></button>").foundation('open');
                                    }
                                });
                            }
                        });
                    },300);
                });
            }

            // console.log('trendchartData', event.allocations);
            if (event.allocations && event.allocations.length > 0) {
                // this.$set(this, 'piechartData', [0, 0, 0, 0]);

                // this.$set(this, 'piechartData', [
                //   _.sumBy(event.allocations, 'service_plan_charge'),
                //   _.sumBy(event.allocations, 'other_category') + _.sumBy(event.allocations, 'service_plan_charge'),
                //   _.sumBy(event.allocations, 'unknown_category'),
                //   _.sumBy(event.allocations, 'voice_category'),
                // ]);

                this.$set(this, 'trendchartData', event.allocations);
            }
        });

        this.$http.get(process.env.URL_API + '/users/'+ localStorage.userId +'?include=companies,companies.contents,companies.currentBillMonths,allocations&filter[allocations.billMonth]=[currentBillMonths.last:1]', {
        }).then((response) => {
            // console.log('response', response.data);
            var event = store.sync(response.data);
            // console.log('piechartData', event.allocations);
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
            // allocations: [],
            piechartData: [],
            trendchartData: [],
            LegacyData : ''
        }
    }
}
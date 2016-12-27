<template>
  <div class="content-right" >
    <div class="alert callout for-dashboard" data-closable style="display:none;">
      <h5>You will now be redirected to this section in our legacy app</h5>
    </div>
    <div class="expanded row">

      <!-- top nav -->
      <section class="top-bar-section clearfix ">
        <div class="column large-8 medium-8 small-6">
          <morphsearch> </morphsearch>
        </div>
        <div class="column push-1 large-4 medium-4 small-6 profile" v-if="data.object">
              <div class="profile-holder"><a class="float-right" data-toggle="example-dropdown-1"> <avatar :username="user.firstName ? user.firstName : 'User' "></avatar> Hi, <span class="greeting" v-if="user.authenticated" v-text="user.firstName ? user.firstName : 'User' ">  </span></a> </div>
          <div class="dropdown-pane bottom" id="example-dropdown-1" data-dropdown >
            <ul>
              <li><a @click="logout()"  v-if="user.authenticated" href="/login">Logout</a></li>
            </ul>
          </div>
        </div>
      </section>

      <!-- end of top nav -->
      <div class="clearfix"></div>
      <nav class="level app-levelbar">
        <div class="level-left">
          <div class="level-item">
            <h3 class="subtitle is-5">
              <strong>{{ name }}</strong>
            </h3>
          </div>
        </div>
        <div class="level-right is-hidden-mobile">
          <breadcrumb :list="list"></breadcrumb>
        </div>
      </nav>
      <client-Info> </client-Info>
      <div class="clearfix"></div>
      <charge-Info> </charge-Info>
      <div class="support-form-holder">
        <div class="form-header">
          <h2>Ticket Information</h2>
          <a id="btn-close" href="javascript:;" title="close"><i class="fa fa-times-circle"> </i> </a>
        </div>
        <form id="support-form" >
          <div class="row support-form-container">
            <div class="medium-12 columns">
              <label><span class="form-title"> How Can We Help?</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <select id="supportOption" class="user-actions required" name="subject" required>
                  <option disabled value=" " selected>-- Choose an issue ---</option>
                  <option value="hd-trobleshooting">Troubleshooting</option>
                  <option value="hd-plan-change">Plan Change</option>
                  <option value="hd-email-service">Email Service</option>
                  <option value="hd-billing-allocations">Billing &amp; allocations</option>
                  <option value="hd-other">Other</option>
                </select>
              </label>
            </div>
            <div id="Container">
                <div class="medium-12 columns ">
                    <label><span class="form-title">Subject</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="Please type your subject"><i class="fa fa-question-circle"> </i> </span>
                    </label>
                    <input type="text" placeholder="Enter your subject" id="subject" name="subject">
                </div>
              <div class="medium-12 columns ">
                <label for="recipient_email"><span class="form-title">Recipient Email (the affected user)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="The affected user."><i class="fa fa-question-circle"> </i> </span>
                  <input type="email" placeholder="Your email" name="customerEmail" id="recipient_email"   required>
                </label>
              </div>
              <div class="medium-12 columns ">
                <label for="recipient_firstname"><span class="form-title">Recipient First Name (the affected user)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="The affected user."><i class="fa fa-question-circle"> </i> </span>
                  <input type="text" placeholder="Your first name" name="customerFirstName" id="recipient_firstname"  >
                </label>
              </div>
              <div class="medium-12 columns ">
                <label for="recipient_lastname"><span class="form-title">Recipient Last Name (the affected user)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="The affected user."><i class="fa fa-question-circle"> </i> </span>
                  <input type="text" placeholder="Your last name"  name="customerLastName" id="recipient_lastName" >
                </label>
              </div>
              <div class="medium-12 columns">
              <label for="recipient_mobilenumber"><span class="form-title">Recipient Mobile Number (if number is unavailable, please add N/A)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="if number is unavailable, please add N/A."><i class="fa fa-question-circle"> </i> </span>
                <input type="text" placeholder="Your mobile no." name="customerMobileNumber" id="recipient_mobilenumber"  >
              </label>
            </div>
              <div class="medium-12 columns">
                <label for="recipient_phonenumber"><span class="form-title">Recipient Phone Number (if number is unavailable, please add N/A)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="if number is unavailable, please add N/A."><i class="fa fa-question-circle"> </i> </span>
                  <input type="text" placeholder="Your phone no." name="customerPhoneNumber" id="recipient_phonenumber"  >
                </label>
              </div>
              <div class="large-12 columns ">
                <fieldset class="fieldset">
                  <legend><span class="form-title">Priority </span> </legend>
                  <div class="row">
                    <label for="low" class="column large-4 medium-4"><input type="radio" name="priority" value="low" id="low" required>Low</label>
                    <label for="medium" class="column large-4 medium-4"><input type="radio" name="priority" value="medium" id="medium" required>Medium</label>
                    <label for="high" class="column large-4 medium-4"><input type="radio" name="priority" value="high" id="high" required>High</label>
                  </div>
                </fieldset>
              </div>
              <div class="medium-12 columns">
                <label for="description"><span class="form-title">Message</span>
                  <textarea rows="3" name="message" id="description"  placeholder="Your details here" required> </textarea>
                </label>
              </div>
            </div>
          </div>
          <div class="form-footer">
            <button type="submit" class="button btn-submit "> Submit Ticket</button>
          </div>
          <div class="tiny reveal request-modal" id="modal" data-reveal>
            <button class="close-button" data-close aria-label="Close Accessible Modal" type="button">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </form>
      </div>
      <div class="clearfix"></div>
        <piechart :data="piechartData"></piechart>
        <trendchart></trendchart>
    </div>
  </div>
</template>

<script>
  var {Store} = require('yayson')()
  var  store = new Store()
  require('script!jquery');
  require('script!jquery-match-height');
  require('script!jquery.soap');
  require('../modules/jquery.serialize-object');
  require('script!jquery-validation');
  require('highcharts');
  import _ from 'lodash';
  import auth from './../api/auth'
  import Avatar from 'vue-avatar/dist/Avatar'
  import Breadcrumb from 'vue-bulma-breadcrumb'
  import ClientInfo from './ClientInfo.vue'
  import ChargeInfo from './ChargeInfo.vue'
  import Morphsearch from './Morphsearch.vue'
  import Piechart from './Piechart.vue'
  import Trendchart from './Trendchart.vue'
  export default {
    name: "Dashboard",
    components: {
      Breadcrumb,
      Morphsearch,
      ClientInfo,
      ChargeInfo,
      Piechart,
      Trendchart,
      Avatar
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

        var event = store.sync(response.data);
        if (event.companies.length>0) {
          var clientdata = event.companies[0].contents[0].content;
          this.$http.get(clientdata, {
          }).then((response) => {
            this.data= response.data;
            setTimeout(function(){
              $(document).foundation();
              $('.grid-box').matchHeight({
                byRow: true,
                property: 'height',
                target: null,
                remove: false
              });


              var $select = $('#support-form .user-actions'), $images = $('.mix');
              $select.on('change', function () {
                var value = '.' + $(this).val();
                $images.show(200).not(value).hide();
              });

              var $selectOption = $('.wireless-overview .user-actions');
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
                                     "assignedTo":107784,
                                     "inboxId":1778,
                                    "subject": $('#subject').val(),
                                    "customerEmail": $('#recipient_email').val(),
                                    "customerMobileNumber" : $('#recipient_mobilenumber').val(),
                                    "customerPhoneNumber" : $('#recipient_phonenumber').val(),
                                    "message":$('#description').val(),
                                    "source": "clean-dashboard",
                                    "status" : "active",
                                    "priority" : $('input[name=priority]:checked', '#support-form').val()

                                };


                                $.ajax({
                                    type: "POST",
                                    url: "https://" + company + ".teamwork.com/desk/v1/tickets.json",
                                    headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
                                    /*data: jQuery.parseJSON(JSON.stringify(form.serialize())),*/
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
          if (event.allocations && event.allocations.length > 0) {
              this.$set(this, 'piechartData', [
                  _.sumBy(event.allocations, 'data_category'),
                  _.sumBy(event.allocations, 'other_category'),
                  _.sumBy(event.allocations, 'unknown_category'),
                  _.sumBy(event.allocations, 'voice_category'),
              ]);

              // console.log(event.allocations);
              // console.log(this.piechartData);
          }
        });

    },
    methods:{
      logout() {
        auth.logout()
      },
      grid(){
        $(function() {
          $('.grid-box').matchHeight({
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
        user: auth.user,
        piechartData: [],
      }
    }
  }
</script>

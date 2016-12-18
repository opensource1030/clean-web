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
              <div class="profile-holder"><a class="float-right" data-toggle="example-dropdown-1"> <avatar :username="data.object.title"></avatar> <span class="greeting" v-if="user.authenticated" v-text=" user.firstName ? user.firstName : data.object.title ">  </span></a> </div>
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
        <form id="support-form" method="post">
          <div class="row support-form-container">
            <div class="medium-12 columns">
              <label><span class="form-title"> How Can We Help?</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <select id="supportOption" class="user-actions required" name="supportOption" required>
                  <option disabled value=" " selected>-- Choose an issue ---</option>
                  <option value="IRE1-1">Troubleshooting</option>
                  <option value="IRE1-2">Plan Change</option>
                  <option value="IRE1-3">Email Service</option>
                  <option value="ALR4-4">Billing &amp; allocations</option>
                  <option value="IRE1-5">Activation</option>
                  <option value="IRE1-6">International Request</option>
                  <option value="IRE0-7">Other</option>
                </select>
              </label>
            </div>
            <div id="Container">
              <div class="medium-12 columns mix IRE1-5">
                <label for="imei"><span class="form-title">IMEI/MEID</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" placeholder="imei/meid" name="imei" id="imei" value="" required>
                </label>
              </div>
              <div class="medium-12 columns mix IRE1-5">
                <label for="iccid"><span class="form-title">ICCID</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" placeholder="iccid" name="iccid" id="iccid" required>
                </label>
              </div>
              <div class="medium-12 columns mix IRE1-5">
                <label for="activationDeviceType"><span class="form-title">Device type, Make/Model </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" placeholder="device type" name="activationDeviceType" id="activationDeviceType" required>
                </label>
              </div>
              <div class="medium-12 columns mix IRE1-5">
                <label for="mobile"><span class="form-title">Mobile # </span><span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" placeholder="mobile number" id="mobile" name="mobile" required>
                </label>
              </div>
              <div class="medium-12 columns mix IRE1-6">
                <label for="travelCountries"><span class="form-title">What country/countries are you travelling to?</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" placeholder="" id="travelCountries" name="travelCountries" required>
                </label>
              </div>
              <div class="medium-12 columns mix IRE1-6">
                <label for="travelDates"><span class="form-title">Dates of travel</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required " data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" placeholder="" id="travelDates" name="travelDates" required>
                </label>
              </div>
              <div class="medium-12 columns mix IRE1-6">
                <label for="travelDeviceType"><span class="form-title">Device type, phone, tablet, mifi </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" placeholder="" name="travelDeviceType" id="travelDeviceType" required>
                </label>
              </div>
              <div class="large-12 columns  mix IRE1-3 ">
                <fieldset class="fieldset">
                  <legend><span class="form-title">Please select type </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span></legend>
                  <label for="email" class="column large-6"><input type="radio" name="email_service_type" value="Email Setup" id="email"  required>Email</label>
                  <label for="phone" class="column large-6"><input type="radio" name="email_service_type" value="Email Troubleshooting" id="phone" required>Phone</label>
                </fieldset>
              </div>
              <div class="medium-12 columns ">
                <label><span class="form-title">Requestor Email (whomever is filling out this form)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="Whomever is filling out this form."><i class="fa fa-question-circle"> </i> </span>
                </label>
                <input type="text" value="domotosho@wirelessanalytics.com" readonly>
              </div>
              <div class="medium-12 columns ">
                <label for="recipient_email"><span class="form-title">Recipient Email (the affected user)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="The affected user."><i class="fa fa-question-circle"> </i> </span>
                  <input type="text" placeholder="your email" name="recipient_email" id="recipient_email" required>
                </label>
              </div>
              <div class="medium-12 columns">
                <label for="recipient_number"><span class="form-title">Recipient Mobile Number (if number is unavailable, please add N/A)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="if number is unavailable, please add N/A."><i class="fa fa-question-circle"> </i> </span>
                  <input type="text" placeholder="your email" name="recipient_number" id="recipient_number" required>
                </label>
              </div>
              <div class="large-12 columns ">
                <fieldset class="fieldset">
                  <legend><span class="form-title">Priority </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span></legend>
                  <div class="row">
                    <label for="low" class="column large-6"><input type="radio" name="priority" value="Low" id="low" required>Low</label>
                    <label for="medium" class="column large-6"><input type="radio" name="priority" value="Medium" id="medium" required>Medium</label>
                    <label for="high" class="column large-6"><input type="radio" name="priority" value="High" id="high" required>High</label>
                    <label for="asap" class="column large-6"><input type="radio" name="priority" value="Asap" id="asap" required>Asap</label>
                  </div>
                </fieldset>
              </div>
              <div class="large-12 columns ">
                <fieldset class="fieldset">
                  <legend><span class="form-title">Who should we contact? </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  </legend>
                  <div class="row">
                    <label for="recipent" class="column large-6"><input type="radio" name="contact_who" value="Recipent" id="recipent" required> Recipent</label>
                    <label for="requestor" class="column large-6"><input type="radio" name="contact_who" value="Requestor" id="requestor"> Requestor</label>
                  </div>
                </fieldset>
              </div>
              <div class="large-12 columns ">
                <fieldset class="fieldset">
                  <legend><span class="form-title">Preferred Contact Method </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span></legend>
                  <div class="row">
                    <label for="email1" class="column large-6"><input type="radio" name="contact_by" value="Email" id="email1" required>Email</label>
                    <label for="phone1" class="column large-6"><input type="radio" name="contact_by" value="Phone" id="phone1" required>Phone</label>
                  </div>
                </fieldset>
              </div>
              <div class="medium-12 columns">
                <label for="callback"><span class="form-title">Callback Number </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" placeholder="callback number" name="callback" id="callback" required>
                </label>
              </div>
              <div class="medium-12 columns">
                <label for="description"><span class="form-title">Description</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="Please explain the question or problem in detail, and let us know how you'd like to be contacted."><i class="fa fa-question-circle"> </i> </span>
                  <textarea rows="3" name="description" id="description"  required> </textarea>
                </label>
              </div>
            </div>
          </div>
          <div class="form-footer">
            <button type="submit"  class="button btn-submit ">Submit Ticket</button>
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
      this.$http.get(process.env.URL_API + '/users/'+ localStorage.userId +'?include=companies.contents', {
      }).then((response) => {

        var event = store.sync(response.data);
        if (event.companies.length>0) {
          var clientdata = event.companies[0].contents[0].content;
          this.$http.get(clientdata, {
          }).then((response) => {
            this.data= response.data;
            setTimeout(function(){
              $(document).foundation();
              // $('.img-avatar').initial();
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

              var $modal = $('#modal');
              $("#support-form").validate({
                rules: {
                  "description": {
                    required: true,
                    minlength: 8
                  }
                },
                submitHandler: function (form) {
                  var formData = $(form).serializeObject();
                  $.soap({
                    url: 'https://wa.easyvista.com:443/WebService/SmoBridge.php/',
                    method: 'EZV_CreateRequest',
                    data: formData,
                    success: function (soapResponse) {
                      $modal.addClass('is-success').append("<p>Request cannot be sent</p>").foundation('open');
                      $('#support-form')[0].reset();
                    },
                    error: function (SOAPResponse) {
                      $modal.addClass('is-error').append("<p>Request cannot be sent</p>").foundation('open');
                    },
                    parts: {
                      Account: '50005',
                      Login: 'CLEANWebServices',
                      Pass: 'CLEANWebServices',
                      Catalog_GUID: 'simple',
                    },
                  });
                }
              });
            },300);
          });
        }

        if (event.allocations.length > 0) {
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

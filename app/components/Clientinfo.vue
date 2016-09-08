
<template>

  <div class="column large-12">
    <div class="default callout client-info" data-closable>
      <h2 v-if="clean.object" >  {{clean.object.title }}</h2>
      <div v-if="clean.object"> {{{clean.object.metafields[3].value }}} </div>
      <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="large-6 columns" >
    <div class="grid-box" data-mh="box1">
      <header class="box-heading">
        <h2>contact support</h2>
      </header>
      <div class="box-content">
        <div class="box-content-holder" v-if="clean.object">
          {{{clean.object.metafields[0].value }}}
        </div>
      </div>
    </div>
  </div>
  <div class="large-6 columns" >
    <div class="grid-box" data-mh="box1" v-if="clean.object">
      <header class="box-heading">
        <h2> {{ clean.object.metafields[1].title }}</h2>
      </header>
      <div class="box-content">
        <div class="action-button" id="action-buttons">
          <a class="button" href="javascript:;">Request Provision</a>
          <a class="button btn-provision" @click="supportReq" href="#">Get Support</a>
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
              <div class="tiny reveal" id="modal" data-reveal>
                <button class="close-button" data-close aria-label="Close Accessible Modal" type="button">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        {{{  clean.object.metafields[1].value }}}
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="large-12 columns">
    <div class="grid-box">
      <header class="box-heading">
        <h2> Wireless Line Overview</h2>
      </header>
      <div class="box-content no-pad">
        <div class="wireless-overview">
          <table width="100%" class="responsive">
            <tbody><tr>
              <th>Bill Month</th>
              <th>
                User Name
              </th>
              <th>Mobile Number</th>
              <th>Carrier</th>
              <th>Device</th>
              <th>Total Allocated Charge</th>
              <th>Usage Charges</th>
              <th>Service Plan Charges</th>
              <th> Other Charges</th>
              <th> Last Upgrade Date</th>
              <th width="20%"> Actions for this line</th>
            </tr>
            <tr>
              <td>7/1/2016</td>
              <td>Adriana Vicentini</td>
              <td><a href="tel:115-123-1613">115-326-8868</a></td>
              <td>Telefonica</td>
              <td>Samsung Galaxy Core 2 G355</td>
              <td>$503.21</td>
              <td>$3.00</td>
              <td>$481.00</td>
              <td>$20.00</td>
              <td>N/A</td>
              <td>
                <select class="user-actions" @change="supportReq">
                  <option disabled value=" " selected>-- Choose an issue ---</option>
                  <option value="IRE1-1">Troubleshooting</option>
                  <option value="IRE1-2">Plan Change</option>
                  <option value="IRE1-3">Email Service</option>
                  <option value="ALR4-4">Billing &amp; allocations</option>
                  <option value="IRE1-5">Activation</option>
                  <option value="IRE1-6">International Request</option>
                  <option value="IRE0-7">Other</option>
                </select>
              </td>
            </tr>

            </tbody></table>
        </div>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
</template>
<script>
  var Api = 'https://api.cosmicjs.com/v1/clean/object/thermo-fisher?pretty=true';
  export default {
    name: "ClientInfo",

    ready(){
      this.$http.get(Api).then((response) => {
        this.$set('clean', response.json());
        /* this.response = response.data.object;*/

      }, (response) => {

      });

    },
    data(){
      return {
        clean: {}
      }
    },
    methods:{
      supportReq: function () {
        //filter

        var $select = $('#support-form .user-actions'),
                $images =  $('.mix');

        $select.on('change', function() {
          var value = '.' + $(this).val();
          $images.show(200).not(value).hide();
        });

        var $selectOption = $('.wireless-overview .user-actions');

        $selectOption.on('change', function() {
          var value1 = $(this).val();
          $('.btn-provision').click();
          $select.prop('value',value1);
        });

        $('.btn-provision').click(function(){
          $('.support-form-holder').show(200);
        })
        $('#btn-close').click(function(){
          $('.support-form-holder').hide(200);
          $('#support-form')[0].reset();
          $selectOption.prop('selectedIndex',0);
        })
        $(document).keyup(function(e) {
          if (e.keyCode == 27) $('#btn-close').click();
        });



      }
    }
  }


</script>

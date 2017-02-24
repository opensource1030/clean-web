<template>
<div>
    <div class="alert callout for-dashboard" data-closable style="display:none;">
      <h5>You will now be redirected to this section in our legacy App</h5>
    </div>

      <client-Info></client-Info>
      <div class="clearfix"></div>
      <charge-Info></charge-Info>

      <div class="support-form-holder">
        <div class="form-header">
          <a id="btn-close" href="javascript:;" title="close"><i class="fa fa-times-circle"> </i> </a>
        </div>
        <form id="support-form" >
          <div class="row support-form-container">
            <div class="medium-12 columns">
              <label><span class="form-title"> How Can We Help?</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <select id="FilterSelect" class="user-actions" required>
                  <option selected disabled value=" ">-- Choose an issue ---</option>
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
                <label><span class="form-title">IMEI/MEID</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" id="imei-meid" placeholder="imei/meid">
                </label>
              </div>
              <div class="medium-12 columns mix IRE1-5">
                <label><span class="form-title">ICCID</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" id="iccid" placeholder="iccid">
                </label>
              </div>
              <div class="medium-12 columns mix IRE1-5">
                <label><span class="form-title">Device type, Make/Model </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" id="device_type" placeholder="device type">
                </label>
              </div>
              <div class="medium-12 columns mix IRE1-5">
                <label><span class="form-title">Phone Origin </span><span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Where did you get the phone? IE: New Service, Upgrade, Internal">*</span>
                  <input type="text" id="phone_origin" placeholder="phone origin">
                </label>
              </div>
              <div class="medium-12 columns mix IRE1-5">
                <label><span class="form-title">Mobile # </span><span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" id="int_mobile" placeholder="mobile number">
                </label>
              </div>
              <div class="medium-12 columns mix IRE1-6">
                <label><span class="form-title">What country/countries.js are you travelling to?</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <select id="country2" name="country2" required> </select>
                </label>
              </div>
              <div class="medium-12 columns mix IRE1-6">
                <label><span class="form-title">Dates of travel</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required " data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input id="flatpickr" class="flatpickr" type="text" placeholder="Select Date.." >
                </label>
              </div>
              <div class="medium-12 columns mix IRE1-6">
                <label><span class="form-title">Device type, phone, tablet, mifi </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" placeholder="">
                </label>
              </div>
              <div class="large-12 columns  mix IRE1-3 ">
                <fieldset class="fieldset">
                  <legend><span class="form-title">Please select type </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span></legend>
                  <input type="radio" name="contact-method" value="email" id="email" required><label for="email">Email</label>
                  <input type="radio" name="contact-metho" value="phone" id="phone"><label for="requestor">Phone</label>
                </fieldset>
              </div>
              <div class="medium-12 columns ">
                <div><span class="form-title">Requestor Email (whomever is filling out this form)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="Whomever is filling out this form."><i class="fa fa-question-circle"> </i> </span>
                </div>
                <input id="requestor_email" type="text" value="domotosho@wirelessanalytics.com">
              </div>
              <div class="medium-12 columns ">
                <label><span class="form-title">Recipient Email (the affected user)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="The affected user."><i class="fa fa-question-circle"> </i> </span>
                  <input type="text" id="recipient_email" placeholder="your email">
                </label>
              </div>
              <div class="medium-12 columns">
                <label><span class="form-title">Recipient Mobile Number (if number is unavailable, please add N/A)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="if number is unavailable, please add N/A."><i class="fa fa-question-circle"> </i> </span>
                  <input id="recipient_mobile" type="text" placeholder="your email">
                </label>
              </div>
              <div class="large-12 columns ">
                <fieldset class="fieldset">
                  <legend><span class="form-title">Priority </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span></legend>
                  <div class="row">
                    <div class="column large-6">
                      <input type="radio" name="priority" value="Low" id="low" required><label for="low">Low</label>
                    </div>
                    <div class="column large-6">
                      <input type="radio" name="priority" value="Medium" id="medium"><label for="medium">Medium</label>
                    </div>
                    <div class="column large-6">
                    <input type="radio" name="priority" value="High" id="high"><label for="high">High</label>
                    </div>
                    <div class="column large-6">
                      <input type="radio" name="priority" value="Asap" id="asap"><label for="asap">Asap</label>
                    </div>
                  </div>

                </fieldset>
              </div>
              <div class="large-12 columns ">
                <fieldset class="fieldset">
                  <legend><span class="form-title">Who should we contact? </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  </legend>
                  <div class="row">
                    <div class="column large-6">
                      <input type="radio" name="contact-person" value="recipent" id="recipent" required><label for="recipent">Recipent</label>
                    </div>
                    <div class="column large-6">
                      <input type="radio" name="contact-person" value="requestor" id="requestor"><label for="requestor">Requestor</label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="medium-12 columns mix ">
                <label><span class="form-title">Callback Number </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" placeholder="callback number">
                </label>
              </div>
              <div class="medium-12 columns">
                <label><span class="form-title">Description</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="Please explain the question or problem in detail, and let us know how you'd like to be contacted."><i class="fa fa-question-circle"> </i> </span>
                  <textarea rows="3" id="description"> </textarea>
                </label>
              </div>
            </div>
          </div>
          <div class="form-footer">
            <button type="submit" class="button btn-submit ">Submit Ticket</button>
          </div>
          <div class="tiny reveal request-modal" id="modal" data-reveal>
            <button class="close-button" data-close aria-label="Close Accessible Modal" type="button">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </form>
      </div>
      <div class="clearfix"></div>

      <div>
        <piechart :data="piechartData"></piechart>
        <trendchart :data="trendchartData"></trendchart>
        <div class="clearfix"></div>
      </div>
      <div class="clearfix"></div>

    <router-view class="child"></router-view>
</div>
</template>

<script src="./dashboard.ctrl.js" lang="babel"></script>

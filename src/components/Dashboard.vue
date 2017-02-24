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
                  <option data-id="issue-1" data-value="IRE1">Troubleshooting</option>
                  <option data-id="issue-2" data-value="IRE1">Plan Change</option>
                  <option data-id="issue-3" data-value="IRE0">Email Service</option>
                  <option data-id="issue-4" data-value="ALR4">Billing &amp; allocations</option>
                  <option data-id="issue-5" data-value="IRE0">Activation</option>
                  <option data-id="issue-6" data-value="IRE0">International Request</option>
                  <option data-id="issue-7" data-value="IRE0">Other</option>
                </select>
              </label>
            </div>
            <div id="Container">
              <div class="medium-12 columns mix issue-5">
                <label><span class="form-title">IMEI/MEID</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" id="imei_meid" placeholder="imei/meid">
                </label>
              </div>
              <div class="medium-12 columns mix issue-5">
                <label><span class="form-title">ICCID</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" id="iccid" placeholder="iccid">
                </label>
              </div>
              <div class="medium-12 columns mix issue-5">
                <label><span class="form-title">Device type, Make/Model </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" id="device_type" placeholder="device type">
                </label>
              </div>
              <div class="medium-12 columns mix issue-5">
                <label><span class="form-title">Phone Origin </span><span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Where did you get the phone? IE: New Service, Upgrade, Internal">*</span>
                  <input type="text" id="phone_origin" placeholder="phone origin">
                </label>
              </div>
              <div class="medium-12 columns mix issue-5">
                <label><span class="form-title">Mobile # </span><span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" id="int_mobile" placeholder="mobile number">
                </label>
              </div>
              <div class="medium-12 columns mix issue-6">
                <label><span class="form-title">What country/countries.js are you travelling to?</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <select id="country2" name="country2" required> </select>
                </label>
              </div>
              <div class="medium-12 columns mix issue-6">
                <label><span class="form-title">Dates of travel</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required " data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input id="flatpickr" class="flatpickr" type="text" placeholder="Select Date.." >
                </label>
              </div>
              <div class="medium-12 columns mix issue-6">
                <label><span class="form-title">Device type, phone, tablet, mifi </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                  <input type="text" id="int-device_type" placeholder="">
                </label>
              </div>
                <div class="medium-12 columns mix issue-3">
                    <fieldset class="fieldset">
                        <legend><span class="form-title">Email Services </span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> </legend>

                        <input type="radio" name="email-setup" value="Email Setup" id="email_setup" required><label for="email_setup">Email Setup</label>
                        <input type="radio" name="email-setup" value="Email Troubleshooting" id="email_troubleshooting"><label for="email_troubleshooting">Email Troubleshooting</label>
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
                  <input id="recipient_mobile" type="text" placeholder="recipient mobile #">
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
                      <input type="radio" name="contact-person" value="Recipent" id="recipent" required><label for="recipent">Recipent</label>
                    </div>
                    <div class="column large-6">
                      <input type="radio" name="contact-person" value="Requestor" id="requestor"><label for="requestor">Requestor</label>
                    </div>
                  </div>
                </fieldset>
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

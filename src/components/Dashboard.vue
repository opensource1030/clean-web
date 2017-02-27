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
            <select id="tags" class="user-actions required" name="tags" required>
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
          <label for="recipient_mobilenumber"><span class="form-title">Affected Number (if number is unavailable, please add N/A)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="if number is unavailable, please add N/A."><i class="fa fa-question-circle"> </i> </span>
            <input type="text" placeholder="Your mobile no." name="customerMobileNumber" id="recipient_mobilenumber"  >
          </label>
        </div>
          <div class="large-12 columns ">
            <fieldset class="fieldset">
              <legend><span class="form-title">Preferred Contact Method </span> </legend>
              <div class="row">
                <label for="email" class="column large-4 medium-4"><input type="radio" name="method" value="email" id="email" required>Email</label>
                <label for="phone" class="column large-4 medium-4"><input type="radio" name="method" value="phone" id="phone" required>Phone</label>

              </div>
            </fieldset>
          </div>
          <div class="medium-12 columns">
            <label for="recipient_phonenumber"><span class="form-title">Callback Number (if number is unavailable, please add N/A)</span> <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span> <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="if number is unavailable, please add N/A."><i class="fa fa-question-circle"> </i> </span>
              <input type="text" placeholder="Callback no." name="customerPhoneNumber" id="recipient_phonenumber"  >
            </label>
          </div>

          <div class="medium-12 columns">
            <label for="description"><span class="form-title">Message</span>
              <textarea rows="3" name="message" id="description"  placeholder="Your details here" required> </textarea>
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
</div>
</template>

<script src="./dashboard.ctrl.js" lang="babel"></script>

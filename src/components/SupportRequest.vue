<template>
  <div class="support-form-holder font_size_form">
    <b-card>
      <div class="form-header">
        <a @click="closeTicket()" class="btn-close" title="close"><i class="fa fa-times-circle"> </i></a>
      </div>
      <b-form id="support-form" @submit.prevent="onSubmit">
        <b-form-group class="support-form-container">
          <div>
            <label>
              <label>How Can We Help?</label>
              <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
              <select v-model="ticket.issue" id="support-issues" class="user-actions form-control" required>
                <option selected disabled value="">-- Choose an issue ---</option>
                <optgroup label="Billing">
                  <option value="qamms">Questions About My Monthly Statement</option>
                  <option value="obi">Other Billing Issues</option>
                </optgroup>
                <optgroup label="Device Support">
                  <option value="amd">Activate My Device</option>
                  <option value="ec">Email Connectivity</option>
                  <option value="iwta">Issues While Traveling Abroad</option>
                  <option value="odsi">Other Device Support Issues</option>
                </optgroup>
                <optgroup label="Service Plan / Feature">
                  <option value="aif">Add International Features</option>
                  <option value="cs">Cancel Service</option>
                  <option value="cef">Change Existing Features</option>
                  <option value="sws">Suspend/Unsuspend Wireless Service</option>
                  <option value="tstpa">Transfer Service to a Personal Account</option>
                  <option value="osapi">Other Service and Plan Issues</option>
                </optgroup>
              </select>
            </label>
          </div>
          <div id="Container" class="mt-1">
            <div v-if="ticket.issue=='amd'">
              <label>
                <label>IMEI/MEID</label>
                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <input v-model="ticket.data.imei_meid" class="form-control" type="text" id="imei_meid" placeholder="imei/meid" required>
              </label>
            </div>
            <div v-if="ticket.issue=='amd'">
              <label>
                <label class="mt-1">ICCID</label>
                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <input v-model="ticket.data.iccid" class="form-control" type="text" id="iccid" placeholder="iccid" required>
              </label>
            </div>
            <div v-if="ticket.issue=='amd'">
              <label>
                <label class="mt-1">Device type, Make/Model </label>
                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <input v-model="ticket.data.device_type" class="form-control" type="text" id="device_type" placeholder="device type" required>
              </label>
            </div>
            <div v-if="ticket.issue=='amd'">
              <label>
                <label class="mt-1">Phone Origin </label>
                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Where did you get the phone? IE: New Service, Upgrade, Internal">*</span>
                <input v-model="ticket.data.phone_origin" class="form-control" type="text" id="phone_origin" placeholder="phone origin" required>
              </label>
            </div>
            <div v-if="ticket.issue=='amd'">
              <label>
                <label class="mt-1">Mobile # </label>
                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <input v-model="ticket.data.int_mobile" class="form-control" type="text" id="int_mobile" placeholder="mobile number" required>
              </label>
            </div>
            <div v-if="ticket.issue=='aif'">
              <label>
                <label class="mt-1">What Country are you travelling to? </label>
                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <select2 v-model="ticket.data.countries" :options="countries" name="countries" multiple=true></select2>
              </label>
            </div>
            <div v-if="ticket.issue=='aif'">
              <label>
                <label class="mt-1">Dates of travel</label>
                <span data-tooltip aria-haspopup="true" class="has-tip top is-required " data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <input v-model="ticket.data.travel_date" class="form-control" type="text" placeholder="Select Date.." required>
              </label>
            </div>
            <div v-if="ticket.issue=='aif'">
              <label>
                <label class="mt-1">Device Type (Phone/Tablet/MiFi)</label>
                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <input v-model="ticket.data.int_device_type" class="form-control" type="text" id="int-device_type" placeholder="" required>
              </label>
            </div>
            <div v-if="ticket.issue=='ec'">
              <fieldset class="fieldset mt-3">
                <legend>
                  <label>Email Services </label>
                  <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                </legend>
                <b-row>
                  <b-col cols="4">
                    <div class="column large-6">
                      <input v-model="ticket.data.email_service" type="radio" name="email_services" value="Email Setup" id="email_setup" required>
                      <label class="ml-1" for="email_setup">Email Setup</label>
                    </div>
                  </b-col>
                  <b-col cols="8">
                    <div class="column large-6">
                      <input v-model="ticket.data.email_service" type="radio" name="email_services" value="Email Troubleshooting" id="email_troubleshooting">
                      <label class="ml-1" for="email_troubleshooting">Email Troubleshooting</label>
                    </div>
                  </b-col>
                </b-row>
              </fieldset>
            </div>
            <div>
              <label>
                <span class="form-title">Requestor Email (whomever is filling out this form)</span>
                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="Whomever is filling out this form.">
                  <i class="fa fa-question-circle"></i>
                </span>
                <input v-model="ticket.requestor_email" class="form-control" id="requestor_email" type="text">
              </label>
            </div>
            <div class="medium-12 columns">
              <label>
                <span class="form-title">Recipient Email (the affected user)</span>
                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="The affected user.">
                  <i class="fa fa-question-circle"></i>
                </span>
                <input v-model="ticket.recipient_email" class="form-control" type="text" id="recipient_email" placeholder="your email">
              </label>
            </div>
            <div>
              <label>
                <span class="form-title">Recipient Mobile Number (if number is unavailable, please add N/A)</span>
                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="if number is unavailable, please add N/A.">
                  <i class="fa fa-question-circle"></i>
                </span>
                <input v-model="ticket.recipient_mobile" class="form-control" type="text" placeholder="recipient mobile #" required>
              </label>
            </div>
            <div>
              <fieldset class="fieldset">
                <legend>
                  <span class="form-title">Priority </span>
                  <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                </legend>
                <div class="row">
                  <div class="column large-6 mr-4">
                    <input v-model="ticket.priority" type="radio" name="priority" value="Low" id="low" required>
                    <label class="ml-2" for="low">Low</label>
                  </div>
                  <div class="column large-6 mr-4">
                    <input v-model="ticket.priority" type="radio" name="priority" value="Medium" id="medium">
                    <label class="ml-2" for="medium">Medium</label>
                  </div>
                  <div class="column large-6 mr-4">
                    <input v-model="ticket.priority" type="radio" name="priority" value="High" id="high">
                    <label class="ml-2" for="high">High</label>
                  </div>
                  <div class="column large-6 mr-4">
                    <input v-model="ticket.priority" type="radio" name="priority" value="Asap" id="asap">
                    <label class="ml-2" for="asap">Asap</label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div>
              <fieldset class="fieldset">
                <legend>
                  <span class="form-title">Who should we contact? </span>
                  <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                </legend>
                <div class="row">
                  <div class="column large-6 mr-4">
                    <input v-model="ticket.contact_person" type="radio" name="contact-person" value="Recipient" id="recipient" required>
                    <label class="ml-2" for="recipient">Recipient</label>
                  </div>
                  <div class="column large-6 mr-4">
                    <input v-model="ticket.contact_person" type="radio" name="contact-person" value="Requestor" id="requestor">
                    <label class="ml-2" for="requestor">Requestor</label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="medium-12 columns">
              <label>
                <span class="form-title">Description</span>
                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="Please explain the question or problem in detail, and let us know how you'd like to be contacted.">
                  <i class="fa fa-question-circle"></i>
                </span>
                <textarea v-model="ticket.description" class="form-control" rows="3" name="description" required></textarea>
              </label>
            </div>
            <div class="form-footer">
              <button type="submit" class="button btn-primary btn-submit ">Submit Ticket</button>
            </div>
          </div>
        </b-form-group>
      </b-form>
    </b-card>

    <b-modal
      v-model="show_success_dialog"
      hide-footer
    >
      <div class="d-block text-center is-success">
        <h3>Ticket Opened Successfully</h3>
      </div>
    </b-modal>

    <b-modal
      v-model="show_error_dialog"
      content-class="is-error"
      hide-footer
    >
      <div class="d-block text-center is-error">
        <h3>Error</h3>
      </div>
    </b-modal>
  </div>
</template>

<script src="./support" lang="babel"></script>
<!-- <script src="./support-request" lang="babel"></script> -->

<style scoped>
.font_size_form label {
  font-size: 0.875rem;
}
.font_size_form span {
  font-size: 0.875rem;
}
</style>

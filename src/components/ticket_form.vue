<template>
  <div
    class="ticket-form-container px-4"
    :class="{ 'loading': loading }"
  >
    <h3 class="pt-5">Support</h3>

    <b-form
      class="form"
      @submit.prevent="onSubmit"
    >
      <div class="form-body">
        <div class="field mt-3">
          <label>
            <span class="field-title">How Can We Help?</span>
            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
            <ticket-type-select v-model="ticket.issue"/>
          </label>
        </div>

        <div class="row" v-if="ticket.issue=='amd'">
          <div class="col-lg field mt-3">
            <label>
              <span class="field-title">IMEI/MEID</span>
              <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
              <input v-model="ticket.data.imei_meid" class="form-control" type="text" id="imei_meid" placeholder="imei/meid" required>
            </label>
          </div>

          <div class="col-lg field mt-3">
            <label>
              <span class="field-title">ICCID</span>
              <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
              <input v-model="ticket.data.iccid" class="form-control" type="text" id="iccid" placeholder="iccid" required>
            </label>
          </div>
        </div>

        <div class="field mt-3" v-if="ticket.issue=='amd'">
          <label>
            <span class="field-title">Device type, Make/Model</span>
            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
            <input v-model="ticket.data.device_type" class="form-control" type="text" id="device_type" placeholder="device type" required>
          </label>
        </div>

        <div class="row" v-if="ticket.issue=='amd'">
          <div class="col-lg field mt-3">
            <label>
              <span class="field-title">Phone Origin</span>
              <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Where did you get the phone? IE: New Service, Upgrade, Internal">*</span>
              <input v-model="ticket.data.phone_origin" class="form-control" type="text" id="phone_origin" placeholder="phone origin" required>
            </label>
          </div>

          <div class="col-lg field mt-3">
            <label>
              <span class="field-title">Mobile #</span>
              <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
              <input v-model="ticket.data.int_mobile" class="form-control" type="text" id="int_mobile" placeholder="mobile number" required>
            </label>
          </div>
        </div>

        <div v-if="ticket.issue=='aif'" class="field mt-3">
          <label>
            <span class="field-title">What Country are you travelling to?</span>
            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
            <multiselect
              v-model="ticket.data.countries"
              name="countries"
              :options="countries"
              :multiple="true"
              :taggable="true"
            />
          </label>
        </div>

        <div v-if="ticket.issue=='aif'" class="field mt-3">
          <label>
            <span class="field-title">Dates of travel</span>
            <span data-tooltip aria-haspopup="true" class="has-tip top is-required " data-disable-hover="false" tabindex="1" title="Required Field">*</span>
            <!-- <input v-model="ticket.data.travel_date" class="form-control" type="text" placeholder="Select Date.." required> -->
            <datepicker v-model="ticket.data.travel_date" input-class="form-control" name="travel_date" required="true" />
          </label>
        </div>

        <div v-if="ticket.issue=='aif'" class="field mt-3">
          <label>
            <span class="field-title">Device Type (Phone/Tablet/MiFi)</span>
            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
            <input v-model="ticket.data.int_device_type" class="form-control" type="text" id="int-device_type" placeholder="" required>
          </label>
        </div>

        <div v-if="ticket.issue=='ec'" class="field mt-3">
          <fieldset class="fieldset mt-3">
            <legend>
              <span class="field-title">Email Services</span>
              <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
            </legend>
            <div class="d-flex justify-content-start">
              <div class="d-flex align-items-center">
                <input v-model="ticket.data.email_service" type="radio" name="email_services" value="Email Setup" id="email_setup" required>
                <label class="ml-2" for="email_setup">Email Setup</label>
              </div>
              <div class="d-flex align-items-center ml-4">
                <input v-model="ticket.data.email_service" type="radio" name="email_services" value="Email Troubleshooting" id="email_troubleshooting">
                <label class="ml-2" for="email_troubleshooting">Email Troubleshooting</label>
              </div>
            </div>
          </fieldset>
        </div>

        <div class="row">
          <div class="col-lg-6 field mt-3">
            <label>
              <span class="field-title">Requestor Email</span>
              <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
              <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="Whomever is filling out this form.">
                <i class="fa fa-question-circle"></i>
              </span>
              <input v-model="ticket.requestor_email" class="form-control" type="text" placeholder="requestor email" required>
            </label>
          </div>
        </div>

        <div class="row">
          <div class="col-lg field mt-3">
            <label>
              <span class="field-title">Recipient Email</span>
              <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
              <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="The affected user.">
                <i class="fa fa-question-circle"></i>
              </span>
              <input v-model="ticket.recipient_email" class="form-control" type="text" placeholder="recipient email" required>
            </label>
          </div>

          <div class="col-lg field mt-3">
            <label>
              <span class="field-title">Recipient Mobile Number</span>
              <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
              <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="if number is unavailable, please add N/A.">
                <i class="fa fa-question-circle"></i>
              </span>
              <input v-model="ticket.recipient_mobile" class="form-control" type="text" placeholder="recipient mobile #" required>
            </label>
          </div>
        </div>

        <div class="field mt-3">
          <fieldset class="fieldset">
            <legend>
              <span class="field-title">Who should we contact?</span>
              <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
            </legend>
            <div class="d-flex justify-content-start">
              <div class="d-flex align-items-center">
                <input v-model="ticket.contact_person" type="radio" name="contact-person" value="Recipient" id="recipient" required>
                <label class="ml-2 mb-0" for="recipient">Recipient</label>
              </div>
              <div class="d-flex align-items-center ml-4">
                <input v-model="ticket.contact_person" type="radio" name="contact-person" value="Requestor" id="requestor">
                <label class="ml-2 mb-0" for="requestor">Requestor</label>
              </div>
            </div>
          </fieldset>
        </div>

        <div class="field mt-3">
          <label>
            <span class="field-title">Description</span>
            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
            <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="Please explain the question or problem in detail, and let us know how you'd like to be contacted.">
              <i class="fa fa-question-circle"></i>
            </span>
            <textarea v-model="ticket.description" class="form-control" rows="3" name="description" required></textarea>
          </label>
        </div>

        <div class="field mt-3">
          <fieldset class="fieldset">
            <legend>
              <span class="field-title">Priority</span>
              <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
            </legend>
            <div class="d-flex justify-content-start">
              <div class="d-flex align-items-center">
                <input v-model="ticket.priority" type="radio" name="priority" value="Low" id="low" required>
                <label class="ml-2 mb-0" for="low">Low</label>
              </div>
              <div class="d-flex align-items-center ml-4">
                <input v-model="ticket.priority" type="radio" name="priority" value="Medium" id="medium">
                <label class="ml-2 mb-0" for="medium">Medium</label>
              </div>
              <div class="d-flex align-items-center ml-4">
                <input v-model="ticket.priority" type="radio" name="priority" value="High" id="high">
                <label class="ml-2 mb-0" for="high">High</label>
              </div>
              <div class="d-flex align-items-center ml-4">
                <input v-model="ticket.priority" type="radio" name="priority" value="Asap" id="asap">
                <label class="ml-2 mb-0" for="asap">Asap</label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="form-footer text-center mt-4 mb-2">
        <b-btn
          variant="default"
          type="submit"
        >Submit Ticket</b-btn>
      </div>
    </b-form>

    <div class="support-info" v-html="supportInformation"></div>
  </div>
</template>

<script src="./ticket_form.ctrl.js" lang="babel"></script>

<style lang="scss" scoped>
.ticket-form-container {
  width: 600px;
  h3 {
    font-size: 24px;
    font-weight: 600;
  }

  label {
    margin-bottom: 0;
  }

  .field {
    & > label {
      display: block;
      .form-control {
        margin-top: 10px;
      }
    }
    legend {
      font-size: 14px;
    }
    .has-tip.is-required {
      color: red;
    }
    // .has-tip .fa-question-circle {
    //   color: blue;
    // }
    .field-title {
      font-weight: 600;
    }
  }
}

@media (max-width: 991.98px) {
  .ticket-form-container {
    width: 100%;
  }
}
</style>

<style lang="scss">
.ticket-form-container {
  .support-info {
    line-height: 36px;
    ul {
      padding-left: 10px;
      list-style: none;
    }
  }
}
</style>

import _ from 'lodash'
import { country_arr } from "./../api/countries"
import { Log } from './../helpers'
import select2 from './select2.vue'
// const Flatpickr = require("flatpickr")
// var config = require('../../config/dev.env')

export default {
  components: {
    select2
  },

  data() {
    return {
      show_success_dialog: false,
      show_error_dialog: false,
      ticket_issues: [
        { id: 'issue-4', value: 'qamms', tag: 'BIL1', label: 'Questions About My Monthly Statement' },
        { id: 'issue-15', value: 'obi', tag: 'BIL1', label: 'Other Billing Issues' },
        { id: 'issue-5', value: 'amd', tag: 'IRE0', label: 'Activate My Device' },
        { id: 'issue-3', value: 'ec', tag: 'IRE0', label: 'Email Connectivity' },
        { id: 'issue-8', value: 'iwta', tag: 'IRE0', label: 'Issues While Traveling Abroad' },
        { id: 'issue-9', value: 'odsi', tag: 'IRE0', label: 'Other Device Support Issues' },
        { id: 'issue-6', value: 'aif', tag: 'IRE1', label: 'Add/Remove International Features' },
        { id: 'issue-10', value: 'cs', tag: 'IRE1', label: 'Cancel Service' },
        { id: 'issue-2', value: 'cef', tag: 'IRE1', label: 'Change Existing Features' },
        { id: 'issue-12', value: 'sws', tag: 'IRE1', label: 'Suspend/Unsuspend Wireless Service' },
        { id: 'issue-13', value: 'tstpa', tag: 'IRE1', label: 'Transfer Service to a Personal Account' },
        { id: 'issue-14', value: 'osapi', tag: 'IRE1', label: 'Other Service and Plan Issues' }
      ],
      countries: [],
      ticket: {
        issue: '',
        recipient_email: '',
        requestor_email: '',
        recipient_firstname: '',
        recipient_lastname: '',
        recipient_mobile: '',
        priority: '',
        contact_person: '',
        description: '',
        data: {
          imei_meid: '',
          iccid: '',
          device_type: '',
          phone_origin: '',
          int_mobile: '',
          countries: [],
          travel_date: '',
          int_device_type: '',
          email_service: '',
        }
      }
    }
  },

  methods: {
    closeTicket() {
      this.$store.commit('auth/setShowTicket', false)
    },

    onSubmit() {
      console.log('ticket onSubmit', this.ticket)

      // var form = $('#support-form');
      // var $modal = $('#modal');
      const company = "wirelessanalytics";
      const key = "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";

      const easyvistaKey = ''
      const ticket_issue = _.find(this.ticket_issues, (ti) => (ti.value == this.ticket.issue))
      const helpdesk_code = ticket_issue.tag
      const subject = ticket_issue.label

      let msg = "<strong>" + subject  + "</strong><br/>"

      if (subject === "Activate My Device") {
        var msg_activation = "<strong>IMEI-MEID: </strong>" + this.ticket.data.imei_meid + "<br/>" +
          "<strong>ICCID: </strong>" + this.ticket.data.iccid + "<br/>" +
          "<strong>Device type, Make/Model: </strong>" + this.ticket.data.device_type + "<br/>" +
          "<strong>Phone Origin: </strong>" + this.ticket.data.phone_origin + "<br/>" +
          "<strong>Mobile #: </strong>" + this.ticket.data.int_mobile + "<br/>"
        msg += msg_activation
      }

      if (subject === "Email Connectivity") {
        var msg_email = "<strong>Email Service: </strong>" + this.ticket.data.email_service + "<br/>"
        msg += msg_email
      }

      if (subject === "Add/Remove International Features") {
        var msg_international_activation = "<strong>Country Traveling To: <strong>" + this.ticket.data.countries.join(', ') + "<br/>" +
          "<strong>Dates of Travel: </strong>" + this.ticket.data.travel_date + "<br/> " +
          "<strong>International Device Type: </strong>" + this.ticket.data.int_device_type + "<br/>"
        msg +=  msg_international_activation
      }

      msg += "<strong>Priority: </strong>" + this.ticket.priority + "<hr/>"
      msg += "<strong>Recipient Email (Who to Contact): </strong>" + this.ticket.recipient_email + "<br/>" +
        "<strong>Requestor Email: </strong>" + this.ticket.requestor_email + "<br/>" +
        "<strong>Affected Number: </strong>" + this.ticket.recipient_mobile + "<br/>" +
        "<strong>Who to contact: </strong>" + this.ticket.contact_person + "<hr/>"
      msg += "<strong>Description: </strong>" + this.ticket.description

      var json = {
        "requests" : [
          {
            // "Origin" : config.EASYVISTA_CODE,
            "Origin" : process.env.EASYVISTA_CODE,
            "Catalog_GUID" : "",
            "Catalog_Code" : helpdesk_code,
            "AssetID" : "",
            "AssetTag" : "",
            "ASSET_NAME" : "",
            "Urgency_ID" : "2",
            "Severity_ID" : "41",
            "External_reference" : "",
            "Phone" : "",
            "Requestor_Identification" : "",
            "Requestor_Mail" : this.ticket.requestor_email,
            "Requestor_Name" : "",
            "Location_ID" : "",
            "Location_Code" : "",
            "Department_ID" : "",
            "Department_Code" : "",
            "Recipient_ID" : "",
            "Recipient_Identification" : "",
            "Recipient_Mail" : this.ticket.recipient_email,
            "Recipient_Name" : "" ,
            "Description" : msg,
            "ParentRequest" : "",
            "CI_ID" : "",
            "CI_ASSET_TAG" : "",
            "CI_NAME" : "",
            "SUBMIT_DATE" : ""
          }
        ]
      }

      // console.log(msg)
      // console.log(json)

      // this.show_success_dialog = true
      this.show_error_dialog = true

      // $modal.html('');
      // $modal.removeClass('is-error').addClass('is-success').append("<h4>Ticket Opened Successfully </h4>" + "<button data-close='' aria-label='Close Accessible Modal' type='button' class='close-button'><span aria-hidden='true'>×</span></button>").show();

      // $('#my-modal').show();
      // dashboard.$refs['my-modal'].show()
      // $.ajax({
      //   type: "POST",
      //   //url: "https://api.elasticemail.com/v2/email/send",
      //   // headers: {"Authorization": "Bearer " + key},
      //   data: JSON.stringify(json),
      //   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //   url: "https://wa.easyvista.com/api/v1/"  + local.EV_ACCOUNT + "/requests",
      //   // url: "https://wa.easyvista.com/api/v1/"  + process.env.EV_ACCOUNT + "/requests",
      //   headers: {"Authorization": "Basic anN0ZWVsZTp3MXJlbGVzcw=="},
      //   // contentType: "application/x-www-form-urlencoded",
      //   contentType: "application/json; charset=UTF-8",
      //   processData: false,
      //   // data: {
      //   //   "subject": subject,
      //   //   "to": process.env.SUPPORT_EMAIL,
      //   //   "apikey": "fad6cdd8-a1dc-46c1-8656-0b66371d614b",
      //   //   "bodyHtml": msg,
      //   //   "from": $('#recipient_email').val(),
      //   // },
      //   // contentType: "application/json; charset=UTF-8",
      //   beforeSend: function () {
      //     $('.support-form-holder').addClass('loading');
      //   },
      //   success: function () {
      //     console.log("succes")
      //     /*$modal.html('');
      //     $modal.removeClass('is-error').addClass('is-success').append("<h4>Ticket Opened Successfully </h4>" + "<button data-close='' aria-label='Close Accessible Modal' type='button' class='close-button'><span aria-hidden='true'>×</span></button>").fundation;
      //     alert("Ticket Opened Successfully")
      //     //this.$refs['my-modal'].show()
      //     //SupportRequest.$refs['my-modal'].show()
      //     //$modal.html('');
      //     $('.support-form-holder').removeClass('loading');
      //     $('#support-form')[0].reset();
      //     heap.track('Support Tickets sent successfully', {'clicked': 'yes'});
      //   },
      //   error: function (XMLHttpRequest, textStatus, errorThrown) {
      //     $('.support-form-holder').removeClass('loading');
      //     $('#modal').html('');
      //     $modal.removeClass('is-success').addClass('is-error').append("<h4>" + "Status: " + textStatus + "</h4>" + "<p>" + "Error: " + errorThrown + "</p>" + "<button data-close='' aria-label='Close Accessible Modal' type='button' class='close-button'><span aria-hidden='true'>×</span></button>");
      //     alert("Error")
      //   }
      // })
    },

    showModal() {
      this.$refs['my-modal'].show()
      //$('#my-modal').trigger('focus')
    }
  },

  created() {
    this.countries = _.map(country_arr, (c) => { return { id: c, text: c } })

    const profile = JSON.parse(localStorage.getItem("profile"))
    this.ticket.recipient_email = profile.email
    this.ticket.requestor_email = profile.email
    this.ticket.recipient_firstname = profile.firstName
    this.ticket.recipient_lastname = profile.lastName

    this.ticket.issue = this.$store.state.auth.ticket_issue

    Log.put('ticket created')
  },

  mounted() {
  },
}

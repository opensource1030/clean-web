import _ from 'lodash'
import { country_arr } from "@/api/countries"
import { Log } from '@/helpers'
import TicketTypeSelect from './ticket_type_select'

export default {
  components: {
    TicketTypeSelect
  },

  data() {
    return {
      // show_success_dialog: false,
      // show_error_dialog: false,
      loading: false,
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

  computed: {
    supportInformation() {
      // return _.get(this.$store.getters['auth/getClientInfo'], 'data.metadata.support_information', '')
      return _.get(this.$store.getters['auth/getClientInfo'], 'data.metadata.get_support', '')
    }
  },

  methods: {
    closeTicket() {
      this.$store.commit('auth/setShowTicket', false)
    },

    onSubmit() {
      console.log('ticket onSubmit', this.ticket)

      if (this.ticket.issue === 'aif' && this.ticket.data.countries.length === 0) {
        this.$swal('Error', 'Please select at least one country', 'error')
        return false
      }

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
      // this.show_error_dialog = true

      const vm = this
      // vm.$swal('Error', '', 'error')
      // vm.$swal({
      //   title: 'Are you sure?',
      //   text: 'You won\'t be able to revert this!',
      //   type: 'warning',
      //   showCancelButton: true,
      //   confirmButtonColor: '#3085d6',
      //   cancelButtonColor: '#d33',
      //   confirmButtonText: 'Yes, delete it!'
      // }).then((result) => {
      //   // console.log(result.dismiss, result)
      //   if (!result.dismiss && result.value) {
      //   } else {
      //   }
      // })

      $.ajax({
        type: "POST",
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        url: process.env.EV_URL + '/' + process.env.EV_ACCOUNT + '/requests',
        headers: { "Authorization": "Basic anN0ZWVsZTp3MXJlbGVzcw==" },
        // contentType: "application/x-www-form-urlencoded",
        contentType: "application/json; charset=UTF-8",
        processData: false,
        data: JSON.stringify(json),
        beforeSend: function (xhr) {
          vm.loading = true
        },
        success: function () {
          vm.$swal('Submitted', 'Ticket Opened Successfully', 'success').then(() => {
            vm.loading = false
            vm.$store.commit('auth/setShowTicket', false)
          })
          // heap.track('Support Tickets sent successfully', {'clicked': 'yes'});
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          vm.$swal(textStatus, errorThrown, 'error')
          vm.loading = false
        }
      })
    }
  },

  created() {
    // this.countries = _.map(country_arr, (c) => { return { id: c, text: c } })
    this.countries = country_arr

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

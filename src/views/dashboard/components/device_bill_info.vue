<template>
  <drawer open="true" @close="toggleServiceInfoDrawer()">
    <div class="service-info-container row m-0" v-if="activeAllocation">
      <div class="col-lg-5 px-5 pt-5 pb-3 bg-primary left-pane">
        <div>
          <h4 class="d-inline-block">{{ activeAllocation.mobile_number | phone }}</h4>
          <span class="badge bg-success ml-2 px-2 py-1">Active</span>
          <div>{{ activeAllocation.device }}</div>
          <div class="mt-3">
            <label>Device Type:</label>
            <span>{{ activeAllocation.device_type }}</span>
          </div>
          <div>
            <label>IMEI/ESN:</label>
            <span>{{ activeAllocation.device_esn_imei }}</span>
          </div>
          <div>
            <label>SIM:</label>
            <span>{{ activeAllocation.device_sim }}</span>
          </div>
          <div>
            <label>Carrier:</label>
            <span>{{ activeAllocation.carrier }}</span>
          </div>
          <div>
            <label>Currency:</label>
            <span>{{ activeAllocation.currency }}</span>
          </div>
        </div>

        <hr class="my-4">

        <div>
          <div class="mb-3">
            <avatar
              :username="userInfo.data.firstName + ' ' + userInfo.data.lastName"
              :size="30"
              inline
            ></avatar>
            <label class="ml-2 mb-0">{{ userInfo.data.firstName }} {{ userInfo.data.lastName }}</label>
          </div>
          <ul class="list-unstyled">
            <li><label>Employee Email:</label><span>employee@example.com</span></li>
            <li><label>Employee Id:</label><span>76543</span></li>
            <li><label>Supervisor Email:</label><span>supervisor@example.com</span></li>
            <li><label>Division:</label><span>Scientific Research</span></li>
            <li><label>Department:</label><span>69690.5858.58549303</span></li>
            <li><label>Office:</label><span>Cambridge</span></li>
          </ul>
        </div>

        <hr class="my-4">

        <label>
          <b class="d-block mb-3">Contact support:</b>
          <ticket-type-select
            v-model="activeAllocation.issue"
            @change="onChangeTicketIssue($event); toggleServiceInfoDrawer();"
          />
        </label>
      </div>

      <div class="col-lg-7 px-5 pt-5 pb-3 right-pane">
        <div class="d-flex">
          <div class="border-right pr-3">
            <label>BILL MONTH</label>
            <div class="text-center">{{ activeAllocation.bill_month | cleanDate }}</div>
          </div>
          <div class="border-right px-3">
            <label>CYCLE DATES</label>
            <div class="text-center">N/A</div>
          </div>
          <div class="pl-3">
            <label>LAST UPGRADE</label>
            <div v-if="activeAllocation.last_upgrade" class="text-center">{{ activeAllocation.last_upgrade | cleanDate }}</div>
            <div v-else class="text-center">N/A</div>
          </div>
        </div>

        <div class="total-charges d-flex justify-content-between px-4 py-3 mt-3">
          <label class="mb-0">Total Allocated Charges</label>
          <label class="mb-0">{{ subtotalCharge | currency }}</label>
        </div>

        <div>
          <div class="d-flex justify-content-between mt-4 mb-3">
            <h5>Details</h5>
            <label>Charge</label>
          </div>
          <div class="row">
            <div class="col-4">Service Plan Charge</div>
            <div class="col-6"></div>
            <div class="col-2">{{ activeAllocation.service_plan_charge | currency }}</div>
          </div>
          <div class="row">
            <div class="col-4">Domestic</div>
            <div class="col-6">
              <div>Data: {{ activeAllocation.domestic_data_usage | formatBytes }}</div>
              <div>Text Messaging: {{ activeAllocation.domestic_text_usage }}</div>
              <div>Voice: {{ activeAllocation.domestic_voice_usage }} mins</div>
            </div>
            <div class="col-2">{{ (activeAllocation.domestic_usage_charge + activeAllocation.messaging_charge) | currency }}</div>
          </div>
          <div class="row">
            <div class="col-4">International</div>
            <div class="col-6">
              <div>Data: {{ activeAllocation.intl_roam_data_usage | formatBytes }}</div>
              <div>Text Messaging: {{ activeAllocation.intl_ld_text_usage }}</div>
              <div>Voice: {{ (activeAllocation.intl_ld_voice_usage + activeAllocation.intl_roam_voice_usage) | currency }}/mins</div>
            </div>
            <div class="col-2">{{ (activeAllocation.intl_roam_usage_charge + activeAllocation.intl_ld_usage_charge) | currency }}</div>
          </div>
          <div class="row">
            <div class="col-4">Taxes</div>
            <div class="col-6"></div>
            <div class="col-2">{{ activeAllocation.taxes_charge | currency }}</div>
          </div>
          <div class="row">
            <div class="col-4">Other Carrier Charge</div>
            <div class="col-6"></div>
            <div class="col-2">{{ (activeAllocation.other_carrier_charge + activeAllocation.other_charge) | currency }}</div>
          </div>
          <div class="row">
            <div class="col-4">Usage Charge</div>
            <div class="col-6"></div>
            <div class="col-2">{{ activeAllocation.usage_charge | currency }}</div>
          </div>
          <div class="row">
            <div class="col-4">Equipment</div>
            <div class="col-6"></div>
            <div class="col-2">{{ activeAllocation.equipment_charge | currency }}</div>
          </div>
          <div class="row">
            <div class="col-4">ETF</div>
            <div class="col-6"></div>
            <div class="col-2">{{ activeAllocation.etf_charge | currency }}</div>
          </div>
          <div class="text-right">
            <div class="subtotal-charges d-inline-block px-3 py-2">
              <label class="mb-0">SubTotal</label>
              <h5 class="d-inline-block ml-4 mb-0">{{ subtotalCharge | currency }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </drawer>
</template>

<script>
import Avatar from 'vue-avatar'
import Drawer from '@/components/drawer'
import TicketTypeSelect from '@/components/ticket_type_select'

export default {
  components: {
    Avatar,
    Drawer,
    TicketTypeSelect,
  },

  data() {
    return {
      mobile_number: '',
    }
  },

  computed: {
    userInfo() {
      return this.$store.state.auth.userInfo
    },

    activeAllocation() {
      return _.find(this.userInfo.data.allocations, (a) => (a.mobile_number == this.mobile_number)) || {}
    },

    subtotalCharge() {
      return this.activeAllocation.service_plan_charge +
        this.activeAllocation.domestic_usage_charge + this.activeAllocation.messaging_charge +
        this.activeAllocation.intl_roam_usage_charge + this.activeAllocation.intl_ld_usage_charge +
        this.activeAllocation.taxes_charge +
        this.activeAllocation.other_carrier_charge + this.activeAllocation.other_charge +
        this.activeAllocation.usage_charge +
        this.activeAllocation.equipment_charge +
        this.activeAllocation.etf_charge
    }
  },

  methods: {
    onChangeTicketIssue(event) {
      const value = event.target.value
      this.$store.commit('auth/setTicketIssue', value)
      this.$store.commit('auth/setShowTicket', true)
      // console.log('onChangeTicketIssue', value, this.$store.state.auth.show_ticket, this.$store.state.auth.ticket_issue)
    },

    toggleServiceInfoDrawer() {
      this.$router.push('/dashboard')
    },
  },

  created() {
    //console.log('device_bill_info/created', this.$route)
    this.mobile_number = this.$route.params.mobile_number
    $('body').addClass('overflow-hidden');
  },

  beforeDestroy() {
    $('body').removeClass('overflow-hidden');
  }
}
</script>

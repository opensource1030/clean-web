<template>
  <drawer open="true" @close="toggleServiceInfoDrawer()">
    <div class="service-info-container row m-0" v-if="activeAllocation">
      <div class="col-lg-5 px-5 pt-5 pb-3 bg-primary left-pane">
        <div>
          <h4 class="d-inline-block">{{ activeAllocation.mobile_number | phone }}</h4>
          <span class="badge bg-success ml-2 px-2 py-1">Active</span>
          <div>{{ activeAllocation.device }}</div>
          <label class="mt-3">IMEI/ESN-SIM:</label>
          <div></div>
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
          <ticket-type-select @change="onChangeTicketIssue($event); toggleServiceInfoDrawer();"/>
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
          <label class="mb-0">$1,500.24</label>
        </div>

        <div>
          <h5 class="mt-3">Monthly Recurring Charges</h5>
          <div class="d-flex justify-content-between">
            <span>For the period (1/1/2014 - 1/31/2014)</span>
            <label>Charge</label>
          </div>
          <div class="row">
            <div class="col-4">Voice</div>
            <div class="col-6">BNBNBN</div>
            <div class="col-2">$33.46</div>
          </div>
          <div class="row">
            <div class="col-4">Data</div>
            <div class="col-6">2GB Data Pro</div>
            <div class="col-2">$33.46</div>
          </div>
          <div class="row">
            <div class="col-4">Text Messaging</div>
            <div class="col-6">Messaging 200</div>
            <div class="col-2">$33.46</div>
          </div>
          <div class="row">
            <div class="col-4">Roaming International Voice</div>
            <div class="col-6">$5.99 Global</div>
            <div class="col-2">$33.46</div>
          </div>
          <div class="row">
            <div class="col-4">Long Distance Voice</div>
            <div class="col-6">World Connect</div>
            <div class="col-2">$33.46</div>
          </div>
          <div class="text-right">
            <div class="subtotal-charges d-inline-block px-3 py-2">
              <label class="mb-0">SubTotal</label>
              <h5 class="d-inline-block ml-4 mb-0">$999.67</h5>
            </div>
          </div>
        </div>

        <div>
          <h5 class="mt-3">Partial Month Charges and Credits</h5>
          <div class="d-flex justify-content-between">
            <span>For the period (1/1/2014 - 1/31/2014)</span>
            <label>Charge</label>
          </div>
          <div class="row">
            <div class="col-4">Voice</div>
            <div class="col-6">BNBNBN</div>
            <div class="col-2">$33.46</div>
          </div>
          <div class="row">
            <div class="col-4">Data</div>
            <div class="col-6">2GB Data Pro</div>
            <div class="col-2">$33.46</div>
          </div>
          <div class="row">
            <div class="col-4">Text Messaging</div>
            <div class="col-6">Messaging 200</div>
            <div class="col-2">$33.46</div>
          </div>
          <div class="row">
            <div class="col-4">Roaming International Voice</div>
            <div class="col-6">$5.99 Global</div>
            <div class="col-2">$33.46</div>
          </div>
          <div class="row">
            <div class="col-4">Long Distance Voice</div>
            <div class="col-6">World Connect</div>
            <div class="col-2">$33.46</div>
          </div>
          <div class="text-right">
            <div class="subtotal-charges d-inline-block px-3 py-2">
              <label class="mb-0">SubTotal</label>
              <h5 class="d-inline-block ml-4 mb-0">$999.67</h5>
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

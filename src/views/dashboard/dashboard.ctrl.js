import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import Avatar from 'vue-avatar'
import Drawer from '@/components/drawer'
import TicketTypeSelect from '@/components/ticket_type_select'
import OrderConfirmModal from '@/components/order_confirm_modal'
import DeviceBillInfo from './components/device_bill_info'
import SpendChart from './components/spend_chart'
import TrendChart from './components/trend_chart'
import LegacyDashboard from './dashboard_legacy'
import { Storage, Utils, Log } from '@/helpers'
// import employeeAPI from '@/api/employee-api'
// import { all } from 'q';

// const { Store } = require('yayson')()
// const store = new Store()

export default {
  name: 'dashboard',

  components: {
    Avatar,
    TicketTypeSelect,
    DeviceBillInfo,
    Drawer,
    SpendChart,
    TrendChart,
    LegacyDashboard,
    OrderConfirmModal,
  },

  data() {
    return {
      // userInfo: {
      //   data: {},
      //   lastAllocations: [],
      //   loading: true
      // },
      startedOrder: false,
      selectedOrder: '',
      activeAllocationIndex: 0,
      activeAllocation: {
        service_plan_charge: 0,
        usage_charge: 0,
        allocated_charge: 0,
        other_charge: 0,
      },
      activeDevice: null,
      issue: '',
      showUpgradeDrawer: false,
      fromLoginPage: false,
      welcome: {
        visible: false,
        do_not_show_again: false,
      },
      serviceInfo: {
        visible: false,
      },
    }
  },

  computed: {
    _() {
      return _
    },

    userInfo() {
      return this.$store.state.auth.userInfo
    },

    upgradeEnabled() {
      return this.$store.state.feature.enabled_upgrade_device
    },

    disabledBeginOrder() {
      return this.selectedOrderType === '' ? 'disabled' : false
    },

    ...mapGetters({
      userRole: 'auth/getRole',
      clientInfo: 'auth/getClientInfo',
      // showWelcomeFlag: 'auth/getShowWelcomeFlag',
      upgradeHasOrder: 'placeOrder/upgradeHasOrder',
      newlineHasOrder: 'placeOrder/newlineHasOrder',
      transferHasOrder: 'placeOrder/transferHasOrder',
    }),

    hasOrder() {
      return this.upgradeHasOrder || this.newlineHasOrder || this.transferHasOrder
    }
  },

  // watch: {
  //   '$route' (toPath, fromPath) {
  //     console.log('$route', toPath, fromPath)
  //     if (fromPath.name == 'login' || fromPath.name == 'loginLocal') {
  //       this.fromLoginPage = true
  //     }
  //   }
  // },

  methods: {
    ...mapActions({
      setShowWelcomeFlag: 'auth/setShowWelcomeFlag',
      setUpgradeHasOrder: 'placeOrder/setUpgradeHasOrder',
      setNewlineHasOrder: 'placeOrder/setNewlineHasOrder',
      setTransferHasOrder: 'placeOrder/setTransferHasOrder',
    }),

    // setAllocation(index) {
    //   this.activeAllocationIndex = index;
    // },
    setAllocation(allocation) {
      this.activeAllocation = allocation
    },

    prevAllocation() {
      this.activeAllocationIndex > 0 ? this.activeAllocationIndex-- : null
    },

    nextAllocation() {
      this.activeAllocationIndex < this.userInfo.lastAllocations.length - 1 ? this.activeAllocationIndex++ : null
    },

    selectOrderType(type) {
      this.$set(this, 'selectedOrderType', this.selectedOrderType === type ? '' : type)
    },

    checkIfOrderable() {
      const exceptionList = ['PRXL', 'BRKR']

      return exceptionList.indexOf(this.userInfo.data.companies[0].shortName) === -1
    },

    orderDisabled() {
      this.$swal({
        type: 'warning',
        title: 'Oops...',
        text: 'This feature is not enabled, please see your IT Admin',
      })
    },

    onChangeTicketIssue(event) {
      const { value } = event.target

      this.$store.commit('auth/setTicketIssue', value)
      this.$store.commit('auth/setShowTicket', true)
      this.$store.dispatch('auth/trackEventWithAnalytics', { type: 'contact_support', value });
      // console.log('onChangeTicketIssue', value, this.$store.state.auth.show_ticket, this.$store.state.auth.ticket_issue)
    },

    toggleWelcomeDrawer() {
      this.welcome.visible = !this.welcome.visible
      if (this.welcome.do_not_show_again) {
        this.setShowWelcomeFlag(false)
      }
    },

    closeConfirmModal() {
      if (this.upgradeHasOrder) {
        this.setUpgradeHasOrder(false)
      }

      if (this.transferHasOrder) {
        this.setTransferHasOrder(false)
      }

      if (this.newlineHasOrder) {
        this.setNewlineHasOrder(false)
      }
    },

    billDetails(allocation) {
      this.$router.push({ path: `/dashboard/${allocation.mobile_number}/details` })
      this.$store.dispatch('auth/trackEventWithAnalytics', { type: 'bill_details' });
    },
  },

  beforeCreate() {},

  created() {
    this.$store.dispatch('auth/loadUserInfo').then(
      res => {
        // console.log('dashboard/created res', this.$route.param)
        // this.activeAllocation = _.get(this.userInfo, 'data.allocations[0]', null)
        this.activeAllocation = _.get(this.userInfo, 'lastAllocations[0]', null)
        // if (this.fromLoginPage) {
        //   this.welcome.visible = true
        // }
        if (!Storage.get('show_welcome_flag') ? true :  Storage.get('show_welcome_flag') == 'true') {
          this.welcome.visible = true
        }
      },
      err => {
        console.log('dashboard/created err', err)
      },
    )
  },
}

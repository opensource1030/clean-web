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
// import { Storage, Utils, Log } from '@/helpers'
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
      hasOrder: 'placeOrder/hasOrder',
    }),
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

    upgradeDevice() {
      // this.selectedOrderType = 'upgrade'
      // this.placeOrder()
    },

    // placeOrder() {
    //   if (this.userRole === 'wta') {
    //     this.showSelectUserModal = true
    //   } else {
    //     const { userId } = this.$store.state.auth

    //     this.$store.dispatch('placeOrder/setUserId', userId)
    //     this.beginOrder()
    //   }
    // },

    beginOrder() {
      // let path = ''
      // switch (this.selectedOrderType) {
      //   case 'new':
      //     path = '/orders/new/package'
      //     this.$store.dispatch('placeOrder/setCurrentOrderType', 'New')
      //     break
      //   case 'transfer':
      //     path = '/orders/new/package'
      //     this.$store.dispatch('placeOrder/setCurrentOrderType', 'Transfer')
      //     this.$store.dispatch('placeOrder/setKeepService', 'Yes')
      //     break
      //   case 'accessories':
      //     path = '/orders/new/accessories'
      //     this.$store.dispatch('placeOrder/setCurrentOrderType', 'Accessory')
      //     break
      //   case 'upgrade':
      //     const allocation = this.userInfo.data.allocations[this.activeAllocationIndex]
      //     this.$store.dispatch('placeOrder/setAllocation', allocation)
      //     this.$store.dispatch('placeOrder/setCurrentOrderType', 'Upgrade')
      //     path = '/orders/new/package'
      //     break
      //   default:
      //     return
      // }
      // this.$router.push({ path })
    },

    cancelOrder() {},

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
      // console.log('onChangeTicketIssue', value, this.$store.state.auth.show_ticket, this.$store.state.auth.ticket_issue)
    },

    toggleWelcomeDrawer() {
      this.welcome.visible = !this.welcome.visible
    },

    // toggleServiceInfoDrawer() {
    //   this.serviceInfo.visible = !this.serviceInfo.visible;
    // }

    closeConfirmModal() {
      this.setHasOrder(false)
    },

    ...mapActions({
      setHasOrder: 'placeOrder/setHasOrder',
    }),
  },

  beforeCreate() {},

  created() {
    this.$store.dispatch('auth/loadUserInfo').then(
      res => {
        console.log('dashboard/created', res)
        // this.activeAllocation = _.get(this.userInfo, 'data.allocations[0]', null)
        this.activeAllocation = _.get(this.userInfo, 'lastAllocations[0]', null)
        // if (this.fromLoginPage) {
        //   this.welcome.visible = true
        // }
        if (!this.$route.param.mobile_number) {
          this.welcome.visible = true
        }
      },
      err => {
        console.log('dashboard/created err', err)
      },
    )
  },
}

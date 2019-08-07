import _ from 'lodash'
import Avatar from 'vue-avatar'
import SpendChart from './components/spend_chart'
import TrendChart from './components/trend_chart'
import TicketTypeSelect from '@/components/ticket_type_select'
import LegacyDashboard from './dashboard_legacy'
import OrderNewSelectUser from './../orders/OrderNewUser'
import Drawer from '@/components/Drawer'
import { Storage, Utils, Log } from '@/helpers'
import employeeAPI from '@/api/employee-api'
// import { all } from 'q';

const { Store } = require('yayson')()
const store = new Store()

export default {
  name : 'dashboard',

  components: {
    Avatar,
    TicketTypeSelect,
    Drawer,
    SpendChart,
    TrendChart,
    LegacyDashboard,
    OrderNewSelectUser,
  },

  data() {
    return {
      userInfo: {
        data: {},
        lastAllocations: [],
        loading: true
      },
      startedOrder: false,
      selectedOrder: '',
      activeAllocationIndex: 0,
      activeAllocation: null,
      activeDevice: null,
      showUpgradeDrawer: false,
      welcome: {
        visible: false,
        do_not_show_again: false
      }
    }
  },

  computed: {
    _() {
      return _
    },

    clientInfo() {
      return this.$store.getters['auth/getClientInfo']
    },

    upgradeEnabled() {
      return this.$store.state.feature.enabled_upgrade_device
    },

    disabledBeginOrder() {
      return this.selectedOrder == '' ? 'disabled' : false
    }
  },

  methods: {
    // setAllocation(index) {
    //   this.activeAllocationIndex = index;
    // },
    setAllocation(allocation) {
      this.activeAllocation = allocation
    },

    prevAllocation() {
      this.activeAllocationIndex > 0 ? this.activeAllocationIndex-- : null;
    },

    nextAllocation() {
      this.activeAllocationIndex < this.userInfo.lastAllocations.length - 1 ? this.activeAllocationIndex++ : null;
    },

    selectOrderType(type) {
      this.selectedOrder == type ? this.$set(this, 'selectedOrder', '') : this.$set(this, 'selectedOrder', type);
    },

    upgradeDevice() {
      this.selectedOrder = 'upgrade'
      this.placeOrder()
    },

    placeOrder() {
      // console.log('dashboard/placeOrder role', _.get(this.$store.state.auth.profile, 'roles[0].name', ''))
      if (_.get(this.$store.state.auth.profile, 'roles[0].name', '') == 'wta') {
        this.startedOrder = true
      } else {
        this.$store.dispatch('placeOrder/setUserId', this.$store.state.auth.userId)
        this.beginOrder()
      }
    },

    beginOrder() {
      // this.selectedOrder ? location.href = '/order/' + this.selectedOrder : null;
      let path = ''
      switch (this.selectedOrder) {
        case 'new':
          path = '/orders/new/package'
          this.$store.dispatch('placeOrder/setCurrentOrderType', 'New')
          break
        case 'transfer':
          path = '/orders/new/package'
          this.$store.dispatch('placeOrder/setCurrentOrderType', 'Transfer')
          this.$store.dispatch('placeOrder/setKeepService', 'Yes')
          break
        case 'accessories':
          path = '/orders/new/accessories'
          this.$store.dispatch('placeOrder/setCurrentOrderType', 'Accessory')
          break
        case 'upgrade':
          let allocation = this.userInfo.data.allocations[this.activeAllocationIndex]
          // console.log('dashboard deviceInfo', allocation)
          this.$store.dispatch('placeOrder/setAllocation', allocation)
          this.$store.dispatch('placeOrder/setCurrentOrderType', 'Upgrade')
          path = '/orders/new/package'
          break
        default:
          return
      }
      this.$router.push({path: path})
    },

    cancelOrder() {
      this.startedOrder = false
    },

    checkIfOrderable() {
      var exceptionList = ['PRXL', 'BRKR'];

      if (exceptionList.indexOf(this.userInfo.data.companies[0].shortName) > -1)
        return false;
      else
        return true;
    },

    orderDisabled() {
      this.$swal({
        type: 'warning',
        title: 'Oops...',
        text: 'This feature is not enabled, please see your IT Admin'
      })
    },

    onChangeTicketIssue(event) {
      const value = event.target.value
      this.$store.commit('auth/setTicketIssue', value)
      this.$store.commit('auth/setShowTicket', true)
      // console.log('onChangeTicketIssue', value, this.$store.state.auth.show_ticket, this.$store.state.auth.ticket_issue)
    },

    toggleUpgradeDrawer() {
      this.showUpgradeDrawer = !this.showUpgradeDrawer;
    },

    toggleWelcomeDrawer() {
      this.welcome.visible = !this.welcome.visible;
    },
  },

  beforeCreate() {
  },

  created() {
    let profile = Utils.parseJsonString(Storage.get('profile'))

    let _params = {
      params: {
        include: 'companies.currentBillMonths,allocations', 'filter[allocations.billMonth]': '[companies.currentBillMonths.last:3]'
      }
    };
    // console.log(this.$store.state.auth)

    employeeAPI.get(this.$store.state.auth.userId, _params, res => {
      if (res.status == 404) {
        this.userInfo.data.allocations = []
        this.userInfo.lastAllocations = []
      } else {
        let event = store.sync(res.data);
        this.userInfo.data = event;

        this.activeAllocation = this.userInfo.data.allocations[0]
        for (let allocation of this.userInfo.data.allocations) {
          allocation.issue = ''
        }

        let lastAllocations = [];
        let allocationsByPhone = _.groupBy(this.userInfo.data.allocations, 'mobile_number');
        _.forEach(allocationsByPhone, function(allocations) {
          lastAllocations.push(_.orderBy(allocations, ['bill_month'], ['desc'])[0]);
        });
        this.userInfo.lastAllocations = lastAllocations;
      }

      this.userInfo.loading = false;

      Log.put('dashboard/created user info', this.userInfo);
      this.welcome.visible = true;
    }, err => {
      Log.put('dashboard/created user allocation err', err);
      this.userInfo.data = profile;
      this.userInfo.data.allocations = [];
      this.userInfo.loading = false;
    })
  }
}


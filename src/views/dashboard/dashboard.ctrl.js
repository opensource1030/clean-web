import _ from 'lodash'
import Avatar from 'vue-avatar'
import employeeAPI from '@/api/employee-api'
import SpendChart from './components/spend_chart'
import TrendChart from './components/trend_chart'
import OrderNewSelectUser from './../orders/OrderNewUser'
import { Storage, Utils, Log } from '@/helpers'

const { Store } = require('yayson')()
const store = new Store()

// Example for doing a post to bugsnag
import { bugsnagClient } from '@/bugsnag'

bugsnagClient.leaveBreadcrumb('User load dashboard', {
  customField1: 'custom field 1',
  customField2: 'custom field 2',
})

bugsnagClient.notify(new Error('CustomizedError'),{
  metaData: { 
    'special info': {
      request_id: 12345,
      message_id: 854,
      severity: 'can be info, warning, error'
    },
    'metadata': {
      reason: 'metadata xample',
    },
    'analitics': {
      'favorite animal': 'you',
      'favorite coffee': 'JV',
    }
  },
  severity: 'info',
  context: 'Context Xample',
  device: { 
    orientation: 'portrait' 
  },
  request: {
     id: 12345,
     'request': 'Supply additional information about the request that caused the page to load'
  }
})

export default {
  name : 'dashboard',

  components: {
    Avatar,
    SpendChart,
    TrendChart,
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
      activeDevice: null
    }
  },

  computed: {
    _() {
      return _
    },

    clientInfo() {
      return this.$store.getters['auth/getClientInfo']
    },

    disabledBeginOrder() {
      return this.selectedOrder == '' ? 'disabled' : false
    }
  },

  methods: {
    setAllocation(index) {
      this.activeAllocationIndex = index;
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
    }
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

      Log.put('dashboard/created user info', this.userInfo);
      this.userInfo.loading = false;
    }, err => {
      Log.put('dashboard/created user allocation err', err);
      this.userInfo.data = profile;
      this.userInfo.data.allocations = [];
      this.userInfo.loading = false;
    })
  }
}


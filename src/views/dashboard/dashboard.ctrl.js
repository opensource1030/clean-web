import _ from 'lodash'
import supportRequest from './../../components/support-request'
import PieChart from './Piechart.vue'
import TrendChart from './Trendchart.vue'
import OrderNewSelectUser from './../../views/orders/OrderNewUser.vue'
import employeeAPI from './../../api/employee-api'
import swal from 'sweetalert2'
import { Storage, Utils, Log } from './../../helpers'

const { Store } = require('yayson')()
const store = new Store()

export default {
  name : 'dashboard',

  components: {
    PieChart,
    TrendChart,
    OrderNewSelectUser,
  },

  data () {
    return {
      clientInfo: {
        data: {},
        loading: true
      },
      userInfo: {
        data: {},
        lastAllocations: [],
        loading: true
      },
      companyInfo: {},
      startedOrder: false,
      selectedOrder: '',
      activeAllocationIndex: 0,
    }
  },

  computed: {
    _ () {
      return _
    },

    disabledBeginOrder () {
      return this.selectedOrder == '' ? 'disabled' : false
    }
  },

  beforeCreate () {
  },

  created () {
    this.$root.$on('company_content_loaded', (response) => {
      if(response.data)
        this.clientInfo.data = response.data.object;

      this.clientInfo.loading = false
    });

    let profile = Utils.parseJsonString(Storage.get('profile'));

    let _params = {
      params: {
        include: 'companies.currentBillMonths,allocations',
        'filter[allocations.billMonth]': '[currentBillMonths.last:3]'
      }
    };

    employeeAPI.get(this.$store.state.auth.userId, _params, res => {
      if (res.status == 404) {
        this.userInfo.data.allocations = [];
        this.userInfo.lastAllocations = [];
      } else {
        let event = store.sync(res.data);
        this.userInfo.data = event;

        console.log(this.userInfo.data);
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
      setTimeout(supportRequest, 2000);
    }, err => {
      Log.put('dashboard/created user allocation err', err);
      this.userInfo.data = Utils.parseJsonString(Storage.get('profile'));
      this.userInfo.data.allocations = [];
      this.userInfo.loading = false;
    });
  },

  methods: {
    setAllocation (index) {
      this.activeAllocationIndex = index;
    },

    prevAllocation () {
      this.activeAllocationIndex > 0 ? this.activeAllocationIndex-- : null;
    },

    nextAllocation () {
      this.activeAllocationIndex < this.userInfo.lastAllocations.length - 1 ? this.activeAllocationIndex++ : null;
    },

    selectOrderType (type) {
      this.selectedOrder == type ? this.$set(this, 'selectedOrder', '') : this.$set(this, 'selectedOrder', type);
    },

    upgradeDevice () {
      this.selectedOrder = 'upgrade'
      this.placeOrder()
    },

    placeOrder () {
      // console.log('dashboard/placeOrder role', _.get(this.$store.state.auth.profile, 'roles[0].name', ''))
      if (_.get(this.$store.state.auth.profile, 'roles[0].name', '') == 'wta') {
        this.startedOrder = true
      } else {
        this.$store.dispatch('placeOrder/setUserId', this.$store.state.auth.userId)
        this.beginOrder()
      }
    },

    beginOrder () {
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

    cancelOrder () {
      this.startedOrder = false
    },

    orderDisabled () {
      swal({
        type: 'warning',
        title: 'Oops...',
        text: 'This feature is not enabled, please see your IT Admin'
      })
    }
  }
}

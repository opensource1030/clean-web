import _ from 'lodash'
import phone from './../../filters/phone-formatter.js'
import supportRequest from './../../components/support-request'
import PieChart from './Piechart.vue'
import TrendChart from './Trendchart.vue'
import employeeAPI from './../../api/employee-api'
import { mapGetters, mapActions } from 'vuex'
import { Log } from './../../helpers'

const { Store } = require('yayson')()
const store = new Store()

export default {
  name : 'dashboard',

  components: {
    PieChart,
    TrendChart
  },

  data () {
    return {
      clientInfo: {
        data: {},
        loading: true
      },
      userInfo: {
        data: {},
        loading: true
      },
      selectedOrder: '',
      activeAllocationIndex: 0
    }
  },

  computed: {
    _ () {
      return _
    }
  },

  beforeCreate () {
  },

  created () {
    let _params = {
      params: {
        include: 'companies.contents'
      }
    }
    employeeAPI.get(this.$store.state.auth.userId, _params, res => {
      let event = store.sync(res.data)
      // console.log('dashboard event', event)

      if (event.companies.length > 0) {
        let cosmicdata = event.companies[0].contents[0].content
        // console.log('dashboard cosmicdata', cosmicdata)

        this.$http.get(cosmicdata, {}).then((response) => {
          this.clientInfo.data = response.data.object
          this.clientInfo.loading = false
        })
      }
    }, err => Log.put('dashboard/created client info err', err))

    _params = {
      params: {
        include: 'companies.currentBillMonths,allocations',
        'filter[allocations.billMonth]': '[currentBillMonths.last:1]'
      }
    }
    employeeAPI.get(this.$store.state.auth.userId, _params, res => {
      if (res.status == 404) {
        this.userInfo.data.allocations = []
      } else {
        // console.log('dashboard/created userInfo', res)
        let event = store.sync(res.data)
        this.userInfo.data = event
        for (let allocation of this.userInfo.data.allocations) {
          allocation.issue = ''
        }
      }
      this.userInfo.loading = false;
      setTimeout(supportRequest, 2000);
    }, err => {
      Log.put('dashboard/created user allocation err', err)
      this.userInfo.data = { allocations: [] }
      this.userInfo.loading = false
    })
  },

  methods: {
    setAllocation (index) {
      this.activeAllocationIndex = index;
    },

    prevAllocation () {
      this.activeAllocationIndex > 0 ? this.activeAllocationIndex-- : null;
    },

    nextAllocation () {
      this.activeAllocationIndex < this.userInfo.data.allocations.length - 1 ? this.activeAllocationIndex++ : null;
    },

    selectOrderType (type) {
      this.selectedOrder == type ? this.$set(this, 'selectedOrder', '') : this.$set(this, 'selectedOrder', type);
    },

    upgradeDevice () {
      let allocation = this.userInfo.data.allocations[this.activeAllocationIndex]
      console.log('dashboard deviceInfo', allocation)
      this.$store.dispatch('placeOrder/setCurrentOrderType', 'Upgrade')
      this.$store.dispatch('placeOrder/setAllocation', allocation)
      this.$router.push({ path: '/orders/new/package' })
    },

    placeOrder () {
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
        default:
          return
      }
      this.$router.push({ path: path })
    }
  }
}
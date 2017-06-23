import _ from "lodash";
import supportRequest from "./../../components/support-request";
import PieChart from "./Piechart.vue";
import TrendChart from "./Trendchart.vue";
import employeeAPI from "./../../api/employee-api";

const {Store} = require('yayson')()
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
    }, err => console.log('dashboard client info err', err))

    _params = {
      params: {
        include: 'companies.currentBillMonths,allocations&filter[allocations.billMonth]=[currentBillMonths.last:1]'
      }
    }
    employeeAPI.get(this.$store.state.auth.userId, _params, res => {
      if (res.status == 404) {
        this.userInfo.data.allocations = []
      } else {
        this.userInfo.data = res;
        for (let allocation of this.userInfo.data.allocations)
          allocation.issue = ''
      }
      this.userInfo.loading = false;
      setTimeout(supportRequest, 2000);
    }, err => {
      console.log('dashboard user allocation err', err)
      this.userInfo.data = {allocations: []}
      this.userInfo.loading = false
    })
  },

  methods: {
    setAllocation(index) {
      this.activeAllocationIndex = index;
    },
    prevAllocation() {
      this.activeAllocationIndex > 0 ? this.activeAllocationIndex-- : null;
    },
    nextAllocation() {
      this.activeAllocationIndex < this.userInfo.data.allocations.length - 1 ? this.activeAllocationIndex++ : null;
    },
    selectOrderType(type) {
      this.selectedOrder == type ? this.$set(this, 'selectedOrder', '') : this.$set(this, 'selectedOrder', type);
    },
    placeOrder() {
      this.selectedOrder ? location.href = '/order/' + this.selectedOrder : null;
    }
  }
}
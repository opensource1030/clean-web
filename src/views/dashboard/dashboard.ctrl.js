import phone from './../../filters/phone-formatter.js';
import { mapGetters, mapActions } from 'vuex'
import PieChart from "./Piechart.vue"
import TrendChart from "./Trendchart.vue"

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
  beforeCreate() {
    
  },
  computed: {

  },
  created() {
    this.$store.dispatch('dashboard/getClientInfo').then(
      res => {
        let cosmicData = res.companies[0].contents[0].content;

        this.$http.get(cosmicData).then((response) => {
          this.clientInfo.data = response.data.object;
          this.clientInfo.loading = false;
        })
      }
    )
    
    this.$store.dispatch('dashboard/getUserAllocations').then(
      res => {
        if(res.status == 404) {
          this.userInfo.data.allocations = [];
        } else {
          this.userInfo.data = res;
          for(let allocation of this.userInfo.data.allocations)
            allocation.issue = '';
        }

        this.userInfo.loading = false;
      }
    )
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
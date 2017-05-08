import _ from 'lodash'
import modal from './../../components/modal.vue'
import paginate from './../../components/paginate.vue'
import orderAPI from './../../api/order-api.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'OrderIndex',

  components: {
    modal,
    paginate,
  },

  data () {
    return {
      activeOrder: null,
      isReady: false,
      packageCostChart: {
        type: 'Bar',
        columns: [
          {
            'type': 'string',
            'label': 'name',
            // 'role': 'domain'
          },
          {
            'type': 'number',
            'label': 'cost'
          }
        ],
        rows: [
          ['Package 1', 20],
          ['Package 2', 30],
          ['Package 3', 25],
          ['Package 4', 35],
          ['Package 5', 40]
        ],
        options: {
          height: 250,
          legend: { position: 'none' },
          chart: { title: 'PACKAGE COST' },
          bars: 'vertical',
          axes: {
            x: {
              0: { side: 'bottom', label: ''}
            }
          },
        }
      },
      monthlyCostChart: {
        type: 'PieChart',
        columns: [
          {
            'type': 'string',
            'label': 'Category'
          },
          {
            'type': 'number',
            'label': 'Charge'
          },
        ],
        rows: [
          ['2004', 1000],
          ['2005', 1170],
          ['2006', 660],
          ['2007', 1030],
          ['2008', 800]
        ],
        options: {
          width: 'auto',
          height: 250,
          chartArea: { left: '10%', top: '20%', width: '90%', height: '70%' },
          title: 'MONTHLY COST',
          pieHole: 0.6,
          colors: ['#4374e0', '#fce473', '#42afe3', '#ed6c63', '#97cd76'],
          legend: { position: 'right', textStyle: { color: 'blue', fontSize: 14 }, alignment: 'center' }
          // focusTarget: 'category',
        }
      },
      monthlySellChart: {
        type: 'GeoChart',
        columns: [
          {
            'type': 'string',
            'label': 'Country'
          },
          {
            'type': 'number',
            'label': 'Sell'
          },
        ],
        rows: [
          ['US-AL', 1000],
          ['US-IL', 1170],
          ['US-NY', 660],
          ['US-TX', 1030],
          ['US-VI', 800]
        ],
        options: {
          height: 250,
          region: 'US',
          displayMode: 'markers',
          colorAxis: {colors: ['green', 'blue']}
        }
      },
    }
  },

  computed: {
    ...mapGetters({
      orders: 'order/sorted'
    })
  },

  created () {
    this.isReady = false
    Promise.all([
      this.$store.dispatch('modification/search'),
      this.$store.dispatch('carrier/search'),
      this.$store.dispatch('order/search'),
    ]).then((data) => {
      this.isReady = true
    })
  },

  methods: {

    getDeviceVariations (order) {
      return _.uniq(_.map(_.flatMap(order.devicevariations, 'devices'), 'name')).join(', ')
    },

    getPriceOnce (order) {
      return _.map(_.flatMap(order.devicevariations, 'devices'), 'name').join(', ')
    },

    prevPage () {
      this.$store.dispatch('order/prevPage')
    },

    nextPage () {
      this.$store.dispatch('order/nextPage')
    },

    setActive (order) {
      if (this.activeOrder && this.activeOrder.id == order.id) {
        this.$set(this, 'activeOrder', null)
      } else {
        this.$set(this, 'activeOrder', order)
      }
    },
  }
}
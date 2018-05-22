import _ from "lodash";
import avatar from "vue-avatar";
import modal from "./../../components/modal.vue";
import orderAPI from "./../../api/order-api.js";

const {Store} = require('yayson')()
const store = new Store()

export default {
  name: 'OrderDetail',

  components: {
    avatar,
    modal,
  },

  data () {
    return {
      activeOrder: null,
      order_id: null,
      isReady: false,
      avatarSize: 120,
      orders: {
        packages: [{
          name: '',
        }]

      }


    }
  },

  computed: {},

  created () {

    const order_id = this.$route.params.id || 0;

    if (order_id > 0) {
      orderAPI.get(order_id, {params: {include: 'addresses,users,services,packages,devicevariations,devicevariations.carriers,devicevariations.devices,devicevariations.devices.devicetypes,devicevariations.modifications'}}, res => {

        this.$set(this, 'orders', store.sync(res.data))
        this.$set(this, 'order_id', order_id);
        this.isReady = true
      }, err => {
        console.log('can not get companies')
      })
    }

  },

  methods: {

    getDeviceVariations (order) {
      return _.uniq(_.map(_.flatMap(order.devicevariations, 'devices'), 'name')).join(', ')
    },

    getPriceOnce (orders) {
      return _.sumBy(orders.devicevariations, 'priceOwn')
    }


  }
}

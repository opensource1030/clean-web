import _ from "lodash";
import swal from "sweetalert2";
import avatar from "vue-avatar";
import modal from "./../../components/modal.vue";
import paginate from "./../../components/paginate.vue";
import multiselect from "vue-multiselect";
import phone from "./../../filters/phone-formatter.js";
import orderAPI from "./../../api/order-api.js";
import packageAPI from "./../../api/package-api.js";
import carrierAPI from "./../../api/carrier-api.js";
import deviceAPI from "./../../api/device-api.js";
import employeeAPI from "./../../api/employee-api.js";
import addressAPI from "./../../api/address-api.js";
import {mapGetters} from "vuex";
import {OrderHelper} from "./../../helpers";

const {Store} = require('yayson')()
const store = new Store()

export default {
  name: 'OrderIndex',

  components: {
    avatar,
    modal,
    paginate,
    multiselect,
  },

  data () {
    return {
      activeOrder: null,
      isReady: false,
      avatarSize: 100,
      filters: {
        statuses: {
          values: [],
          options: ['New', 'Pending', 'Accepted', 'Delivered', 'Expired', 'Denied']
        },
        employees: {
          isLoading: false,
          options: [],
        },
        packages: {
          isLoading: false,
          options: [],
        },
        carriers: {
          isLoading: false,
          options: [],
        },
        devices: {
          isLoading: false,
          options: [],
        },
        addresses: {
          isLoading: false,
          options: [],
        },
      },

      packageCostChart: {
        type: 'BarChart',
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
          title: 'PACKAGE COST',
          chartArea: { left: '10%', top: '20%', width: '80%', height: '70%' },
          orientation: 'horizontal',
          hAxis: {
            textPosition: 'none'
          }
          // orientation: 'vertical'
          // bars: 'vertical',
          // axes: {
          //   x: {
          //     0: { side: 'bottom', label: ''}
          //   }
          // },
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
    _ () {
      return _
    },

    ...mapGetters({
      orders: 'order/sorted'
    }),

    OrderHelper () {
      return OrderHelper
    },
  },

  created () {
    this.isReady = false
    // Promise.all([
    //   this.$store.dispatch('order/search'),
    //   this.$store.dispatch('pack/search'),
    //   this.$store.dispatch('carrier/search'),
    //   this.$store.dispatch('device/search'),
    // ]).then((data) => {
    //   // this.filters.packages.options = _.uniq(_.map(this.$store.state.pack.records, 'name'))
    //   this.filters.packages.options = _.uniq(_.map(this.$store.getters['pack/sorted'], 'name'))
    //   this.filters.carriers.options = _.map(this.$store.getters['carrier/sorted'], 'presentation')
    //   this.filters.devices.options = _.uniq(_.map(this.$store.getters['device/sorted'], 'name'))
    //   this.isReady = true
    // })
    this.$store.dispatch('order/search').then((res) => {
      // console.log(this.orders)
      this.filters.employees.options = _.uniq(_.map(_.flatMap(this.orders, 'users'), 'firstName'))
      this.filters.addresses.options = _.uniq(_.map(_.flatMap(this.orders, 'addresses'), 'phone'))
      this.filters.packages.options = _.uniq(_.map(_.flatMap(this.orders, 'packages'), 'name'))
      this.filters.carriers.options = _.uniq(_.chain(this.orders).flatMap('services').flatMap('carriers').map('presentation').value())
      this.filters.devices.options = _.uniq(_.chain(this.orders).flatMap('devicevariations').flatMap('devices').map('name').value())
      this.isReady = true
    })
  },

  methods: {

    addFilter_OrderStatuses (values) {
      this.$store.dispatch('order/addFilter', { type: 'status', records: values })
    },

    asyncFind_EmployeeNames (query) {
      this.filters.employees.isLoading = true
      let _params = {
        'filter[firstName][like]': query
      }
      employeeAPI.search(_params, (res) => {
        this.filters.employees.options = _.map(store.sync(res.data), 'firstName')
        this.filters.employees.isLoading = false
      }, (err) => {
        this.filters.employees.isLoading = false
      })
    },

    addFilter_EmployeeNames (values) {
      this.$store.dispatch('order/addFilter', { type: 'employee', records: values })
    },

    asyncFind_PackageNames (query) {
      this.filters.packages.isLoading = true
      let _params = {
        'filter[name][like]': query
      }
      packageAPI.search(_params, (res) => {
        this.filters.packages.options = _.uniq(_.map(store.sync(res.data), 'name'))
        this.filters.packages.isLoading = false
      }, (err) => {
        this.filters.packages.isLoading = false
      })
    },

    addFilter_PackageNames (values) {
      this.$store.dispatch('order/addFilter', { type: 'package', records: values })
    },

    asyncFind_CarrierNames (query) {
      this.filters.carriers.isLoading = true
      let _params = {
        'filter[presentation][like]': query
      }
      carrierAPI.search(_params, (res) => {
        this.filters.carriers.options = _.uniq(_.map(store.sync(res.data), 'presentation'))
        this.filters.carriers.isLoading = false
      }, (err) => {
        this.filters.carriers.isLoading = false
      })
    },

    addFilter_CarrierNames (values) {
      this.$store.dispatch('order/addFilter', { type: 'carrier', records: values })
    },

    asyncFind_DeviceNames (query) {
      this.filters.devices.isLoading = true
      let _params = {
        'filter[name][like]': query
      }
      deviceAPI.search(_params, (res) => {
        this.filters.devices.options = _.uniq(_.map(store.sync(res.data), 'name'))
        this.filters.devices.isLoading = false
      }, (err) => {
        this.filters.devices.isLoading = false
      })
    },

    addFilter_DeviceNames (values) {
      this.$store.dispatch('order/addFilter', { type: 'device', records: values })
    },

    asyncFind_AddressPhones (query) {
      this.filters.addresses.isLoading = true
      let _params = {
        'filter[phone][like]': query
      }
      addressAPI.search(_params, (res) => {
        this.filters.addresses.options = _.uniq(_.map(store.sync(res.data), 'phone'))
        this.filters.addresses.isLoading = false
      }, (err) => {
        this.filters.addresses.isLoading = false
      })
    },

    addFilter_AddressPhones (values) {
      this.$store.dispatch('order/addFilter', { type: 'address', records: values })
    },

    getDeviceVariations (order) {
      return _.uniq(_.map(_.flatMap(order.devicevariations, 'devices'), 'name')).join(', ')
    },

    getPriceOnce (order) {
      return _.sumBy(order.devicevariations, 'priceOwn')
    },

    getTotalPrice (order) {
      return this.getPriceOnce(order) + _.get(order, 'services[0].cost', 0)
    },

    updateOrderState (order) {
      const vm = this
      swal({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, confirm it!'
      }).then(function () {
        let _jsonData = {
          data: {
            id: order.id,
            type: 'orders',
            attributes: {
              status: OrderHelper.getNextState(order)
            }
          }
        }
        let _params = JSON.stringify(_jsonData)
        // console.log('updateOrderState', _params)
        orderAPI.update(order.id, _params, (res) => { vm.$store.dispatch('order/search') }, (err) => { console.log('err', err) })

        // swal('Deleted!', 'Requested device has been deleted.', 'success')
      }, function (dismiss) {
        // if (dismiss === 'cancel') {
        //   swal('Cancelled', 'Selected device is safe :)', 'error')
        // }
      })
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

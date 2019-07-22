import _ from "lodash";
import avatar from "vue-avatar";
import modal from "@/components/modal.vue";
import Pagination from "@/components/pagination";
import multiselect from "vue-multiselect";
import orderAPI from "@/api/order-api.js";
import packageAPI from "@/api/package-api.js";
import carrierAPI from "@/api/carrier-api.js";
import deviceAPI from "@/api/device-api.js";
import employeeAPI from "@/api/employee-api.js";
import addressAPI from "@/api/address-api.js";
import {mapGetters} from "vuex";
import {OrderHelper} from "@/helpers";

const {Store} = require('yayson')()
const store = new Store()

export default {
  name: 'OrderIndex',

  components: {
    avatar,
    modal,
    Pagination,
    multiselect
  },

  data () {
    return {
      activeOrder: null,
      isLoading: false,
      avatarSize: 100,
      filters: {
        statuses: {
          values: [],
          options: ["New", "Approval", "Deliver", "Delivered", "Denied"]
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
          chartArea: { left: '10%', top: '20%', width: '80%', height: '70%' },
          hAxis: {
            textPosition: 'none'
          },
          height: 250,
          position: 'relative',
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              display: false
            }]
          },
          legend: { position: 'none' },
          orientation: 'horizontal',
          title: 'PACKAGE COST'
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
          ['Device', 1000],
          ['Minutes', 1170],
          ['Data', 660],
          ['SMS', 1030],
          ['International', 800]
        ],
        options: {
          chartArea: { left: '10%', top: '20%', width: '90%', height: '70%' },
          colors: ['#36a898', '#6baccc', '#d7c076', '#d77566', '#383737'],
          height: 250,
          legend: { position: 'right', textStyle: { color: 'blue', fontSize: 14 }, alignment: 'center' },
          pieHole: 0.6,
          title: 'MONTHLY COST',
          responsive: true
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
          colorAxis: {colors: ['green', 'blue']},
          displayMode: 'markers',
          height: 250,
          region: 'US',
          responsive: true
        }
      },
      //Table Fields
      fields: [
        { key: 'status',   thClass: 'th-width__10' },
        { key: 'employee', thClass: 'th-width__15'},
        { key: 'phone',    thClass: 'th-width__15' },
        { key: 'package',  thClass: 'th-width__20' },
        { key: 'carrier',  thClass: 'th-width__10' },
        { key: 'device',   thClass: 'th-width__10' },
        { key: 'once',     thClass: 'th-width__6', sortable: true },
        { key: 'monthly',  thClass: 'th-width__7', sortable: true },
        { key: 'total',    thClass: 'th-width__7', sortable: true }
      ]
    }
  },

  computed: {
    _ () {
      return _
    },

    ...mapGetters({
      orders: 'order/sorted',
      pagination: 'services/getPagination'
    }),

    OrderHelper () {
      return OrderHelper
    },
  },

  created () {
    this.isLoading = true
    this.$store.dispatch('order/search').then((res) => {
      this.filters.employees.options = _.uniq(_.map(_.flatMap(this.orders, 'users'), 'firstName'))
      this.filters.addresses.options = _.uniq(_.map(_.flatMap(this.orders, 'addresses'), 'phone'))
      this.filters.packages.options = _.uniq(_.map(_.flatMap(this.orders, 'packages'), 'name'))
      this.filters.carriers.options = _.uniq(_.chain(this.orders).flatMap('services').flatMap('carriers').map('presentation').value())
      this.filters.devices.options = _.uniq(_.chain(this.orders).flatMap('devicevariations').flatMap('devices').map('name').value())
      this.isLoading = false
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

    prevPage () {
      this.$store.dispatch('order/prevPage')
    },

    nextPage () {
      this.$store.dispatch('order/nextPage')
    },

    showDetails(row) {
      for (let order of this.orders) {
        order._showDetails = false
      }

      if (this.activeOrder && this.activeOrder.id == row.id) {
        row._showDetails = false
        this.$set(this, 'activeOrder', null)
      } else {
        row._showDetails = true
        this.$set(this, 'activeOrder', row)
      }
    },

    updateOrderState(order) {
      const vm = this
      vm.$swal({
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
        orderAPI.update(order.id, _params, (res) => { vm.$store.dispatch('order/search') }, (err) => { console.log('err', err) })

        // swal('Deleted!', 'Requested device has been deleted.', 'success')
      }, function (dismiss) {
        // if (dismiss === 'cancel') {
        //   swal('Cancelled', 'Selected device is safe :)', 'error')
        // }
      })
    },

    denyOrder(order) {
      const vm = this
      vm.$swal({
        title: 'You are going to deny this order',
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
              status: 'Denied'
            }
          }
        }
        let _params = JSON.stringify(_jsonData)
        orderAPI.update(order.id, _params, (res) => { vm.$store.dispatch('order/search') }, (err) => { console.log('err', err) })

        vm.$swal('Denied!', 'Requested device has been denied.', 'success')
      }, function (dismiss) {
      })
    }
  }
}

import _ from 'lodash'
import modal from './../../components/modal.vue'
import paginate from './../../components/paginate.vue'
import multiselect from 'vue-multiselect'
// import { filterByModificationsd, filterByModifications, filterByCarrier, orderFilters } from './../../components/filters.js'
import { mapGetters, mapActions } from 'vuex'
import deviceAPI from './../../api/device-api.js'
import devicetypeAPI from './../../api/device_type-api.js'
import carrierAPI from './../../api/carrier-api.js'

const {Store} = require('yayson')()
const store = new Store()

export default {
  components: {
    modal,
    multiselect,
    paginate,
  },

  data () {
    return {
      activeDevice: null,
      isReady: false,
      filters: {
        names: {
          isLoading: false,
          options: [],
          values: [],
        },
        makers: {
          isLoading: false,
          options: [],
          values: [],
        },
        types: {
          isLoading: false,
          options: [],
        },
        carriers: {
          isLoading: false,
          options: [],
        },
      }
    }
  },

  computed: {
    _ () {
      return _
    },

    ...mapGetters({
      devices: 'device/allDevices',
      styles: 'modification/styleModifications',
      capacities: 'modification/capacityModifications',
      // carriers: 'carrier/sorted',
      // search: 'device/allDevices'
    }),
  },

  beforeCreate () {
    // this.$store.dispatch('device/search',{ search: 0 })
    // this.$store.dispatch('modification/search')
    // this.$store.dispatch('carrier/search')
  },

  created () {
    this.$set(this, 'isReady', false)
    Promise.all([
      this.$store.dispatch('modification/search'),
      this.$store.dispatch('carrier/search'),
      this.$store.dispatch('device/search', { search: 0 }),
    ]).then((data) => {
      this.$set(this, 'isReady', true)
    })
  },

  methods: {

    asyncFind_DeviceNames (query) {
      // console.log('asyncFind_DeviceNames', query)
      this.filters.names.isLoading = true
      let _params = {
        'filter[name][like]': query
      }
      deviceAPI.search(_params, (res) => {
        this.filters.names.options = _.uniq(_.map(store.sync(res.data), 'name'))
        this.filters.names.isLoading = false
      }, (err) => {
        this.filters.names.isLoading = false
      })
    },

    addFilter_DeviceNames (values) {
      // console.log('addFilter_DeviceNames', values)
      this.$store.dispatch('device/addFilter', { type: 'name', records: values })
    },

    asyncFind_DeviceMakers (query) {
      this.filters.makers.isLoading = true
      let _params = {
        'filter[make][like]': query
      }
      deviceAPI.search(_params, (res) => {
        this.filters.makers.options = _.uniq(_.map(store.sync(res.data), 'make'))
        this.filters.makers.isLoading = false
      }, (err) => {
        this.filters.makers.isLoading = false
      })
    },

    addFilter_DeviceMakers (values) {
      this.$store.dispatch('device/addFilter', { type: 'maker', records: values })
    },

    asyncFind_DeviceTypeNames (query) {
      this.filters.types.isLoading = true
      let _params = {
        'filter[name][like]': query
      }
      devicetypeAPI.search(_params, (res) => {
        this.filters.types.options = _.uniq(_.map(store.sync(res.data), 'name'))
        this.filters.types.isLoading = false
      }, (err) => {
        this.filters.types.isLoading = false
      })
    },

    addFilter_DeviceTypeNames (values) {
      // console.log('addFilter_DeviceNames', values)
      this.$store.dispatch('device/addFilter', { type: 'type', records: values })
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
      // console.log('addFilter_DeviceNames', values)
      this.$store.dispatch('device/addFilter', { type: 'carrier', records: values })
    },

    addCapacityFilter (values) {
      // console.log('addCapacityFilter', values)
      this.$store.dispatch('device/addFilter', { type: 'capacity', records: values })
      // this.$store.dispatch('device/addCapacityFilter', values)
    },

    addStyleFilter (values) {
      this.$store.dispatch('device/addFilter', { type: 'style', records: values })
    },

    prevPage(){
      this.$store.dispatch('device/prevPage')
    },

    nextPage(){
      this.$store.dispatch('device/nextPage')
    },

    setActive(device) {
      if (this.activeDevice && this.activeDevice.id == device.id) {
        this.$set(this, 'activeDevice', null)
      } else {
        this.$set(this, 'activeDevice', device)
      }
      // console.log('setActive', this.activeDevice)
    },

    filterModificationsByType (list, type) {
      return _.map(_.filter(list, (item) => (item.modType == type)), 'value')
    },

    getCarrierNames (device) {
      let carriers = _.flatMapDeep(device.devicevariations, 'carriers')
      let names = _.uniq(_.map(carriers, 'presentation')).join(', ')
      return names
    },
  }
};

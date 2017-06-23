import _ from "lodash";
import multiselect from "vue-multiselect";
import modal from "./../../components/modal.vue";

import presetAPI from "./../../api/preset-api.js";
import deviceAPI from "./../../api/device-api.js";
import devicetypeAPI from "./../../api/device_type-api.js";
import companyAPI from "./../../api/company-api.js";
import {mapGetters} from "vuex";
import {DeviceVariationHelper} from "./../../helpers";
import {DeviceVariationsPresenter, PresetsPresenter} from "./../../presenters";

const { Store } = require('yayson')()
const store = new Store()

export default {
  components: {
    modal,
    multiselect,
  },

  data () {
    return {
      preset: {
        id: 0,
        companyId: 0,
        companies: [
          {
            id: 0,
            name: ''
          }
        ],
        devicevariations: []
      },
      activeDevice: null,
      isReady: false,
      devices: [],
      filters: {
        names: {
          isLoading: false,
          options: [],
        },
        makers: {
          isLoading: false,
          options: [],
        },
        types: {
          isLoading: false,
          options: [],
        },
        carriers: {
          isLoading: false,
          options: [],
        },
        companies: {
          isLoading: false,
          options: [],
        },
      },
    }
  },

  computed: {
    ...mapGetters({
      allDevices: 'device/sorted',
      styles: 'modification/styleModifications',
      capacities: 'modification/capacityModifications',
    }),

    _ () {
      return _
    },

    DeviceVariationHelper () {
      return DeviceVariationHelper
    },
  },

  created () {
    this.$set(this, 'isReady', false)
    this.asyncFind_CompanyNames('')
    if (this.$route.params.id != null) {
      let _params = {
        params: {
          include: 'companies,devicevariations,devicevariations.devices,devicevariations.images,devicevariations.companies,devicevariations.carriers,devicevariations.modifications'
        }
      }
      presetAPI.getOne(this.$route.params.id, _params, (res) => {
        // console.log(res)
        this.preset = store.sync(res.data)
        if (this.preset.companies.length > 0) {
           this.$store.dispatch('device/addFilter', { type: 'company', records: this.preset.companies })
        }
        this.init()
      }, (err) => {})
    } else {
      this.init()
    }
  },

  methods: {
    init () {
      Promise.all([
        this.$store.dispatch('modification/search'),
        this.$store.dispatch('carrier/search'),
        this.$store.dispatch('device/search'),
      ]).then((data) => {
        this.initVariables()
        this.$set(this, 'isReady', true)
      })
    },

    initVariables () {
      // console.log(this.preset)
      // console.log(this.allDevices)
      const vm = this
      vm.devices = []

      // to filter device_variations by carrier, capacity, style for each device
      _.each(this.allDevices, (device) => { vm.devices.push(_.extend(
        {
          filters: {
            carriers: [],
            capacities: [],
            styles: []
          }
        },
        _.cloneDeep(device)
      )) })

      // to check device_variations belongs the preset, but only having the preset compnay
      _.each(this.preset.devicevariations, (dv) => {
        if (parseInt(dv.companyId) == parseInt(vm.preset.companyId)) {
          dv.checked = true

          // synchronize devicevariations in Find_Devices and Selected_Devices
          let device = _.find(this.devices, (d) => (parseInt(d.id) == parseInt(dv.devices[0].id)))
          let variation = _.find(device.devicevariations, (v) => (parseInt(v.id) == parseInt(dv.id)))
          if (variation !== dv) {
            // console.log('diff', dv.id, device)
            _.remove(device.devicevariations, (v) => (parseInt(v.id) == parseInt(dv.id)))
            device.devicevariations.push(dv)
          }
        } else {
          dv.checked = false
        }
      })
    },

    // filtering and lazy searching
    asyncFind_CompanyNames (query) {
      let _params = {
        'filter[name][like]': query
      }
      companyAPI.search(_params, (res) => {
        this.filters.companies.options = store.sync(res.data)
      }, (err) => {
      })
    },

    addFilter_CompanyNames (value) {
      // console.log('addFilter_CompanyNames', value)
      this.preset.companyId = value.id
      // this.preset.companies[0] = value
      this.$store.dispatch('device/addFilter', { type: 'company', records: [value] }).then((res) => {
        this.initVariables()
        this.$nextTick(() => {
          $(document).foundation()
        })
        this.$forceUpdate()
      })
    },

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
      this.$store.dispatch('device/addFilter', { type: 'name', records: values }).then((res) => { this.initVariables() })
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
      this.$store.dispatch('device/addFilter', { type: 'maker', records: values }).then((res) => { this.initVariables() })
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
      this.$store.dispatch('device/addFilter', { type: 'type', records: values }).then((res) => { this.initVariables() })
    },

    addCapacityFilter (values) {
      this.$store.dispatch('device/addFilter', { type: 'capacity', records: values }).then((res) => { this.initVariables() })
    },

    addStyleFilter (values) {
      this.$store.dispatch('device/addFilter', { type: 'style', records: values }).then((res) => { this.initVariables() })
    },

    // properties
    getCarriers (device) {
      return _.uniq(_.flatMapDeep(device.devicevariations, 'carriers'))
    },

    getVariationsGroupByCarrier (device) {
      const vm = this
      // console.log(vm.preset.companyId, device.devicevariations)
      let _devicevariations = _.extend([], device.devicevariations)
      _devicevariations = _.filter(_devicevariations, (dv) => {
        return (parseInt(dv.companyId) == parseInt(vm.preset.companyId)) &&
          (device.filters.carriers.length == 0 || _.includes(device.filters.carriers, ('' + dv.carrierId))) &&
          (device.filters.capacities.length == 0 || (dv.modifications.length > 0 && _.includes(device.filters.capacities, ('' + dv.modifications[DeviceVariationHelper.getCapacityIndex(dv)].id)))) &&
          (device.filters.styles.length == 0 || (dv.modifications.length > 0 && _.includes(device.filters.styles, ('' + dv.modifications[DeviceVariationHelper.getStyleIndex(dv)].id))))
      })
      // console.log(device.id, _devicevariations)
      let result = _.groupBy(_devicevariations, (dv) => { return (dv.carriers != void(0) && dv.carriers.length > 0) ? dv.carriers[0].presentation : 'Not Found' })
      return result
    },

    getImageUrl (image) {
      if (image == void(0)) {
        return ''
      } else {
        return process.env.URL_API + '/images/' + image.id
      }
    },

    // event
    onChange_DeviceVariation (e, device_id, variation_id) {
      let isChecked = $(e.srcElement).prop('checked')
      // console.log(device_id, variation_id, isChecked)

      let device = _.find(this.devices, (d) => (parseInt(d.id) == parseInt(device_id)))
      let variation = _.find(device.devicevariations, (dv) => (parseInt(dv.id) == parseInt(variation_id)))
      let preset_variation = _.find(this.preset.devicevariations, (dv) => (parseInt(dv.id) == parseInt(variation_id)))
      if (preset_variation) {
        if (preset_variation !== variation) {
          console.log('diff', variation_id, device)
          // _.remove(device.devicevariations, (dv) => (parseInt(dv.id) == parseInt(variation_id)))
          // device.devicevariations.push(preset_variation)
        }
        preset_variation.checked = isChecked

        this.$forceUpdate()
      } else {
        variation.checked = isChecked

        variation.devices = []
        variation.devices.push(device)
        // console.log(variation)

        this.preset.devicevariations.push(variation)
      }
    },

    // methods
    filterModificationsByType (list, type) {
      return _.filter(list, (item) => (item.modType == type))
    },

    setActive(device) {
      if (this.activeDevice && this.activeDevice.id == device.id) {
        this.$set(this, 'activeDevice', null)
      } else {
        this.$set(this, 'activeDevice', device)
      }
    },

    submit () {
      // validation
      if (!this.preset.name) {
        this.$store.dispatch('error/addNew', { message: 'Incorrect Device Name' })
        return
      }

      if (parseInt(this.preset.companyId) == 0) {
        this.$store.dispatch('error/addNew', { message: 'Please Select Company' })
        return
      }

      if (this.preset.devicevariations.length == 0) {
        this.$store.dispatch('error/addNew', { message: 'Please Select at least one Device Variation' })
        return
      }

      // set values
      let _preset = {}
      _.extend(_preset, this.preset)

      let _jsonDeviceVariation = [], dv;
      _.chain(_preset.devicevariations).filter(
        (v) => (v.checked)
      ).each((v) => {
        dv = DeviceVariationsPresenter.toJSON(v)
        dv = dv['data']
        delete dv['attributes']
        delete dv['relationships']
        delete dv['included']
        _jsonDeviceVariation.push(dv)
      }).value()

      delete _preset.devicevariations
      let _jsonData = PresetsPresenter.toJSON(_preset)
      _jsonData['data']['relationships']['devicevariations'] = { "data": _jsonDeviceVariation }
      delete _jsonData['data']['relationships']['companies']
      delete _jsonData['included']
      let _params = JSON.stringify(_jsonData)
      // console.log('params', _params)

      if (parseInt(this.preset.id) > 0) {
        presetAPI.update(this.preset.id, _params, (res) => { this.$router.push({ path: '/presets' }) }, (err) => { console.log('err', err) })
      } else {
        presetAPI.create(_params, (res) => { this.$router.push({ path: '/presets' }) }, (err) => { console.log('err', err) })
      }
    }
  },
}
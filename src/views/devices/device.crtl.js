import _ from 'lodash'
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import deviceAPIv0 from './../../api/device/device'
import deviceAPI from './../../api/device-api.js'
import dvAPI from './../../api/device_variation-api.js'
import imageAPI from './../../api/image-api.js'
import {findByPrices, filterByModifications} from './../../components/filters.js'
import modal from './../../components/modal.vue'
import inputValidate from './../../components/inputValidate.vue'
const { Store } = require('yayson')()
const store = new Store()
// const Presenter = require('yayson')({ adapter: 'default' }).Presenter
import { DevicesPresenter, ModificationsPresenter, DeviceVariationsPresenter } from './../../presenters'

export default {
  name: 'Device',

  components: {
    modal,
    inputValidate
  },

  data () {
    return {
      device_id: null,
      device: {
        id: 0,
        currency: 'USD',
        identification: 0,
        images: [
          {
            type: 'images',
            id: 0,
            url: '',
          }
        ],
        devicetypes: [
          {
            type: 'devicetypes',
            id: 0,
          }
        ],
        modifications: [],
        devicevariations: [],
      },
      styles: [],
      capacities: [],
      carriers: [],
      companies: [],

      capacity: '',
      unit: 'Gb',
      companyFilter: '',
      filter: {
        capacity: null,
        style: null,
        carrier: null,
        company: null,
      },

      ready: false,
    }
  },

  computed: {
    ...mapGetters({
      deviceTypes: 'device_type/sorted',
      // styles: 'modification/styleModifications',
      // capacities: 'modification/capacityModifications',
    }),

    _ () {
      return _
    },

    currency () {
      let _currency = '$'
      switch(this.device.currency) {
        case 'USD':
          _currency = '$'
          break;
        case 'EUR':
          _currency = '€'
          break;
        case 'GBP':
          _currency = '£'
          break;
      }
      return _currency
    },
  },

  beforeCreate () {
  },

  created () {
    let device_id = this.$route.params.id || 0
    this.$store.dispatch('device_type/search').then(
      res => this.$store.dispatch('modification/search').then(
        res => this.$store.dispatch('carrier/search').then(
          res => this.$store.dispatch('company/search').then(
            res => {
              if (device_id > 0) {
                let _params = {
                  params: {
                    include: 'devicetypes,modifications,devicevariations,devicevariations.companies,devicevariations.carriers,images,devicevariations.modifications,devicevariations.images',
                  }
                }
                deviceAPI.getOne(device_id, _params, res => {
                  this.$set(this, 'device', store.sync(res.data))
                  console.log('device', this.device)

                  this.$set(this, 'device_id', device_id)
                  this.initComponent()
                  // console.log(this.device_id, this.device.id, this.device_id == this.device.id)
                })
              } else {
                this.$set(this, 'device_id', device_id)
                this.initComponent()
                // console.log(this.device_id, this.device)
              }
            }
          )
        )
      )
    )
  },

  methods: {
    // capacitiesForDeviceVariation() {
    //   let _capacities = _.chain(this.capacities).filter({ 'checked': true }).map((item) => { return _.omit(item, 'checked') }).value()
    //   // let _capacities = _.map(_.filter(this.capacities, { 'checked': true }), (item) => { return _.omit(item, 'checked') })
    //   console.log('capacitesForDeviceVariation', _capacities)
    //   return _capacities
    // },

    initComponent() {
      if (this.device.images.length == 0) {
        this.device.images.push({ id: 0, url: './../assets/logo.png' })
      }

      // init styles
      _.each(this.$store.getters['modification/styleModifications'], (modification) => {
        let isChecked = _.find(this.device.modifications, modification) ? true : false
        // let isChecked = _.find(this.device.modifications, (m) => { return parseInt(m.id) == modification.id }) ? true : false
        if (isChecked) {
          modification['checked'] = true
          this.styles.push(modification)
        } else {
          modification['checked'] = false
          this.styles.push(modification)
        }
      })

      // init capacities
      _.each(this.$store.getters['modification/capacityModifications'], (modification) => {
        let isChecked = _.find(this.device.modifications, modification) ? true : false
        // let isChecked = _.find(this.device.modifications, (m) => { return parseInt(m.id) == modification.id }) ? true : false
        if (isChecked) {
          modification['checked'] = true
          this.capacities.push(modification)
        } else {
          modification['checked'] = false
          this.capacities.push(modification)
        }
      })

      // init carriers
      let selected_carriers = []
      _.each(this.device.devicevariations, (dv) => {
        selected_carriers = _.concat(selected_carriers, dv.carriers)
      })
      selected_carriers = _.uniq(selected_carriers)

      _.each(this.$store.getters['carrier/sorted'], (carrier) => {
        let isChecked = _.find(selected_carriers, (c) => { return parseInt(c.id) == parseInt(carrier.id) }) ? true : false
        if (isChecked) {
          carrier['checked'] = true
          this.carriers.push(carrier)
        } else {
          carrier['checked'] = false
          this.carriers.push(carrier)
        }
      })

      // init companies
      let selected_companies = []
      _.each(this.device.devicevariations, (dv) => {
        selected_companies = _.concat(selected_companies, dv.companies)
      })
      selected_companies = _.uniq(selected_companies)

      _.each(this.$store.getters['company/allCompanies'], (company) => {
        let isChecked = _.find(selected_companies, function(c) { return parseInt(c.id) == parseInt(company.id) }) ? true : false
        if (isChecked) {
          company['checked'] = true
          this.companies.push(company)
        } else {
          company['checked'] = false
          this.companies.push(company)
        }
      })

      // init device-variations
      if (this.device.devicevariations.length == 0) {
        this.addDeviceVariation()
      }

      let index = 0
      _.each(this.device.devicevariations, (dv) => {

        if (index == 0) {
          dv['deleted'] = false
        } else {
          dv['deleted'] = true
        }
        index++
      })

      // init foundation to enable accordion
      this.$nextTick(() => {
        $(document).foundation()
      })
      // this.$forceUpdate()
    },

    getDefaultValue (type) {
      let _defaultValue = { 'id': 0, 'type': type }
      return _defaultValue
    },

    getImageUrl (image) {
      if (image == void(0)) {
        return ''
      } else {
        return process.env.URL_API + '/images/' + image.id
      }
    },

    availableOptions (items) {
      return _.chain(items).filter({ 'checked': true }).map((item) => { return _.omit(item, 'checked') }).value()
    },

    onDeviceImageChange (e) {
      var files = e.target.files || e.dataTransfer.files;
      var formData = new FormData();
      formData.append('filename', files[0])
      imageAPI.create(formData, (res) => {
        // console.log('res', res)
        this.device.images[0].id = res.data.data.id
        this.device.images[0].url = 'http://' + res.data.data.links.self
      }, (err) => console.log('err', err))
      // device.createImage(this, formData);
    },

    onPriceImageChange (e, dv) {
      var files = e.target.files || e.dataTransfer.files;
      var formData = new FormData();
      formData.append('filename', files[0]);
      imageAPI.create(formData, (res) => {
        dv.images[0].id = res.data.data.id
        dv.images[0].url = 'http://' + res.data.data.links.self
      }, (err) => console.log('err', err))
    },

    addCapacity () {
      if (this.capacity == '' || this.capacity == null || isNaN(this.capacity)) {
        this.$store.dispatch('error/addNew', { message: 'Incorrect Capacity' })
      } else {
        let new_modification = {
          value: this.capacity + this.unit,
          modType: 'capacity'
        }
        let _params = JSON.stringify(ModificationsPresenter.toJSON(new_modification))
        this.$store.dispatch('modification/create', _params).then(res => {
          res['checked'] = false
          this.capacities.push(res)
        }, err => console.log(err))
      }
    },

    addStyle () {
      if (this.style == '' || this.style == null) {
        this.$store.dispatch('error/addNew', { message: 'Incorrect Style' })
      } else {
        let new_modification = {
          value: this.style,
          modType: 'style'
        }
        let _params = JSON.stringify(ModificationsPresenter.toJSON(new_modification))
        this.$store.dispatch('modification/create', _params).then(res => {
          res['checked'] = false
          this.styles.push(res)
        }, err => console.log(err))
      }
    },

    addDeviceVariation () {
      this.device.devicevariations.push({
        type: 'devicevariations',
        id: 0,
        images: [
          {
            type: 'images',
            id: 0,
            url: ''
          }
        ],
        modifications: [
          {
            type: 'modification',
            id: 0,
            modType: 'capacity'
          },
          {
            type: 'modification',
            id: 0,
            modType: 'style'
          },
        ],
        carriers: [
          {
            type: 'carriers',
            id: 0
          }
        ],
        companies: [
          {
            type: 'companies',
            id: 0
          }
        ],
        deleted: true
      })
    },

    removeDeviceVariation (dv) {
      this.device.devicevariations = _.reject(this.device.devicevariations, dv)
    },

    submit () {
      // validation
      if (!this.device.name) {
        this.$store.dispatch('error/addNew', { message: 'Incorrect Device Name' })
        return
      }

      // set values
      this.device.modifications = _.filter(_.concat(this.styles, this.capacities), { 'checked': true })

      let _device = {}
      _.extend(_device, this.device)
      let _devicevariations = _device.devicevariations
      delete _device.devicevariations

      // let _jsonDeviceVariation = DeviceVariationsPresenter.toJSON(_devicevariations)
      // _.each(_jsonDeviceVariation['data'], (dv) => {
      //   if (dv['relationships']['images'] && (dv['relationships']['images'][0] == void(0) || parseInt(dv['relationships']['images'][0]['id'])== 0)) {
      //     delete dv['relationships']['images']
      //   }
      //   delete dv['relationships']['carriers']
      //   delete dv['relationships']['companies']
      //   if (dv['relationships']['modifications']['data'].length > 2) {
      //     dv['relationships']['modifications']['data'] = _.slice(dv['relationships']['modifications']['data'], 0, 2)
      //   }
      //   if (parseInt(dv['id']) > 0) {
      //     dvAPI.update(dv['id'], {data: dv}, () => {}, () => {})
      //   }
      // })
      // delete _jsonDeviceVariation['included']

      let _jsonDeviceVariation = [], dv;
      _.each(_devicevariations, (_dv) => {
        dv = DeviceVariationsPresenter.toJSON(_dv)
        dv = dv['data']
        if (dv['relationships']['images'] && (dv['relationships']['images'][0] == void(0) || parseInt(dv['relationships']['images'][0]['id'])== 0)) {
          delete dv['relationships']['images']
        }
        delete dv['relationships']['carriers']
        delete dv['relationships']['companies']
        if (dv['relationships']['modifications']['data'].length > 2) {
          dv['relationships']['modifications']['data'] = _.slice(dv['relationships']['modifications']['data'], 0, 2)
        }
        if (parseInt(dv['id']) > 0) {
          dvAPI.update(dv['id'], {data: dv}, () => {}, () => {})
        }
        delete dv['included']
        _jsonDeviceVariation.push(dv)
      })

      // console.log(_jsonDeviceVariation)

      // #TODO it is an API issue which require 'deviceVariations' rather than 'devicevariations'
      let _jsonData = DevicesPresenter.toJSON(_device)
      // _jsonData['data']['relationships']['deviceVariations'] = _jsonData['data']['relationships']['devicevariations']
      // delete _jsonData['data']['relationships']['devicevariations']
      // console.log('submitting ...', _jsonData['data']['relationships']['deviceVariations'])

      if (process.env.NODE_ENV === 'testing') {
      // if (process.env.NODE_ENV !== 'production') {
        _jsonData['data']['attributes']['make'] = null
        _jsonData['data']['attributes']['model'] = null
        _jsonData['data']['attributes']['identification'] = parseInt(_jsonData['data']['attributes']['identification'])

        _.each(_jsonData['data']['relationships']['images']['data'], (item) => { item.id = parseInt(item.id) })
        _.each(_jsonData['data']['relationships']['modifications']['data'], (item) => { item.id = parseInt(item.id) })
      }

      _jsonData['data']['relationships']['devicevariations'] = _jsonDeviceVariation
      delete _jsonData['included']
      let _params = JSON.stringify(_jsonData)
      // console.log('json_data', _jsonData)
      // console.log('params', _params)

      if (this.device.id) {
        deviceAPI.update(this.device.id, _params, (res) => { this.$router.push({ path: '/devices' }) }, (err) => { console.log('err', err) })
      } else {
        deviceAPI.create(_params, (res) => { this.$router.push({ path: '/devices' }) }, (err) => { console.log('err', err) })
      }
    }
  },

  mounted () {
    // #TODO - we shoule do this.$forceUpdate() to refresh selectors in price accordion-content when changing on vendors
  }
}

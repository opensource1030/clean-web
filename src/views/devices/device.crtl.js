import _ from 'lodash'
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import deviceAPIv0 from './../../api/device/device'
import deviceAPI from './../../api/device-api.js'
import imageAPI from './../../api/image-api.js'
import {findByPrices, filterByModifications} from './../../components/filters.js'
import modal from './../../components/modal.vue'
import inputValidate from './../../components/inputValidate.vue'
const { Store } = require('yayson')()
const store = new Store()
// const Presenter = require('yayson')({ adapter: 'default' }).Presenter
import {DevicesPresenter, ModificationsPresenter} from './../../presenters'

export default {
  name: 'Device',

  components: {
    modal,
    inputValidate
  },

  data () {
    return {
      device: {
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
      deviceTypes: 'device_type/allDeviceTypes',
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
    let device_id = this.$route.params.id
    this.$store.dispatch('device_type/getAll').then(
      res => this.$store.dispatch('modification/getAll').then(
        res => this.$store.dispatch('carrier/getAll').then(
          res => this.$store.dispatch('company/getAll').then(
            res => {
              if (device_id) {
                deviceAPI.getOne(device_id, {}, res => {
                  // console.log('device res', res)
                  this.$set(this, 'device', store.sync(res.data))
                  // console.log('device', this.device)

                  this.initComponent()
                })
              } else {
                this.initComponent()
              }
            }
          )
        )
      )
    )
  },

  created () {
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

      _.each(this.$store.getters['carrier/allCarriers'], (carrier) => {
        let isChecked = _.find(selected_carriers, (c) => { return c.id == carrier.id }) ? true : false
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
        let isChecked = _.find(selected_companies, company) ? true : false
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
      Vue.nextTick(function() {
        $(document).foundation();
      });
    },

    getDefaultValue (type) {
      let _defaultValue = { 'id': 0, 'type': type }
      return _defaultValue
    },
    filterModifications(modi){
    return  _.chain(modi).filter({ 'checked': true }).map((item) => { return _.omit(item, 'checked') }).value()
  },

    getImageUrl (id) {
      return process.env.URL_API + '/images/' + id
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

    findCompany () {
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

      // #TODO it is an API issue which require 'deviceVariations' rather than 'devicevariations'
      let _jsonData = DevicesPresenter.toJSON(this.device)
      _jsonData['data']['relationships']['deviceVariations'] = _jsonData['data']['relationships']['devicevariations']
      delete _jsonData['data']['relationships']['devicevariations']
      // console.log('submitting ...', _jsonData['data']['relationships']['deviceVariations'])

      if (process.env.NODE_ENV === 'testing') {
      // if (process.env.NODE_ENV !== 'production') {
        _jsonData['data']['attributes']['make'] = null
        _jsonData['data']['attributes']['model'] = null
        _jsonData['data']['attributes']['identification'] = parseInt(_jsonData['data']['attributes']['identification'])

        _.each(_jsonData['data']['relationships']['images']['data'], (item) => { item.id = parseInt(item.id) })
        _.each(_jsonData['data']['relationships']['modifications']['data'], (item) => { item.id = parseInt(item.id) })
      }

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

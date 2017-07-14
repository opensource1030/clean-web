import _ from 'lodash'
import modal from './../../components/modal.vue'
import companyAPI from './../../api/company-api.js'
import addressAPI from './../../api/address-api.js'
import { CompaniesPresenter, GlobalSettingValuesPresenter, UdlsPresenter, AddressesPresenter } from './../../presenters'
import { Utils, CompanyHelper, GlobalSettingValueHelper } from './../../helpers'

const { Store } = require('yayson')()
const store = new Store()

const spliter = ';'
export default {
  components: {
    modal,
  },

  data () {
    return {
      company_id: null,
      company: {
        id: 0,
        name: '',
        label: '',
        shortName: '',
        udls: [
          // { pid: 1, id: 101, key: 'a', value: 'a1,a2' },
        ],
        addresses: [],
      }
    }
  },

  computed: {
    CompanyHelper () {
      return CompanyHelper
    }
  },

  created () {
    // console.log('company created')
    let company_id = this.$route.params.id || 0

    if (company_id > 0) {
      let _params = {
        params: {
          include: 'udls.udlvalues,addresses,globalsettingvalues,globalsettingvalues.globalsettings'
        }
      }
      companyAPI.get(company_id, _params, res => {
        // console.log('company res', res)
        this.$set(this, 'company', store.sync(res.data))
        // console.log('company', this.company)

        this.$set(this, 'company_id', company_id)
        this.initComponent()
      })
    } else {
      this.$set(this, 'company_id', company_id)
      this.initComponent()
    }
  },

  mounted () {
    // console.log('company mounted')
  },

  methods: {

    getUDLValue (udl) {
      // return _.map(udl.sections, (section) => (section.name)).join(spliter)
      return _.map(udl.udlvalues, (uv) => (uv.udlValue)).join(spliter)
    },

    getCompanyImage () {
      return '/assets/clean-platform.png'
    },

    initComponent () {
      if (!this.company.udls) {
        this.company.udls = []
      }

      if (this.company.udls.length == 0) {
        this.addCustomField()
      } else {
        const vm = this
        for (let i = 0; i < vm.company.udls.length; i++) {
          vm.company.udls[i].pid = i + 1
          vm.company.udls[i].value = this.getUDLValue(vm.company.udls[i])
          delete vm.company.udls[i].udlvalues
        }
        // console.log('udls', vm.company.udls)

        this.$nextTick(() => {
          $('input.tag-input').tagEditor({
            delimiter: spliter,
            forceLowercase: false,
            onChange: function (field, editor, tags) {
              let pid = parseInt(field.attr('data-index'))
              let udl = _.find(vm.company.udls, (udl) => (udl.pid == pid))
              udl.value = field.val()
              // console.log(pid, udl)
            },
          })
        })
      }

      if (!this.company.addresses) {
        this.company.addresses = []
      }

      if (this.company.addresses.length == 0) {
        this.addAddressField()
      } else {
        for (let i = 0; i < this.company.addresses.length; i++) {
          this.company.addresses[i].pid = i + 1
        }
      }

      let mobility = CompanyHelper.getMobilitySetting(this.company)
      if (Utils.isEmpty(mobility)) {
        this.company.globalsettingvalues.push(CompanyHelper.newMobilitySetting())
      } else {
        mobility.value = mobility.name == 'enable'
      }
      console.log('getMobilitySetting', this.company.globalsettingvalues)
    },

    refreshTagEditors () {
      // console.log('refreshTagEditors')

      $('input.tag-input').tagEditor('destroy')

      const vm = this
      setTimeout(() => {
        $('input.tag-input').tagEditor({
          delimiter: spliter,
          forceLowercase: false,
          onChange: function (field, editor, tags) {
            let pid = parseInt(field.attr('data-index'))
            let udl = _.find(vm.company.udls, (udl) => (udl.pid == pid))
            udl.value = field.val()
            // console.log(pid, udl)
          },
        })
      }, 0)
    },

    onCompanyImageChange () {
      var files = e.target.files || e.dataTransfer.files;
      var formData = new FormData();
      formData.append('filename', files[0])
      imageAPI.create(formData, (res) => {
        // console.log('res', res)
        this.company.images[0].id = res.data.data.id
        this.company.images[0].url = 'http://' + res.data.data.links.self
      }, (err) => console.log('err', err))
    },

    addCustomField () {
      // console.log('addCustomField')
      let pid = this.company.udls.length > 0 ? this.company.udls[this.company.udls.length - 1].pid + 1 : 1;
      this.company.udls.push({ pid: pid, id: 0, name: '', value: '' })
      const vm = this

      this.$forceUpdate()
      this.$nextTick(() => {
        setTimeout(() => {
          $('#udl-value-' + pid).tagEditor({
            delimiter: spliter,
            forceLowercase: false,
            onChange: function (field, editor, tags) {
              let pid = parseInt(field.attr('data-index'))
              let udl = _.find(vm.company.udls, (udl) => (udl.pid == pid))
              udl.value = field.val()
              // console.log(pid, udl)
            },
          })
        }, 0)
      })
    },

    removeCustomField (e) {
      // console.log('removeCustomField')
      /*
      let valueWrapper = $(e.srcElement).closest('.udl-value-wrapper')
      let tagInput = valueWrapper.find('input.tag-input')
      let pid = tagInput.attr('data-index')

      console.log(pid, valueWrapper)
      $('#udl-value-' + pid).tagEditor('destroy')

      valueWrapper.closest('.udl-wrapper').remove()
      // this.company.udls = _.reject(this.company.udls, (udl) => (udl.pid == pid))

      if (this.company.udls.length == 0) {
        this.addCustomField()
      }
      */

      // let pid = $(e.srcElement).closest('.columns').find('.udl-value-wrapper').attr('data-index');
      let pid = $(e.srcElement).closest('.udl-wrapper').find('.udl-value-wrapper').attr('data-index');
      this.company.udls = _.reject(this.company.udls, (udl) => (udl.pid == pid))

      this.$forceUpdate()
      this.$nextTick(() => {
        if (this.company.udls.length == 0) {
          this.addCustomField()
        } else {
          this.refreshTagEditors()
        }
      })
    },

    addAddressField () {
      let pid = this.company.addresses.length > 0 ? this.company.addresses[this.company.addresses.length - 1].pid + 1 : 1;
      this.company.addresses.push({ pid: pid, id: 0, name: '', attn: '', phone: '', address: '', city: '', state: '', country: '', postalCode: '' })
      this.$forceUpdate()
    },

    removeAddressField (e) {
      let pid = $(e.srcElement).closest('.address-wrapper').attr('data-index')
      this.company.addresses = _.reject(this.company.addresses, (address) => (address.pid == pid))

      this.$forceUpdate()
      this.$nextTick(() => {
        if (this.company.addresses.length == 0) {
          this.addAddressField()
        }
      })
    },

    submit () {
      // validation
      if (!this.company.name) {
        this.$store.dispatch('error/addNew', { message: 'Incorrect Company Name' })
        return
      }

      let _company = {}
      _.extend(_company, this.company)
      _company.active = _company.active ? 1 : 0

      let values, _udls = [], _udl, _addresses = [], _address, _globalsettingvalues = [], _globalsettingvalue;

      let mobility = CompanyHelper.getMobilitySetting(this.company)
      mobility = _.extend(mobility, GlobalSettingValueHelper.getMobilitySetting(mobility.value))
      // mobility.name = mobility.value ? 'enable' : 'disable'
      // mobility.label = mobility.value ? 'Enable' : 'Disable'
      delete mobility.value
      _.each(_company.globalsettingvalues, (gsv) => {
        _globalsettingvalue = GlobalSettingValuesPresenter.toJSON(gsv)
        _globalsettingvalues.push(_globalsettingvalue.data)
      })

      _.each(_company.udls, (udl) => {
        values = udl.value.split(spliter)
        // delete udl.pid
        // delete udl.value
        delete udl.udlvalues
        delete udl.sections
        _udl = UdlsPresenter.toJSON(udl)
        _udl['data']['id'] = parseInt(_udl['data']['id'])
        _udl['data']['relationships'] = { udlvalues: { data: [] } }
        _.each(values, (value) => { _udl['data']['relationships']['udlvalues']['data'].push({ id: 0, name: value, type: 'udlvalues', externalId: 0 })})
        _udls.push(_udl.data)
      })

      _.each(_company.addresses, (address) => {
        _address = AddressesPresenter.toJSON(address)
        _addresses.push(_address.data)
        if (parseInt(address.id) > 0) {
          addressAPI.update(address.id, _address, () => {}, () => {})
        }
      })

      let _jsonData = CompaniesPresenter.toJSON(_company)
      delete _jsonData['data']['attributes']['globalsettingvalues']
      delete _jsonData['data']['attributes']['udls']
      delete _jsonData['data']['attributes']['addresses']

      _jsonData['data']['relationships'] = { globalsettingvalues: { data: _globalsettingvalues }, udls: { data: _udls }, addresses: { data: _addresses } }
      // console.log(_jsonData)

      // if (process.env.NODE_ENV === 'testing') {
        delete _jsonData['data']['attributes']['devicevariations']
        _jsonData['data']['attributes']['isCensus'] = 0
      // }

      let _params = JSON.stringify(_jsonData)
      // console.log(_params)

      if (this.company.id > 0) {
        companyAPI.update(this.company.id, _params, res => this.$router.push({ path: '/companies' }), err => console.log('update err', err))
      } else {
        companyAPI.create(_params, res => this.$router.push({ path: '/companies' }), err => console.log('create err', err))
      }
    },
  },
}
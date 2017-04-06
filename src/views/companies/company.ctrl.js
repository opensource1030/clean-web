import _ from 'lodash'
import modal from './../../components/modal.vue'
import companyAPI from './../../api/company-api.js'
import { CompaniesPresenter } from './../../presenters'

const { Store } = require('yayson')()
const store = new Store()

export default {
  components: {
    modal,
  },

  data () {
    return {
      company: {
        id: 0,
        name: '',
        label: '',
        shortName: '',
        udls: [
          // { pid: 1, key: 'a', value: 'a1,a2' },
        ],
      }
    }
  },

  beforeCreate () {
  },

  created () {
    // console.log('company created')
    let company_id = this.$route.params.id

    if (company_id) {
      companyAPI.get(company_id, {}, res => {
        // console.log('company res', res)
        this.$set(this, 'company', store.sync(res.data))
        // console.log('company', this.company)
        this.initComponent()
      })
    } else {
      this.initComponent()
    }
  },

  mounted () {
    // console.log('company mounted')
  },

  methods: {
    initComponent () {
      if (!this.company.udls) {
        this.company.udls = []
      }
      
      if (this.company.udls.length == 0) {
        this.addCustomField()
      } else {
        const vm = this
        for (let i = 0; i < vm.company.udls; i++) {
          vm.company.udls[i].pid = i + 1
        }
        // console.log('udls', vm.company.udls)

        $('input.tag-input').tagEditor({
          onChange: function (field, editor, tags) {
            let pid = parseInt(field.attr('data-index'))
            let udl = _.find(vm.company.udls, (udl) => (udl.pid == pid))
            udl.value = field.val()
            // console.log(pid, udl)
          },
        })
      }
    },

    refreshTagEditors () {
      // console.log('refreshTagEditors')

      $('input.tag-input').tagEditor('destroy')

      const vm = this
      setTimeout(() => {
        $('input.tag-input').tagEditor({
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
      this.company.udls.push({ pid: pid, key: '', value: '' })
      const vm = this

      this.$forceUpdate()
      this.$nextTick(() => {
        setTimeout(() => {
          $('#udl-value-' + pid).tagEditor({
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

      let pid = $(e.srcElement).closest('.udl-value-wrapper').attr('data-index')
      this.company.udls = _.reject(this.company.udls, (udl) => (udl.pid == pid))
      this.$forceUpdate()
      this.$nextTick(() => {
        this.refreshTagEditors()
      })
    },

    submit () {
      // validation
      if (!this.company.name) {
        this.$store.dispatch('error/addNew', { message: 'Incorrect Company Name' })
        return
      }

      this.company.active = this.company.active ? 1 : 0
      let _jsonData = CompaniesPresenter.toJSON(this.company)
      delete _jsonData['data']['attributes']['udls']
      // console.log(_jsonData)

      if (process.env.NODE_ENV === 'testing') {
        delete _jsonData['data']['attributes']['devicevariations']
        _jsonData['data']['attributes']['isCensus'] = null
      }

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
import _ from 'lodash'
import multiselect from 'vue-multiselect'
import modal from './../../components/modal.vue'
import bulkUserStepWizard from './../../components/bulkUserStepWizard';
import employeeAPI from './../../api/employee-api.js'
import companyAPI from './../../api/company-api.js'
import { JobPresenter } from './../../presenters'
import {mapGetters, mapActions} from 'vuex'
import { CompaniesPresenter, UdlsPresenter, AddressesPresenter } from './../../presenters'

const { Store } = require('yayson')()
const store = new Store()

function setToArray(set) {
  var it = set.values(),
      ar = [],
      ele = it.next();

  while(!ele.done) {
    ar.push(ele.value);
    ele = it.next();
  }

  return ar;
}

export default {
  name: 'EmployeeBulkUDLMapping',

  components: {
    multiselect,
    modal,
    bulkUserStepWizard,
  },

  data () {
    return {
      udl_list: [],
      isReady: false,
      company: {},
    }
  },

  computed: {
  },

  created () {
    const udl_fields = this.$store.state.employee_bulk.companyuserimportjobs.UDLfields;
    let _params = {
      params: {
        include: 'udls.udlvalues,addresses'
      }
    }
    for(let i=0; i<udl_fields.length; i++){
      this.udl_list.push({
        name: udl_fields[i].name,
        values: setToArray(udl_fields[i].values)
      })
    }

    companyAPI.get(this.$store.state.employee_bulk.companyuserimportjobs.companyId, _params, res => {
      this.$set(this, 'company', store.sync(res.data))
      this.$set(this, 'company_id', this.$store.state.employee_bulk.companyuserimportjobs.companyId)
    })
  },

  methods: {
    removeUDL(index) {
      this.udl_list.splice(index, 1);
    },
    submit() {
      let _company = {}
      _.extend(_company, this.company)

      let values, _udls = _company.udls, _udl, _addresses = [], _address;
      
      _.each(this.udl_list, (udl) => {
        let values = udl.values
        let value_ary= new Array()
        _udl = new Object()
        _udl['data'] = new Object()
        _udl['data']['id'] = 0
        _udl['data']['attributes'] = new Object()
        _udl['data']['attributes']['name'] = udl.name
        _udl['data']['attributes']['inputType'] = 'string'
        _udl['data']['type'] = 'udls'
        _udl['data']['relationships'] = new Object()
        _udl['data']['relationships']['udlvalues'] = new Object()
        for(let i=0; i<values.length; i++){
          value_ary.push({
            id: 0,
            name: values[i],
            externalId: 0,
            type: "udlvalues"
          })
        }
        _udl['data']['relationships']['udlvalues']['data'] = value_ary
        _udls.push(_udl.data)
      })
      
      _.each(_company)
      let _jsonData = CompaniesPresenter.toJSON(_company)
      delete _jsonData['data']['attributes']['udls']
      delete _jsonData['data']['attributes']['addresses']

      _jsonData['data']['relationships'] = { udls: { data: _udls } , addresses: { data: _addresses } }

      let _params = JSON.stringify(_jsonData)

      companyAPI.update(this.company.id, _params, res => this.$router.push({ path: '/employees/bulk/mapping' }), err => console.log('update err', err))
    }
  }
}
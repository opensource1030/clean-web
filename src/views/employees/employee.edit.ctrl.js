import _ from 'lodash'
import modal from './../../components/modal.vue'
import employeeAPI from './../../api/employee-api.js'
import { mapGetters } from 'vuex'
import { EmployeesPresenter } from './../../presenters'
import { Utils, EmployeeHelper } from './../../helpers'

const { Store } = require('yayson')()
const store = new Store()

export default {
  name: 'EmployeeEdit',

  components: {
    modal,
  },

  data () {
    return {
      employee_id: null,
      employee: {
        id: 0,
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        confirmed: 0,
        isValidator: 1,
        companyId: 0,
        companies: [{
          id: 0,
          udls: [],
          address: []
        }]
      },
      activeCompany: null,
    }
  },

  computed: {
    ...mapGetters({
      companies: 'company/allCompanies',
    }),

    EmployeeHelper () {
      return EmployeeHelper
    }
  },

  beforeCreate () {
    // this.$store.dispatch('company/searchByActive', { query: 1 })
  },

  created () {
    const employee_id = this.$route.params.id || 0

    this.$store.dispatch('company/searchByActive', { query: 1 }).then(res => {
      if (employee_id > 0) {
        employeeAPI.get(employee_id, { params: { include: 'udlvalues,companies,companies.udls,companies.udls.udlvalues,companies.addresses' } }, res => {
          this.$set(this, 'employee', store.sync(res.data))
          // this.$set(this, 'activeCompany', (this.employee.companies.length > 0 && !!this.employee.companies[0] ? this.employee.companies[0] : null))
          // console.log('employee', this.employee)
          this.init()
          this.$set(this, 'employee_id', employee_id)
        })
      } else {
        this.init()
        this.$set(this, 'employee_id', employee_id)
      }
    }, err => {
      console.log('can not get companies')
    })
  },

  mounted () {
    // console.log('employee mounted')
  },

  methods: {
    init () {
      if (!(this.employee.companies.length > 0 && parseInt(this.employee.companies[0].id) > 0)) {
        this.changeCompany(this.companies[0])
      } else {
        if (Utils.isEmptyArray(this.employee.udlvalues)) {
          this.initUdlValues()
        }
      }
    },

    initUdlValues () {
      this.employee.udlvalues = []
      _.each(this.employee.companies[0].udls, (udl) => {
         if (! Utils.isEmptyArray(udl.udlvalues)) {
            this.employee.udlvalues.push(udl.udlvalues[0])
         }
      })
      // console.log('udlvalues', this.employee.udlvalues)
    },

    onChange_Company(e) {
      let company_id = $(e.target).find('option:selected').val()
      this.changeCompany(_.find(this.companies, (item) => { return item.id == company_id }))
      // this.activeCompany = _.find(this.companies, (item) => { return item.id == company_id })
      // console.log('activeCompany', this.activeCompany)
    },

    changeCompany(company) {
      this.employee.companyId = company.id
      this.employee.companies = []
      this.employee.companies.push(company)
      this.initUdlValues()
      this.$forceUpdate()
    },

    submit () {
      // validation
      if (!this.employee.email) {
        this.$store.dispatch('error/addNew', { message: 'Please enter employee email' })
        return
      }

      if (!this.employee.username) {
        this.$store.dispatch('error/addNew', { message: 'Please enter employee username' })
        return
      }

      if (!this.employee.firstName) {
        this.$store.dispatch('error/addNew', { message: 'Please enter employee first name' })
        return
      }

      if (!this.employee.lastName) {
        this.$store.dispatch('error/addNew', { message: 'Please enter employee first name' })
        return
      }

      let _jsonData = EmployeesPresenter.toJSON(this.employee)
      delete _jsonData['included']
      delete _jsonData['data']['attributes']['companies']
      if (process.env.NODE_ENV === 'testing') {
        _jsonData['data']['id'] = parseInt(_jsonData['data']['id'])
      }
      // console.log(_jsonData)

      let _params = JSON.stringify(_jsonData)
      // console.log(_params)

      if (this.employee_id > 0) {
        employeeAPI.update(this.employee.id, _params, res => this.$router.push({ path: '/employees' }), err => console.log('update err', err))
      } else {
        employeeAPI.create(_params, res => this.$router.push({ path: '/employees' }), err => console.log('update err', err))
      }
    },
  }
}
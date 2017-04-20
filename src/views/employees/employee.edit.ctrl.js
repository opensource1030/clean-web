import _ from 'lodash'
import modal from './../../components/modal.vue'
import employeeAPI from './../../api/employee-api.js'
import { EmployeesPresenter } from './../../presenters'

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
        companies: [{
          udls: [],
          address: []
        }]
      }
    }
  },

  beforeCreate () {
  },

  created () {
    let employee_id = this.$route.params.id || 0

    if (employee_id > 0) {
      employeeAPI.get(employee_id, { params: { include: 'companies,companies.udls,companies.address' } }, res => {
        this.$set(this, 'employee', store.sync(res.data))
        console.log('employee', this.employee)
        this.$set(this, 'employee_id', employee_id)
        this.initComponent()
      })
    } else {
      this.$set(this, 'employee_id', employee_id)
      this.initComponent()
    }
  },

  mounted () {
    // console.log('employee mounted')
  },

  methods: {
    initComponent () {
      // if (!!this.employee.companies[0]) {
      //   this.employee.companies = [{ udls: [], address: [] }]
      // }
      // console.log('employee', this.employee)
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
      console.log(_jsonData)

      let _params = JSON.stringify(_jsonData)
      console.log(_params)
    },
  }
}
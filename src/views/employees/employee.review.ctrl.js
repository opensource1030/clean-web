import employeeAPI from "./../../api/employee-api.js";

import {mapGetters} from "vuex";
import {EmployeeHelper, Utils} from "./../../helpers";

const {Store} = require('yayson')()
const store = new Store()

export default {
  name: 'EmployeeReview',
  data () {
    return {
      employee_id: null,
      employee: {
        id: this.$route.params.id,
        email: " ",
        username: " ",
        firstName: " ",
        lastName: " ",
        companies: [{
          id: 0,
          udls: [],
          address: []
        }],
        confirmed: 0,
        isValidator: 1,
        companyId: 0,
      },
      activeCompany: null,
      UserRole: [
        'System Admin (Allows for admin functions in legacy system)',
        '2 (Back-ported placeholder as User Group 2',
        '3 (Back-ported placeholder as User Group 3 in legacy system) in legacy system)'
      ]
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
  created () {
    const employee_id = this.$route.params.id;

    this.$store.dispatch('company/searchAllByActive', { query: 1, all: true }).then(res => {
      if (employee_id > 0) {
        employeeAPI.get(employee_id, {params: {include: 'udlvalues,companies,companies.udls,companies.udls.udlvalues,companies.addresses', indexAll: 1}}, res => {
          this.$set(this, 'employee', store.sync(res.data))
          this.load();
          this.$set(this, 'employee_id', employee_id)
        })
      } else {
        this.load()
        this.$set(this, 'employee_id', employee_id)
      }
    }, err => {
      console.log('can not get companies')
    })
  },

  methods: {
    load () {
      if (!(this.employee.companies.length > 0 && parseInt(this.employee.companies[0].id) > 0)) {
        this.changeCompany(this.companies[0])
      } else {
        if (Utils.isEmptyArray(this.employee.udlvalues)) {
          this.loadUdlValues()
        }
      }
    },

    loadUdlValues () {
      this.employee.udlvalues = [];
      _.each(this.employee.companies[0].udls, (udl) => {
        if (!Utils.isEmptyArray(udl.udlvalues)) {
          this.employee.udlvalues.push(udl.udlvalues[0])
        }
      })
    },

    submit () {
      if (this.employee_id > 0) {
        this.$router.push({path: '/employees'})
      }
    },
  }
}

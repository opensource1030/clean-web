import modal from './../../components/modal.vue'
import paginate from './../../components/paginate.vue'
import employeeAPI from './../../api/employee-api.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EmployeeIndex',

  components: {
    modal,
    paginate,
  },

  data () {
    return {
      activeEmployee: null,
      query: '',
    }
  },

  computed: {
    ...mapGetters({
      employees: 'employee/sorted',
    })
  },

  beforeCreate () {
    this.$store.dispatch('employee/search')
  },

  methods: {
    prevPage () {
      this.$store.dispatch('employee/prevPage')
    },

    nextPage () {
      this.$store.dispatch('employee/nextPage')
    },

    setActive (employee) {
      if (this.activeEmployee && this.activeEmployee.id == employee.id) {
        this.$set(this, 'activeEmployee', null)
      } else {
        this.$set(this, 'activeEmployee', employee)
      }
      // console.log('setActive', this.activeEmployee)
    },

    getUDLValue (udl) {
      return _.map(udl.sections, (section) => (section.name)).join(', ')
    },

    searchEmployees() {
      this.$store.dispatch('employee/searchByFirstName', {query: this.query})
    },

    removeEmployee (employee_id) {
      if (confirm("Are you sure you want to remove this employee?") == true) {
        employeeAPI.remove(employee_id, res => {
          this.$store.dispatch('employee/search')
        }, err => console.log('employee remove', err))
      }
    },

    onEmployeeActiveChange (e, employee_id) {
      let isChecked = $(e.srcElement).prop('checked')
      let params = {
        id: employee_id,
        isActive: isChecked ? 1 : 0
      }
      this.$store.dispatch('employee/update', params)//.then(res => console.log('employee update', res), err => console.log('employee update error', err))
    },
  }
}
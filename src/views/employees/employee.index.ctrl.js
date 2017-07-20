import _ from 'lodash'
import { mapGetters } from 'vuex'
import modal from './../../components/modal.vue'
import paginate from './../../components/paginate.vue'
import employeeAPI from './../../api/employee-api.js'
import companyAPI from './../../api/company-api.js'

const {Store} = require('yayson')()
const store = new Store()

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
      isReady: false,
      hasRunningJob: false,
      isReadyBulk: false,
    }
  },

  computed: {
    ...mapGetters({
      employees: 'employee/sorted',
    })
  },

  /**
   * #TODO
   * 1. show uploading status if there is running job
   * 2. go to /bulk/review page by clicking the status
   * 3. otherwise, show add_bulk button
   */
  created () {
    this.isReady = false
    this.$store.dispatch('employee/search').then((res) => {
      this.isReady = true
    })

    // check running job
    let vm = this,  jobs;
    companyAPI.getJobs(this.$store.state.auth.profile.companyId, (res) => {
      jobs = store.sync(res.data)
      if (jobs instanceof Array) {
        // console.log('jobs', jobs)
        jobs = _.filter(jobs, (o) => { return o.jobType == 'employeeimportjob' })
        if (jobs.length > 0) {
          vm.hasRunningJob = true
        }
        this.$store.dispatch('employee_bulk/updateJob', jobs[0]).then(res => { vm.isReadyBulk = true }, err => { vm.isReadyBulk = true })
        // console.log('employee.index/created job', jobs[0])
      }
      // let hasRunningJob = res
    }, err => {})
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

    searchEmployees () {
      // this.$store.dispatch('employee/searchByFirstName', { query: this.query })
      this.$store.dispatch('employee/searchByEmail', { query: this.query })
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
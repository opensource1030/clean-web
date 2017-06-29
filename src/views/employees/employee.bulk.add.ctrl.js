import _ from 'lodash'
import multiselect from 'vue-multiselect'
import modal from './../../components/modal.vue'
import uploader from './../../components/FileUploader.vue'
import bulkUserStepWizard from './../../components/bulkUserStepWizard';
import employeeAPI from './../../api/employee-api.js'
import companyAPI from './../../api/company-api.js'
import { mapGetters } from 'vuex'

const { Store } = require('yayson')()
const store = new Store()

export default {
  name: 'EmployeeBulkAdd',

  components: {
    multiselect,
    modal,
    uploader,
    bulkUserStepWizard,
  },

  data () {
    return {
      company: {
        value: {},
        options: []
      },
      isReady: false,
    }
  },

  computed: {
    ...mapGetters({
      uploadedFiles: 'file/files',
    })
  },

  created () {
    this.isReady = false
    this.asyncFind_CompanyNames('')
  },

  methods: {
    asyncFind_CompanyNames (query) {
      let _params = {
        'filter[name][like]': query
      }
      companyAPI.search(_params, (res) => {
        this.company.options = store.sync(res.data)
      }, (err) => {
      })
    },

    submit () {
      // console.log(this.company.value)

      if (this.company.value.id > 0) {
        // if (process.env.NODE_ENV === 'testing') {}
        // console.log('submit',  this.uploadedFiles)
        if (this.uploadedFiles.length == 1) {
          var formData = new FormData();
          formData.append('csv', this.uploadedFiles[0], this.uploadedFiles[0].name);
          // append the files to FormData
          // Array
          //   .from(Array(this.uploadedFiles.length).keys())
          //   .map(x => {
          //     formData.append('file', this.uploadedFiles[x], this.uploadedFiles[x].name);
          //   })
          this.isReady = true
          companyAPI.jobs(this.company.value.id, formData, 
            (res) => {
              this.isReady = false
              console.log(res)
              let companyuserimportjobs = store.sync(res.data)
              this.$store.dispatch('employee_bulk/updateJob', companyuserimportjobs).then(res => this.$router.push({ path: '/employees/bulk/mapping' }, err => console.log(err)))
            }, (err) => {
              this.isReady = false
              console.log(err)
            }
          )
        } else {
          this.$store.dispatch('error/addNew', { message: 'You should upload only 1 csv file' })
        }
      } else {
        this.$store.dispatch('error/addNew', { message: 'Please select a company' })
      }
    }
  }
}
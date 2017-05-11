import _ from 'lodash'
import multiselect from 'vue-multiselect'
import modal from './../../components/modal.vue'
import uploader from './../../components/FileUploader.vue'
import employeeAPI from './../../api/employee-api.js'
import companyAPI from './../../api/company-api.js'
import { EmployeesPresenter } from './../../presenters'
import { mapGetters } from 'vuex'

const { Store } = require('yayson')()
const store = new Store()

export default {
  name: 'EmployeeBulkAdd',

  components: {
    multiselect,
    modal,
    uploader,
  },

  data () {
    return {
      company: {
        value: {},
        options: []
      }
    }
  },

  computed: {
    ...mapGetters({
      uploadedFiles: 'file/files',
    })
  },

  created () {
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
          companyAPI.jobs(this.company.value.id, formData, (res) => { console.log(res) }, (err) => { console.log(err) })
        } else {
          this.$store.dispatch('error/addNew', { message: 'You should upload only 1 csv file' })
        }
      } else {
        this.$store.dispatch('error/addNew', { message: 'Please select a company' })
      }
    }
  }
}
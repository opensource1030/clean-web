import _ from 'lodash'
import modal from './../../components/modal.vue'
import uploader from './../../components/FileUploader.vue'
import employeeAPI from './../../api/employee-api.js'
import { EmployeesPresenter } from './../../presenters'
import { mapGetters } from 'vuex'

const { Store } = require('yayson')()
const store = new Store()

export default {
  name: 'EmployeeBulkAdd',

  components: {
    modal,
    uploader,
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapGetters({
      uploadedFiles: 'file/files',
    })
  },

  methods: {
    submit () {
      // if (process.env.NODE_ENV === 'testing') {}
      console.log('submit',  this.uploadedFiles)
      if (this.uploadedFiles.length == 1) {
        var formData = new FormData();
        formData.append('file', this.uploadedFiles[0], this.uploadedFiles[0].name);
        // append the files to FormData
        // Array
        //   .from(Array(this.uploadedFiles.length).keys())
        //   .map(x => {
        //     formData.append('file', this.uploadedFiles[x], this.uploadedFiles[x].name);
        //   })
        employeeAPI.add_bulk(formData, (res) => { console.log(res) }, (err) => { console.log(err) })
      } else {
        this.$store.dispatch('error/addNew', { message: 'You should upload only 1 csv file' })
      }
    }
  }
}
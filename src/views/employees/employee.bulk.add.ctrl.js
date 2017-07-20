import _ from 'lodash'
import { mapGetters } from 'vuex'
import multiselect from 'vue-multiselect'
import modal from './../../components/modal.vue'
import uploader from './../../components/FileUploader.vue'
import bulkUserStepWizard from './../../components/bulkUserStepWizard'
import companyAPI from './../../api/company-api.js'

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
    _ () {
      return _
    },

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

    parseCSV(csv_content, companyuserimportjobs) {
      const parts = csv_content.split('\n')
      const header = parts[0].split(',')
      for(let i=0; i<header.length; i++){
        if(companyuserimportjobs.DBfields.indexOf(header[i])>=0)
          header[i] = -1;
      }
      let values = new Array(header.length)
      for(let i=0; i<header.length; i++)
        values[i] = new Set()
      for(let i=1; i<parts.length; i++){
        const line = parts[i].split(',')
        for(let j=0; j<header.length; j++){
          if(header[j]!=-1 && line[j]!='' && line[j]!='\\N' && line[j]!=' ' && line[j])
            values[j].add(line[j].replace(/['"]+/g, ''))
        }
      }
      let processedValue=new Array();
      for(let i=0; i<header.length; i++){
        if(header[i] != -1 && values[i].size > 0)
          processedValue.push({name: header[i], values: values[i]});
      }
      return processedValue;
    },

    /**
     * #TODO
     * 1. the uploader box should be shown after select a company
     * 2. remove upload_csv button. it should go to the next step as soon as uploading a csv
     */
    submit () {
      console.log('company.company.id', this.company.value.id)
      if (this.company.value.id > 0) {
        if (this.uploadedFiles.length == 1) {
          var formData = new FormData();
          formData.append('csv', this.uploadedFiles[0], this.uploadedFiles[0].name);
          this.isReady = true
          companyAPI.createJob(this.company.value.id, formData,
            (res) => {
              this.isReady = false
              let companyuserimportjobs = store.sync(res.data)
              console.log('employee.bulk.add/submit res', companyuserimportjobs)
              var vm = this
              //var reader = new FileReader();
              //reader.onload = (e) => {
                // vm.fileinput = reader.result;
                // const fieldVals = vm.parseCSV(vm.fileinput, companyuserimportjobs);
                // companyuserimportjobs.UDLfields = fieldVals;
                vm.$store.dispatch('employee_bulk/updateJob', companyuserimportjobs).then(res => vm.$router.push({path: '/employees/bulk/mapping'}), err => console.log(err))
              //}
              //reader.readAsText(this.uploadedFiles[0]);
            }, (err) => {
              this.isReady = false
              console.log('employee.bluk.add/submit err', err)
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
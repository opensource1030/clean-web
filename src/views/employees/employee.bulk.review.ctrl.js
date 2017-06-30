import _ from 'lodash'
import modal from './../../components/modal.vue'
import uploader from './../../components/FileUploader.vue'
import bulkUserStepWizard from './../../components/bulkUserStepWizard';
import companyAPI from './../../api/company-api.js'
import { mapGetters } from 'vuex'

const { Store } = require('yayson')()
const store = new Store()
const intervalId = null;

export default {
  name: 'EmployeeBulkReview',

  components: {
    modal,
    bulkUserStepWizard,
  },

  data () {
    return {
      isReady: false,
      intervalId,
    }
  },

  computed: {
  },

  created () {
    this.isReady = false;
    let job_id = this.$store.state.employee_bulk.companyuserimportjobs.id;
    let company_id = this.$store.state.employee_bulk.companyuserimportjobs.companyId;
    console.log(company_id);
    console.log(job_id);
    this.intervalId = setInterval(function () {
      companyAPI.getJobs(company_id, job_id, 
        (res) => {
          let companyuserimportjobs = store.sync(res.data);
          let status = companyuserimportjobs.status;
          if(status == "Completed") {
            clearInterval(this.intervalId)
            this.isReady = true;
            this.$store.dispatch('employee_bulk/updateJob', companyuserimportjobs).then(res => console.log("Got the Jobs!"));
          } else {

          }
        }, (err) => {
          this.isReady = true;
          console.log(err);
        }
      ) 
    }, 5000)
  },

  methods: {
    cancelListening () {
      clearInterval(this.intervalId)
      this.$router.push({ path: '/employees' }, err => console.log(err))
    }
  }
}
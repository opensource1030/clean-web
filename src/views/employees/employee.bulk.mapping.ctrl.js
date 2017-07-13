import multiselect from "vue-multiselect";
import modal from "./../../components/modal.vue";
import bulkUserStepWizard from "./../../components/bulkUserStepWizard";
import companyAPI from "./../../api/company-api.js";
import {JobPresenter} from "./../../presenters";

const {Store} = require('yayson')()
const store = new Store()

export default {
  name: 'EmployeeBlukMapping',

  components: {
    multiselect,
    modal,
    bulkUserStepWizard,
  },

  data () {
    return {
      db_fields: [],
      db_options: [],
      db_matched_fields: [],
      csv_fields: [],
      csv_options: [],
      csv_matched_fields: [],
      mappings: [],
      sample_user: {},
      isReady: false,
    }
  },

  computed: {},

  created () {
    this.db_fields = this.$store.state.employee_bulk.companyuserimportjobs.DBfields;
    this.db_options.push('Unkown ignore');
    this.db_options = this.db_options.concat(this.db_fields);

    this.csv_fields = this.$store.state.employee_bulk.companyuserimportjobs.CSVfields;
    this.csv_options.push('Unkown ignore');
    this.csv_options = this.csv_options.concat(this.csv_fields);

    this.sample_user = this.$store.state.employee_bulk.companyuserimportjobs.sampleUser;

    for (var idx1 = 0; idx1 < this.db_fields.length; idx1++) {
      var match_flag = false;
      for (var idx2 = 0; idx2 < this.db_fields.length; idx2++) {
        if (this.db_fields[idx1].toLowerCase() == this.csv_fields[idx2].toLowerCase()) {
          this.db_matched_fields.push(this.db_fields[idx1]);
          this.csv_matched_fields.push(this.csv_fields[idx2]);
          match_flag = true;
          break;
        }
      }
      if (!match_flag) {
        this.db_matched_fields.push('Unkown ignore');
        this.csv_matched_fields.push('Unkown ignore');
      }
    }
  },

  methods: {

    submit () {
      var validation_flag = true;
      for (var idx = 0; idx < this.db_matched_fields.length; idx++) {
        if (this.db_matched_fields[idx] != 'Unkown ignore') {
          if (this.csv_matched_fields[idx] == 'Unkown ignore') {
            validation_flag = false;
            break;
          }
          var dict = {};
          dict["dbField"] = this.db_matched_fields[idx];
          dict["csvField"] = this.csv_matched_fields[idx];
          this.mappings.push(dict);
        }
      }
      if (validation_flag) {
        this.$store.dispatch('employee_bulk/updateMappings', this.mappings).then(
          res => {
            console.log("Updated Mappings");
            debugger;
            this.isReady = true;
            let job_id = this.$store.state.employee_bulk.companyuserimportjobs.id;
            let company_id = this.$store.state.employee_bulk.companyuserimportjobs.companyId;
            let _jsonData = JobPresenter.toJSON(this.$store.state.employee_bulk.companyuserimportjobs);
            _jsonData['data']['type'] = "jobs";
            let params = JSON.stringify(_jsonData);
            console.log(params);
            companyAPI.updateJobs(company_id, job_id, params,
              (res) => {
                this.isReady = false;
                let companyuserimportjobs = store.sync(res.data);
                this.$store.dispatch('employee_bulk/updateJob', companyuserimportjobs).then(res => this.$router.push({path: '/employees/bulk/review'}, err => console.log(err)));
              }, (err) => {
                this.isReady = false;
                console.log(err);
              }
            )
          })
      } else {
        this.$store.dispatch('error/addNew', {message: 'Please match fields correctly!'})
      }


    }
  }
}
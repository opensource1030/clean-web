import multiselect from 'vue-multiselect'
import modal from './../../components/modal.vue'
import bulkUserStepWizard from './../../components/bulkUserStepWizard'
import companyAPI from './../../api/company-api.js'
import {JobPresenter} from './../../presenters'

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

  /**
   * #TODO
   * 1. get the last preserved mapping table
   * 2. auto-mapping if no preserved mpaaing table
   */
  created () {
    let companyuserimportjobs = this.$store.state.employee_bulk.companyuserimportjobs
    // let res = {"data":{"type":"companyuserimportjobs","id":"11","attributes":{"jobType":"employeeimportjob","companyId":1,"path":"\/home\/forge\/dev.api.wirelessanalytics.com\/releases\/20170720201921\/storage\/clients\/jenkins-mitchell-and-hackett\/employee-1500635837.csv","file":"employee-1500635837.csv","totalUsers":0,"createdUsers":0,"creatableUsers":0,"updatedUsers":0,"updatableUsers":2,"failedUsers":0,"CSVfields":["email","alternateEmail","password","username","confirmation_code","confirmed","firstName","lastName","alternateFirstName","supervisorEmail","companyUserIdentifier","isSupervisor","isValidator","isActive","defaultLang","level","notify","companyId","supervisorId","externalId","approverId","defaultLocationId"],"DBfields":{"email":"Main Email","alternateEmail":"Alternate Email","username":"Username","firstName":"First Name","lastName":"Last Name","supervisorEmail":"Supervisor Email","companyUserIdentifier":"Company User Identifier","isSupervisor":"Is Supervisor?","isValidator":"Is Validator?","isActive":"Is Active?","hierarchy":"Hierarchy","defaultLang":"Default Language","notes":"Notes","level":"Level","Cost Center":"Cost Center","Division":"Division","Position":"Position"},"sampleUser":{"email":"douglas.rolfson@example.org","alternateEmail":"pagac.ashlee@example.org","password":"user","username":"douglas.rolfson","confirmation_code":"b95c05f09018e7d91c5a67c8d66b68f4","confirmed":"1","firstName":"Britney","lastName":"Prosacco","alternateFirstName":"Larissa","supervisorEmail":"leon62@example.org","companyUserIdentifier":"2","isSupervisor":"0","isValidator":"0","isActive":"1","defaultLang":"en","level":"0","notify":"0","companyId":"3","supervisorId":"3","externalId":"\\N","approverId":"1","defaultLocationId":"51"},"mappings":{},"status":"Pending","created_by_id":1,"updated_by_id":1,"created_at":{"date":"2017-07-21 11:17:17.000000","timezone_type":3,"timezone":"UTC"},"updated_at":{"date":"2017-07-21 11:17:17.000000","timezone_type":3,"timezone":"UTC"}},"links":{"self":"dev.api.wirelessanalytics.com\/companyuserimportjobs\/11"}}}
    // let res = {"data":{"type":"companyuserimportjobs","id":"11","attributes":{"jobType":"employeeimportjob","companyId":1,"path":"\/home\/forge\/dev.api.wirelessanalytics.com\/releases\/20170720165457\/storage\/clients\/ullrich-ltd\/employee-1500577003.csv","file":"employee-1500577003.csv","totalUsers":0,"createdUsers":0,"creatableUsers":0,"updatedUsers":0,"updatableUsers":2,"failedUsers":0,"CSVfields":["email","alternateEmail","password","username","confirmation_code","confirmed","firstName","lastName","alternateFirstName","supervisorEmail","companyUserIdentifier","isSupervisor","isValidator","isActive","defaultLang","level","notify","companyId","supervisorId","externalId","approverId","defaultLocationId"],"DBfields":{"email":"Main Email","alternateEmail":"Alternate Email","username":"Username","firstName":"First Name","lastName":"Last Name","supervisorEmail":"Supervisor Email","companyUserIdentifier":"Company User Identifier","isSupervisor":"Is Supervisor?","isValidator":"Is Validator?","isActive":"Is Active?","hierarchy":"Hierarchy","defaultLang":"Default Language","notes":"Notes","level":"Level","Cost Center":"Cost Center","Division":"Division","Position":"Position"},"sampleUser":{"email":"douglas.rolfson@example.org","alternateEmail":"pagac.ashlee@example.org","password":"user","username":"douglas.rolfson","confirmation_code":"b95c05f09018e7d91c5a67c8d66b68f4","confirmed":"1","firstName":"Britney","lastName":"Prosacco","alternateFirstName":"Larissa","supervisorEmail":"leon62@example.org","companyUserIdentifier":"2","isSupervisor":"0","isValidator":"0","isActive":"1","defaultLang":"en","level":"0","notify":"0","companyId":"3","supervisorId":"3","externalId":"\\N","approverId":"1","defaultLocationId":"51"},"mappings":[{"dbField":"email","csvField":"email"},{"dbField":"alternateEmail","csvField":"alternateEmail"},{"dbField":"username","csvField":"username"},{"dbField":"firstName","csvField":"firstName"},{"dbField":"lastName","csvField":"lastName"},{"dbField":"supervisorEmail","csvField":"supervisorEmail"},{"dbField":"companyUserIdentifier","csvField":"companyUserIdentifier"},{"dbField":"isSupervisor","csvField":"isSupervisor"},{"dbField":"isValidator","csvField":"isValidator"},{"dbField":"isActive","csvField":"isActive"},{"dbField":"defaultLang","csvField":"defaultLang"},{"dbField":"level","csvField":"level"}],"status":"Pending","created_by_id":1,"updated_by_id":1,"created_at":{"date":"2017-07-20 18:56:43.000000","timezone_type":3,"timezone":"UTC"},"updated_at":{"date":"2017-07-20 18:56:43.000000","timezone_type":3,"timezone":"UTC"}},"links":{"self":"dev.api.wirelessanalytics.com\/companyuserimportjobs\/11"}}}
    // let companyuserimportjobs = res.data.attributes
    // console.log('companyuserimportjobs', companyuserimportjobs)

    let mappings = companyuserimportjobs.mappings
    let dbfields = companyuserimportjobs.DBfields

    // if (_.isEmpty(companyuserimportjobs.DBfields)) {
    //   dbfields = {
    //     "email":"Main Email",
    //     "alternateEmail":"Alternate Email",
    //     "username":"Username",
    //     "firstName":"First Name",
    //     "lastName":"Last Name",
    //     "supervisorEmail":"Supervisor Email",
    //     "companyUserIdentifier":"Company User Identifier",
    //     "isSupervisor":"Is Supervisor?",
    //     "isValidator":"Is Validator?",
    //     "isActive":"Is Active?",
    //     "hierarchy":"Hierarchy",
    //     "defaultLang":"Default Language",
    //     "notes":"Notes",
    //     "level":"Level",
    //     "Position":"Position",
    //     "Sector":"Sector",
    //     "Vehicle":"Vehicle",
    //     "Cost Center":"Cost Center"
    //   }
    // } else {
    //   dbfields = companyuserimportjobs.DBfields
    // }

    this.db_fields = _.map(dbfields, (value, key) => { return { name: key, label: value } });
    this.db_options.push({ name: 'Unkown ignore', label: 'Unkown ignore'})
    this.db_options = this.db_options.concat(this.db_fields)

    this.csv_fields = companyuserimportjobs.CSVfields;
    this.csv_options.push('Unkown ignore')
    this.csv_options = this.csv_options.concat(this.csv_fields);

    this.sample_user = companyuserimportjobs.sampleUser;

    console.log(_.isEmpty(mappings), mappings, this.db_fields, this.csv_fields)
    if (_.isEmpty(mappings)) {
      for (let idx1 = 0; idx1 < this.db_fields.length; idx1 ++) {
        let match_flag = false
        for (let idx2 = 0; idx2 < this.csv_fields.length; idx2 ++) {
          if (this.db_fields[idx1].name.toLowerCase() == this.csv_fields[idx2].toLowerCase()) {
            this.db_matched_fields.push(this.db_fields[idx1])
            this.csv_matched_fields.push(this.csv_fields[idx2])
            match_flag = true
            break
          }
        }
        if (!match_flag) {
          this.db_matched_fields.push({ name: 'Unkown ignore', label: 'Unkown ignore'})
          this.csv_matched_fields.push('Unkown ignore')
        }
      }
    } else {

      for (let i = 0; i < mappings.length; i ++) {
        let db_field = _.find(this.db_fields, (field) => (field.name.toLowerCase() == mappings[i].dbField.toLowerCase()))
        let csv_field = _.find(this.csv_fields, (field) => (field.toLowerCase() == mappings[i].csvField.toLowerCase()))
        if (_.isEmpty(db_field) == false && _.isEmpty(csv_field) == false) {
          this.db_matched_fields.push(db_field)
          this.csv_matched_fields.push(csv_field)
        }
      }

      for (let i = this.db_matched_fields.length; i < this.db_fields.length; i ++) {
        this.db_matched_fields.push({ name: 'Unkown ignore', label: 'Unkown ignore'})
        this.csv_matched_fields.push('Unkown ignore')
      }
    }
  },

  methods: {
    submit () {
      var validation_flag = true;
      if (! (_.find(this.db_matched_fields, (field) => { return field.name == 'email'}) &&
          _.find(this.db_matched_fields, (field) => { return field.name == 'firstName'}) &&
          _.find(this.db_matched_fields, (field) => { return field.name == 'lastName'}) &&
          _.find(this.db_matched_fields, (field) => { return field.name == 'supervisorEmail'}))) {
        validation_flag = false;
      }

      if (!validation_flag) {
        console.log('missing required db field');
        this.$store.dispatch('error/addNew', { message: 'Please map [Main Email], [Firs tName], [Last Name], [Supervisor Email]' })
        return
      }

      for (var idx = 0; idx < this.db_matched_fields.length; idx++) {
        if (this.db_matched_fields[idx].name != 'Unkown ignore') {
          if (this.csv_matched_fields[idx] == 'Unkown ignore') {
            validation_flag = false
            break
          }
          var dict = {}
          dict["dbField"] = this.db_matched_fields[idx].name
          dict["csvField"] = this.csv_matched_fields[idx]
          this.mappings.push(dict)
        }
      }

      if (validation_flag) {
        this.$store.dispatch('employee_bulk/updateMappings', this.mappings).then(
          res => {
            // console.log("Updated Mappings")
            this.isReady = true
            let job_id = this.$store.state.employee_bulk.companyuserimportjobs.id
            let company_id = this.$store.state.employee_bulk.companyuserimportjobs.companyId
            let _jsonData = JobPresenter.toJSON(this.$store.state.employee_bulk.companyuserimportjobs)
            _jsonData['data']['type'] = "jobs"
            let params = JSON.stringify(_jsonData)
            // console.log(params)
            companyAPI.updateJob(company_id, job_id, params,
              (res) => {
                this.isReady = false
                let companyuserimportjobs = store.sync(res.data)
                this.$store.dispatch('employee_bulk/updateJob', companyuserimportjobs).then(res => this.$router.push({path: '/employees/bulk/review'}), err => console.log(err))
              }, (err) => {
                this.isReady = false
                console.log(err)
              }
            )
          })
      } else {
        this.$store.dispatch('error/addNew', { message: 'Please match fields correctly!' })
      }
    }
  }
}
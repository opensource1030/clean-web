import {mapGetters, mapActions} from 'vuex'
import { Switch as cSwitch } from '@coreui/vue'
import { ServiceHelper } from '@/helpers'
import _ from 'lodash'

export default {

  name: 'ServiceEdit',

  components: {
    cSwitch
  },

  data() {
    return {
      dataUnit: [ 'Tb', 'Gb', 'Mb' ],
      domesticDataUnit: null,
      internationalDataUnit: null,
      currencyUnit: ['USD', 'EUR', 'GBP'],
      planCarrier: null,
      checker: null,
      isLoading: true,
      //------
      formValidators: {
        generalErr                  : false,
        maxNum                      : 999999,
        minNum                      : 0,
        addonCounter                : 0,
        flags: {
          costErr                   : null,
          domesticMinutesErr        : null,
          domesticDataErr           : null,
          domesticSMSErr            : null,
          internationalMinutesErr   : null,
          internationalDataErr      : null,
          internationalSMSErr       : null,
        },
        addonFlags: {
          addon0Cost                : null,
        },
      },
      //------
      unlimitedSwitches: {
        domesticMinutes             : false,
        domesticData                : false,
        domesticSMS                 : false,
        internationalMinutes        : false,
        internationalData           : false,
        internationalSMS            : false,
      },
      //------
    }
  },

  computed: {
    ...mapGetters ({
      serviceDetails: 'service/getServiceDetails',
      domesticPlan: 'service/getDomesticPlan',
      internationalPlan: 'service/getInternationalPlan',
      addons: 'service/getAddons',
      carriers: 'carrier/sorted'
    }),
  },

  created() {
    this.isLoading = true;

    this.$store.dispatch('carrier/search').then((res) => {
      if (this.$route.params.id > 0) {
        this.$store.dispatch('service/getOne', this.$route.params.id).then((res) => {
          this.isLoading = false
        }, (err) => { console.log('error in service/getOne', err) })
      } else {
        this.$store.commit('service/reset')
        this.isLoading = false
      }
    }, (err) => { console.log('error in carrier/search', err) })
  },

  methods: {
    save() {

      let self = this

      // Validation begin

      let maxNum      = self.formValidators.maxNum
      let minNum      = self.formValidators.minNum
      let flags       = self.formValidators.flags
      let addonFlags  = self.formValidators.addonFlags

      if ( parseInt(self.serviceDetails.cost) > maxNum || parseInt(self.serviceDetails.cost) < minNum) {
        flags.costErr = false
      } else {
        flags.costErr = null
      }

      if ( parseInt(self.domesticPlan.minutes.value) > maxNum || parseInt(self.domesticPlan.minutes.value) < minNum) {
        flags.domesticMinutesErr = false
      } else {
        flags.domesticMinutesErr = null
      }

      if ( parseInt(self.domesticPlan.data.value) > maxNum || parseInt(self.domesticPlan.data.value) < minNum) {
        flags.domesticDataErr = false
      } else {
        flags.domesticDataErr = null
      }

      if ( parseInt(self.domesticPlan.sms.value) > maxNum || parseInt(self.domesticPlan.sms.value) < minNum) {
        flags.domesticSMSErr = false
      } else {
        flags.domesticSMSErr = null
      }

      if ( parseInt(self.internationalPlan.minutes.value) > maxNum || parseInt(self.internationalPlan.minutes.value) < minNum) {
        flags.internationalMinutesErr = false
      } else {
        flags.internationalMinutesErr = null
      }

      if ( parseInt(self.internationalPlan.data.value) > maxNum || parseInt(self.internationalPlan.data.value) < minNum) {
        flags.internationalDataErr = false
      } else {
        flags.internationalDataErr = null
      }

      if ( parseInt(self.internationalPlan.sms.value) > maxNum || parseInt(self.internationalPlan.sms.value) < minNum) {
        flags.internationalSMSErr = false
      } else {
        flags.internationalSMSErr = null
      }

      for (let i = 0; i < self.addons.length; i++) {
        if ( parseInt(self.addons[i].cost) > maxNum || parseInt(self.addons[i].cost) < minNum) {
          self.formValidators.addonFlags['addon' + i.toString() + 'Cost'] = false
        } else {
          self.formValidators.addonFlags['addon' + i.toString() + 'Cost'] = null
        }
      }

      self.formValidators.generalErr = false

      Object.values(flags).forEach(val => {
        if ( val === false ) {
          self.formValidators.generalErr = true
        }
      })

      // Now check for the addons flags

      Object.values(addonFlags).forEach(val => {
        if ( val === false ) {
          self.formValidators.generalErr = true
        }
      })

      if (self.formValidators.generalErr) {
        return
      }

      // Validation end

      //let self = this
      let valid = ServiceHelper.validateFields(self.serviceDetails, self.addons)

      self.$store.dispatch('error/clearAll')
      if (valid !== true) {
        self.$store.dispatch('error/addNew', { message: valid });
        return
      }

      self.$store.dispatch('service/save', { router: self.$router })
    },

    addFormAddonValidator() {
      let self = this
      let addonFlags = self.formValidators.addonFlags

      // reset addons validator flag object
      self.formValidators.addonFlags = _.mapValues(addonFlags, () => null)

      self.formValidators.addonCounter++
      self.formValidators.addonFlags['addon' + self.formValidators.addonCounter.toString() + 'Cost'] = null
    },

    removeFormAddonValidator() {
      let self = this
      self.formValidators.addonCounter--

      // Re-do the addons validator flag object
      self.formValidators.addonFlags = {}

      for (let i = 0; i < self.addons.length; i++) {
        self.formValidators.addonFlags['addon' + self.formValidators.addonCounter.toString() + 'Cost'] = null
      }

    },

  }
}

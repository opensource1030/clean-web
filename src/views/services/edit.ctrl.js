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
      unlimitedSwitches: {
        domesticPlan: {
          minutes: false,
          data: false,
          sms: false,
        },
        internationalPlan: {
          minutes: false,
          data: false,
          sms: false,
        }
      },
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

      this.$validator.validateAll().then( validator => {
        
        if (!validator) {
          return
        }
        
        let self = this
        let valid = ServiceHelper.validateFields(self.serviceDetails, self.addons)

        self.$store.dispatch('error/clearAll')
        if (valid !== true) {
          self.$store.dispatch('error/addNew', { message: valid });
          return
        }

        self.$store.dispatch('service/save', { router: self.$router })
              
      })

    },

    validateAddons() {
      for (let i = 0; i < this.addons.length; i++) {
        this.$validator.validate('addon-cost-' + i, this.addons[i].cost)        
      }
    },

    unlimitedValidation(scope, type) {
      this.$validator.validate(scope + '-' + type, this[scope][type].value)
    }

  }
}

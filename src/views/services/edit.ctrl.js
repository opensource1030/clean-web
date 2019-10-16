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
        if (!validator) { return }
        this.$store.dispatch('service/save', {router: this.$router })
      })

    },

    validateAddons() {
      for (let i = 0; i < this.addons.length; i++) {
        this.$validator.validate('addon ' + i + ' description', this.addons[i].description)
        this.$validator.validate('addon ' + i + ' cost', this.addons[i].cost)        
      }
    },

    unlimitedValidation(validatorField, scope, type) {
      this.$validator.validate(validatorField, this[scope][type].value)
    },
  },
  
}



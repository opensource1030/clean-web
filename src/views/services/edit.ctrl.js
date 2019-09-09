import {mapGetters, mapActions} from 'vuex'
import { Switch as cSwitch } from '@coreui/vue'
import { ServiceHelper } from '@/helpers'

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
      validators: {
        planCodeError: null
      }
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
    // validators() {
    //   return {
    //     planCode: {
    //       value: this.$store.state.service.serviceDetails.code,
    //       error: null,
    //     }
    //   }
    // }
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

      if (parseInt(this.serviceDetails.code) > 999999) {
        this.validators.planCodeError = false
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
    },
  }
}

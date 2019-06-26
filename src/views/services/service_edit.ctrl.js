import {mapGetters, mapActions} from 'vuex'
import { Switch as cSwitch } from '@coreui/vue'

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
    }
  },

  computed: {
    ...mapGetters ({
      serviceDetails: 'service/getServiceDetails',
      domesticPlan: 'service/getDomesticPlan',
      internationalPlan: 'service/getInternationalPlan',
      addons: 'service/getAddons',
      carriers: 'carrier/sorted'
    })
  },

  created() {
    this.isLoading = true;

    this.$store.dispatch('carrier/search').then((res) => {
      this.isLoading = false;
    }, (err) => {
      // console.log('error in carrier/search', err);
      this.isLoading = false;
    })
  },

  methods: {
    save() {
      let self = this;

      this.$store.dispatch('error/clearAll')
      this.$store.dispatch('service/add', {
        serviceDetails: this.serviceDetails,
        domesticPlan: this.domesticPlan,
        internationalPlan: this.internationalPlan,
        addons: this.addons,
        router: this.$router
      }).then((result) => {
        if(result == 'error') {
          self.$swal({
            type: 'error',
            title: 'Oops!',
            text: self.$store.getters['error/error'],
            onClose: () => {
              self.$store.dispatch('error/clearAll')
            }
          })
        }
      });
    },
  }
}

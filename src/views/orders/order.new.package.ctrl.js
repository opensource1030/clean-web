import { Carousel, Slide } from 'vue-carousel'
import {mapGetters, mapActions} from 'vuex';
import placeOrderWizard from './../../components/placeOrderWizard.vue';

export default {
  name: 'SelectPackage',

  components: {
    placeOrderWizard,
    Carousel,
    Slide
  },

  data () {
    return {
      orderType: '',
      packages: {
        availablePackages: [],
        activePackage: {},
        loading: true
      },
      services: {
        availableServices: [],
        activeService: {},
        loading: false
      },
      keepService: '',
      serviceInfo: {
        IMEI: '',
        PhoneNo: '',
        Sim: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      selectedKeepService: 'placeOrder/getSelectedKeepService',
      selectedPackage: 'placeOrder/getSelectedPackage',
      selectedService: 'placeOrder/getSelectedService',
      typedServiceInfo: 'placeOrder/getTypedServiceInfo'
    }),
  },

  created () {
    this.$store.dispatch('placeOrder/getUserPackages', this.$store.state.auth.userId).then(
      res => {
        if (res) {
          this.packages.availablePackages = res

          for (let eachPackage of res) {
            if (eachPackage.id == this.selectedPackage) {
              this.setActive('Package', eachPackage)
            }
          }
        } else {
          this.packages.availablePackages = []
        }
        this.packages.loading = false
      }
    )

    // this.orderType = this.$route.meta.label
    this.orderType = this.$store.state.placeOrder.currentOrderType
    switch (this.orderType) {
      case 'New':
        this.keepService = 'No'
        break
      case 'Upgrade':
        this.keepService = this.selectedKeepService

        if (this.$route.params.deviceInfo) {
          this.serviceInfo = {
            IMEI: this.$route.params.deviceInfo.device_esn_imei,
            PhoneNo: this.$route.params.deviceInfo.mobile_number,
            Sim: this.$route.params.deviceInfo.device_sim
          }

          if (this.typedServiceInfo.IMEI || this.typedServiceInfo.PhoneNo || this.typedServiceInfo.Sim) {
            this.serviceInfo = $.extend(true, {}, this.typedServiceInfo)
          }
        } else if (this.$route.params.deviceInfo == undefined) {
          this.$route.push({ path: '/dashboard' })
        }
        break
      case 'Transfer':
        this.keepService = this.selectedKeepService
        this.serviceInfo = $.extend(true, {}, this.typedServiceInfo)
        break
    }
  },

  methods: {
    setActive (type, value) {
      switch (type) {
        case 'Package':
          this.packages.activePackage = value
          this.services.loading = true
          this.services.activeService = {}
          this.$store.dispatch('placeOrder/getPackageServices', value.id).then(
            res => {
              this.services.availableServices = res.services;
              for (let service of res.services) {
                if (service.id == this.selectedService.id) {
                  this.setActive('Service', service)
                }
              }
              this.services.loading = false
            }
          )
          break;
        case 'Service':
          this.services.activeService = value
          break
      }
    },

    getImageUrl (object) {
      return 'http://sandysearch.com/contentimages/noPhotoProvided.gif'
    },

    goDevicePage () {
      this.$store.dispatch('placeOrder/setKeepService', this.keepService)
      this.$store.dispatch('placeOrder/setServiceSelected', this.services.activeService)
      this.$store.dispatch('placeOrder/setServiceInfo', this.serviceInfo)
      // this.$store.dispatch('placeOrder/setCurrentView', 'select_device')
      this.$router.push({ path: '/orders/new/device' })
    }
  }
}

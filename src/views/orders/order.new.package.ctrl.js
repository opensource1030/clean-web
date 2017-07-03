import {Carousel, Slide} from "vue-carousel";
import {mapGetters} from "vuex";
import placeOrderWizard from "./../../components/placeOrderWizard.vue";
import {Utils} from "./../../helpers";

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
    isDisabled(){
      if (this.services.activeService.id !== undefined && this.packages.activePackage !== null) {

        return false
      }
      else if ((this.serviceInfo.IMEI && this.serviceInfo.PhoneNo && this.serviceInfo.Sim) !== '') {
        return false
      }
      return true
    }
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

        let allocation = this.$store.state.placeOrder.allocation
        if (Utils.isEmptyObject(allocation)) {
          this.$router.push({ path: '/dashboard' })
        } else {
          this.serviceInfo = {
            IMEI: allocation.device_esn_imei,
            PhoneNo: allocation.mobile_number,
            Sim: allocation.device_sim
          }

          if (this.typedServiceInfo.IMEI || this.typedServiceInfo.PhoneNo || this.typedServiceInfo.Sim) {
            this.serviceInfo = $.extend(true, {}, this.typedServiceInfo)
          }
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
              if (res.services.length == 1) {
                // console.log('order.new.package res', res.services[0])
                this.keepService = 'No'
                this.goDevicePage()
              }
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

      // setTimeout(function () {
      //   $('.select-service').scrollIntoView({
      //     behavior: 'smooth'
      //   });
      // }, 2000)
    },

    getImageUrl (object) {
      // if (object.hasOwnProperty('images')) {
      //   if (object.images.length > 0) {
      //     for(let i of object.images) {
      //       if(i.id > 0)
      //         return process.env.URL_API + '/images/' + i.filename + '.' + i.extension;
      //     }
      //   }
      // } else {
        return 'http://sandysearch.com/contentimages/noPhotoProvided.gif';
      // }
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

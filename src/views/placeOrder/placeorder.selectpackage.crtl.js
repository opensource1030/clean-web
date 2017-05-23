import { Carousel, Slide } from 'vue-carousel'
import {mapGetters, mapActions} from 'vuex';
import placeOrderWizard from './../../components/placeOrderWizard.vue';

export default {
  name : 'SelectPackage',
  components : {
    placeOrderWizard,
    Carousel,
    Slide
  },
  data() {
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
  beforeCreate() {
    let userInfo = JSON.parse(localStorage.userProfile);
    this.$store.dispatch('placeOrder/getUserPackages', userInfo.id).then(
      res => {
        this.packages.availablePackages = res;
        
        for(let eachPackage of res) {
          if(eachPackage.id == this.selectedPackage)
            this.setActive('Package', eachPackage);
        }
        this.packages.loading = false;
      }
    )
  },
  computed: {
    ...mapGetters({
      selectedKeepService: 'placeOrder/getSelectedKeepService',
      selectedPackage: 'placeOrder/getSelectedPackage',
      selectedService: 'placeOrder/getSelectedService',
      typedServiceInfo: 'placeOrder/getTypedServiceInfo'
    }),
  },
  created() {
    this.orderType = this.$route.meta.label;
    switch(this.orderType) {
      case 'New':
        this.keepService = 'No';
        break;
      case 'Upgrade':
        this.keepService = this.selectedKeepService;
        this.serviceInfo = $.extend(true, {}, this.typedServiceInfo);

        if(this.$route.params.deviceInfo) {
          this.serviceInfo = {
            IMEI: this.$route.params.deviceInfo.device_esn_imei,
            PhoneNo: this.$route.params.deviceInfo.mobile_number,
            Sim: this.$route.params.deviceInfo.device_sim
          }

          if(this.typedServiceInfo.IMEI || this.typedServiceInfo.PhoneNo || this.typedServiceInfo.Sim)
            this.serviceInfo = $.extend(true, {}, this.typedServiceInfo);
        } else if(this.$route.params.deviceInfo == undefined)
          location.href = '/dashboard';
        break;
    }
    
  },
  methods: {
    setActive(type, value) {
      switch(type) {
        case 'Package':
          this.packages.activePackage = value;

          this.services.loading = true;
          this.services.activeService = {};
          this.$store.dispatch('placeOrder/getPackageServices', value.id).then(
            res => {
              this.services.availableServices = res.services;
              for(let service of res.services) {
                if(service.id == this.selectedService.id)
                  this.setActive('Service', service);
              }
              this.services.loading = false;
            }
          )
          break;
        case 'Service':
          this.services.activeService = value;
          break;
      }
    },
    getImageUrl(object) {
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
    goDevicePage() {
      this.$store.dispatch('placeOrder/setKeepService', this.keepService);
      this.$store.dispatch('placeOrder/setServiceSelected', this.services.activeService);
      this.$store.dispatch('placeOrder/setServiceInfo', this.serviceInfo);
      this.$store.dispatch('placeOrder/setCurrentView', 'select_device');
    }
  },
  watch: {
    'keepService': function(newVal, oldVal) {
      this.currentOrderType == 'upgradeDevice' ? this.$store.dispatch('placeOrder/setKeepService', this.keepService) : null;
    }
  }
}

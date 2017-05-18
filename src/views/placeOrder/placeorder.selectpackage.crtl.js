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
    let userInfo = JSON.parse(localStorage.getItem('userProfile'))
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
      currentOrderType: 'placeOrder/getCurrentOrderType',
      selectedPackage: 'placeOrder/getSelectedPackage',
      selectedService: 'placeOrder/getSelectedService',
      typedServiceInfo: 'placeOrder/getTypedServiceInfo'
    }),
  },
  created() {
    this.currentOrderType == 'upgradeDevice' ? this.keepService = 'Yes' : this.keepService = 'No';
    this.serviceInfo = $.extend(true, {}, this.typedServiceInfo);
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
          this.$store.dispatch('placeOrder/setServiceSelected', value);
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
    setServiceInfo() {
      this.$store.dispatch('placeOrder/setServiceInfo', this.serviceInfo);
    },
    goOrderPages(value) {
      switch(value) {
        case 'option':
          this.$store.dispatch('placeOrder/setCurrentView', 'selectoption');
          break;
        case 'device':
          this.$store.dispatch('placeOrder/setCurrentView', 'selectdevice');
          break;
      }
    }
  },
  watch: {
    'keepService': function(newVal, oldVal) {
      this.currentOrderType == 'upgradeDevice' ? this.$store.dispatch('placeOrder/setKeepService', this.keepService) : null;
    }
  }
}

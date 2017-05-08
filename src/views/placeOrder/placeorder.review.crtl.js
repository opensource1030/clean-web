import Avatar from 'vue-avatar/dist/Avatar';
import multiselect from 'vue-multiselect'
import placeOrderWizard from './../../components/placeOrderWizard';
import modal from './../../components/modal';

import {mapGetters, mapActions} from 'vuex';

export default {
  name : 'Review',
  components : {
    Avatar,
    multiselect,
    placeOrderWizard,
    modal
  },
  data() {
    return {
      user: {},
      shippingAddress: {},
      changeAddress: false,
      submitOrder: false,
      submitOrder_pay: false
    }
  },
  beforeCreate() {
    this.user = JSON.parse(localStorage.getItem('userProfile'));
    this.addresses = [];
    this.addresses.push(this.user.address[0]);
  },
  computed: {
    ...mapGetters({
      selectedNeedDevice: 'placeOrder/getSelectedNeedDevice',
      selectedDeviceType: 'placeOrder/getSelectedDeviceType',
      typedDeviceInfo: 'placeOrder/getTypedDeviceInfo',
      selectedDevice: 'placeOrder/getSelectedDevice',
      selectedService: 'placeOrder/getSelectedService'
    })
  },
  created() {
    this.shippingAddress = this.addresses[0];

    this.$store.dispatch('placeOrder/getPackageAddresses').then(
      res => {
        for(let address of res.addresses)
          this.addresses.push(address);
      }
    )
  },
  methods : {
    goOrderDevicePage() {
      this.$store.dispatch('placeOrder/setCurrentView', 'selectdevice');
    },
    changeShippingAddress() {
      this.changeAddress = !this.changeAddress;
    },
    customLabel ({address, city, country}) {
      return `${address} - ${city} - ${country}`
    },
    submitDevice() {
      var app = this;

      if(this.selectedNeedDevice == 'Yes' && this.selectedDeviceType == 'personal')  {
        this.submitOrder_pay = true;
      }
        
      else {
        this.submitOrder = true;
        setTimeout(function() {
          app.$store.dispatch('placeOrder/setCurrentView', 'selectoption');
        },3000);
      }
    },
    payByCredit() {
      var app = this;
      this.submitOrder_pay = false;
      this.submitOrder = true;

      setTimeout(function() {
        app.$store.dispatch('placeOrder/setCurrentView', 'selectoption');
      },3000);
    }
  }
}

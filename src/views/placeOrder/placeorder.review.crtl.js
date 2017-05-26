import _ from 'lodash';

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
      orderType: '',
      user: {},
      address: {
        availableAddresses: [],
        shippingAddress: {},
        changeAddress: false,
        loading: true
      },
      orderFinished: false,
      payOrder: false,
      orderData: {}
    }
  },
  beforeCreate() {
    
  },
  computed: {
    ...mapGetters({
      selectedKeepService: 'placeOrder/getSelectedKeepService',
      typedServiceInfo: 'placeOrder/getTypedServiceInfo',
      selectedPackage: 'placeOrder/getSelectedPackage',
      selectedNeedDevice: 'placeOrder/getSelectedNeedDevice',
      selectedDeviceType: 'placeOrder/getSelectedDeviceType',
      typedDeviceInfo: 'placeOrder/getTypedDeviceInfo',
      selectedDevice: 'placeOrder/getSelectedDevice',
      selectedService: 'placeOrder/getSelectedService',
      selectedStyle: 'placeOrder/getSelectedStyle'
    })
  },
  created() {
    this.orderType = this.$route.meta.label;
    
    this.$store.dispatch('placeOrder/getUserConditions').then(
      res => {
        this.user = res;
      }
    )

    if(this.selectedKeepService == 'No') {
      this.$store.dispatch('placeOrder/getPackageAddresses').then(
        res => {
          for(let address of res.addresses)
            this.address.availableAddresses.push(address);
          
          this.address.shippingAddress = this.address.availableAddresses[0];
          this.address.loading = false;
        }
      )
    } else {
      this.$store.dispatch('placeOrder/getPackagesAddresses').then(
        res => {
          let temp_addresses = _.uniqBy(res, 'id');
          for(let address of temp_addresses)
            this.address.availableAddresses.push(address);
          
          this.address.shippingAddress = this.address.availableAddresses[0];
          this.address.loading = false;
        }
      )
    }
  },
  methods : {
    goOrderDevicePage() {
      this.$store.dispatch('placeOrder/setCurrentView', 'select_device');
    },
    changeShippingAddress() {
      this.address.changeAddress = !this.address.changeAddress;
    },
    customLabel ({address, city, country}) {
      return `${address} - ${city} - ${country}`
    },
    submitOrder() {
      let app = this;
      let orderTypes = {
        New: 'NewLineOfService',
        Upgrade: 'UpgradeDevice',
        Transfer: 'TransferServiceLiability',
        Accessories: 'Accessories'
      }

      this.orderData = {
        data : {
          type: 'orders',
          attributes: {
            status: 'Denied',
            orderType: orderTypes[this.orderType],
            userId: this.user.id
          },
          relationships: {
            apps: {
              data: []
            },
            addresses: {
              data: [
                {
                  type: 'addresses',
                  id: this.address.shippingAddress.id
                }
              ]
            },
            devicevariations: {
              data: []
            }
          }
        }
      }

      if(this.selectedKeepService == 'Yes') {
        this.orderData.data.attributes.serviceImei = this.typedServiceInfo.IMEI;
        this.orderData.data.attributes.sericePhoneNo = this.typedServiceInfo.PhoneNo;
        this.orderData.data.attributes.serviceSim = this.typedServiceInfo.Sim;
      } else {
        this.orderData.data.attributes.packageId = this.selectedPackage;
        this.orderData.data.attributes.serviceId = this.selectedService.id;
      }

      if(this.selectedNeedDevice == 'No' || (this.selectedNeedDevice == 'Yes' && this.selectedDeviceType == 'own')) {
        this.orderData.data.attributes.deviceImei = this.typedDeviceInfo.IMEI;
        this.orderData.data.attributes.deviceCarrier = this.typedDeviceInfo.Carrier;
        this.orderData.data.attributes.deviceSim = this.typedDeviceInfo.Sim;
      } else {
        this.orderData.data.relationships.devicevariations.data.push({
          type: 'devicevariations',
          id: this.selectedStyle.id
        })
      }

      if(this.selectedNeedDevice == 'Yes' && this.selectedDeviceType == 'personal') {
        this.payOrder = true;
      } else {
        this.$store.dispatch('placeOrder/createOrder', this.orderData).then(
          res => {
            console.log(res);

            // this.orderFinished = true;

            // setTimeout(function() {
            //   app.orderFinished = false;
            // },1000);
          }
        )
      }
    },
    payByCredit() {
      let app = this;
      this.payOrder = false;
      this.orderFinished = true;

      setTimeout(function() {
        app.orderFinished = false;
      },3000);
    }
  }
}

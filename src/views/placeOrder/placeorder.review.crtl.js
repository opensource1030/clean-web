import _ from 'lodash';

import Avatar from 'vue-avatar/dist/Avatar';
import multiselect from 'vue-multiselect'
import placeOrderWizard from './../../components/placeOrderWizard';
import modal from './../../components/modal';

import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Review',

  components: {
    Avatar,
    multiselect,
    placeOrderWizard,
    modal
  },

  data () {
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
      orderData: {},
      card: {
        name: '',
        phone: '',
        number: '',
        cvc: '',
        month: '',
        year: '',
        checking: false,
        status: true
      }
    }
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
      selectedStyle: 'placeOrder/getSelectedStyle',
      selectedAccessories: 'placeOrder/getSelectedAccessories'
    })
  },

  created () {
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

  methods: {
    getImageUrl(object) {
      if (object.hasOwnProperty('images')) {
        if (object.images.length > 0) {
          return process.env.URL_API + '/images/' + object.images[0].id
        }      
      } else {
        return 'http://sandysearch.com/contentimages/noPhotoProvided.gif'
      }
    },

    goOrderDevicePage() {
      this.$store.dispatch('placeOrder/setCurrentView', 'select_device')
    },

    changeShippingAddress() {
      this.address.changeAddress = !this.address.changeAddress
    },

    customLabel ({address, city, country}) {
      return `${address} - ${city} - ${country}`
    },

    submitOrder() {
      let app = this
      let orderTypes = {
        New: 'NewLineOfService',
        Upgrade: 'UpgradeDevice',
        Transfer: 'TransferServiceLiability',
        Accessories: 'Accessories'
      }

      this.orderData = {
        data: {
          type: 'orders',
          attributes: {
            status: 'New',
            orderType: orderTypes[this.orderType],
            userId: this.user.id,
            addressId: this.address.shippingAddress.id
          },
          relationships: {
            apps: {
              data: []
            },
            // addresses: {
            //   data: [
            //     {
            //       type: 'addresses',
            //       id: this.address.shippingAddress.id
            //     }
            //   ]
            // },
            devicevariations: {
              data: []
            }
          }
        }
      }

      if (this.selectedKeepService == 'Yes') {
        this.orderData.data.attributes.serviceImei = this.typedServiceInfo.IMEI;
        this.orderData.data.attributes.servicePhoneNo = this.typedServiceInfo.PhoneNo;
        this.orderData.data.attributes.serviceSim = this.typedServiceInfo.Sim;
      } else {
        this.orderData.data.attributes.packageId = this.selectedPackage;
        this.orderData.data.attributes.serviceId = this.selectedService.id;
      }

      if (this.selectedNeedDevice == 'No' || (this.selectedNeedDevice == 'Yes' && this.selectedDeviceType == 'own')) {
        this.orderData.data.attributes.deviceImei = this.typedDeviceInfo.IMEI;
        this.orderData.data.attributes.deviceCarrier = this.typedDeviceInfo.Carrier;
        this.orderData.data.attributes.deviceSim = this.typedDeviceInfo.Sim;
      } else {
        if (this.orderType != 'Accessory') {
          this.orderData.data.relationships.devicevariations.data.push({
            type: 'devicevariations',
            id: this.selectedStyle.id
          });
        }

        for (let accessory of this.selectedAccessories) {
          this.orderData.data.relationships.devicevariations.data.push({
            type: 'devicevariations',
            id: accessory
          });
        }
      }

      if (this.selectedNeedDevice == 'Yes' && this.selectedDeviceType == 'personal') {
        this.payOrder = true;
        Stripe.setPublishableKey('pk_test_o9DwIZ6k1TBwqbJCSh2IQKsj');
      } else {
        this.requestOrder();
      }
    },

    payByCredit() {
      let app = this;

      if(!app.card.checking) {
        app.card.checking = true;
        app.card.status = true;

        Stripe.card.createToken({
          number: app.card.number,
          cvc: app.card.cvc,
          exp_month: app.card.month,
          exp_year:app.card.year
        }, function(status, response) {
          app.card.checking = false;

          if(response.error) {
            app.card.status = false;
          } else {
            let token = response.id;
            app.payOrder = false;

            app.requestOrder();
          }
        });
      }
    },

    requestOrder() {
      this.$store.dispatch('placeOrder/createOrder', this.orderData).then(
        res => {
          this.orderFinished = true;

          setTimeout(function() {
            app.orderFinished = false
            location.href = '/dashboard'
          }, 1000)
        }
      )
    }
  }
}

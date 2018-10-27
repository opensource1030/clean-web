import _ from 'lodash'
import Avatar from 'vue-avatar'
import multiselect from 'vue-multiselect'
import { mapGetters } from 'vuex'
import placeOrderWizard from './../../components/placeOrderWizard'
import modal from './../../components/modal'
import addressAPI from './../../api/address-api.js'
import employeeAPI from './../../api/employee-api.js'
import { AddressesPresenter, EmployeesPresenter } from './../../presenters'

const {Store} = require('yayson')()
const store = new Store()

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
      customAddress: {
        id: 0,
        name: '',
        address: '',
        attn: '',
        city: '',
        state: '',
        phone: '',
        country: '',
        postalCode: '',
      },
      address: {
        availableAddresses: [],
        shippingAddress: {},
        changeAddress: false,
        loading: true
      },
      orderFinished: false,
      addDefaultAddress: false,
      addCustomAddress: false,
      chooseAddress: false,
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
    }),

    isDisabled () {
      if (this.addDefaultAddress || this.addCustomAddress) {
        return false
      }

      return true
    },
    isDisabledCustom(){
      if (this.customAddress.name !== '' && this.customAddress.address != '' && this.customAddress.city != '' && this.customAddress.state != '' && this.customAddress.country != '' && this.customAddress.postalCode != '') {
        return false
      }
      return true
    }
  },

  created () {
    this.orderType = this.$store.state.placeOrder.currentOrderType

    let _params = {
      params: {
        include: 'udlvalues,addresses'
      }
    }
    employeeAPI.get(this.$store.state.placeOrder.userId, _params, res => {
      this.user = store.sync(res.data)
      this.customAddress = _.extend(this.customAddress, _.get(this.user, 'addresses[0]', {}))
    }, err => {
      console.log('order.new.review/created user err', err)
    })

    this.$store.dispatch('placeOrder/getPackagesAddresses').then(
      res => {
        let temp_addresses = _.uniqBy(res, 'id');
        for (let address of temp_addresses) {
          this.address.availableAddresses.push(address);
        }

        this.address.shippingAddress = this.address.availableAddresses[0];
        this.address.loading = false;
      }
    )
  },

  methods: {
    toggleAddressModal () {
      this.chooseAddress = true
    },

    confirmCustomAddress () {
      this.addDefaultAddress = false
      this.addCustomAddress = true
      this.chooseAddress = false
    },

    confirmDefaultAddress () {
      this.addDefaultAddress = true
      this.addCustomAddress = false
      this.chooseAddress = false
    },

    getImageUrl (object) {
      if (object.hasOwnProperty('images')) {
        if (object.images.length > 0) {
          return process.env.URL_API + '/images/' + object.images[0].id
        }
      } else {
        return 'http://sandysearch.com/contentimages/noPhotoProvided.gif'
      }
    },

    goOrderDevicePage () {
      // this.$store.dispatch('placeOrder/setCurrentView', 'select_device')
      this.$router.push({path: '/orders/new/device'})
    },

    goBackPage () {
      this.$router.go(-1)
    },

    changeShippingAddress () {
      this.address.changeAddress = !this.address.changeAddress
    },

    customLabel ({address, city, country}) {
      return `${address} - ${city} - ${country}`
    },

    submitOrder () {
      if (this.addCustomAddress) {
        let _address = AddressesPresenter.toJSON(this.customAddress)
        if (this.customAddress.id > 0) {
          addressAPI.update(this.customAddress.id, _address, (res) => {
            this.customAddress = store.sync(res.data)
            this.address.shippingAddress = this.customAddress
            this.placeOrder()
          }, () => {})
        } else {
          addressAPI.create(_address, (res) => {
            this.customAddress = store.sync(res.data)
            this.user.addresses[0] = this.customAddress
            let _jsonData = EmployeesPresenter.toJSON(this.user)
            delete _jsonData['included']
            delete _jsonData['data']['attributes']['companies']
            let _params = JSON.stringify(_jsonData)
            employeeAPI.update(this.user.id, _params, res => {
              this.address.shippingAddress = this.customAddress
              this.placeOrder()
            })
          }, () => {})
        }
      } else {
        this.placeOrder()
      }
    },

    placeOrder () {
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

        this.orderData.data.attributes.packageId = this.selectedPackage;
      } else {
        this.orderData.data.attributes.packageId = this.selectedPackage;
        this.orderData.data.attributes.serviceId = this.selectedService.id;
      }

      if (this.orderType == 'Accessory') {
        this.orderData.data.attributes.packageId = this.selectedPackage;
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

      if (!app.card.checking) {
        app.card.checking = true;
        app.card.status = true;

        Stripe.card.createToken({
          number: app.card.number,
          cvc: app.card.cvc,
          exp_month: app.card.month,
          exp_year:app.card.year
        }, function(status, response) {
          app.card.checking = false;

          if (response.error) {
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
      let app = this
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

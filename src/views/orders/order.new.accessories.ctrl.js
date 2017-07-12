import _ from 'lodash'
import { mapGetters } from 'vuex'
import placeOrderWizard from './../../components/placeOrderWizard.vue'
import { DeviceVariationHelper } from './../../helpers'

export default {
  components: {
    placeOrderWizard
  },

  data () {
    return {
      orderType: '',
      needDevice: '',
      deviceType: '',
      devices: [],
      accessories: [],
      accessoryStatus: 0,
      device_loading: true,
      activeDevice: {},
      deviceInfo: {
        IMEI: '',
        Carrier: '',
        Sim: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      selectedKeepService: 'placeOrder/getSelectedKeepService',
      selectedNeedDevice: 'placeOrder/getSelectedNeedDevice',
      selectedDeviceType: 'placeOrder/getSelectedDeviceType',
      typedDeviceInfo: 'placeOrder/getTypedDeviceInfo',
      selectedDevice: 'placeOrder/getSelectedDevice',
      selectedCapacity: 'placeOrder/getSelectedCapacity',
      selectedStyle: 'placeOrder/getSelectedStyle',
      selectedAccessories: 'placeOrder/getSelectedAccessories'
    }),
  },

  created () {
    this.orderType = this.$store.state.placeOrder.currentOrderType
    this.needDevice = this.selectedNeedDevice
    this.deviceType = this.selectedDeviceType
    this.deviceInfo = $.extend(true, {}, this.typedDeviceInfo)

    switch (this.orderType) {
      case 'Accessory':
        this.$store.dispatch('placeOrder/getUserPackages', this.$store.state.placeOrder.userId).then(res => {
          if (res.length > 0) {
            this.$store.dispatch('placeOrder/getPackageServices', res[0].id).then(res => {
              this.getAllDevices()
            })
          } else {
            this.$store.dispatch('error/new', { message: 'You don\'t have any pacakges'})
          }
        })
        break
    }
  },

  methods: {
    selectAccessory (accessoryIndex) {
      let temp = $.extend(true, [], this.accessories)

      if (temp[accessoryIndex].status) {
        temp[accessoryIndex].status = 0
      } else {
        temp[accessoryIndex].status = 1
      }

      let activeAccessry = 0
      for (let accessory of temp) {
        if (accessory.status)
          activeAccessry = 1
      }
      this.accessoryStatus = activeAccessry
      this.accessories = temp
    },

    getAllDevices () {
      this.$store.dispatch('placeOrder/getPackagesDevices').then(
        res => {
          this.alignDevicesandModifications(res)
        }
      )
    },

    alignDevicesandModifications (devicevariations) {
      let temp_devices = _.groupBy(devicevariations, 'deviceId')
      let devices_array = []
      let accessories_array = []
      let activeAccessry = 0
      for(let deviceId in temp_devices) {
        let newObj = {
          device: temp_devices[deviceId][0].devices[0],
          variations: _.uniqBy(temp_devices[deviceId], 'id'),
          modifications: {},
          capacity: [],
          style: {}
        }

        if (temp_devices[deviceId][0].devices[0].devicetypes[0].name == 'Accessory') {
          if (this.selectedAccessories.indexOf(newObj.variations[0].id) >= 0) {
            newObj.status = 1
            activeAccessry = 1
          }
          accessories_array.push(newObj)
        } else {
          devices_array.push(newObj)
        }
      }
      this.accessoryStatus = activeAccessry

      for (let device of devices_array) {
        let capacities = []
        for (let variation of device.variations) {
          let newModification = $.extend(true, {}, variation.modifications[DeviceVariationHelper.getCapacityIndex(variation)])
          capacities.push(parseInt(newModification.value))
        }
        capacities = _.uniq(capacities)

        for (let capacity of capacities) {
          device.modifications[capacity] = []
        }

        for (let variation of device.variations) {
          let newModification = $.extend(true, {}, variation.modifications[DeviceVariationHelper.getCapacityIndex(variation)])
          device.modifications[parseInt(newModification.value)].push({
            color: variation.modifications[DeviceVariationHelper.getStyleIndex(variation)].value,
            price: variation.priceRetail,
            id: variation.id
          })
        }

        // Set Pre-selected Device, Capacity, Style
        if (this.selectedDevice) {
          if (device.device.id == this.selectedDevice.id) {
            this.activeDevice = device
            device.capacity = device.modifications[this.selectedCapacity]
            device.style = this.selectedStyle
          } else {
            device.capacity = device.modifications[Object.keys(device.modifications)[0]]
            device.style = device.capacity[0]
          }
        }
      }

      this.devices = devices_array
      this.accessories = accessories_array
      this.device_loading = false
    },

    getImageUrl (object) {
      if (object.hasOwnProperty('images') && object.images.length > 0) {
        return process.env.URL_API + '/images/' + object.images[0].id
      } else {
        return 'http://sandysearch.com/contentimages/noPhotoProvided.gif'
      }
    },

    goOrderPages (value) {
      switch (value) {
        case 'review':
          this.$store.dispatch('placeOrder/setNeedDevice', this.needDevice)
          this.$store.dispatch('placeOrder/setDeviceType', this.deviceType)
          this.$store.dispatch('placeOrder/setDeviceSelected', this.activeDevice.device)

          for (let modificationKey in this.activeDevice.modifications) {
            if (_.isEqual(this.activeDevice.capacity, this.activeDevice.modifications[modificationKey]))
              this.$store.dispatch('placeOrder/setCapacitySelected', modificationKey)
          }
          this.$store.dispatch('placeOrder/setStyleSelected', this.activeDevice.style)
          this.$store.dispatch('placeOrder/setDeviceInfo', this.deviceInfo)

          // Set Accessories
          let activeAccessories = []
          for (let accessory of this.accessories) {
            if (accessory.status)
              activeAccessories.push(accessory.variations[0].id)
          }
          this.$store.dispatch('placeOrder/setAccessoriesSelected', activeAccessories)

          // this.$store.dispatch('placeOrder/setCurrentView', 'order_review')
          this.$router.push({path: '/orders/new/review'})
          break
      }
    }
  },
}

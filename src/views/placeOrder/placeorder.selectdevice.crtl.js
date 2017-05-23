import _ from 'lodash';

import {mapGetters, mapActions} from 'vuex';
import placeOrderWizard from './../../components/placeOrderWizard.vue';

export default {
  name : 'SelectDevice',
  components : {
    placeOrderWizard
  },
  data() {
    return {
      orderType: '',
      needDevice: '',
      deviceType: '',
      devices: [],
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
      allPackages_loading: 'placeOrder/getPackagesLoadingState',
      selectedNeedDevice: 'placeOrder/getSelectedNeedDevice',
      selectedDeviceType: 'placeOrder/getSelectedDeviceType',
      typedDeviceInfo: 'placeOrder/getTypedDeviceInfo',
      selectedDevice: 'placeOrder/getSelectedDevice',
      selectedCapacity: 'placeOrder/getSelectedCapacity',
      selectedStyle: 'placeOrder/getSelectedStyle'
    }),
  },
  created() {
    this.orderType = this.$route.meta.label;

    switch(this.orderType) {
      case 'New':
        this.$store.dispatch('placeOrder/getPackageDevices').then(
          res => {
            this.alignDevicesandModifications(res.devicevariations);
          }
        )
        break;
      case 'Upgrade':
        this.allPackages_loading ? null : this.getAllDevices();
        break;
    }

    this.needDevice = this.selectedNeedDevice;
    this.deviceType = this.selectedDeviceType;
    this.deviceInfo = $.extend(true, {}, this.typedDeviceInfo);
  },
  methods: {
    selectDevice(deviceIndex, capacity, styleIndex) {
      this.activeDevice = this.devices[deviceIndex];

      if(capacity) {
        this.activeDevice.capacity = this.activeDevice.modifications[capacity];
        this.activeDevice.style = this.activeDevice.capacity[0];
      }

      if(styleIndex)
        this.activeDevice.style = this.activeDevice.capacity[styleIndex - 1];
    },
    getAllDevices() {
      this.$store.dispatch('placeOrder/getPackagesDevices').then(
        res => {
          this.alignDevicesandModifications(res);
        }
      )
    },
    alignDevicesandModifications(devicevariations) {
      let temp_devices = _.groupBy(devicevariations, 'deviceId');
      let devices_array = [];
      for(let deviceId in temp_devices) {
        let newObj = {
          device: temp_devices[deviceId][0].devices[0],
          variations: _.uniqBy(temp_devices[deviceId], 'id'),
          modifications: {},
          capacity: '',
          style: ''
        }
        
        devices_array.push(newObj);
      }

      for(let device of devices_array) {
        let capacities = [];
        for(let variation of device.variations) {
          let newModification = $.extend(true, {}, variation.modifications[0])
          capacities.push(parseInt(newModification.value));
        }
        capacities = _.uniq(capacities);

        for(let capacity of capacities)
          device.modifications[capacity] = [];
        
        for(let variation of device.variations) {
          let newModification = $.extend(true, {}, variation.modifications[0])
          device.modifications[parseInt(newModification.value)].push({color: variation.modifications[1].value, price: variation.priceRetail})
        }

        // Set Pre-selected Device, Capacity, Style
        if(device.device.id == this.selectedDevice.id) {
          this.activeDevice = device;
          device.capacity = device.modifications[this.selectedCapacity];
          device.style = this.selectedStyle;
        } else {
          device.capacity = device.modifications[Object.keys(device.modifications)[0]]
          device.style = device.capacity[0];  
        }
      }

      this.devices = devices_array;
      this.device_loading = false;
    },
    goOrderPages(value) {
      switch(value) {
        case 'package':
          this.$store.dispatch('placeOrder/setCurrentView', 'select_package');
          break;
        case 'review':
          // Set Need device
          this.$store.dispatch('placeOrder/setNeedDevice', this.needDevice)

          // Set Device Type
          this.$store.dispatch('placeOrder/setDeviceType', this.deviceType)

          // Set Device, Capacity, Style
          this.$store.dispatch('placeOrder/setDeviceSelected', this.activeDevice.device);
          for(let modificationKey in this.activeDevice.modifications) {
            if(_.isEqual(this.activeDevice.capacity, this.activeDevice.modifications[modificationKey]))
              this.$store.dispatch('placeOrder/setCapacitySelected', modificationKey);    
          }
          this.$store.dispatch('placeOrder/setStyleSelected', this.activeDevice.style);

          // Set Typed DeviceInfo
          this.$store.dispatch('placeOrder/setDeviceInfo', this.deviceInfo);

          this.$store.dispatch('placeOrder/setCurrentView', 'order_review');
          break;
      }
    }
  },
  watch: {
    'allPackages_loading': function(newVal, oldVal) {
      newVal ? null : this.getAllDevices();
    }
  }
}
import {mapGetters, mapActions} from 'vuex';
import placeOrderWizard from './../../components/placeOrderWizard.vue';

export default {
  name : 'SelectDevice',
  components : {
    placeOrderWizard
  },
  data() {
    return {
      needDevice: '',
      deviceType: '',
      devices: [],
      device_loading: true,
      activeDevice: {},
      activeCapacity: "",
      activeStyle: "",
      deviceInfo: {
        IMEI: '',
        Carrier: '',
        Sim: ''
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch('placeOrder/getPackageDevices').then(
      res => {
        this.devices = res.devicevariations;

        // Seperate Capacity and Color & Sort
        for(let device of this.devices) {
          device.capacities = [];
          device.styles = [];

          if(device.devices[0].modifications) {
            for(let modification of device.devices[0].modifications) {
              if(modification.modType == 'capacity') {
                var newModification = $.extend(true, {}, modification);
                newModification.value = parseInt(newModification.value);
                device.capacities.push(newModification);
              } else if(modification.modType == 'style') {
                device.styles.push(modification);
              }
            }

            device.capacities =  _.sortBy(device.capacities, 'value');
            device.styles = _.sortBy(device.styles, 'value');
          }

          if(device.id == this.selectedDevice.id)
            this.activeDevice = device;
        }
        this.device_loading = false;

        this.activeCapacity = this.selectedCapacity;
        this.activeStyle = this.selectedStyle;
      }
    )
  },
  computed: {
    ...mapGetters({
      selectedNeedDevice: 'placeOrder/getSelectedNeedDevice',
      selectedDeviceType: 'placeOrder/getSelectedDeviceType',
      typedDeviceInfo: 'placeOrder/getTypedDeviceInfo',
      selectedDevice: 'placeOrder/getSelectedDevice',
      selectedCapacity: 'placeOrder/getSelectedCapacity',
      selectedStyle: 'placeOrder/getSelectedStyle'
    }),
  },
  created() {
    this.needDevice = this.selectedNeedDevice;
    this.deviceType = this.selectedDeviceType;
    this.deviceInfo = $.extend(true, {}, this.typedDeviceInfo);
  },
  methods: {
    selectDevice(deviceIndex, capacityIndex, styleIndex) {
      this.activeDevice.id == this.devices[deviceIndex].id ? null : this.$set(this, 'activeDevice', this.devices[deviceIndex]);
      
      if(capacityIndex) {
        this.activeCapacity = '';
        if(this.activeDevice.capacities.length) {
          this.activeCapacity = this.activeDevice.capacities[capacityIndex - 1].id;
        }
      }

      if(styleIndex) {
        this.activeStyle = '';
        if(this.activeDevice.styles.length) {
          this.activeStyle = this.activeDevice.styles[styleIndex - 1].id;
        }
      }

      this.$store.dispatch('placeOrder/setDeviceSelected', this.activeDevice);
      this.$store.dispatch('placeOrder/setCapacitySelected', this.activeCapacity);
      this.$store.dispatch('placeOrder/setStyleSelected', this.activeStyle);
    },
    setDeviceInfo() {
      this.$store.dispatch('placeOrder/setDeviceInfo', this.deviceInfo);
    },
    goOrderPages(value) {
      switch(value) {
        case 'package':
          this.$store.dispatch('placeOrder/setCurrentView', 'selectpackage');
          break;
        case 'review':
          this.$store.dispatch('placeOrder/setCurrentView', 'review');
          break;
      }
    }
  },
  watch: {
    'needDevice': function(newVal, oldVal) {
      this.$store.dispatch('placeOrder/setNeedDevice', newVal)
    },
    'deviceType': function(newVal, oldVal) {
      this.$store.dispatch('placeOrder/setDeviceType', newVal)
    }
  }
}
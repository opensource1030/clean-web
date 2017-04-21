import { mapGetters, mapActions } from 'vuex'
import multiselect from 'vue-multiselect'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name : 'package',
  components: {
    multiselect,
    Carousel,
    Slide
  },
  data () {
    return {
      status: 'new',
      onePackage: {
        name: ''
      },
      presetLoading: true,
      carrierLoading: true,
      activePreset: {},
      activeCarrier: {},
      activeService: {},
      activeAddress: {},
      conditions: {
        selected: [{
          nameCond: '',
          condition: '',
          value: '',
          conditionOptions: [],
          valueOptions: []
        }],
        availableConditions: [],
        labels: [],
        loading: true
      },
      devices: {
        selected: [],
        availableDevices: [],
        loading: false
      },
      services: {
        selected: [],
        availableServices: [],
        loading: false
      },
      addresses: {
        selected: [],
        availableAddresses: [],
        loading: true
      }
    }
  },
  beforeCreate() {
    if (this.$route.params.id != null) {
      this.$set(this, 'status', 'manage');
    } else {
      this.$set(this, 'status', 'new');
      this.$store.dispatch('packages/getCompanyInfo').then(
        res => {
          // Conditions Mapping
          for(let condition of res.udls) {
            var newCondition = {
              nameCond: condition.name,
              values: []
            };

            switch(condition.inputType) {
              case 'string':
                newCondition.options = ['contains', 'equal', 'not equal'];
                break;
              case 'number':
                newCondition.options = ['greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'];
                break;
              case 'boolean':
                newCondition.options = ['equal'];
                break;
            }

            for(let section of condition.sections) {
              newCondition.values.push(section.name);
            }

            this.conditions.availableConditions.push(newCondition);
            this.conditions.labels.push(condition.name);
          }
          this.conditions.loading = false;

          // Address Mapping
          this.addresses.availableAddresses = res.address;
          this.addresses.loading = false;

          this.$store.dispatch('packages/getPresets').then(
            res => {
              this.presetLoading = false;
              this.$store.dispatch('packages/getCarriers').then(
                res => {
                  this.carrierLoading = false;
                }
              )
            }
          )
        }
      )
    }
  },
  computed: {
    _ () {
      return _
    },

    ...mapGetters({
      presets: 'packages/allPresets',
      carriers: 'packages/allCarriers'
    }),
  },
  methods : {
    // CONDITION METHODS
    updateConditionFields(label, index) {
      for(let condition of this.conditions.availableConditions) {
        if(condition.nameCond == label) {
          this.conditions.selected[index].conditionOptions = condition.options;
          this.conditions.selected[index].valueOptions = condition.values;
        }
      }
    },
    deleteCondition(index) {
      this.conditions.selected.splice(index, 1);

      if(this.conditions.selected.length == 0)
        this.conditions.selected.push({ nameCond: '', condition: '', value: '', conditionOptions: [], valueOptions: [] });
    },
    addCondition(index) {
      this.conditions.selected.push({ nameCond: '', condition: '', value: '', conditionOptions: [], valueOptions: [] });
    },

    setActive(label, data) {
      if(this[label] && this[label].id == data.id)
        this.$set(this, label, {});
      else {
        this.$set(this, label, data);
        switch(label) {
          case 'activePreset':
            this.devices.loading = true;
            this.$store.dispatch('packages/getDevicesPerPreset', this.activePreset.id).then(
              res => {
                this.devices.availableDevices = [];

                for(let newDevice of res) {
                  let exist = 0;
                  for(let device of this.devices.selected) {
                    if(newDevice.id == device.id)
                      exist = 1;
                  }

                  exist ? null : this.devices.availableDevices.push(newDevice);
                }

                this.devices.loading = false;
              }
            );
            break;
          case 'activeCarrier':
            this.services.loading = true;

            this.$store.dispatch('packages/getServicesPerCarrier', this.activeCarrier.id).then(
              res => {
                this.services.availableServices = [];

                for(let newService of res) {
                  let exist = 0;
                  for(let service of this.services.selected) {
                    if(newService.id == service.id)
                      exist = 1;
                  }

                  exist ? null : this.services.availableServices.push(newService);
                }

                this.services.loading = false;
              }
            );
            break;
          default:
            break;
        }
      }
    },

    // DEVICES METHODS
    addDevice(index) {
      this.devices.selected.push(this.devices.availableDevices[index]);
      this.devices.availableDevices.splice(index, 1);
    },

    removeDevice(index) {
      this.devices.availableDevices.push(this.devices.selected[index]);
      this.devices.selected.splice(index, 1);
    },

    // CARRIERS METHODS
    addService() {
      this.activeService.status = 1;
      this.services.selected.push(this.activeService);
      for(let i=this.services.availableServices.length - 1; i>=0; i--) {
        if(this.services.availableServices[i].id == this.activeService.id)
          this.services.availableServices.splice(i, 1);
      }
      this.activeService = {};
    },

    removeService() {
      this.activeService.status = 0;
      this.services.availableServices.push(this.activeService);
      for(let i=this.services.selected.length - 1; i>=0; i--) {
        if(this.services.selected[i].id == this.activeService.id)
          this.services.selected.splice(i, 1);
      }
      this.activeService = {};
    },

    // ADDRESS METHODS
    addAddress() {
      this.activeAddress.status = 1;
      this.addresses.selected.push(this.activeAddress);
      for(let i=this.addresses.availableAddresses.length - 1; i>=0; i--) {
        if(this.addresses.availableAddresses[i].id == this.activeAddress.id)
          this.addresses.availableAddresses.splice(i, 1);
      }
      this.activeAddress = {};
    },

    removeAddress() {
      this.activeAddress.status = 0;
      this.addresses.availableAddresses.push(this.activeAddress);
      for(let i=this.addresses.selected.length - 1; i>=0; i--) {
        if(this.addresses.selected[i].id == this.activeAddress.id)
          this.addresses.selected.splice(i, 1);
      }
      this.activeAddress = {};
    }
  }
}

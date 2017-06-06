import modal from './../../components/modal.vue'
import { mapGetters, mapActions } from 'vuex'
import multiselect from 'vue-multiselect'
import { Carousel, Slide } from 'vue-carousel'
import swal from 'sweetalert2'

export default {
  name : 'package',
  components: {
    modal,
    multiselect,
    Carousel,
    Slide
  },
  data () {
    return {
      packageId: 0,
      packageData: {},
      packageName: '',
      packageDescription: '',
      packageCode: '',
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
  created() {
    if (this.$route.params.id) {
      this.packageId = this.$route.params.id;
      this.$store.dispatch('packages/getOne', this.packageId).then(
        res => {
          this.packageData = res;
          this.packageName = res.name;
          this.packageDescription = res.information;
          this.packageCode = res.approvalCode;
          this.getNecessaryData();
        }
      )
    } else {
      this.getNecessaryData();
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
    getNecessaryData() {
      this.$store.dispatch('packages/getCompanyInfo').then(
        res => {
          // console.log('packages/getCompanyInfo', res)
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
              default:
                newCondition.options = ['contains', 'greater than', 'greater or equal', 'less than', 'less or equal', 'equal', 'not equal'];
                break;
            }

            for(let uv of condition.udlvalues) {
              newCondition.values.push(uv.udlValue);
            }

            this.conditions.availableConditions.push(newCondition);
            this.conditions.labels.push(condition.name);
          }
          this.conditions.loading = false;

          // Address Mapping
          this.addresses.availableAddresses = res.addresses;
          this.addresses.loading = false;

          this.$store.dispatch('packages/getPresets').then(
            res => {
              this.presetLoading = false;
              this.$store.dispatch('packages/getCarriers').then(
                res => {
                  this.carrierLoading = false;
                  
                  // Prepare Data if packageId is existing
                  if(this.packageId) {
                    // Set Conditions
                    for(let condition of this.packageData.conditions) {
                      this.conditions.selected.splice(this.conditions.selected.length - 1, 0, {nameCond: condition.nameCond, condition: condition.condition, value: condition.value, id: condition.id});
                      this.updateConditionFields(condition.nameCond, this.conditions.selected.length - 2);
                    }

                    // Set Devices
                    for(let device of this.packageData.devicevariations)
                      this.devices.selected.push(device);

                    // Set Presets
                    for(let service of this.packageData.services) {
                      service.added = 1;
                      this.services.selected.push(service);
                    }
                      
                    // Set Addresses
                    for(let address of this.packageData.addresses) {
                      address.added = 1;
                      this.addresses.selected.push(address);

                      for(let i = this.addresses.availableAddresses.length - 1; i >= 0; i--) {
                        if(this.addresses.availableAddresses[i].id == address.id)
                          this.addresses.availableAddresses.splice(i, 1);
                      }
                    }
                  }
                }
              )
            }
          )
        }
      )
    },

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
      this.activeService.added = 1;
      this.services.selected.push(this.activeService);
      for(let i=this.services.availableServices.length - 1; i>=0; i--) {
        if(this.services.availableServices[i].id == this.activeService.id)
          this.services.availableServices.splice(i, 1);
      }
      this.activeService = {};
    },

    removeService() {
      this.activeService.added = 0;
      this.services.availableServices.push(this.activeService);
      for(let i=this.services.selected.length - 1; i>=0; i--) {
        if(this.services.selected[i].id == this.activeService.id)
          this.services.selected.splice(i, 1);
      }
      this.activeService = {};
    },

    // ADDRESS METHODS
    addAddress() {
      this.activeAddress.added = 1;
      this.addresses.selected.push(this.activeAddress);
      for(let i=this.addresses.availableAddresses.length - 1; i>=0; i--) {
        if(this.addresses.availableAddresses[i].id == this.activeAddress.id)
          this.addresses.availableAddresses.splice(i, 1);
      }
      this.activeAddress = {};
    },

    removeAddress() {
      this.activeAddress.added = 0;
      this.addresses.availableAddresses.push(this.activeAddress);
      for(let i=this.addresses.selected.length - 1; i>=0; i--) {
        if(this.addresses.selected[i].id == this.activeAddress.id)
          this.addresses.selected.splice(i, 1);
      }
      this.activeAddress = {};
    },

    // DEVICE IMAGE
    getImageUrl(object) {
      if (object.hasOwnProperty('images')) {
        if (object.images.length > 0) {
          return process.env.URL_API + '/images/' + object.images[0].id;
        }      
      } else {
        return 'http://openclipart.org/download/213897/black-android-phone.svg';
      }
    },

    // Update or Create Package
    savePackage() {
      this.packageData = {
        type: 'packages',
        id: this.packageId,
        attributes: {
          name: this.packageName,
          information: this.packageDescription,
          approvalCode: this.packageCode
        },
        relationships: {
          conditions: { data: [] },
          services: { data: [] },
          devicevariations: { data: [] },
          addresses: { data: [] }
        }
      };

      for(let condition of this.conditions.selected) {
        if(condition.nameCond) {
          var id = 0;
          condition.id ? id = condition.id : null;
          this.packageData.relationships.conditions.data.push({type: "conditions", id: parseInt(id), nameCond: condition.nameCond, condition: condition.condition, value: condition.value});
        }
      }

      for(let device of this.devices.selected) {
        this.packageData.relationships.devicevariations.data.push({type: "devicevariations", id: parseInt(device.id)});
      }

      for(let service of this.services.selected) {
        this.packageData.relationships.services.data.push({type: "services", id: parseInt(service.id)});
      }

      for(let address of this.addresses.selected) {
        this.packageData.relationships.addresses.data.push({type: 'addresses', id: parseInt(address.id)});
      }

      if(this.packageName) {
        if(this.packageId) {
          this.$store.dispatch('packages/updatePackage', this.packageData).then(
            res => {
              swal(
                'Updated!',
                'Requested Package is updated.',
                'success'
              ).then(
                this.$router.push({path: '/packages'})
              )

            }
          )
        } else {
          this.$store.dispatch('packages/createPackage', this.packageData).then(
            res => {
              swal(
                'Created!',
                'Requested Package is created.',
                'success'
              ).then(
                this.$router.push({path: '/packages'})
              )

            }
          )
        }  
      }
    }
  }
}

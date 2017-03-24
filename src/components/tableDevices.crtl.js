import Vue from 'vue';
import Pagination from './pagination';
import Multiselect from './Multiselect.vue';
import {filterByModificationsd, filterByModifications, filterByCarrier, orderFilters} from './filters.js';
import devices from './../api/device/devices';
import Filter from './../api/filtersApi';
import main from './eventHandle'

export default {
  props: {
    id:{
        default: null
    },
      callback: {
          Type: Function,
      }
  },

    components: {
        Pagination,
        Multiselect,
  },

    data() {
        return {
            active: 0,
            devices: [],
            error: '',
            pagination: {
                current_page: 1,
                total_pages: null,
                count: null,
                total: null,
                per_page: 25
            },
            search: {
                costmax: 0,
                costMin: 0,
                searchShow: true,
                costFilterMessage: ''
            },
            filter: {
                make: [],
                price: [],
                modifications: [],
                carriers: [],
                deviceType: []
            },
            type: [],
            manufactured: [],
            carrier: [],
            capacity: [],
            style: [],
            price: [],

            loading: true,
            loadtable: false,
            variations: [],
        }
  },

  beforeCreate() {
    Filter.getCarriers(this);
    Filter.getModifications(this);
    Filter.getDeviceTypes(this);
  },

    methods: {
    filterByModificationsd,
    filterByModifications,
        filterByCarrier,
    orderFilters,

    loadData() {
      devices.getDevices(this, this.pagination.current_page);
    },

    updateSelected(newSelected) {
      this.selected = newSelected
    },

        searchCost() {
            if (this.search.costMin <= this.search.costMax) {
                this.search.errorCost = false;
                this.search.searchShow = false;
                if (this.search.costMin != 0 || this.search.costMax != 0) {
                    this.search.costFilterMessage = this.search.costMin + ' > ' + this.search.costMax;
        } else {
                    this.search.costFilterMessage = '';
        }

                this.onSelectColumn();
            } else {
                this.search.errorCost = true;
            }
    },

    setActive(index) {
      this.active = index;
      //  console.log(this.devices[index]);
      this.devices[this.active].hide = !this.devices[this.active].hide;
      if (this.devices[this.active].show == true) {
        this.devices[this.active].show = false;
      } else {
        for (var i = 0; i < this.devices.length; i++) {
          if (this.devices[this.active] == this.devices[i]) {
            this.devices[this.active].show = true;
          } else {
            this.devices[i].show = false;
          }
        }
      }
    },

    onSelectColumn() {
      devices.getDevices(this, this.pagination.current_page);
    },

        vDeviceVariations() {
            this.variations = [];
      if (this.devices!=null && this.devices.length!=0) {
          for (let device of this.devices) {
              if (device.priceName.length != 0 && device.priceName != null) {
                  for (let price of device.priceName) {
                      if (price.check == true) {
                          this.variations.push(price)
                      }
                  }
              }
          }

          let i = 0;
          for (let v of this.variations) {
              if (v.checks == null) {
                  v.checks = false;
              }
              if (v.check == false) {
                  this.variations.splice(i, 1);
              }
              i++;
          }

          main.eventHub.$emit('addvariatons', this.variations)
      }
    },

        errors(){
            main.eventHub.$emit('error', this.error)
    }
  },
}
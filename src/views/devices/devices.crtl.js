import Vue from 'vue';
import Pagination from './../../components/pagination';
import Multiselect from './../../components/Multiselect.vue';
import {filterByModificationsd, filterByModifications, filterByCarrier} from './../../components/filters.js';
import devices from './../../api/device/devices';
import modal from './../../components/modal.vue';

export default {

  components : {
    pagination: Pagination,
    modal:modal,
    Multiselect:Multiselect
  },
  beforeCreate() {

    devices.getDevice(this);

  },

  methods : {
    filterByModificationsd,
    filterByModifications,

    loadData() {
      devices.getDevices(this, this.pagination.current_page);

    },
    updateSelected (newSelected) {
     this.selected = newSelected
   },
    filterByCarrier,

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
  },
  data() {
    return {
      active: 0,
      devices: [],
      filterModifications: [],
      filterDeviceType: [],
      filterPrices: [],
      pagination: {
        current_page: 1,
        total_pages: null,
        count: null,
        total: null,
        per_page: 25
      },
      filter:{
        devices:[],
        modifications:[],
        carriers:[],
        deviceType:[],
      },
      filterCarriers: [],
      type: [],
      manufactured: [],
      carrier: [],
      capacity: [],
      style: [],
      price: [],
      loading: true,
      loadtable: false,
      error:'',
      showModal:false


    };
  }
};

import Vue from 'vue';
import Pagination from './../../components/pagination';
import Multiselect from './../../components/Multiselect.vue';
import {filterByModificationsd, filterByModifications, filterByCarrier,orderFilters} from './../../components/filters.js';
import devices from './../../api/device/devices';
import modal from './../../components/modal.vue';
import Filter from './../../api/filtersApi';
export default {

  components : {
    pagination: Pagination,
    modal:modal,
    Multiselect:Multiselect
  },
  beforeCreate() {
    Filter.getCarriers(this);
    Filter.getModifications(this);
    Filter.getDeviceTypes(this);
  },

  methods : {
    filterByModificationsd,
    filterByModifications,
    orderFilters,

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
      pagination: {
        current_page: 1,
        total_pages: null,
        count: null,
        total: null,
        per_page: 25
      },
      filter:{
        make:[],
        price:[],
        modifications:[],
        carriers:[],
        deviceType:[],
      },
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

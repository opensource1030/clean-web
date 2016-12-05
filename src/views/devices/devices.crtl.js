import Vue from 'vue';
import Pagination from './../../components/pagination';
import {filterByModificationsd, filterByModifications, filterByCarrier} from './../../components/filters.js';
import devices from './../../api/device/devices';

export default {

  components : {
    pagination: Pagination
  },
  created() {
    /*  bus.$on('#devices-table', function(page) {*/

    /*});*/
    devices.getDevice(this);

  },

  methods : {
    filterByModificationsd,
    filterByModifications,

    loadData() {
      devices.getDevices(this, this.pagination.current_page);

    },

    filterByCarrier,

    setActive: function(index) {
      this.active = index;
      console.log(this.devices[index]);
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
    }
  },
  data() {
    return {
      active: 0,
      devices: [],
      filterModifications: [],
      filterDeviceType: [],
      filterPrice: [],
      pagination: {
        current_page: 1,
        total_pages: null,
        count: null,
        total: null,
        per_page: 25
      },
      filterCarriers: [],
      type: '',
      manufactured: '',
      os: '',
      carrier: '',
      capacity: '',
      style: '',
      price: '',
      loading: true,
      loadtable: false

    };
  }
};

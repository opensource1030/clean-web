
import Vue from 'vue';
import Pagination from './../../components/pagination';
import {
  filterByModificationsd,
  filterByModifications,
  filterByCarrier,
  findByService
} from './../../components/filters.js';
import services from './../../api/service/services';

export default {
  name:'Services',

  components: {
    pagination: Pagination,
  },
  created() {
    /*  bus.$on('#services-table', function(page) {*/

    /*});*/
  //  services.getDevice(this);

  },

  methods: {
    filterByModificationsd,
    filterByModifications,
    findByService,

    loadData() {
      services.getServices(this, this.pagination.current_page);

    },

    filterByCarrier,

    setActive: function (index) {
      this.active = index;
      this.services[this.active].hide = !this.services[this.active].hide;
      if (this.services[this.active].show == true) {
        this.services[this.active].show = false;
      } else {
        this.services[this.active].show =true;

        for (var i = 0; i < this.services.length; i++) {
          if (this.services[this.active].id != this.services[i].id) {
            this.services[i].show = false;

          }
        }
      }
    },
  },
  data() {
    return {
      active: 0,
      services: [],
      filterStatus: [],
      filterPlans: [],
      filterCodePlan: [],
      filterCarriers:[],
      filterCost:[],
      pagination: {
        current_page: 1,
        total_pages: null,
        count: null,
        total: null,
        per_page: 25,
      },
      status: '',
      plans: '',
      codePlan: '',
      carriers: '',
      cost: '',
      details:'',
      carrier:'',
      loading: true,
      showtable:false


    };
  },

};
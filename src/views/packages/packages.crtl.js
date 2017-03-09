import Vue from 'vue';
import pagination from './../../components/pagination';
import {orderFilters} from './../../components/filters.js';
import packages from './../../api/packages/packages';
import modal from './../../components/modal.vue';
import Multiselect from './../../components/Multiselect.vue';
import searchCost from './../../components/searchCost.vue';
import Inputfilter from './../../components/inputFilter.vue';

export default {
  components : {
    pagination,
    modal,
    Inputfilter : Inputfilter,
    searchCost
  },
  beforeCreate() {

  },
  computed: {
    getTheEmployeesThatAccomplishesTheConditions: function() {
      return '423 Employees';
    },
    getTheConditions: function() {
      let text = '';
      for (let cond of this.packagesList[this.active].conditions) {
        let aux = '';
        if (cond.condition == 'contains') {
          aux = cond.nameCond + ' ' + cond.condition + ' "' + cond.value + '"';
        } else {
          aux = cond.nameCond + ' ' + cond.condition + ' ' + cond.value;
        }

        if (text == '') {
          text = aux;
        } else {
          text = text + ', ' + aux;
        }
      }

      if (text.length > 100) {
        text = text.slice(0, 100);
      }

      if (text == '') {
        return 'All users are allowed.';
      }
      return text + ' ...';
    },
    getTheServices: function() {
      let text = '';
      for (let serv of this.packagesList[this.active].services) {
        if (text == '') {
          text = serv.title;
        } else {
          text = text + ', ' + serv.title;
        }
      }

      if (text.length > 100) {
        text = text.slice(0, 100);
      }

      if (text == '') {
        return 'No Services Provided.';
      }
      return text + ' ...';
    },
    getTheDevices: function() {
      let text = '';
      let i = 5;
      for (let dv of this.packagesList[this.active].devicevariations) {
        if (text == '') {
          text = dv.devices[0].name;
        } else {
          text = text + ', ' + dv.devices[0].name;
        }
      }

      if (text.length > 100) {
        text = text.slice(0, 100);
      }

      if (text == '') {
        return 'No Devices Provided.';
      }
      return text + ' ...';
    }
  },
  methods : {
    orderFilters,
    loadData() {
      packages.getPackagesPage(this, 1);
    },
    setActive: function(index) {
      if(this.active == index) {
        this.packagesList[index].show = !this.packagesList[index].show;
      } else {
        this.packagesList[this.active].show = false;
        this.packagesList[index].show = true;
        this.packageSelected = this.packagesList[index];
      }
      this.active = index;
    },
    onSelectValue: function() {
      this.nameShow = '';
      for (let names of this.values.name) {
        if (this.nameShow == '') {
          this.nameShow = name;
        } else {
          this.nameShow = this.nameShow + ', ' + name;
        }
      }
      packages.getPackagesPage(this, 1);
    },
    setActiveCostOptions: function() {
      this.search.searchShow = !this.search.searchShow;
    },
    orderBy: function(type) {
      if (type == 'once') {
        this.packagesList = this.orderFilters(this.packagesList, 'valuesOnce.max', 'number', this.order.orderOnce);
        if (this.order.orderOnce == 'Asc') {
          this.order.orderOnce = 'Desc';
        } else {
          this.order.orderOnce = 'Asc';
        }
        this.order.showOrderOnce = true;
        this.order.showOrderMonth = false;
      } else if (type == 'month') {
        this.packagesList = this.orderFilters(this.packagesList, 'valuesMonth.max', 'number', this.order.orderMonth);
        if (this.order.orderMonth == 'Asc') {
          this.order.orderMonth = 'Desc';
        } else {
          this.order.orderMonth = 'Asc';
        }
        this.order.showOrderOnce = false;
        this.order.showOrderMonth = true;
      } else {
        // NOTHING
      }

    },
    showInputFilter() {
      this.showInput = !this.showInput;
    }

  },
  data() {
    return {
      active: 0,
      firstTime: true,
      loading: true,
      showtable: false,
      errorNotFound:false,
      showInput: false,
      // Packages List
      packages: [], // Packages for Filters
      packagesList: [],
      packageSelected: {},
      // Information Needed for the Selects
      nameList: [],
      pricesOnce: [],
      pricesMonth: [],
      details: [],
      // Pagination
      pagination: {
        current_page: 1,
        total_pages: null,
        count: null,
        total: null,
        per_page: 25
      },
      values: {
        name: [], // package.name
        nameShow: '',
        once: '', // devicevariations - price once
        month: '', // services - price month
        details: '',
      },
      order: {
        orderOnce: 'Asc',
        orderMonth: 'Asc',
        showOrderOnce: false,
        showOrderMonth: false,
      },
      names: {
        packagePlans: 'Package Plans',
        addPackage: 'Add Package',
        manage: 'Manage',
        name: 'Name',
        priceOnce: 'Once',
        priceMonth: 'Month',
        details: 'Details',
        manageButton: 'Manage',
        noPackageFound: 'No Packages provided. Please, click on "Add Plan" button to create the first service plan or reset the Search.'
      },
      search: {
        firstTime: true,
      }
    }
  }
}

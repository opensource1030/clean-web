import Vue from 'vue';
import paginate from './../../components/paginate';
import {findServiceItem, orderFilters} from './../../components/filters.js';
import services from './../../api/service/services';
import modal from './../../components/modal.vue';
import multiselect from 'vue-multiselect';
import searchCost from './../../components/searchCost.vue';
import {mapGetters, mapActions} from 'vuex'

export default {
  created() {
    this.$store.dispatch('services/getAll', {
      costMax: this.search.costMax,
      costMin: this.search.costMin,
      values: this.values
    })
    this.$store.dispatch('carrier/search')
  },
  computed : {
    ...mapGetters({Service: 'services/getService', select: 'services/getSelects', carriers: 'carrier/sorted', pagination: 'services/getPagination'})
  },
  components : {
    paginate,
    modal,
    multiselect,
    searchCost
  },
  methods : {
    findServiceItem,
    orderFilters,
    ...mapActions(['carrier/search', 'services/getAll']),
    setActive(service) {
      if (this.activeService && this.activeService.id == service.id) {
        this.$set(this, 'activeService', null)
      } else {
        this.$set(this, 'activeService', service)
      }
    },
    prevPage(){
        this.$store.dispatch('services/prevPage')
     },
      nextPage(){
            this.$store.dispatch('services/nextPage')
      },
    /*  showAddons: function() {
            this.Service.addonsShow = !this.Service.addonsShow;
        },*/
    onSelectColumn: function() {

      this.$store.dispatch('services/getAll', {
        costMax: this.search.costMax,
        costMin: this.search.costMin,
        values: this.values
      })
    },
    setActiveCostOptions: function() {
      this.search.searchShow = !this.search.searchShow;
    }
  },
  data() {
    return {
      activeService: null,
      // Selected Values
      values: {
        status: '',
        plans: '', // service.title
        details: '', // service.descriptions
        codePlan: '', // service.codePlan
        carrier: [], // carriers.presentation
        cost: '', // service.cost
      },

      names: {
        servicePlans: 'Service Plans',
        addPlan: 'Add Plan',
        status: 'Status',
        plans: 'Plans',
        details: 'Details',
        planCode: 'Plan Code',
        carrier: 'Carrier',
        cost: 'Cost',
        domMinutes: 'Minutes',
        domMinutesMessage: ' Domestic Minutes',
        domData: 'Data',
        domDataMessage: 'Domestic Data',
        domSms: 'SMS',
        domSmsMessage: 'Domestic SMS',
        intMinutes: 'International Minutes',
        intMinutesMessage: 'International Minutes',
        intData: 'International Data',
        intDataMessage: 'International Data',
        intSms: 'International SMS',
        intSmsMessage: 'International SMS',
        managePlanButton: 'Manage Plan',
        noServiceFound: 'No Services provided. Please, click on "Add Plan" button to create the first service plan or reset the Search.'
      },
      search: {
        firstTime: true,
        searchFilter: false,
        costFilterMessage: '',
        searchShow: false,
        costMax: 0,
        costMin: 0
      },
    }
  }
}

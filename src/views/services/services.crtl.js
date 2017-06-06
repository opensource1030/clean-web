import Vue from 'vue'
import _ from 'lodash'
import swal from 'sweetalert2'
import multiselect from 'vue-multiselect'
import modal from './../../components/modal.vue'
import paginate from './../../components/paginate'
import searchCost from './../../components/searchCost.vue'
import {mapGetters, mapActions} from 'vuex'
import serviceAPI from './../../api/service-api'
import services from './../../api/service/services'
import {findServiceItem, findByAddons, orderFilters} from './../../components/filters.js'
import { ServicesPresenter } from './../../presenters'

export default {
  components : {
    paginate,
    modal,
    multiselect,
    searchCost
  },

  data() {
    return {
      activeService: null,
      // Selected Values

      names: {
        actions:'Actions',
        servicePlans: 'Service Plans',
        addPlan: 'New Service',
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
  },

  computed : {
    ...mapGetters({
      Service: 'services/getService',
      select: 'services/getSelects',
      carriers: 'carrier/sorted',
      pagination: 'services/getPagination'
    })
  },

  created() {
    this.$store.dispatch('services/getAll', {
      costMax: this.search.costMax,
      costMin: this.search.costMin,
    })
    this.$store.dispatch('carrier/search')
  },

  methods : {
    findServiceItem,
    findByAddons,
    orderFilters,
    ...mapActions([
      'carrier/search',
      'services/getAll'
    ]),

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

    setActiveCostOptions: function() {
      this.search.searchShow = !this.search.searchShow;
    },

    removeService (id) {
      const vm = this
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        serviceAPI.remove(id, res => {
          vm.$store.dispatch('services/getAll')
          // vm.$store.dispatch('services/getAll', {
          //   costMax: vm.search.costMax,
          //   costMin: vm.search.costMin,
          // })
        }, err => console.log('company remove', err))

        swal('Deleted!', 'Requested service has been deleted.', 'success')
      }, function (dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {
          swal('Cancelled', 'Selected service is safe :)', 'error')
        }
      });
    },

    onServiceActiveChange (e, srv) {
      // console.log(e)
      let service = _.extend({}, srv)
      let isChecked = e.target.checked;
      service.status = isChecked ? 'Enabled' : 'Disabled'
      let _jsonData = ServicesPresenter.toJSON(service)
      delete _jsonData['data']['attributes']['carriers']
      delete _jsonData['data']['attributes']['serviceitems']
      delete _jsonData['data']['attributes']['created_at']
      delete _jsonData['data']['attributes']['updated_at']
      let _params = JSON.stringify(_jsonData)
      // console.log('onServiceActiveChange', _params)

      serviceAPI.update(service.id, _params, res => {
        this.$store.dispatch('services/getAll')
      }, err => console.log('service err', err))
    },

    asyncFindStatus(query){
      // this.$store.dispatch('services/searchDeviceType',{query:query})
    },

    asyncFindDetails(query){
      //this.$store.dispatch('services/searchManufactures',{query:query})
    },

    asyncFindCodePlan(query){
      // this.$store.dispatch('services/searchPrice',{query:query})
    },

    asyncFindCarriers(query){
      this.$store.dispatch('carrier/searchByPresentation',{query:query})
    },

    asyncFindPlans(query){
      // this.$store.dispatch('services/searchModification',{query:query})
    },
  },
}

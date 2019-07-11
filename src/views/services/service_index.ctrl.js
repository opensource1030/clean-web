import {mapGetters, mapActions} from 'vuex'
import { Switch as cSwitch } from '@coreui/vue'
import { findServiceItem, findByAddons, orderFilters } from './../../components/filters.js';
import serviceAPI from './../../api/service-api'
import { ServicesPresenter } from './../../presenters'

export default {

  name: 'ServiceIndex',

  components: {
    cSwitch
  },

  data() {
    return {
      isLoading: true,
      activeService: null,
      search: {
        firstTime: true,
        searchFilter: false,
        costFilterMessage: '',
        searchShow: false,
        costMax: 0,
        costMin: 0
      },
      //Table Fields
      fields: [
        { key: 'show_details', label: '' },
        { key: 'status' },
        { key: 'plans' },
        { key: 'details' },
        { key: 'plan_code' },
        { key: 'carrier' },
        { key: 'cost' },
        { key: 'actions' }
      ]
    }
  },

  computed: {
    ...mapGetters({
      Service: 'services/getService',
      select: 'services/getSelects',
      carriers: 'carrier/sorted',
      pagination: 'services/getPagination'
    })
  },

  created() {
    this.isLoading = true;

    this.$store.dispatch('services/getAll', {
      costMax: this.search.costMax,
      costMin: this.search.costMin,
    })

    this.$store.dispatch('carrier/search').then((res) => {
      this.isLoading = false;
    }, (err) => {
      console.log('error in carrier/search', err);
      this.isLoading = false;
    })
  },

  methods : {
    findServiceItem,
    findByAddons,
    orderFilters,
    ...mapActions([
      'carrier/search',
      'services/getAll'
    ]),

    showDetails(row) {
      for (let service of this.Service.servicesList) {
        service._showDetails = false
      }

      if (this.activeService && this.activeService.id == row.id) {
        row._showDetails = false
        this.$set(this, 'activeService', null)
      } else {
        row._showDetails = true
        this.$set(this, 'activeService', row)
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
      let service = _.extend({}, srv)
      let isChecked = e;
      service.status = isChecked ? 'Enabled' : 'Disabled'
      let _jsonData = ServicesPresenter.toJSON(service)
      delete _jsonData['data']['attributes']['carriers']
      delete _jsonData['data']['attributes']['serviceitems']
      delete _jsonData['data']['attributes']['created_at']
      delete _jsonData['data']['attributes']['updated_at']
      let _params = JSON.stringify(_jsonData)

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
    }
  }
}

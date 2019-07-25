import {mapGetters, mapActions} from 'vuex'
import serviceAPI from '@/api/service-api'
import { findServiceItem, findByAddons, orderFilters } from '@/components/filters.js';
import { ServicesPresenter } from '@/presenters'
import { Switch as cSwitch } from '@coreui/vue'
import Pagination from '@/components/pagination'

export default {

  name: 'ServiceIndex',

  components: {
    cSwitch,
    Pagination
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
        { key: 'expand',    thClass:'th-width__3', label: '' },
        { key: 'status',    thClass: 'th-width__6' },
        { key: 'plans',     thClass: 'th-width__20'},
        { key: 'details',   thClass: 'th-width__30' },
        { key: 'plan_code', thClass: 'th-width__12' },
        { key: 'carrier',   thClass: 'th-width__10' },
        { key: 'cost',      thClass: 'th-width__10', sortable: true },
        { key: 'actions',   thClass: 'th-width__12' }
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
      vm.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (!result.dismiss && result.value) {
          serviceAPI.remove(id, res => {
            vm.$store.dispatch('services/getAll', {
              costMax: vm.search.costMax,
              costMin: vm.search.costMin,
            })
          }, err => console.log('service remove', err))
          vm.$swal('Deleted!', 'Requested service has been deleted.', 'success')
        } else {
          vm.$swal('Cancelled', 'Selected service is safe :)', 'error')
        }
      })
    },

    onServiceActiveChange (e, srv) {
      if( e === srv.status)
        return

      let service = _.extend({}, srv)
      let isChecked = e;
      service.status = isChecked ? 'Enabled' : 'Disabled'
      let _jsonData = ServicesPresenter.toJSON(service)

      let _params = JSON.stringify(_jsonData)

      serviceAPI.update(service.id, _params, res => {
        this.$store.dispatch('services/getAll')
      }, err => console.log('service err', err))
    }
  }
}

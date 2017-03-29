import tables from './../../components/tableDevices.vue'
// import main from './../../components/eventHandle'
import modal from './../../components/modal.vue'
// import pagination from './../../components/pagination.js'
import paginate from './../../components/paginate.vue'
// import multiselect from './../../components/Multiselect.vue'
import multiselect from 'vue-multiselect'
import { filterByModificationsd, filterByModifications, filterByCarrier, orderFilters } from './../../components/filters.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    tables,
    modal,
    // pagination,
    paginate,
    multiselect,
  },

  data () {
    return {
      active: 0,
      activeDevice: null,
      search: {
        filter: {
          make: [],
          price: [],
          modifications: [],
          carriers: [],
          deviceType: []
        },
        pagination: {
          current_page: 1,
          total_pages: null,
          count: null,
          total: null,
          per_page: 25
        },
      },

      value: [],
      options: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Adonis', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' }
      ],
    }
  },

  computed: {
    _ () {
      return _
    },

    ...mapGetters({
      devices: 'device/allDevices',
      // devices: 'device/search',
      styles: 'modification/styleModifications',
      capacities: 'modification/capacityModifications',
      carriers: 'carrier/allCarriers',
    }),
  },

  beforeCreate () {
    // console.log(this.$store)
    this.$store.dispatch('device/getAll')
    this.$store.dispatch('modification/getAll')
    this.$store.dispatch('carrier/getAll')
  },

  methods: {
    ...mapActions({
      addStyleFilter: 'device/addStyleFilter',
      addCapacityFilter: 'device/addCapacityFilter',
      addCarrierFilter: 'device/addCarrierFilter',
    }),

    prevPage () {
      this.$store.dispatch('device/prevPage')
    },

    nextPage () {
      this.$store.dispatch('device/nextPage')
    },

    filterByModificationsd,
    filterByModifications,
    filterByCarrier,
    orderFilters,

    setActive (device) {
      if (this.activeDevice && this.activeDevice.id == device.id) {
        this.$set(this, 'activeDevice', null)
      } else {
        this.$set(this, 'activeDevice', device)
      }
      // console.log('setActive', this.activeDevice)
    },
  },
};

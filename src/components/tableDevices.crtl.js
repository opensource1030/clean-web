import paginate from './paginate.vue'
import multiselect from 'vue-multiselect'
import { filterByModificationsd, filterByModifications, filterByCarrier, orderFilters } from './filters.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
     id:{
         default: null
     },
     callback:{
         Type: Function,
     }
   },

  components: {
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
      },
      value: [],
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
    filterByModificationsd,
    filterByModifications,
    filterByCarrier,
    orderFilters,
    prevPage(){
      this.$store.dispatch('device/prevPage')
    },
   nextPage(){
         this.$store.dispatch('device/nextPage')
   },
    setActive(device) {
      if (this.activeDevice && this.activeDevice.id == device.id) {
        this.$set(this, 'activeDevice', null)
      } else {
        this.$set(this, 'activeDevice', device)
      }
      // console.log('setActive', this.activeDevice)
    },
  },
};

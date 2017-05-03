import paginate from './paginate.vue'
import multiselect from 'vue-multiselect'
import { filterByModificationsd, filterByModifications, filterByCarrier, orderFilters } from './filters.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    paginate,
    multiselect,
  },

  props: {
    id:{
      default: null
    },
    callback:{
      Type: Function,
    }
  },

  data () {
    return {
      active: 0,
      activeDevice: null,

      value: [],
    }
  },

  computed: {
    _ () {
      return _
    },

    ...mapGetters({
      devices: 'device/allDevices',
      styles: 'modification/styleModifications',
      capacities: 'modification/capacityModifications',
      carriers: 'carrier/sorted',
      search: 'device/allDevices'
    }),
  },

  beforeCreate () {
    this.$store.dispatch('device/search',{ search: 0 })
    this.$store.dispatch('modification/search')
    this.$store.dispatch('carrier/search')
  },

  methods: {

    filterByModificationsd,
    filterByModifications,
    filterByCarrier,
    orderFilters,

    asyncFindTypes(query){
      this.$store.dispatch('device/searchDeviceType',{query:query})
    },

    asyncFindManu(query){
      this.$store.dispatch('device/searchManufactures',{query:query})
    },

    asyncFindPrices(query){
      this.$store.dispatch('device/searchPrice',{query:query})
    },

    asyncFindCarriers(query){
      this.$store.dispatch('carrier/searchCarriers',{query:query})
    },

    asyncFindModifications(query){
      this.$store.dispatch('modification/searchModification',{query:query})
    },

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

    addCarrierFilter () {
      console.log('addCarrierFilter')
    },

    addCapacityFilter () {
      console.log('addCapacityFilter')
    },

    addStyleFilter () {
      console.log('addStyleFilter')
    }

  },
};

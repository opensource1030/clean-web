import _ from 'lodash'
import modal from './../../components/modal.vue'
import paginate from './../../components/paginate.vue'
import multiselect from 'vue-multiselect'
// import { filterByModificationsd, filterByModifications, filterByCarrier, orderFilters } from './../../components/filters.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    modal,
    multiselect,
    paginate,
  },

  data () {
    return {
      activeDevice: null,
      isReady: false,
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
      // search: 'device/allDevices'
    }),
  },

  beforeCreate () {
    // this.$store.dispatch('device/getAll',{ search: 0 })
    // this.$store.dispatch('modification/search')
    // this.$store.dispatch('carrier/search')
  },

  created () {
    this.$set(this, 'isReady', false)
    Promise.all([
      this.$store.dispatch('modification/search'),
      this.$store.dispatch('carrier/search'),
      this.$store.dispatch('device/getAll', { search: 0 }),
    ]).then((data) => {
      this.$set(this, 'isReady', true)
    })
  },

  methods: {

    asyncFindTypes(query) {
      this.$store.dispatch('device/searchDeviceType', {query:query})
    },

    asyncFindManu(query) {
      this.$store.dispatch('device/searchManufactures', {query:query})
    },

    asyncFindPrices(query) {
      this.$store.dispatch('device/searchPrice', {query:query})
    },

    asyncFindCarriers(query) {
      this.$store.dispatch('carrier/searchCarriers', {query:query})
    },

    asyncFindModifications(query) {
      this.$store.dispatch('modification/searchModification', {query:query})
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
    },

    filterModificationsByType (list, type) {
      return _.map(_.filter(list, (item) => (item.modType == type)), 'value')
    },
  }
};

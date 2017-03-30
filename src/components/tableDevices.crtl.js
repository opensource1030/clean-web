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

      value: [],
    }
  },

  computed: {
    _ () {
      return _
    },

    ...mapGetters({
      devices: 'device/allDevices',
      styles: 'modification/onePagestyleModifications',
      capacities: 'modification/onePagecapacityModifications',
      carriers: 'carrier/getOnePage',
      search:'device/search'
    }),
  },

  beforeCreate () {
    this.$store.dispatch('device/getAll',{
      search:0
    })
    this.$store.dispatch('modification/getOnePage')
    this.$store.dispatch('carrier/getOnePage')
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
  },
};

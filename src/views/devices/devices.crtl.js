import tables from './../../components/tableDevices.vue'
// import main from './../../components/eventHandle'
import modal from './../../components/modal.vue'
// import pagination from './../../components/pagination.js'
import paginate from './../../components/paginate.vue'
import multiselect from './../../components/Multiselect.vue'
import { filterByModificationsd, filterByModifications, filterByCarrier, orderFilters } from './../../components/filters.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    tables,
    modal,
    // pagination,
    paginate,
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
      }
    }
  },

  computed: {
    ...mapGetters({
      devices: 'device/allDevices',
    })
  },

  beforeCreate () {
    // console.log(this.$store)
    this.$store.dispatch('device/getAll')
  },

  methods: {
    filterByModificationsd,
    filterByModifications,
    filterByCarrier,
    orderFilters,

    setActive(device) {
      if (this.activeDevice && this.activeDevice.id == device.id) {
        this.$set(this, 'activeDevice', null)
      } else {
        this.$set(this, 'activeDevice', device)
      }
      // console.log('setActive', this.activeDevice)
    },

    vDeviceVariations() {
      this.variations=[];
      if (this.devices!=null && this.devices.length!=0) {
        for(let device of this.devices){
          if(device.priceName.length!=0 && device.priceName!=null){
            for (let price of device.priceName){
              if(price.check==true){
                this.variations.push(price)
              }
            }
          }
        }

        let i =0;
        for(let v of this.variations){
          if(v.checks==null){
            v.checks=false;
          }
          if(v.check==false){
            this.variations.splice(i,1);
          }
          i++;
        }

        // main.eventHub.$emit('addvariatons', this.variations)
      }
    },
  },
};

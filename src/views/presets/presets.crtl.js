import Vue from 'vue';
import paginate from './../../components/paginate';
import Modal from './../../components/modal';
import searchCost from './../../components/searchCost.vue';
import presets from './../../api/preset/presets';
import {mapGetters, mapActions} from 'vuex'
export default {
  name:'Presets',
  created(){
    this.$store.dispatch('presets/getAll')
  },
  computed : {
    ...mapGetters({presets:'presets/getPreset',pagination:'presets/getPagination',variations:'presets/getVariation'})
  },
  components : {
  paginate,
  Modal,
  searchCost
  },
  methods : {
    prevPage(){
        this.$store.dispatch('presets/prevPage')
     },
      nextPage(){
        this.$store.dispatch('presets/nextPage')
      },


    setActive: function(preset) {
      if (this.activePreset && this.activePreset.id == preset.id) {
        this.$set(this, 'activePreset', null)
      } else {
        this.$set(this, 'activePreset', preset)
      }
    }
  },
  data() {
    return {
    activePreset: null,
    };
  }
};

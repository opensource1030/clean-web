import preset from './../../api/preset/preset';
import Vue from 'vue'
import Tables from './../../components/tableDevices.vue'
import modal from './../../components/modal.vue';
import searchCost from './../../components/searchCost.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components : {
    modal: modal,
    Tables,
    searchCost
  },
  computed : {
    ...mapGetters({preset:'preset/getPreset',variations:'preset/getVariations'}),
  },
  beforeCreate() {

    if (this.$route.params.id != null) {
      this.$store.dispatch('preset/getOne', { id:this.$route.params.id  })
    }

    },
  methods : {
    onSelectColumn(){
          this.$store.dispatch('device/search', {search: this.search})
      },
    submit(){
      if(this.preset.id==null){
     //preset.addPreset(this,this.preset)
      this.$store.dispatch('error/clearAll')
      this.$store.dispatch('preset/add', {
        preset:this.preset ,
        router: this.$router
      })

    }else{
      //  preset.updatePreset(this,this.id,this.preset)
        this.$store.dispatch('error/clearAll')
        this.$store.dispatch('preset/update', {
          preset:this.preset ,
          router: this.$router
        })


    }
    }
  },
  data() {
    return {
      search: {
        firstTime: true,
        searchFilter: false,
        costFilterMessage: '',
        searchShow: false,
        costMax: 0,
        costMin: 0
      }
    };
  }
};

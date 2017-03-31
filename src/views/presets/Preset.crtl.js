import preset from './../../api/preset/preset';
import Vue from 'vue'
import Tables from './../../components/tableDevices.vue'
import modal from './../../components/modal.vue';
import { mapGetters, mapActions } from 'vuex'
Vue.directive('status', {
    deep:true,
    update: function () {
      let vm = this;
      this.$nextTick(function() {
      var i = 0;
      for (let variation of vm.variations) {
        vm.changeStatusPreset('active', i);
          i++;
      }
    });
    }
})
export default {
  name : 'Preset',
  components : {
    modal: modal,
    Tables
  },
  computed : {
    ...mapGetters({preset:'preset/getPreset',variations:'preset/getVariations'})
  },
  beforeCreate() {
    this.id = this.$route.params.id;
    if (this.id != null) {
      this.$store.dispatch('preset/getOne', {
        id:this.id
      })

    }
    },
    computed:{
      vCarriers() {
        if (this.variations != null) {
          this.preset.variations= this.variations.filter(variation => {
            return variation.checks;
          });
        }

        return '';
      }
    },


  methods : {
    onSelectColumn(){
          this.$store.dispatch('device/getAll', {
            search: this.search
          })
      },
    submit(){
      if(this.id==null){
      preset.addPreset(this,this.preset)
      this.$store.dispatch('error/clearAll')
      this.$store.dispatch('preset/add', {
        preset:this.preset ,
        router: this.$router
      })


    }else{
        preset.updatePreset(this,this.id,this.preset)

        this.$store.dispatch('error/clearAll')
        this.$store.dispatch('preset/update', {
          preset:this.preset ,
          router: this.$router
        })


    }
    },
    changeStatusPreset(className,index){
      let el = document.getElementsByClassName('static')[index];
      el.classList.toggle(className);
    },


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

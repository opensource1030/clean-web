import preset from './../../api/preset/preset';
import Tables from './../../components/tableDevices.vue'
import modal from './../../components/modal.vue';
import main from './../../components/eventHandle'
export default {
  name : 'Preset',
  components : {
    modal: modal,
    Tables
  },
  beforeCreate() {
    this.id = this.$route.params.id;

    if (this.id != null) {
      preset.getDataPreset(this, this.id);
    }
    },

    created(){
        main.eventHub.$on('addvariatons', this.addVarriations)

    },
    beforeDestroy(){
      main.eventHub.$off('addvariatons', this.addVarriations)
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
      addVarriations(v){

      if(this.id!=null){
          if(this.variations.length!=0){
            let i=0;
            for(let vari of this.variations){
                  vari.checks=false
                   document.getElementsByClassName('static')[i].className='static'
                    i++;
              }

        }
      }
        this.variations=v;

      },
      onSelectColumn(){

          this.$store.dispatch('device/getAll', {
            search: this.search,
          })

      },
    submit(){
      if(this.id==null){
      preset.addPreset(this,this.preset)
    }else{
        preset.updatePreset(this,this.id,this.preset)
    }
    },
    changeStatusPreset(className,index){
      let el = document.getElementsByClassName('static')[index];
      el.classList.toggle(className);
    },
    checkvariation() {
      let vm = this;
      this.$nextTick(function() {
        var i = 0;
        for (let variation of vm.variations) {
            vm.changeStatusPreset('active', i);
          i++;
        }
      });
    }

  },
  data() {
    return {
      preset:{
        name:'',
        companyId:null,
        variations:[]
      },
      variations:[],
      main:{},
      search: {
        firstTime: true,
        searchFilter: false,
        costFilterMessage: '',
        searchShow: false,
        costMax: 0,
        costMin: 0
      },
      error: '',
      showModal: false
    };
  }
};

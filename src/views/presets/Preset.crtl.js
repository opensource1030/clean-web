
import preset from './../../api/preset/preset';
import Tables from './../../components/tableDevices.vue'
import modal from './../../components/modal.vue';
import main from './../../main'
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


  methods : {
      addVarriations(v){
        this.variations=[];
        this.variations=v;
      },

    submit(){
      if(this.id==null){
      preset.addPreset(this,this.preset)
    }else{
        preset.updatePreset(this,this.id,this.preset)
    }
    },
    changeStatusPreset(className,index){
        this.variations[index].checks = !this.variations[index].checks;
      var el = document.getElementsByClassName('static')[index];
      el.classList.toggle(className);
      if(this.variations[index].checks==true){
        this.preset.variations.push(this.variations[index])
      }else{
        this.preset.variations.splice(index,1);
      }

    },
    checkvariation() {
      var vm = this;
      this.$nextTick(function() {
        var i = 0;
        for (let variation of vm.variations) {
            variation.checks=false;
           if(variation.checks==false){
            vm.changeStatusPreset('active', i);
          }
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

      search: {
              firstTime: true,
              errorCost: false,
              errorCostMessage: 'MIN > MAX',
              searchShow: true,
              searchName: 'Search',
              resetName: 'R',
              costMinName: 'MIN Cost',
              costMin: 0,
              costMaxName: 'MAX Cost',
              costMax: 0,
              searchFilter: false,
              costFilterMessage: '',
          },
      error: '',
      showModal: false
    };
  }
};

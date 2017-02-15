import Tables from './../../components/tableDevices.vue'
import modal from './../../components/modal.vue';
import main from './../../main'
export default {
  components: {
    Tables,
    modal,
  },
  created(){
      main.eventHub.$on('error', this.errors)

  },
  beforeDestroy(){
    main.eventHub.$off('error', this.errors)
  },
  methods:{
      errors(e){
          this.error=e;
          this.showModal=true;
      }
  },

  data(){
        return {
            error:'',
          showModal:false,

  }

  }
};

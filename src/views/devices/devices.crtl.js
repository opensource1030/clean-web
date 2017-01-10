import Tables from './../../components/tableDevices.vue'
import modal from './../../components/modal.vue';
export default {
<<<<<<< HEAD
  components: {
    Tables,
    modal,
=======

  components : {
    pagination: Pagination,
    modal: modal,
    Multiselect: Multiselect
  },
  beforeCreate() {
    Filter.getCarriers(this);
    Filter.getModifications(this);
    Filter.getDeviceTypes(this);
>>>>>>> 92b5b5d... cp-1659 presets
  },

  data(){
        return {
            error:'',
          showModal:false,

  }

  }
};

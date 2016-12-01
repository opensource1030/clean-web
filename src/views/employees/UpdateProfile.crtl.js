import Vue from 'vue';
import employee from './../../api/employee/employee';

export default {
  name:'UpdateProfile',
  beforeCreate(){
        this.id = this.$route.params.id;

        employee.dataEmployee(this);
  },

data(){
    return {
              uiemployee:null,
    }
},
methods:{
  save(){
      employee.updateProfile(this,this.uiemployee);
  }

}

}

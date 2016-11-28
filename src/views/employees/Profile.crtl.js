import Vue from 'vue';
import employee from './../../api/employee/employee';

export default {
  name:'Profile',
  created(){

  },

data(){
    return {
      color:'#A9A9A9',

      service:{},
      device:{},




    }
},
methods:{

  updateProfile(id){
      this.$router.push({ name: 'UpdateProfile', params: { id:id }})




  },
  addService(){
      this.$router.push({name:'addService'})

  },
  addDevice(){
      if(this.service){
          this.$router.push({name:'addDevice'})  
      }


  }

}

}

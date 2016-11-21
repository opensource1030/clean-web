import Vue from 'vue';
import employee from './../../api/employee/employee';

export default {
  name:'Profile',
  created(){

  },

data(){
    return {
      color:'#A9A9A9',

        personalInfo:{
                fullName:'',
                division:'',
                position:'',
                sMail:'',
                email:'',
                cost:'',
                officePhone:'',
                office:''

        },
        shippingAddress:{
            name:'',
            address:'',
            attn:'',
            city:'',
            state:'',
            phone:'',
            country:'',
            postalCode:''



        }



    }
},
methods:{

  updateProfile(id){
      this.$router.push({ name: 'UpdateProfile', params: { id:id }})




  },
  addService(){
      this.$router.push({name:'addService'})

  }

}

}

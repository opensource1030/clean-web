import Vue from 'vue';
import employee from './../../api/employee/employee';

export default {
  name:'Profile',
  created(){

  },

data(){
    return {
        
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
methods(){

}

}

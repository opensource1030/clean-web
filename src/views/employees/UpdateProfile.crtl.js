import Vue from 'vue';
import employee from './../../api/employee/employee';

export default {
  name:'UpdateProfile',
  created(){
        this.id = this.$route.params.id;

        employee.dataEmployee(this,this.id);
  },

data(){
    return {
              id:null,
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

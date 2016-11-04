import Vue from 'vue';
import service from './../../api/service/service';

export default {
  name:'Services',
  created(){
    service.getCarrier(this);
      this.id = this.$route.params.id;
      if (this.id != null) {

        service.getDataService(this, this.id);
      }

  },
  data() {
    return {
      id:null,
        serviceDetails:{
              title:'',
              carrierId:null,
              status:'',
              code:'',
              cost:'',
              description:''
        },
        domesticPlan:{
              minutes:'',
              data:'',
              sms:''

        },
        internationalPlan:{
              minutes:'',
              data:'',
              sms:''
        },
        carriers:[],



    }
  },
  methods:{
        save(){
          if (this.id != null) {
            service.updateService(this.id, this, this.serviceDetails, this.domesticPlan, this.internationalPlan);
          } else {
            service.addService(this, this.serviceDetails, this.domesticPlan, this.internationalPlan);
          }

        }




  }



}

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
        addons:[
              {
                name:'',
                price:'',
                add:true,
                delete:false


              }

        ]





    }
  },
  methods:{
        save(){
          if (this.id != null) {
            service.updateService(this.id, this, this.serviceDetails, this.domesticPlan, this.internationalPlan);
          } else {
            service.addService(this, this.serviceDetails, this.domesticPlan, this.internationalPlan);
          }

        },
        hideAndPush(index){
            this.addons[index].add = false;
            this.addons[index].delete=true;
        this.addons.push({ name:'',price:'',add:true,delete:false });



        },
        deleteAddOns(index){
          this.addons.splice(index,1);
            this.addons[index].delete=false;
            this.addons[index].add=true;

        },
        updateName(i,e){
          var value = e.target.value;
          var addon = this.addons[i];
          var extending = Object.assign({}, addon, {
            name: value,
          });
           Vue.set(this.addons, i, extending)

        },
        updatePrice(i,e){
          var value = e.target.value;
          var price = this.addons[i];
          var extending = Object.assign({}, addon, {
            price: value,
          });
           Vue.set(this.addons, i, extending)
         
        }




  }



}

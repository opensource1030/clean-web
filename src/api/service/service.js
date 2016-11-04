import Vue from 'vue';
import auth from './../auth.js';

var {
  Store,
} = require('yayson')();
var store = new Store();


export default {


updateService(id,context,serviceDetails,domesticPlan,internationalPlan){
  let status="";
        if(serviceDetails.status==true){
          status="Enabled"
        }else{
          status="Disabled"
        }
  context.$http.put(process.env.URL_API + '/services/' + id, {

    "data" : {
        "type" : "services",
        "id":id,
        "attributes" : {
            "status" : status,
            "title": serviceDetails.title,
            "planCode": serviceDetails.code,
            "cost": serviceDetails.cost,
            "description": serviceDetails.description,
            "domesticMinutes": domesticPlan.minutes,
            "domesticData": domesticPlan.data,
            "domesticMessages": domesticPlan.message,
            "internationalMinutes":internationalPlan.minutes,
            "internationalData": internationalPlan.data,
            "internationalMessages": internationalPlan.message,
            "carrierId" : serviceDetails.carrierId
        }
    }




  })
    .then((response) => {
      context.$router.push({name: 'services'});



    }, (response) => {

    });




},

getDataService(context,id){

  context.$http.get(process.env.URL_API + '/services/' + id, {
    params: {
      include: 'carriers',
    },

  }).then((response) => {

      event = store.sync(response.data);
        console.log(event);
          if(event.status==="Enabled"){
            context.serviceDetails.status=true;
            console.log(context.serviceDetails.status);
          }  else{
            context.serviceDetails.status=false;
            console.log(context.serviceDetails.status);
          }
      context.serviceDetails.title = event.title;
      context.serviceDetails.code = event.planCode;
      context.serviceDetails.cost = event.cost;
      context.serviceDetails.description = event.description;
      context.serviceDetails.carrierId = event.carriers[0].id;
      context.domesticPlan.minutes=event.domesticMinutes;
      context.domesticPlan.data=event.domesticData;
      context.domesticPlan.sms=event.domesticMessages;
      context.internationalPlan.minutes=event.internationalMinutes;
      context.internationalPlan.data=event.internationalData;
      context.internationalPlan.sms=event.internationalMessages;

    },

    (response) => {

    });



},
addService(context,serviceDetails,domesticPlan,internationalPlan){
            let status="";
                  if(serviceDetails.status==true){
                    status="Enabled"
                  }else{
                    status="Disabled"
                  }

  context.$http.post(process.env.URL_API + '/services', {


    "data" : {
        "type" : "services",
        "attributes" : {
            "status" : status,
            "title": serviceDetails.title,
            "planCode": serviceDetails.code,
            "cost": serviceDetails.cost,
            "description": serviceDetails.description,
            "domesticMinutes": domesticPlan.minutes,
            "domesticData": domesticPlan.data,
            "domesticMessages": domesticPlan.message,
            "internationalMinutes":internationalPlan.minutes,
            "internationalData": internationalPlan.data,
            "internationalMessages": internationalPlan.message,
            "carrierId" : serviceDetails.carrier.id
        }
    }


  })
    .then((response) => {

      console.log(response.data);

    }, (response) => {
    });



},
getCarrier(context){
  context.$http.get(process.env.URL_API + '/carriers', {

    params: {
      page: 1,
      'filter[active]': 1

    },

  }).then((response) => {
      event = store.sync(response.data);

      //process.env.URL_API

  /*    for (let carrier of event) {

        this.carriersCheck.data.push(carrier);
        carrier.check = false;

      }*/

      context.carriers = event;
    },

    (response) => {
    });



},






}

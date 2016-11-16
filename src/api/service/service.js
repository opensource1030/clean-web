import Vue from 'vue';
import auth from './../auth.js';


var {
  Store,
} = require('yayson')();
var store = new Store();
import {
  findByService,
  findByAddons
} from './../../components/filters.js';


export default {


updateService(id,context,serviceDetails,domesticPlan,internationalPlan,addons){
  let status="";

  if(domesticPlan.minutes.value=="" || domesticPlan.minutes.value==null  || domesticPlan.data.value=="" || domesticPlan.data.value==null || domesticPlan.sms.value=="" || domesticPlan.sms.value==null  || internationalPlan.minutes.value=="" || internationalPlan.minutes.value==null
  ||  internationalPlan.data.value=="" || internationalPlan.data.value==null || internationalPlan.sms.value=="" || internationalPlan.sms.value==null)
    {
      context.error="Error Empty Values";


    }
    else{
          context.error="";
        if(serviceDetails.status==true){
          status="Enabled"
        }else{
          status="Disabled"
        }
            let items=[];
            domesticPlan.minutes.domain="domestic";
            domesticPlan.data.domain="domestic";
            domesticPlan.sms.domain="domestic";
            domesticPlan.minutes.category="voice";
            domesticPlan.data.category="data";
            domesticPlan.sms.category="messaging";

            items.push(domesticPlan.minutes);
            items.push(domesticPlan.data);
            items.push(domesticPlan.sms);

            internationalPlan.minutes.domain="international";
            internationalPlan.data.domain="international";
            internationalPlan.sms.domain="international";
            internationalPlan.minutes.category="voice";
            internationalPlan.data.category="data";
            internationalPlan.sms.category="messaging";


            items.push(internationalPlan.minutes);
            items.push(internationalPlan.data);
            items.push(internationalPlan.sms)

        for(let addon of addons){
          if(addon.description!="" || addon.description!=null || addon.cost!=null || addon.description!=""){
              items.push(addon);

          }

        }
  context.$http.put(process.env.URL_API + '/services/' + id, {

    "data": {
        "type": "services",
        "id":id,
        "attributes": {
            "status" : status,
            "title": serviceDetails.title,
            "planCode": serviceDetails.code,
            "cost": serviceDetails.cost,
            "description": serviceDetails.description,
            "carrierId" : serviceDetails.carrierId
        },
        "relationships": {
            "serviceitems": {
                "data": this.itemUpdateJson(items,id),
            }
        }
}






  })
    .then((response) => {
      context.$router.push({name: 'services'});



    }, (response) => {

    });
}



},

getDataService(context,id){

  context.$http.get(process.env.URL_API + '/services/' + id, {
    params: {
      include: 'serviceitems',
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
      //domestic service
    context.domesticPlan.minutes=findByService(event.serviceitems,"voice","domestic");
      context.domesticPlan.data=findByService(event.serviceitems,"data","domestic");
      context.domesticPlan.sms=findByService(event.serviceitems,"messaging","domestic");
      //international service
     context.internationalPlan.minutes=findByService(event.serviceitems,"voice","international");
     context.internationalPlan.data=findByService(event.serviceitems,"data","international");
     context.internationalPlan.sms=findByService(event.serviceitems,"messaging","international");

     //addons
     let addOns=[]
     addOns=findByAddons(event.serviceitems,"addon","")
  context.addons.splice(0,1);
              for(let addOn of addOns){

                    addOn.delete=true;
                    addOn.add=false;
                    context.addons.push(addOn);

              }

              context.addons.push({ id:0,description:'',cost:'',add:true,delete:false });



    },

    (response) => {

    });



},
itemUpdateJson(items,id){

  var mData = [];
  items.forEach(function (item, index) {

            console.log(item.id);
          if(item.domain!=undefined){
              if(item.category=='voice'){

          mData[index] =
              {
                    serviceId:id,
                  id:item.id,
                  category: 'voice',
                 description:'',
                 value: item.value,
                 unit: 'minutes',
                 cost: 0,
                domain: item.domain
              }
            }
        else if(item.category=='data'){

        mData[index] =        {
                    serviceId:id,
                  id:item.id,
                  category:'data',
                  description:'',
                  value: item.value,
                  unit: 'Gb',
                  cost: 0,
                  domain: item.domain
                }
              }
              else{
            mData[index] =      {
                  serviceId:id,
                  id:item.id,
                  category: 'messaging',
                  description:'',
                  value: item.value,
                  unit: 'messages',
                  cost: 0,
                  'domain': item.domain
              }
}



          }
          else{

            mData[index]=  {
                    serviceId:id,
                  'id':item.id,
                  'category': 'addon',
                  'description': item.description,
                  'value': 0,
                  'unit': '',
                  'cost': item.cost,
                  'domain': ''
              }




          }

  });

  return mData;

},
itemJson(items){

  var mData = [];
  items.forEach(function (item, index) {
          if(item.domain!=undefined){

              if(item.category=='voice'){
          mData[index] =
              {  category: 'voice',
                 description:'',
                 value: item.value,
                 unit: 'minutes',
                 cost: 0,
                domain: item.domain
              }

            }
            else if(item.category=='data'){
              mData[index] =    {

                  category: 'data',
                  description:'',
                  value: item.value,
                  unit: 'Gb',
                  cost: 0,
                  domain: item.domain
                }
              }
              else{
                mData[index] =    {

                  category: 'messaging',
                  description:'',
                  value: item.value,
                  unit: 'messages',
                  cost: 0,
                  'domain': item.domain
              }
}



          }
          else{

            mData[index]=  {

                  'category': 'addon',
                  'description': item.description,
                  'value': 0,
                  'unit': '',
                  'cost': item.cost,
                  'domain': ''
              }




          }

  });

  return mData;

},

addService(context,serviceDetails,domesticPlan,internationalPlan,addons){
            let status="";

            if(domesticPlan.minutes.value=="" || domesticPlan.minutes.value==null  || domesticPlan.data.value=="" || domesticPlan.data.value==null || domesticPlan.sms.value=="" || domesticPlan.sms.value==null  || internationalPlan.minutes.value=="" || internationalPlan.minutes.value==null
            ||  internationalPlan.data.value=="" || internationalPlan.data.value==null || internationalPlan.sms.value=="" || internationalPlan.sms.value==null)
              {
                context.error="Error Empty Values";


              }
              else{
                    context.error="";
                  if(serviceDetails.status==true){
                    status="Enabled"
                  }else{
                    status="Disabled"
                  }
                      let items=[];
                      domesticPlan.minutes.domain="domestic";
                      domesticPlan.data.domain="domestic";
                      domesticPlan.sms.domain="domestic";
                      domesticPlan.minutes.category="voice";
                      domesticPlan.data.category="data";
                      domesticPlan.sms.category="messaging";

                      items.push(domesticPlan.minutes);
                      items.push(domesticPlan.data);
                      items.push(domesticPlan.sms);

                      internationalPlan.minutes.domain="international";
                      internationalPlan.data.domain="international";
                      internationalPlan.sms.domain="international";
                      internationalPlan.minutes.category="voice";
                      internationalPlan.data.category="data";
                      internationalPlan.sms.category="messaging";


                      items.push(internationalPlan.minutes);
                      items.push(internationalPlan.data);
                      items.push(internationalPlan.sms)
                  for(let addon of addons){
                    if(addon.description!="" || addon.description!=null || addon.cost!=null || addon.description!=""){
                        items.push(addon);

                    }

                  }


  context.$http.post(process.env.URL_API + '/services', {



      "data": {
          "type": "services",
          "attributes": {
              "status" : status,
              "title": serviceDetails.title,
              "planCode": serviceDetails.code,
              "cost": serviceDetails.cost,
              "description": serviceDetails.description,
              "carrierId" : serviceDetails.carrierId
          },
          "relationships": {
              "serviceitems": {
                  "data": this.itemJson(items),
              }
          }
  }

  })
    .then((response) => {

      context.$router.push({name: 'services'});

    }, (response) => {
    });
  }


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

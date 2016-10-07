import {router} from './../../app'
import Vue from 'vue'
import config from './../../../config/config'
import auth from './../auth.js'
var {Store} = require('yayson')()
var    store = new Store()

export default {
/*-------------------------------update device-----------------*/
  carriersCheck:{
    data:[]
  },
  companiesCheck:{
    data:[]
  },
  modificationsCheck:{
    data:[]
  },

  updateDevice(id,context,price,style,capacity,carriers,companies,device,image){
    context.$http.put(config.urlApi + '/devices/'+id, {

     "data" : {
           "type" : "devices",
           "attributes" : {
               "name" : device.name,
               "properties" : device.description,
               "deviceTypeId" : device.type,
               "statusId" : 1,
               "identification" : device.id
           },
           "relationships" : {
               "modifications" : {
                   "data" : this.modificationsJson(capacity,style)
               },
               "carriers" : {
                   "data" : this.carriersJson(carriers)
               },
               "companies" : {
                   "data" : this.companiesJson(companies)
               },
               "prices" : {
                   "data" : this.pricesUpdateJson(price)
               },
               "images" : {
                   "data" : [
                      { "type": "images", "id" : image.id }
                   ]
               }

           }
       }

        })
        .then((response) => {


            console.log(response.data);

        }, (response) => {});




  },
    getDataDevice(context,id){

              context.$http.get(config.urlApi + '/devices/'+id, {
                  params:{include:'modifications,carriers,companies,prices,images'}

              }).then((response) => {

                      event = store.sync(response.data)
                      console.log(event.images);
                    context.image.url=config.urlApi+'/images/'+event.images[0].id;
                    context.image.id=event.images[0].id;

                    context.d.name=event.name;
                    context.d.description=event.properties;
                    context.d.id=event.identification;
                    context.d.type=event.deviceTypeId;
                         context.$set('carriers', this.carriersCheck);
                       context.$set('priceData',event.prices)
                      this.modificationCheck(context,event.modifications)
                      this.carrierCheck(context,event.carriers)
                      this.companyCheck(context,event.companies)
                      context.$set('modifications', this.modificationsCheck);
                        context.$set('companies', this.companiesCheck);
                        context.checkcarrier();

            },
            (response) => {

            });


    },
    carrierCheck(context,carriersD){

      var i=0;
 for(let carrier of this.carriersCheck.data){
                carrier.check='';
          for(let carrierData of carriersD){
                if(carrier.id==carrierData.id){
                  carrier.check='checked';

                    break;
                }
          }
          i++;
    }
  //   context.carriers=[];

   },
   companyCheck(context,companiesD){


for(let company of this.companiesCheck.data){
               company.check='';
         for(let companyData of companiesD){
               if(company.id==companyData.id){
                 company.check='checked';

                   break;
               }
         }

   }
    context.companies=[];

  },
  modificationCheck(context,modificationsD){


for(let modification of this.modificationsCheck.data){
              modification.check='';
        for(let modificationData of modificationsD){
              if(modification.id==modificationData.id){
                modification.check='checked';

                  break;
              }
        }

  }
   context.modifications=[];

 },
/*---------------------------------create device---------------------------------------*/


    getDevice(context) {

      context.$http.get(config.urlApi + '/devicetypes',{

          params:{page:1}

      }).then((response) => {

               context.$set('deviceType', response.json());

          },
          (response) => {

          });

        context.$http.get(config.urlApi + '/modifications',{

            params:{page:1}

        }).then((response) => {
                for(let modification of response.data.data){
                         this.modificationsCheck.data.push(modification);

                 }
                 context.$set('modifications', response.json());

            },
            (response) => {

            });


        context.$http.get(config.urlApi + '/carriers', {
            params:{page:1,'filter[active]':1}
        }).then((response) => {
               for(let carrier of response.data.data){

                        this.carriersCheck.data.push(carrier);


                }
                context.$set('carriers', response.json());
            },
            (response) => {});

        context.$http.get(config.urlApi + '/companies',{

            params:{'page[10]':1,'filter[active]':1}

        }).then((response) => {

                for(let company of response.data.data){

                         this.companiesCheck.data.push(company);


                 }
  context.$set('companies', response.json());

            },

            {
                headers: auth.getAuthHeader()
            },

            (response) => {

            });
    },
    addModifications(context, obj) {
        context.$http.post(config.urlApi + '/modifications', {

                "data": {
                    "type": "modifications",
                    "attributes": {
                        "type": obj.type,
                        "value": obj.value
                    }
                }
            })
            .then((response) => {
                this.getDevice(context)

            }, (response) => {});
    },

    addDevice(context,price,style,capacity,carriers,companies,device,image){

      context.$http.post(config.urlApi + '/devices', {

       "data" : {
             "type" : "devices",
             "attributes" : {
                 "name" : device.name,
                 "properties" : device.description,
                 "deviceTypeId" : device.type,
                 "statusId" : 1,
                 "identification" : device.id
             },
             "relationships" : {
                 "modifications" : {
                     "data" : this.modificationsJson(capacity,style)
                 },
                 "carriers" : {
                     "data" : this.carriersJson(carriers)
                 },
                 "companies" : {
                     "data" : this.companiesJson(companies)
                 },
                 "prices" : {
                     "data" : this.pricesJson(price)
                 },
                 "images" : {
                     "data" : [
                        { "type": "images", "id" : image.id }
                     ]
                 }
             }
         }

          })
          .then((response) => {


              console.log(response.data);

          }, (response) => {});



    },
    modificationsJson(capacity,style){
      var modifications=[];
      var mData=[]

          for(let c of capacity){
              modifications.push(c)


          }
          for(let  sty of style){
              modifications.push(sty)
          }
          modifications.forEach(function (m, index) {
            mData[index]=
                 { "type": "modifications", "id" : m.id }


});

    return mData;

},

  carriersJson(carriers){
    var mData=[]
    carriers.forEach(function (c, index) {
      mData[index]=
           { "type": "carriers", "id" : c.id }

      });

      return mData;


  },
  companiesJson(companies){
    var mData=[]
    companies.forEach(function (c, index) {
      mData[index]=
           { "type": "companies", "id" : c.id }


});
      return mData;


  },
  pricesJson(price){
    var mData=[]
    price.forEach(function (p, index) {
      mData[index]=
        {
            "type": "prices",
            "capacityId": p.capacity.id,
            "styleId": p.style.id,
            "carrierId": p.carrier.id,
            "companyId": p.company.id,
            "priceRetail": p.retail,
            "price1": p.priceOne,
            "price2": p.priceTwo,
            "priceOwn": p.Own
        }


      });

      return mData;


  },
  pricesUpdateJson(price){
    var mData=[]
    price.forEach(function (p, index) {
      mData[index]=
        {
            "type": "prices",
            "id":p.id,
            "capacityId": p.capacity.id,
            "styleId": p.style.id,
            "carrierId": p.carrier.id,
            "companyId": p.company.id,
            "priceRetail": p.retail,
            "price1": p.priceOne,
            "price2": p.priceTwo,
            "priceOwn": p.Own
        }


      });

      return mData;


  },

  createImage(context,file){
        context.$http.post(config.urlApi + '/images',file)

        .then((response) => {
            context.image.url='http://'+response.data.data.links.self;
            context.image.id=response.data.data.id;

        }, (response) => {});


  }


}

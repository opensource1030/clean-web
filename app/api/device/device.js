import {router} from './../../app'
import Vue from 'vue'
import config from './../../../config/config'
import auth from './../auth.js'




export default {

    getDataDevice(context,id){
              context.$http.get(config.urlApi + '/devices/'+id+'?include=modifications,carriers,companies,prices').then((response) => {



                  console.log(response.data);






            }, {
                // Attach the JWT header
                headers: auth.getAuthHeader()
            },

            (response) => {

            });


    },


    getDevice(context) {

        context.$http.get(config.urlApi + '/modifications?page=1').then((response) => {
                context.$set('modifications', response.json());
            }, {
                // Attach the JWT header
                headers: auth.getAuthHeader()
            },

            (response) => {

            });
        context.$http.get(config.urlApi + '/carriers?page=1').then((response) => {
                context.$set('carriers', response.json());
            }, {

                headers: auth.getAuthHeader()
            },
            (response) => {});

        context.$http.get(config.urlApi + '/companies?page=1').then((response) => {
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

    addDevice(context,price,style,capacity,carriers,companies,device){

      context.$http.post(config.urlApi + '/devices', {

       "data" : {
             "type" : "devices",
             "attributes" : {
                 "name" : device.name,
                 "properties" : device.description,
                 "deviceTypeId" : 1,
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



            console.log(mData[index]);

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
            "companyId": p.id,
            "priceRetail": p.retail,
            "price1": p.priceOne,
            "price2": p.priceTwo,
            "priceOwn": p.priceOwn
        }


      });

      return mData;


  }
}

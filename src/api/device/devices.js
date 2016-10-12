import {router} from './../../app'
import Vue from 'vue'
import auth from './../auth.js'

var {Store} = require('yayson')()
var    store = new Store()

export default {
          device:{},

    getDevices(context) {

        context.$http.get(process.env.URL_API + '/devices?page=3&include=modifications,carriers,companies,prices,images').then((response) => {

                        event = store.sync(response.data)

                    var    devices=[];

                        for(let device of event){



                          device = Object.assign({}, device, {
                              show: false,
                              hide:true,
                              priceName:[],
                              image:process.env.URL_API+'/images/'+device.images[0].id

                          });

                          for(let price of device.prices){



                            for(let company of device.companies){
                                    if(company.id==price.companyId){
                                      price = Object.assign({}, price, {
                                        company:company.name,
                                      });

                                    }

                            }

                            for(let modification of device.modifications ){
                                if(modification.id==price.styleId){
                                  price = Object.assign({}, price, {
                                    style:modification.value,
                                  });

                                }
                                if(modification.id==price.capacityId){
                                  price = Object.assign({}, price, {
                                    capacity:modification.value,
                                  });

                                }


                            }

                            for(let carrier of device.carriers){
                              if(carrier.id==price.carrierId){
                                price = Object.assign({}, price, {
                                  carrier:carrier.presentation,
                                });

                              }

                            }

                        device.priceName.push(price);

                          }



                              devices.push(device)
                              console.log(device);

                        }


                          context.$set('devices', devices);


            },
            {
                // Attach the JWT header
                headers: auth.getAuthHeader()
            },

            (response) => {

            });
          }




        }

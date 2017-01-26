// import {
//   router
// } from './../../app'
import Vue from 'vue';
import auth from './../auth.js';

var {
  Store,
} = require('yayson')();
var store = new Store();
import {
  filterByFilters
} from './../../components/filters.js';
export default {
  device: {},

  getDevices(context, pages) {

    context.$http.get(process.env.URL_API + '/devices', {
      params: {
        include: 'modifications,devicevariations,devicevariations.companies,devicevariations.carriers,images,devicevariations.modifications',
        page: pages, /*,filter[][like]:deviceType*/
      },

    }).then((response) => {
      context.loading=false;
      context.loadtable=true;
        context.pagination = response.data.meta.pagination;
        event = store.sync(response.data);

        if(event.length==0){
          context.error="No data content"
          context.showModal=true;
        }


        var devices = [];



        for (let device of event) {
          if (device.images.length > 0) {
            device = Object.assign({}, device, {
              show: false,
              hide: true,
              priceName: [],
              image: process.env.URL_API + '/images/' + device.images[0].id,
            });

          } else {

            device = Object.assign({}, device, {
              show: false,
              hide: true,
              priceName: [],
              image: '/assets/img/logo.a521535.png'

            });
          }


              if(device.devicevariations == null ){
                  context.error="Unexpected error.Please contact the administrator"
                  context.showModal=true;
              }
                  else{
          for (let price of device.devicevariations) {

            var max = Math.max(price.priceRetail,price.price1,price.price2,price.priceOwn);
            device = Object.assign({}, device, {
              pricemax: max,
            });


            for (let company of price.companies) {
              if (company.id == price.companyId) {
                price = Object.assign({}, price, {
                  company: company.name,
                });

              }
            }



            for (let carrier of price.carriers) {
              if (carrier.id == price.carrierId) {
                price = Object.assign({}, price, {
                  carrier: carrier.presentation,
                });

              }

            }



            device.priceName.push(price);

          }


          devices.push(device);
        //  console.log(device);

        }
      }

        context.devices = devices;

      },

      (response) => {
        context.error=response;
        context.showModal=true;

      });
  },

  getDevice(context) {

    context.$http.get(process.env.URL_API + '/devicetypes', {

      params: {
        page: 1,
      },

    }).then((response) => {
                event = store.sync(response.data);
        context.filterDeviceType = event;

      },

      (response) => {

      });

    context.$http.get(process.env.URL_API + '/modifications', {

      params: {
        page: 1,
      },

    }).then((response) => {
                    event = store.sync(response.data);
        context.filterModifications = event;

      },

      (response) => {

      });

      context.$http.get(process.env.URL_API + '/devicevariations', {

        params: {
          page: 1,
        },

      }).then((response) => {
                  event = store.sync(response.data);
         context.filterPrices = event;

        },

        (response) => {

        });

    context.$http.get(process.env.URL_API + '/carriers', {
      params: {
        page: 1,
        'filter[active]': 1,
      },
    }).then((response) => {
              event = store.sync(response.data);
        context.filterCarriers = event;
      },

      (response) => {});

  },

};

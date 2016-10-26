// import {
//   router
// } from './../../app'
import Vue from 'vue'
import auth from './../auth.js'

var {
  Store
} = require('yayson')()
var store = new Store()
import {
  filterByFilters
} from './../../components/filters.js';
export default {
  device: {},

  getDevices(context, pages) {

    context.$http.get(process.env.URL_API + '/devices', {
      params: {
        include: 'modifications,carriers,companies,prices,images',
        page: pages /*,filter[][like]:deviceType*/
      }

    }).then((response) => {
        context.pagination = response.data.meta.pagination;
        let prices = filterByFilters(response.data.included, 'prices');
        context.filterPrice = prices
          /*  let modifications=    filterByFilters(response.data.included,'modifications');
            context.filterModifications=modifications;
              let deviceTypes=    filterByFilters(response.data.included,'devicetypes');
            context.filterDeviceType=deviceTypes;
                let carriers=    filterByFilters(response.data.included,'carriers');
                  context.filterCarriers=carriers;*/

        event = store.sync(response.data)

        var devices = [];

        for (let device of event) {
          if (device.images.length > 0) {
            device = Object.assign({}, device, {
              show: false,
              hide: true,
              priceName: [],
              image: process.env.URL_API + '/images/' + device.images[0].id

            });


          } else {

            device = Object.assign({}, device, {
              show: false,
              hide: true,
              priceName: [],
              image: './../assets/logo.png'

            });
          }
          for (let price of device.prices) {



            for (let company of device.companies) {
              if (company.id == price.companyId) {
                price = Object.assign({}, price, {
                  company: company.name,
                });

              }

            }

            for (let modification of device.modifications) {
              if (modification.id == price.styleId) {
                price = Object.assign({}, price, {
                  style: modification.value,
                });
              } else if (modification.id == price.capacityId) {
                price = Object.assign({}, price, {
                  capacity: modification.value,
                });

              }


            }

            for (let carrier of device.carriers) {
              if (carrier.id == price.carrierId) {
                price = Object.assign({}, price, {
                  carrier: carrier.presentation,
                });

              }

            }

            device.priceName.push(price);

          }



          devices.push(device)
          console.log(device);

        }


        context.devices = devices;


      }, {
        // Attach the JWT header
        headers: auth.getAuthHeader()
      },

      (response) => {

      });
  },

  getDevice(context) {

    context.$http.get(process.env.URL_API + '/devicetypes', {

      params: {
        page: 1
      }

    }).then((response) => {

        context.filterDeviceType = response.data.data;


      },
      (response) => {

      });

    context.$http.get(process.env.URL_API + '/modifications', {

      params: {
        page: 1
      }

    }).then((response) => {

        context.filterModifications = response.data.data;


      },
      (response) => {

      });


    context.$http.get(process.env.URL_API + '/carriers', {
      params: {
        page: 1,
        'filter[active]': 1
      }
    }).then((response) => {

        context.filterCarriers = response.data.data;
      },
      (response) => {});


  }

}

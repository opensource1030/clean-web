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
getPreset(context, pages) {

    context.$http.get(process.env.URL_API + '/presets', {
      params: {
        include: 'devicevariations',
      page: pages, /*,filter[][like]:deviceType*/
      },

    }).then((response) => {
      context.loading=false;
      context.loadtable=true;
        context.pagination = response.data.meta.pagination;
    /*    let prices = filterByFilters(response.data.included, 'prices');
        context.filterPrice = prices;
        /*  let modifications=    filterByFilters(response.data.included,'modifications');
          context.filterModifications=modifications;
            let deviceTypes=    filterByFilters(response.data.included,'devicetypes');
          context.filterDeviceType=deviceTypes;
              let carriers=    filterByFilters(response.data.included,'carriers');
                context.filterCarriers=carriers;*/

        event = store.sync(response.data);


       let presets = [];

        for (let preset of event) {

            preset = Object.assign({}, preset, {
              show: false,
              hide: true,
              devices:preset.devicevariations.length


            });
          presets.push(preset);
        }

        context.presets = presets;


      },

      (response) => {

      });
  }
}

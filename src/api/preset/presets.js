/*import Vue from 'vue';

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
        include: 'devicevariations,devicevariations.devices,devicevariations.modifications',
      page: pages, /*,filter[][like]:deviceType*/
    /*  },*/

/*    }).then((response) => {
      context.loading=false;
      context.loadtable=true;
        context.pagination = response.data.meta.pagination;
        event = store.sync(response.data);
       let presets = [];
       let total=0;
        for (let preset of event) {
          if(  preset.devicevariations==null || preset.devicevariations.length==0){


          }
else{
            preset = Object.assign({}, preset, {
              show: false,
              hide: true,
              devices:preset.devicevariations.length
            });

              for(let variation of preset.devicevariations){
                total+=variation.priceRetail

              }
                preset.total=total;

          presets.push(preset);
        }
        }

        context.presets = presets;


      },

      (response) => {

      });
  }
}*/

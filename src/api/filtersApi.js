import Vue from 'vue';
import auth from './auth.js';

const {Store,} = require('yayson')();
const store = new Store();
import {
  filterByFilters,orderFilters
} from './../components/filters.js';
export default {
getCarriers (context) {

    let params1 = {
        params: {
            'filter[active]':1,
        }
    };

  context.$http.get(process.env.URL_API + '/carriers', params1).then((response) =>
                        {
              let event = store.sync(response.data);
              if(event.lenght!=0){
                context.filter.carriers = orderFilters(event, 'presentation', 'string', 'asc');
              }
                        }, (response) => {}
                    );


},
getModifications(context) {


  context.$http.get(process.env.URL_API + '/modifications').then((response) =>
                        {
                            let event = store.sync(response.data);
                              if(event.lenght!=0){
                            context.filter.modifications =orderFilters(event, 'value', 'string', 'asc');
                          }
                        }, (response) => {}
                    );

},
getDeviceTypes(context) {

          context.$http.get(process.env.URL_API + '/devicetypes').then((response) =>
      {
                let event = store.sync(response.data);
                  if(event.lenght!=0){
              context.filter.deviceType = orderFilters(event, 'name', 'string', 'asc');
                }
                        }, (response) => {}
                    );

},
}

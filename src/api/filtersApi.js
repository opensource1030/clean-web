import { http } from 'vue';

const {Store,} = require('yayson')();
const store = new Store();
import {
  filterByFilters,orderFilters
} from './../components/filters.js';
export default {
getCarriers (params, cb, errCb) {

    let data=params

  http.get(process.env.URL_API + '/carriers', params).then((res) =>
                        {
            cb(store.sync(res.data))
            //  if(event.lenght!=0){
              //  context.filter.carriers = orderFilters(event, 'presentation', 'string', 'asc');
            //  }
          }, (err) => {
                errCb(err)

          }
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

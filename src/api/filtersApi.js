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
            if(response.data.data.length == 0){
                context.errorNotFound = true;
            } else {

                let i = 1;
                while (i <= response.data.meta.pagination.total_pages) {

                    let params2 = {
                        params: {
                            page: i
                        }
                    };

                    context.$http.get(process.env.URL_API + '/carriers', params2).then((response) =>
                        {
                            let event = store.sync(response.data);

                            context.filter.carriers = orderFilters(event, 'presentation', 'string', 'asc');
                        }, (response) => {}
                    );

                    i++;
                }


            }

        }, (response) => {}
    );
},
getModifications(context) {



    context.$http.get(process.env.URL_API + '/modifications').then((response) =>
        {

                let i = 1;
                while (i <= response.data.meta.pagination.total_pages) {


                    let params2 = {
                        params: {
                            page: i
                        }
                    };

                    context.$http.get(process.env.URL_API + '/modifications', params2).then((response) =>
                        {
                            let event = store.sync(response.data);



                            context.filter.modifications =orderFilters(event, 'value', 'string', 'asc');
                        }, (response) => {}
                    );

                    i++;
                }


        }, (response) => {}
    );
},
getDeviceTypes(context) {



    context.$http.get(process.env.URL_API + '/devicetypes').then((response) =>
        {

                let i = 1;
                while (i <= response.data.meta.pagination.total_pages) {

                    let params2 = {
                        params: {
                            page: i
                        }
                    };

                    context.$http.get(process.env.URL_API + '/devicetypes', params2).then((response) =>
                        {
                            let event = store.sync(response.data);

                            context.filter.deviceType = orderFilters(event, 'name', 'string', 'asc');
                        }, (response) => {}
                    );

                    i++;
                }


        }, (response) => {}
    );
},
}

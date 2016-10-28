import Vue from 'vue';
import auth from './../auth.js';
var {
  Store,
} = require('yayson')();
var store = new Store();

export default {

  getServices(context,pages){
          var services = [];

    context.$http.get(process.env.URL_API + '/services', {
      params: {
      //  include: 'carriers',
        page: pages, /*,filter[][like]:deviceType*/
      },

    }).then((response) => {

    let   event = store.sync(response.data);
        context.pagination = response.data.meta.pagination;
            console.log(event);

          for(let service of event){
            service = Object.assign({}, service, {
              show: false,
              hide: true,
            });


                services.push(service);
          }


        context.services = services;

      },

      (response) => {

      });


  }



}

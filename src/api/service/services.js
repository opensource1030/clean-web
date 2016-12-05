import Vue from 'vue';
import auth from './../auth.js';
var {Store} = require('yayson')();
var store = new Store();

export default {

  getServices(context, pages) {
    var services = [];

    context.$http.get(process.env.URL_API + '/services', {
      params: {
        include: 'serviceitems',
        page: pages,
        /*,filter[][like]:deviceType*/
      }
    }).then((response) => {
      context.loading = false;
      context.showtable = true;

      let event = store.sync(response.data);
      context.pagination = response.data.meta.pagination;

      for (let service of event) {
        service = Object.assign({}, service, {
          show: false,
          hide: true
        });
        console.log(service);
        services.push(service);
      }

      context.services = services;

    }, (response) => {});

  }

}

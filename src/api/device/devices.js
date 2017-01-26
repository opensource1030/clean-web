import Vue from 'vue';
import auth from './../auth.js';
const {Store,} = require('yayson')();
const store = new Store();
import {filterByFilters} from './../../components/filters.js';
export default {
  device: {},
  firstTime:true,
  getDevices(context, pages) {

    let params = {
      params: {
        include: 'modifications,devicevariations,devicevariations.companies,devicevariations.carriers,images,devicevariations.modifications',
        page: pages, /*,filter[][like]:deviceType*/
      }
    };

   if (context.type.length !== 0) {
      for(let ty of context.type){
        params.params['filter[deviceTypeId][like]'] = ty.id;
      }
    }
    if (context.manufactured.length !== 0) {
                for(let manu of context.manufactured){
        params.params['filter[make][like]'] = manu;

      }
    }

    if (context.price.length != 0) {
            for(let pri of context.price){
        params.params['filter[defaultPrice][like]'] = parseInt(pri);
      }
    }

    if (context.carrier.length != 0) {
      for(let carr of carrier){
        params.params['filter[devicevariations.carrierId][like]'] = carr.id;
      }
    }

    if (context.capacity.length != 0) {
      for (let capa of context.capacity){
        params.params['filter[modifications.id]'] = capa.id;
      }
    }

    if (context.style.length != 0) {
      for (let sty of context.style){
        params.params['filter[modifications.id]'] = sty.id;
      }
    }




    context.$http.get(process.env.URL_API + '/devices',params).then((response) => {
      context.loading=false;
      context.loadtable=true;
        context.pagination = response.data.meta.pagination;
      let  event = store.sync(response.data);
        if(event.length==0){
          context.error="No data content"
          context.showModal=true;
        }
        var devices = [];
            if(this.firstTime){
            for(let device of event){
      this.getFilters(context, context.filter.make, device.make, 'string');
      this.getFilters(context, context.filter.price, device.defaultPrice, 'number');

            }
                  this.firstTime=false;
}

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
        }
      }

        context.devices = devices;

      },

      (response) => {
        context.error=response.status;

        context.showModal=true;

      });
  },
  /*
    *  This function receives a list and a sentence, the list is filled with the sentences that have not been insered yet.
    *  Then, we order the list.
    *  Example: this.getFilters(context, context.filter.status, serv.status, 'string');
    *
    *  @context: Is the Context.
    *  @list: Is the list of the filters.
    *  @value: Is the value that we need to insert into the list.
    *  @order: Is the order for the orderFilters function.
    *
    *  @return: returns an ordered list with the values.
    *
    */
   getFilters (context, list, value, order) {

       let aux = value;
       if(aux.length >= 50){
           aux = aux.substring(0, 50);
           aux = aux + '...';
       }

       if (list.length == 0) {
           list.push(aux)
       } else {
           let ok = true;
           for (let a of list) {
               if (a == aux) {
                   ok = false;
               }
           }

           if (ok) {
               list.push(aux);
           }
       }
       list = context.orderFilters(list, '', order, 'asc');
   }

};

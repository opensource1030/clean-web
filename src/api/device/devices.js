import Vue from 'vue';
import auth from './../auth.js';
const {Store,} = require('yayson')();
const store = new Store();
import {filterByFilters, getFilters} from './../../components/filters.js';
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
     let aux = '';
     for (let ty of context.type) {
         aux = aux + ty.id + ',';
     }
     aux = aux.substring(0, aux.length-1);
        params.params['filter[deviceTypeId][like]'] = aux;

    }
    if (context.manufactured.length !== 0) {
      let aux = '';
      for (let manu of context.manufactured) {
          aux = aux + manu + ',';
      }
      aux = aux.substring(0, aux.length-1);
        params.params['filter[make][like]'] =aux;


    }

    if (context.price.length != 0) {
      let aux = '';
      for (let pri of context.price) {
          aux = aux + pri + ',';
      }
      aux = aux.substring(0, aux.length-1);
        params.params['filter[defaultPrice][like]'] = parseInt(aux);

    }

    if (context.carrier.length > 0) {
          let aux = '';
          for (let carr of context.carrier) {
              aux = aux + carr.id + ',';
          }
          aux = aux.substring(0, aux.length-1);
        params.params['filter[devicevariations.carrierId][like]'] = aux;

    }

    if (context.capacity.length != 0) {
      let aux = '';
      for (let capa of context.capacity) {
          aux = aux + capa.id + ',';
      }
      aux = aux.substring(0, aux.length-1);
        params.params['filter[modifications.id]'] = aux;

    }

    if (context.style.length != 0) {
      let aux = '';
      for (let sty of context.style) {
          aux = aux + sty.id + ',';
      }
      aux = aux.substring(0, aux.length-1);
        params.params['filter[modifications.id]'] = aux;

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
              if(device.make!=null){
      context.filter.make = getFilters(context.filter.make, device.make, 'string');
    }
    if(device.defaultPrice!=null){
      context.filter.price = getFilters(context.filter.price, device.defaultPrice, 'number');
}
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
  }
};

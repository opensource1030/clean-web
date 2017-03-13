import Vue from 'vue'
const {Store,} = require('yayson')()
const store = new Store()
import {filterByFilters, getFilters} from './../../components/filters.js'
import preset from './../preset/preset.js'

export default {
  device: {},
  firstTime:true,
  getDevices(context, pages) {

    let params = {
      params: {
        include: 'modifications,devicevariations,devicevariations.companies,devicevariations.carriers,images,devicevariations.modifications,devicevariations.images',
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
         params.params['filter[make][like]'] =aux+'%';


     }

     if (context.price.length != 0) {
       let aux = '';
       for (let p of context.price) {
           aux = aux + p + ',';
       }
       aux = aux.substring(0, aux.length-1);
         params.params['filter[defaultPrice][like]'] = aux;

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
     if (context.search.costMax != 0) {
         params.params['filter[cost][le]'] = context.search.costMax;
     }

     if (context.search.costMin != 0) {
         params.params['filter[cost][ge]'] = context.search.costMin;
     }



    context.$http.get(process.env.URL_API + '/devices',params).then((response) => {
          context.loading=false;
          context.loadtable=true;
        context.pagination = response.data.meta.pagination;
      let  event = store.sync(response.data);
        if(event.length==0){
          context.error="No data content"
            context.errors();
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
          for (let price of device.devicevariations) {

            var max = Math.max(price.priceRetail,price.price1,price.price2,price.priceOwn);
            device.pricemax=max
            for (let company of price.companies) {
                price.company=company.name;
            }

            for (let carrier of price.carriers) {
                price.carrier=carrier.presentation;
            }
              for (let m of price.modifications) {
                if (m.modType == "capacity") {
                  price.capacity=m.id;
                }else{
                  price.style=m.id;
                }
            }

          let prices= preset.checkDeviceVariations(price);
            device.priceName.push(prices);
          }
          devices.push(device);
        }



        context.devices = devices;

      },

      (response) => {
        context.error=response.status;
        context.errors();


      });
  }
};

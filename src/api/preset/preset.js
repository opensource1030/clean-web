import Vue from 'vue';
import auth from './../auth.js';
import Preset from './../../models/Preset'
const {Store,} = require('yayson')();
const store = new Store();
import {filterByFilters} from './../../components/filters.js';
export default {
  device: {},
<<<<<<< HEAD
<<<<<<< HEAD
  devicevariations:null,
=======
>>>>>>> 1b9e275... get data preset cp-1659
=======
  devicevariations:null,
>>>>>>> 2d9eaa0... cp-1659 add data
  firstTime:true,
  //gets
  getDataPreset(context,id){
    let params = {
      params: {
        include: 'devicevariations,devicevariations.companies,devicevariations.carriers,devicevariations.modifications,devicevariations.images'
      }
    };
<<<<<<< HEAD

  context.$http.get(process.env.URL_API + '/presets/'+id,params).then((response) => {
              context.id=id;
    let  event = store.sync(response.data);
        context.preset.name=event.name;
        this.devicevariations=event.devicevariations;
        context.variations=event.devicevariations;
        context.checkvariation();
  },

  (response) => {
    context.error=response.status;
    context.showModal=true;

  });
},
checkDeviceVariations(price){

                  if(this.devicevariations!=null){
              for (let variation of this.devicevariations){

                  if(variation.id==price.id && variation.deviceId==price.deviceId){

                      price.check=true;

                  }

                    }

                        if(price.check==null){
                          price.check=false;
                        }
                            return price
                          }
                          else{
                            price.check=false;
                            return price
                          }

    },
//posts
addPreset(context,preset){
  let result = JSON.parse(localStorage.getItem("userProfile"));
  preset.companyId=result.companyId;
  let check = this.checkPreset(context,preset)
  if(check==true){
    let presetObj = new Preset('presets', null, preset.name, preset.companyId,);
    presetObj.deviceVariationsJson(preset.variations,presetObj);

    context.$http.post(process.env.URL_API + '/presets/', {data: presetObj.toJSON()}).then((response) => {

      context.$router.push({name: 'List Presets'});

    }, (response) => {
      context.message = "code error    " + response.status;
      context.showModal = true;
    });


  }
},
updatePreset(context,id,preset){
  let result = JSON.parse(localStorage.getItem("userProfile"));
  preset.companyId=result.companyId;

  let check = this.checkPreset(context,preset)

  if(check==true){
  let presetObj = new Preset('presets', id, preset.name, preset.companyId,);
  presetObj.deviceVariationsJson(preset.variations,presetObj);

  context.$http.patch(process.env.URL_API + '/presets/' + id, {data: presetObj.toJSON()}).then((response) => {

    context.$router.push({name: 'List Presets'});

  }, (response) => {
    context.message = "code error    " + response.status;
    context.showModal = true;
  });
}

},
checkPreset(context,preset){

    if(preset.name==null || preset.name==""){
        context.showModal = true;
      context.error="Error in field Name";
        return false;
    }
    if(preset.companyId==null || preset.companyId==""){
            context.showModal = true;
      context.error="You don´t have company"
        return false;
    }
    if(preset.variations==null && preset.variations.length==0){
        context.showModal = true;
          context.error="Yo don´t have selected any devicevariations"
              return false;
    }


        return true;

=======

  context.$http.get(process.env.URL_API + '/presets/'+id,params).then((response) => {
              context.id=id;
    let  event = store.sync(response.data);
        context.preset.name=event.name;
        context.preset.devicevariations=event.devicevariations;
        this.devicevariations=event.devicevariations;


  },

  (response) => {
    context.error=response.status;

    context.showModal=true;

  });
},
checkDeviceVariations(price){
          if(this.devicevariations==null){

              price.check=false;
              return price;
          }
          else{
              for (let variation of this.devicevariations){
                  if(variation.id==price.id && variation.deviceId==price.deviceId){
                      price.check=true;

                  }
                else{
                        price.check=false;
                      }
                    }
                    return price;

              }


    },
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
            device.pricemax=max
            for (let company of price.companies) {
              if (company.id == price.companyId) {
                price.company=company.name;

              }
            }

            for (let carrier of price.carriers) {
              if (carrier.id == price.carrierId) {
                price.carrier=carrier.presentation;

              }

            }
          let prices= this.checkDeviceVariations(price);

            device.priceName.push(prices);

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
   },
//posts
addPreset(context,preset){

  let check = this.checkPreset(preset)

let presetObj = new Preset('presets', null, preset.name, preset.companyId,);




},
updatePreset(context,id,preset){

  let check = this.checkPreset(preset)
>>>>>>> 1b9e275... get data preset cp-1659



  let presetObj = new Preset('presets', id, preset.name, preset.companyId,);


<<<<<<< HEAD
}
=======
},
checkPreset(preset){
<<<<<<< HEAD
>>>>>>> 1b9e275... get data preset cp-1659
=======
        if(preset){
    if(preset.name==null || preset.name==""){
      context.error="Error in field Name";
      return false;
    }
    if(preset.companyId==null || preset.companyId==""){
      context.error="You don´t have company"
      return false;
    }
    if(preset.devicevariations==null && preset.devicevariations.length==0){
          context.error="Yo don´t have selected any devicevariations"
          return false;
    }
  }else{
        return true;
  }



}
>>>>>>> 2d9eaa0... cp-1659 add data


};
